import { removeLocalStorageItem } from "../local-storage-utils/local-storage-utils.js";
import { getAuthorizationHeader, fetchData } from "./api-service";

export async function loginUser(data) {
  const response = await fetchData("login", "POST", null, data);

  return response;
}

export async function signupUser(data) {
  const headers = new Headers({ "Content-Type": "application/json" });

  const response = await fetchData("users/signup", "POST", headers, data);

  return response;
}

export async function requestEmailVerification(data) {
  const headers = new Headers({ "Content-Type": "application/json" });

  const response = await fetchData(
    "users/send_verification_email",
    "POST",
    headers,
    data
  );

  return response;
}

export async function requestPasswordResetEmail(data) {
  const headers = new Headers({ "Content-Type": "application/json" });

  const response = await fetchData(
    "security_code_sessions/create",
    "POST",
    headers,
    data
  );

  return response;
}

export async function verifyPasswordResetCode(data) {
  const headers = new Headers({ "Content-Type": "application/json" });

  const response = await fetchData(
    "security_code_sessions/verify",
    "POST",
    headers,
    data
  );

  return response;
}

export async function resetPassword(data) {
  const headers = new Headers({ "Content-Type": "application/json" });

  const response = await fetchData(
    "users/reset_password",
    "PATCH",
    headers,
    data
  );

  if (response.ok) {
    removeLocalStorageItem("security_code_session_token");
  }

  return response;
}

export async function logout() {
  const headers = getAuthorizationHeader();

  const response = await fetchData("logout", "POST", headers);

  return response;
}
