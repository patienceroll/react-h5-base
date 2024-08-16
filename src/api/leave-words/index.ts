import fetch from "src/utils/fetch";

/** 最热内容 */
export function leaveWords(params: {
  /**
   * 访问令牌 at == accessToken
   */
  at: string;
  /**
   * 当前页码-最小值为: 1
   */
  current: number;
  /**
   * 随机数串 no == nonce
   */
  no: string;
  ii:string;
  /**
   * 每页展示条数(偏移量)-区间: [1,100]
   */
  pageSize: number;
  /**
   * 时间戳 tt == timestamp
   */
  tt: string;
}) {
  return fetch.get<List<LeaveWords>>(
    fetch.base(`/integrated/v1/mini/h5/index/recommend/hottest/contents`),
    params
  );
}
