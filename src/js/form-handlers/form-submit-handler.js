import { showModalQueue } from "../components/modal.js";
import { handleInputValidation } from "../form-validation/form-validation.js";
import { successActions } from "../messages/success-actions.js";
import { removeCheckbox } from "../form-components/checkbox.js";
import { errorMessages } from "../messages/error-messages.js";
import { urlHandlers } from "../form-handlers/action-url-handlers.js";
import { getLocalStorageItem } from "../local-storage-utils/local-storage-utils.js";

const form = document.querySelector(".form-js");

const loader = document.querySelector(".loader");

window.addEventListener("load", () => {
  const currentUrl = "/" + window.location.pathname.split("/").pop();

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();

      let resultSendForm = [];
      const inputElements = form.querySelectorAll(".input-js");

      inputElements.forEach((inputElement) => {
        const isValid = handleInputValidation(inputElement) ?? false;
        resultSendForm.push(isValid);
      });

      if (!resultSendForm.includes(false)) {
        const formButton = form.querySelector(".account-form__button");
        handleFormSubmit(form, currentUrl, formButton);

        if (formButton) formButton.disabled = true;

        if (loader) {
          loader.classList.remove("visually-hidden-overlay");
          document.documentElement.classList.add("is-lock");
        }
      }
    });
  }
});

function serializeForm(formNode) {
  return new FormData(formNode);
}

async function handleFormSubmit(form, currentUrl, formButton) {
  try {
    const data = serializeForm(form);
    let responseObj;
    const cardNumber = getLocalStorageItem("card_number");

    if (urlHandlers[currentUrl]) {
      if (cardNumber) {
        responseObj = await urlHandlers[currentUrl](data, cardNumber);
      } else {
        responseObj = await urlHandlers[currentUrl](data);
      }
    }

    if (!responseObj.response.ok) {
      let responseInformation;

      if (responseObj.data) {
        responseInformation = responseObj.data;
      } else {
        responseInformation = await responseObj.response.json();
      }

      if (errorMessages[currentUrl]) {
        const errorMessage = errorMessages[currentUrl](responseInformation);

        throw new Error(errorMessage);
      }
    }

    if (successActions[currentUrl]) successActions[currentUrl]();

    removeCheckbox();
    form.reset();
  } catch (error) {
    let errorMessage = error.message;

    showModalQueue("An error occurred!", errorMessage);
  } finally {
    formButton;
    if (formButton) formButton.disabled = false;

    if (loader) {
      loader.classList.add("visually-hidden-overlay");
      document.documentElement.classList.remove("is-lock");
    }
  }
}
