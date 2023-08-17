import fetch from "src/utils/fetch";

/** 绑定用户 */
export function bindUser(params: { accessToken: string; authCode: string }) {
  return fetch.post<string>(
    fetch.base("/integrated/v1/transaction/payment/qrcode/binding"),
    params
  );
}

/** 查询商户信息 */
export function getMerchantInfo(params: { accessToken: string }) {
  return fetch.post<{
    merchantId: string;
    merchantName: string;
    merchantNo: string;
  }>(fetch.base("/integrated/v1/transaction/payment/qrcode/merchant"), params);
}

/** 发起支付 */
export function postPay(params: {
  accessToken: string;
  /** 微信应用类型 xcx:小程序 mp:公众号(默认),示例值(mp)	 */
  appType: "mp" | "xcx";
  authCode: string;
  bindId: string;
  /** 	订单金额 */
  orderAmount: string;
}) {
  return fetch.post<{
    alipay: {
      payNo: string;
    };
    unionpay: {
      payUrl: string;
    };
    wechatpay: {
      appId: string;
      nonceStr: string;
      package: string;
      paySign: string;
      signType: string;
      timeStamp: string;
    };
  }>(fetch.base("/integrated/v1/transaction/payment/qrcode/pay"), params);
}
