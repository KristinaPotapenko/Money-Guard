import { getLocalStorageItem } from "../local-storage-utils/local-storage-utils";

export const BASE_URL = "https://money-guard-785724585317.europe-west1.run.app";

export function getAuthorizationHeader(contentType = null) {
  const accessToken = getLocalStorageItem("access_token");
  const tokenType = `Bearer`;
  const authorizationDate = `${tokenType} ${accessToken}`;

  const headers = new Headers({
    Authorization: `${authorizationDate}`,
  });

  if (contentType) {
    headers.append("Content-Type", contentType);
  }

  return headers;
}

export async function fetchData(
  endpoint,
  method = "GET",
  headers = null,
  body = null
) {
  const url = `${BASE_URL}/${endpoint}`;
  const options = {
    method,
  };

  if (headers) {
    options.headers = headers;
  }

  if (body) {
    options.body = body;
  }

  const response = await fetch(url, options);

  return response;
}
