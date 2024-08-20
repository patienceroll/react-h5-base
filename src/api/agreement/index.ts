import fetch from "src/utils/fetch";
export function getAgreement(id: string) {
  return fetch.get<{
    id: number;
    agreementName: string;
    agreementContent: string;
  }>(fetch.base(`/integrated/v1/boss/agreement/anyone/content/${id}`));
}
