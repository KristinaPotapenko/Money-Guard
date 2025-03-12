import { getCardInformation } from "../api/account-api";
import { errorMessages } from "../messages/error-messages.js";
import { showModalQueue } from "../components/modal.js";
import { getLocalStorageItem } from "../local-storage-utils/local-storage-utils.js";

const currentUrl = "/" + window.location.pathname.split("/").pop();
const cvvBlock = document.querySelector(".cvv-block-js");

if (currentUrl === "/update-card-information.html") {
  try {
    const cardNumber = getLocalStorageItem("card_number");

    const response = await getCardInformation(cardNumber);

    if (!response.ok) {
      if (errorMessages[currentUrl]) {
        const errorMessage = errorMessages[currentUrl](response);

        throw new Error(errorMessage);
      }
    }

    const cardData = await response.json();
    const cardElements = getCardFields();
    fillingCardFields(cardData, cardElements);
  } catch (error) {
    const errorMessage = error.message;

    showModalQueue("An error occurred!", errorMessage);
  }
}

function getCardFields() {
  return {
    cardOwner: document.querySelector(".input-js[name='title']"),
    cardExpiryDate: document.querySelector(".input-js[name='expiration_date']"),
    cardVerificationValue: document.querySelector(
      ".input-js[name='card_verification_value']"
    ),
    hidingValue: cvvBlock.querySelector(".hidden-information-text"),
  };
}

function fillingCardFields(data, elements) {
  elements.cardOwner?.setAttribute("value", data.title);
  elements.cardExpiryDate?.setAttribute(
    "value",
    (() => {
      const date = new Date(data["expiration_date"]);
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${month}/${year}`;
    })()
  );
  elements.cardVerificationValue?.setAttribute(
    "value",
    data["card_verification_value"]
  );
  elements.hidingValue.innerHTML = "X".repeat(
    data["card_verification_value"].length
  );
}
