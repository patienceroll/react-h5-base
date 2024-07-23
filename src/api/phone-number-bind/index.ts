import fetch from "src/utils/fetch";

/** jh-获取已绑定手机号 */
export function getBinedPhone(params: {
  /**
   * 访问令牌
   */
  at: string;

  /**
   * 综合体标识
   */
  ii: string;
  /**
   * 随机字符串
   */
  no: string;

  /**
   * 时间戳
   */
  tt: string;
  /**
   * 用户标识
   */
  ui: string;
}) {
  return fetch.get<string | null>(
    fetch.base(`/integrated/v1/mini/official/account/binding/mobile/authpass`),
    params
  );
}

/** jh-绑定手机号 */
export function postBindedPhone(params: {
  /**
   * 访问令牌
   */
  at: string;
  /**
   * 网页授权code
   */
  code: string;
  /**
   * 综合体标识
   */
  ii: string;
  /**
   * 手机号
   */
  mobile: string;
  /**
   * 随机字符串
   */
  no: string;
  /**
   * 时间戳
   */
  tt: string;
  /**
   * 用户标识
   */
  ui: string;
}) {
  return fetch.post<boolean>(
    fetch.base(`/integrated/v1/mini/official/account/binding/mobile/authpass`),
    params
  );
}
