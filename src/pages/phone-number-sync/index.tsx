import { useSearchParams } from "react-router-dom";
import { Button } from "react-vant";

import "./index.less";

export default function () {
  const [search] = useSearchParams();
  const code = search.get("code");
  return (
    <div className="page-phone-number-sync">
      <div className="top">为便捷核销优惠券请绑定手机号</div>
      <div className="body" >
        code:{code}
      </div>
      <div className="bottom">
        <div className="tip">
          <div>绑定手机号后可在出示付款码</div>
          <div>给商家扫码时同步核销优惠券</div>
        </div>
        <Button className="button" type="primary" block round >
          确认绑定
        </Button>
      </div>
    </div>
  );
}
