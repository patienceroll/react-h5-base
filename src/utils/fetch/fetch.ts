import buildQuery from './build-query';

export type Method =
	| 'CONNECT'
	| 'DELETE'
	| 'GET'
	| 'HEAD'
	| 'OPTIONS'
	| 'PATCH'
	| 'POST'
	| 'PUT'
	| 'TRACE';

export type FetchInit = Omit<RequestInit, 'method'> & {
	method?: Method;
	paramsSerializer?: (params: Record<string | number, unknown>) => string;
};

export type Params = Record<string | number, unknown> | BodyInit;

function isIntanceofBodyInit(data: unknown) {
	return (
		data instanceof ReadableStream ||
		data instanceof Blob ||
		data instanceof ArrayBuffer ||
		data instanceof FormData ||
		data instanceof URLSearchParams ||
		typeof data === 'string'
	);
}

export default function Fetch(
	url: string,
	params?: Params,
	init: FetchInit = {}
) {
	let query: string | undefined;
	let body: RequestInit['body'];
	const { method = 'GET', paramsSerializer } = init;

	if (['GET', 'DELETE', 'HEAD'].includes(method)) {
		if (params)
			query = paramsSerializer
				? paramsSerializer(params as Exclude<Params, BodyInit>)
				: buildQuery(params as Exclude<Params, BodyInit>);
	} else if (['POST', 'PUT', 'PATCH'].includes(method)) {
		if (isIntanceofBodyInit(params)) body = params as BodyInit;
		else body = JSON.stringify(params as Exclude<Params, BodyInit>);
	}

	return fetch(query ? `${url}?${query}` : url, { ...init, method, body });
}