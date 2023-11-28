import React, {
  Suspense,
  memo,
  useEffect,
  useLayoutEffect,
  useMemo,
  useState,
} from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";
import { Loading } from "react-vant";

import { getSightDetail } from "src/api/sight";
import NavBar from "src/components/nav-bar";

import "./index.less";

function Component(props: { detail: SightDetail }) {
  const { detail } = props;

  const [view, setView] = useState<SightDetail["detailsImages"][number]>(
    () => detail.detailsImages[0]
  );

  useLayoutEffect(() => {
    document.title = detail.title || "";
  }, [detail.title]);

  return (
    <div>
      <NavBar title={detail.title} />
      <div className="price">
        票价: <span style={{ color: "#d80000" }}>{detail.price}元</span>
      </div>
      <div className="img-view">
        <img className="view" src={view.fileUrl} />
        <div className="list">
          {detail.detailsImages.map((i) => (
            <div
              key={i.id}
              className="list-icon"
              style={{ backgroundImage: `url(${i.fileUrl})` }}
              onClick={() => {
                setView(i);
              }}
            />
          ))}
        </div>
      </div>

      {detail.description && (
        <div className="description">
          <div dangerouslySetInnerHTML={{ __html: detail.description }} />
        </div>
      )}
    </div>
  );
}

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
              default: () => <Component detail={res.data} />,
            }))
          )
        )}
      </Suspense>
    </div>
  );
}
