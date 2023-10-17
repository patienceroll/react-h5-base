import buildQuery from "./build-query";
import Fetch, { FetchInit, Params } from "./fetch";
import { Dialog } from "react-vant";

import Url from "../../../config.json";

const FetchInfo = {
  id: 1,
};

function fetchResponse<T>(...argument: Parameters<typeof Fetch>) {
  const [url, params, init = {}] = argument;
  const fetchId = `${FetchInfo.id}_${+new Date()}`;

  const mergeInit: FetchInit = {
    ...init,
    headers: {
      Tenant: "boss",
      "Content-Type": "application/json",
      Authorization:
        localStorage.getItem("type") + " " + localStorage.getItem("token"),
      ...(init.headers || {}),
    },
  };

  /** 当请求传递的是 FormData 的时候,删除 Content-Type  */
  if (
    params instanceof FormData &&
    mergeInit.headers &&
    (mergeInit.headers as any)["Content-Type"]
  ) {
    delete (mergeInit.headers as any)["Content-Type"];
  }

  if (FetchInfo.id === Number.MAX_SAFE_INTEGER) FetchInfo.id = 1;
  else FetchInfo.id += 1;

  if (params instanceof FormData || params instanceof URLSearchParams)
    params.append("_fetchId", fetchId);
  else if (
    typeof params === "object" &&
    params.toString() === "[object Object]"
  )
    (params as Exclude<Params, BodyInit>)["_fetchId"] = fetchId;

  return Fetch(url, params, mergeInit)
    .then((res) => {
      if (res.ok) return res.json();
      return Promise.reject(res);
    })
    .then((res: BaseResponse<T>) => {
      if (res.code === "000000") return res;
      return Promise.reject({
        type: "service-error",
        data: res,
      });
    })
    .catch((err) => {
      if (typeof err === "object" && err.type === "service-error") {
        const { data } = err as { data: BaseResponse };
        Dialog.alert({
          message: data.message,
        });
      } else if (err instanceof DOMException && err.name === "AbortError") {
        // 排除掉 abort 错误
        console.log("用户取消请求");
      } else {
        // 接口请求错误
      }
      return Promise.reject(err);
    });
}

/**
 * ### 发起get请求
 */
export function get<T>(...argument: Parameters<typeof Fetch>) {
  const [url, params = {}, init = {}] = argument;
  init.method = "GET";
  return fetchResponse<T>(url, params, init);
}
/**
 * ### post
 */
export function post<T>(...argument: Parameters<typeof Fetch>) {
  const [url, params = {}, init = {}] = argument;
  init.method = "POST";
  return fetchResponse<T>(url, params, init);
}

/**
 * ### put
 */
export function put<T>(...argument: Parameters<typeof Fetch>) {
  const [url, params = {}, init = {}] = argument;
  init.method = "PUT";
  return fetchResponse<T>(url, params, init);
}

/**
 * ### delete
 */
export function del<T>(...argument: Parameters<typeof Fetch>) {
  const [url, params = {}, init = {}] = argument;
  init.method = "DELETE";
  return fetchResponse<T>(url, params, init);
}

function base(path: string) {
  return Url.baseUrl + path;
}

function mock(path: string) {
  return `https://yapi.hicoofinal.com/mock/956` + path;
}

export default { fetchResponse, get, post, put, buildQuery, base, del, mock };
