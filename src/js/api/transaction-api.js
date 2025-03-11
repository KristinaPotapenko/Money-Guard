import { getAuthorizationHeader, fetchData } from "./api-service";

export async function sendTransactionInformation(data) {
  const headers = getAuthorizationHeader("application/json");

  const response = await fetchData(
    "transactions/create",
    "POST",
    headers,
    data
  );

  return response;
}

export async function getTransactionInformation(data) {
  const headers = getAuthorizationHeader();

  const response = await fetchData(`transactions/get/${data}`, "GET", headers);

  return response;
}

export async function getAllTransactionInformation(limit, offset) {
  const headers = getAuthorizationHeader();

  const response = await fetchData(
    `transactions/get_all?limit=${limit}&offset=${offset}`,
    "GET",
    headers
  );

  return response;
}
