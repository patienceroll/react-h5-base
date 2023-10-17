export default {
  wx: {
    getBrandWCPayRequest(
      params: Omit<
        wx.ChooseWXPayConfig,
        "success" | "fail" | "complete" | "cancel"
      >
    ) {
      return new Promise<any>((res, rej) => {
        wx.chooseWXPay({
          ...params,
          success: res,
          fail: rej,
        });
      });
    },
  },
};
