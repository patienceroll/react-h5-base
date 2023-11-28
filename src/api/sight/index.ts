import fetch from "src/utils/fetch";

/** 查看景点详情 */
export function getSightDetail(params: {
  /**
   * 访问令牌 at == accessToken
   */
  at: string;
  /**
   * 随机数串 no == nonce
   */
  no: string;
  /**
   * 景区标识
   */
  pi: string;
  /**
   * 主体类型 1:景区 2:景点 pt == principalType
   */
  pt: 2;
  /**
   * 时间戳 tt == timestamp
   */
  tt: string;
}) {
  return fetch.get<SightDetail>(
    fetch.base(`/integrated/v1/boss/scenic/area/h5/authpass/spot`),
    params
  );
}

/** 查看景点列表 */
export function getSights(params: {
  /**
   * 访问令牌 at == accessToken
   */
  at: string;
  /**
   * 当前页码-最小值为: 1
   */
  current: number;
  /**
   * 随机数串 no == nonce
   */
  no: string;
  /**
   * 每页展示条数(偏移量)-区间: [1,100]
   */
  pageSize: number;
  /**
   * 景区标识
   */
  pi: string;
  /**
   * 主体类型 1:景区 2:景点 pt == principalType
   */
  pt: string;
  /**
   * 时间戳 tt == timestamp
   */
  tt: string;
}) {
  return fetch.get<
    List<
      Sight,
      {
        description: string;
        title: string;
      }
    >
  >(fetch.base(`/integrated/v1/boss/scenic/area/h5/authpass/spots`), params);
}
