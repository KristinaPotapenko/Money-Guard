import { logout } from "../api/auth-api";
import { removeLocalStorageItem } from "../local-storage-utils/local-storage-utils";
import { errorMessages } from "../messages/error-messages";
import { showModalQueue } from "./modal";

const logoutButton = document.querySelector(".logout-button-js");

if (logoutButton) {
  logoutButton.addEventListener("click", () => {
    logoutUser();
  });
}

async function logoutUser() {
  const currentUrl = "/" + window.location.pathname.split("/").pop();

  try {
    const response = await logout();

    if (!response.ok) {
      const error = await response.json();

      if (errorMessages[currentUrl]) {
        const errorMessage = errorMessages[currentUrl](error);

        throw new Error(errorMessage);
      }
    }

    showModalQueue(
      "Success",
      "You have successfully logged out of your account.",
      "Ok",
      `${window.location.origin}/`
    );

    removeLocalStorageItem("access_token");
    removeLocalStorageItem("card_number");
  } catch (error) {
    const errorMessage = error.message;
    showModalQueue("An error occurred!", errorMessage);
  }
}
