import { useLocation, useSearchParams } from "react-router-dom";
import React, { Suspense, useState } from "react";
import { Dialog, Loading } from "react-vant";

import assets from "src/assets";
import useWeather from "src/hook/use-weather";
import sdk from "src/sdk";
import useEnv from "src/hook/use-env";

import * as Api from "src/api/pay";

import "./index.less";

function Pay(props: {
  bindId: string;
  accessToken: string;
  authCode: string;
  merchantName: string;
}) {
  const { merchantName, accessToken, authCode, bindId } = props;
  const wheather = useWeather(true);
  const submiting = useWeather();
  const { weixin } = useEnv();

  const [value, setValue] = useState<string>("");
  function onChangeValue(
    val: 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | "." | "del"
  ) {
    return function () {
      if (submiting.value) return;
      if (val === "del") {
        if ("0." === value) setValue("");
        else setValue((t) => t.slice(0, t.length - 1));
      } else if (val === ".") {
        if (!value.includes(".") && value.length !== 0) {
          setValue((t) => t.concat(String(val)));
        }
      } else if (val === 0) {
        if (
          !["0"].includes(value) &&
          (/^[0-9]{1,5}$/.test(value) || /^[0-9]{1,6}\.[0-9]{0,1}$/.test(value))
        ) {
          setValue((t) => t.concat(String(val)));
        }
        if (value === "") setValue("0.");
      } else {
        if (
          /^[0-9]{0,5}$/.test(value) ||
          /^[0-9]{1,6}\.[0-9]{0,1}$/.test(value)
        ) {
          setValue((t) => t.concat(String(val)));
        }
      }
    };
  }

  function confirm() {
    if (!value) {
      Dialog.alert({
        message: "请输入金额",
      });
      return;
    }
    if (!submiting.value) {
      submiting.setTrue();

   
      Api.postPay({
        accessToken,
        bindId,
        authCode,
        appType: "mp",
        orderAmount: value,
      })
        .then((res) => {
          if (weixin) {
            return sdk.wx.getBrandWCPayRequest({
              timestamp: Number(res.data.wechatpay.timeStamp),
              nonceStr: res.data.wechatpay.nonceStr,
              package: res.data.wechatpay.package,
              paySign: res.data.wechatpay.paySign,
            });
          }
          return Promise.reject();
        })
        .finally(submiting.setFalse);
    }
  }

  return (
    <div className="page-pay">
      <div className="title">
        <img className="p1" alt="" src={assets.p1} />
        <span className="merchant-name">&emsp;商户:{merchantName}</span>
      </div>
      <div className="money" onClick={wheather.setTrue}>
        <div className="tip">付款金额</div>
        <div className="wrapper">
          <span className="rmb">￥</span>
          <span className="value">{value}</span>
        </div>
      </div>
      <div
        className="pad"
        style={{ bottom: wheather.value ? undefined : "-100%" }}
      >
        <div className="row">
          <div className="key" onClick={onChangeValue(1)}>
            1
          </div>
          <div className="key" onClick={onChangeValue(4)}>
            4
          </div>
          <div className="key" onClick={onChangeValue(7)}>
            7
          </div>
          <div className="key" onClick={onChangeValue(".")}>
            .
          </div>
        </div>
        <div className="row">
          <div className="key" onClick={onChangeValue(2)}>
            2
          </div>
          <div className="key" onClick={onChangeValue(5)}>
            5
          </div>
          <div className="key" onClick={onChangeValue(8)}>
            8
          </div>
          <div className="key" onClick={onChangeValue(0)}>
            0
          </div>
        </div>
        <div className="row">
          <div className="key" onClick={onChangeValue(3)}>
            3
          </div>
          <div className="key" onClick={onChangeValue(6)}>
            6
          </div>
          <div className="key" onClick={onChangeValue(9)}>
            9
          </div>
          <div className="key" onClick={wheather.setFalse}>
            <img className="del" alt="del" src={assets.p3} />
          </div>
        </div>
        <div className="row">
          <div className="key" onClick={onChangeValue("del")}>
            <img className="del" alt="del" src={assets.p2} />
          </div>
          <div className="confirm" onClick={confirm}>
            {submiting.value ? <Loading /> : <span>确认支付</span>}
          </div>
        </div>
      </div>
    </div>
  );
}

export default function () {
  const { search: s } = useLocation();
  const [search] = useSearchParams(s);
  const authCode = search.get("authCode") as string;
  const accessToken = search.get("accessToken") as string;

  
  return (
    <Suspense
      fallback={
        <div className="page-pay-loading">
          <Loading />
        </div>
      }
    >
      {React.createElement(
        React.lazy(() =>
          Promise.all([
            Api.bindUser({ accessToken, authCode }),
            Api.getMerchantInfo({ accessToken }),
          ]).then((res) => ({
            default: () => (
              <Pay
                bindId={res[0].data}
                accessToken={accessToken}
                authCode={authCode}
                merchantName={res[1].data.merchantName}
              />
            ),
          }))
        )
      )}
    </Suspense>
  );
}
