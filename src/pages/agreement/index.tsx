import { useEffect, useState } from "react";

import "./index.less";

export default function () {
  useEffect(() => {
    document.title = "用户协议";
  }, []);

  return <div className="agreement-page"></div>;
}
