export default function useEnv() {
  const ua = navigator.userAgent.toLowerCase();
  return {
    weixin: /MicroMessenger/i.test(ua),
    alipay: /AlipayClient/i.test(ua),
    unionpay: /CloudPay/i.test(ua),
  };
}
