import { getAuthorizationHeader, fetchData } from "./api-service";

export async function getUserInformation() {
  const headers = getAuthorizationHeader();

  const response = await fetchData("users/get", "GET", headers);

  return response;
}

export async function sendUpdateUserInformation(data) {
  const headers = getAuthorizationHeader();

  const response = await fetchData("users/update", "PUT", headers, data);

  return response;
}
