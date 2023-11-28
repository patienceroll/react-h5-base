import React, { memo } from "react";
import { useLocation, useSearchParams, useNavigate } from "react-router-dom";

import assets from "src/assets";

import { getSights } from "src/api/sight";
import usePage from "src/hook/use-page";
import useInitRun from "src/hook/use-init-run";
import NavBar from "src/components/nav-bar";

import "./index.less";

export default memo(function () {
  const { search: s } = useLocation();
  const [search] = useSearchParams(s);
  const nav = useNavigate();

  const at = search.get("at") as string;
  const tt = search.get("tt") as string;
  const no = search.get("no") as string;
  const pi = search.get("pi") as string;
  const pt = search.get("pt") as string;

  const { params, list, additional, nextPage, resetPageLoad } =
    usePage(getSights);

  useInitRun(() => {
    params.current.at = at;
    params.current.tt = tt;
    params.current.no = no;
    params.current.pi = pi;
    params.current.pt = pt;
    resetPageLoad().then(() => {
      document.title = additional.current?.title || "";
    });
  });

  return (
    <div className="page-sights-list">
      <NavBar title={additional.current?.title} />
      <img className="p4" src={assets.p4} />
      <div
        className="list"
        onScroll={(e) => {
          const { target } = e.nativeEvent;
          const { scrollHeight, scrollTop, clientHeight } =
            target as HTMLDivElement;
          if (scrollHeight - scrollTop - clientHeight < 50) {
            nextPage();
          }
        }}
      >
        {list.map((i) => (
          <div
            key={i.id}
            className="item"
            onClick={() => {
              const sea = new URLSearchParams();
              sea.set("at", i.at);
              sea.set("no", i.no);
              sea.set("pi", i.id);
              sea.set("tt", String(i.tt));
              sea.set("title", i.title);
              nav({
                pathname: "/h5/sight/detail",
                search: sea.toString(),
              });
            }}
          >
            <img className="main-img" src={i.masterImage} />
            <div className="content">
              <div className="title">{i.title}</div>
              <div className="price">票价: {i.price}元</div>
              <div className="description">简介: {i.brief}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});
