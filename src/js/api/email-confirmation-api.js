import { fetchData } from "./api-service";

export async function confirmationEmail(token) {
  const headers = new Headers({ "Content-Type": "application/json" });

  const response = await fetchData(`users/verify/${token}`, "POST", headers);

  return response;
}
