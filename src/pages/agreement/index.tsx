import { useEffect, useState } from "react";
import { getAgreement } from "src/api/agreement";
import { useSearchParams } from "react-router-dom";

import "./index.less";

export default function () {
  const [html, setHtml] = useState("");
  const [searchParams] = useSearchParams();
  const id = searchParams.get("id");
  useEffect(() => {
    document.title = "用户协议";
    if (id) {
      getAgreement(id).then((res) => {
        setHtml(res.data.agreementContent);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div
      className="agreement-page"
      dangerouslySetInnerHTML={{ __html: html }}
    ></div>
  );
}
