import { getAuthorizationHeader, fetchData } from "./api-service";

export async function getCards(limit, offset) {
  const headers = getAuthorizationHeader();

  const response = await fetchData(
    `accounts/get_all?limit=${limit}&offset=${offset}`,
    "GET",
    headers
  );

  return response;
}

export async function getTotalBalance(month = null) {
  let endpoint;
  month
    ? (endpoint = `accounts/total_balance?month=${month}`)
    : (endpoint = "accounts/total_balance");

  const headers = getAuthorizationHeader();

  const response = await fetchData(endpoint, "GET", headers);

  return response;
}
