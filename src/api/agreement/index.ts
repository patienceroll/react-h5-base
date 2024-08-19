import fetch from "src/utils/fetch";
export function getAgreement(id: string) {
  return fetch.post<{
    id: number;
    agreementName: string;
    agreementContent: string;
  }>(fetch.base(`/integrated/v1/mini/merchant/agreement/anyone/content/${id}`));
}
