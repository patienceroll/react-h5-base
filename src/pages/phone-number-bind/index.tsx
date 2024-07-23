import { useCallback, useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Button, Dialog } from "react-vant";

import { getBinedPhone, postBindedPhone } from "src/api/phone-number-bind";
import useWather from "src/hook/use-wather";

import "./index.less";

export default function () {
  const [search] = useSearchParams();
  const [value, setValue] = useState("");
  const [submiting] = useWather();
  const [binded] = useWather();
  const navigate = useNavigate();

  const code = search.get("code");
  const at = search.get("at");
  const ii = search.get("ii");
  const no = search.get("no");
  const tt = search.get("tt");
  const ui = search.get("ui");

  const getBindedPhoneNumber = useCallback(
    function () {
      return getBinedPhone({ at: at!, ii: ii!, no: no!, tt: tt!, ui: ui! });
    },
    [at, ii, no, tt, ui]
  );

  function submit() {
    if (!/^1[3-9]\d{9}$/.test(value)) {
      Dialog.alert({
        message: "请输入正确的手机号",
      });
      return;
    }
    submiting.setTrue();
    postBindedPhone({
      at: at!,
      ii: ii!,
      no: no!,
      tt: tt!,
      ui: ui!,
      code: code!,
      mobile: value,
    })
      .then(() => {
        navigate(
          { pathname: "/h5/phone-number-bind/success" },
          { replace: true }
        );
      })
      .finally(() => {
        submiting.setFalse();
      });
  }

  useEffect(() => {
    getBindedPhoneNumber().then((res) => {
      setValue(res.data || "");
      if (res.data) {
        binded.setTrue();
      }
    });
  }, [binded, getBindedPhoneNumber]);

  return (
    <div className="page-phone-number-sync">
      <div className="top">为便捷核销优惠券请绑定手机号</div>
      <div className="body">
        <div style={{ position: "relative" }}>
          <input
            id="phone"
            className="input"
            value={value}
            type="tel"
            placeholder="请输入手机号"
            onChange={(e) => {
              setValue(e.target.value);
            }}
          />
          <label htmlFor="phone" className="label">
            手机号:
          </label>
        </div>
      </div>
      <div className="bottom">
        <div className="tip">
          <div>绑定手机号后可在出示付款码</div>
          <div>给商家扫码时同步核销优惠券</div>
        </div>
        <Button
          className="button"
          type="primary"
          block
          round
          loading={submiting.whether}
          onClick={submit}
        >
          {binded.whether ? "更改绑定" : "确认绑定"}
        </Button>
      </div>
    </div>
  );
}
