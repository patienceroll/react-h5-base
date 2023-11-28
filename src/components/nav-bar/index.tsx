import { useNavigate } from "react-router-dom";
import { useLayoutEffect } from "react";

import useEnv from "src/hook/use-env";
import assets from "src/assets";

import "./index.less";

export default function (props: { title?: string }) {
  const { weixin } = useEnv();
  const nav = useNavigate();

  useLayoutEffect(() => {
    document.title = props.title || "";
  }, [props.title]);

  return weixin ? null : (
    <div className="components-nav-bar">
      <img
        src={assets.p5}
        className="components-nav-bar-left"
        onClick={() => {
          nav(-1);
        }}
      />
      <div className="components-nav-bar-title">{props.title}</div>
    </div>
  );
}
