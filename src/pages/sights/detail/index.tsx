import React, {
  Suspense,
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
} from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { Loading } from "react-vant";

import { getSightDetail } from "src/api/sight";

import "./index.less";

export default function () {
  const { search: s } = useLocation();
  const [search] = useSearchParams(s);
  const at = search.get("at") as string;
  const tt = search.get("tt") as string;
  const no = search.get("no") as string;
  const pi = search.get("pi") as string;

  return (
    <div className="page-sights-detail">
      <Suspense
        fallback={
          <div className="page-sights-loading">
            <Loading />
          </div>
        }
      >
        {React.createElement(
          React.lazy(() =>
            getSightDetail({
              at,
              no,
              pi,
              pt: 2,
              tt,
            }).then((res) => ({
              default: () => 123,
            }))
          )
        )}
      </Suspense>
    </div>
  );
}
