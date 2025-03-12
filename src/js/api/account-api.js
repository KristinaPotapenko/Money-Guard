import { getAuthorizationHeader, fetchData } from "./api-service";

export async function getCardInformation(data) {
  const headers = getAuthorizationHeader();

  const response = await fetchData(`accounts/${data}/`, "GET", headers);

  return response;
}

export async function sendCardInformation(data) {
  const headers = getAuthorizationHeader("application/json");

  const response = await fetchData("accounts/add", "POST", headers, data);

  return response;
}

export async function getCurrentAccountExpense(data, month = null) {
  let endpoint;
  month
    ? (endpoint = `transactions/expenses/${data}?month=${month}`)
    : (endpoint = `transactions/expenses/${data}`);

  const headers = getAuthorizationHeader();
  const response = await fetchData(endpoint, "GET", headers);

  return response;
}

export async function getCurrentAccountIncome(data, month = null) {
  let endpoint;
  month
    ? (endpoint = `transactions/income/${data}?month=${month}`)
    : (endpoint = `transactions/income/${data}`);

  const headers = getAuthorizationHeader();
  const response = await fetchData(endpoint, "GET", headers);

  return response;
}

export async function updateCardInformation(data, cardNumber) {
  const headers = getAuthorizationHeader("application/json");

  const response = await fetchData(
    `accounts/update/${cardNumber}`,
    "PUT",
    headers,
    data
  );

  return response;
}
