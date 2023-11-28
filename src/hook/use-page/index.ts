import { useCallback, useRef, useState } from "react";

import useAntiShake from "src/utils/antishake";

interface BaseListParam extends Record<string | number, any> {
  current: number;
  pageSize: number;
}

export default function <L, P extends BaseListParam, A>(
  Api: (params: P, ...Arg: any[]) => Promise<BaseResponse<List<L, A>>>
) {
  const params = useRef<P>({
    current: 1,
    pageSize: 20,
  } as unknown as P);

  const Config = useRef({
    loading: false,
    total: 0,
  });

  const additional = useRef<A>();
  const [loading, setLoading] = useState(false);
  const [list, setList] = useState<L[]>([]);

  const getList = useCallback(() => {
    setLoading(true);
    Config.current.loading = true;
    return Api(params.current)
      .then((res) => {
        Config.current.total = res.data.count;
        params.current.current = res.data.current;
        additional.current = res.data.additional;
        return res;
      })
      .finally(() => {
        setLoading(false);
        Config.current.loading = false;
      });
  }, [Api]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const nextPage = useCallback(
    useAntiShake(
      () => {
        if (Config.current.loading) {
          return Promise.reject();
        }
        if (
          Config.current.total <=
          params.current.current * params.current.pageSize
        ) {
          return Promise.reject();
        }
        params.current.current += 1;
        return getList().then((res) => {
          setList((t) => t.concat(res.data.list));
        });
      },
      { delay: 16 }
    ),
    [getList]
  );

  const load = useCallback(() => {
    return getList().then((res) => {
      setList(res.data.list);
    });
  }, [getList]);

  const resetPageLoad = useCallback(() => {
    params.current.current = 1;
    setList([]);
    return getList().then((res) => {
      setList(res.data.list);
      return res;
    });
  }, [getList]);

  /** 依据现在的请求参数,直接请求当前分页参数应该获取的数据 */
  const slientReload = useCallback(() => {
    setLoading(true);
    Config.current.loading = true;
    Api({
      ...params.current,
      current: 1,
      size: params.current.pageSize * params.current.current,
    })
      .then((res) => {
        setList(res.data.list);
      })
      .finally(() => {
        setLoading(false);
        Config.current.loading = false;
      });
  }, [Api]);

  return {
    loading,
    params,
    list,
    config: Config,
    additional,
    reachBottom:
      Config.current.total <= params.current.current * params.current.pageSize,
    getList,
    nextPage,
    load,
    resetPageLoad,
    setList,
    slientReload,
  };
}
