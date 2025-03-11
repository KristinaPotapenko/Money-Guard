import { getAuthorizationHeader, fetchData } from "./api-service";

export async function getDiagramInformation(cardNumber = null) {
  let endpoint;
  cardNumber
    ? (endpoint = `transactions/get_diagram?primary_account_number=${cardNumber}`)
    : (endpoint = `transactions/get_diagram`);

  const headers = getAuthorizationHeader();

  const response = await fetchData(endpoint, "GET", headers);

  return response;
}
