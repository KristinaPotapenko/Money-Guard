import {
  loginUser,
  signupUser,
  requestEmailVerification,
  requestPasswordResetEmail,
  verifyPasswordResetCode,
  resetPassword,
} from "../api/auth-api.js";

import {
  sendCardInformation,
  updateCardInformation,
} from "../api/account-api.js";
import { sendUpdateUserInformation } from "../api/user-api.js";
import { sendTransactionInformation } from "../api/transaction-api.js";

import { prepareCardFormData } from "../prepare-data/prepare-card-form-data.js";
import { prepareTransactionData } from "../prepare-data/prepare-transaction-data.js";
import { prepareUpdateCardData } from "../prepare-data/prepare-update-card-data.js";
import { prepareUserFormData } from "../prepare-data/prepare-user-form-data.js";

import {
  setLocalStorageItem,
  getLocalStorageItem,
} from "../local-storage-utils/local-storage-utils.js";

export const urlHandlers = {
  "/": async (data) => {
    const response = await loginUser(data);
    const responseData = await response.json();

    setLocalStorageItem("access_token", responseData.access_token);

    return { response, data: responseData };
  },
  "/sign-up.html": async (data) => {
    const dataObject = Object.fromEntries(data.entries());
    const response = await signupUser(JSON.stringify(dataObject));

    if (response.ok) {
      const data = {};
      data.email = dataObject["email"];
      const response = await requestEmailVerification(JSON.stringify(data));

      return { response };
    }

    return { response };
  },
  "/password-change-email.html": async (data) => {
    const dataObject = Object.fromEntries(data.entries());
    const response = await requestPasswordResetEmail(
      JSON.stringify(dataObject)
    );
    const responseData = await response.json();

    setLocalStorageItem(
      "security_code_session_token",
      responseData.security_code_session_token
    );

    return { response, data: responseData };
  },
  "/password-change-code.html": async (data) => {
    const dataObject = Object.fromEntries(data.entries());

    dataObject["security_code_session_token"] = getLocalStorageItem(
      "security_code_session_token"
    );
    const response = await verifyPasswordResetCode(JSON.stringify(dataObject));

    return { response };
  },
  "/password-change-newPassword.html": async (data) => {
    const dataObject = Object.fromEntries(data.entries());

    delete dataObject.password;
    dataObject["security_code_session_token"] = getLocalStorageItem(
      "security_code_session_token"
    );
    const response = await resetPassword(JSON.stringify(dataObject));

    return { response };
  },
  "/user-information.html": async (data) => {
    const preparedData = prepareUserFormData(data);

    const response = await sendUpdateUserInformation(preparedData);

    return { response };
  },
  "/add-card.html": async (data) => {
    const dataObject = Object.fromEntries(data.entries());
    const preparedDataObject = prepareCardFormData(dataObject);

    const response = await sendCardInformation(
      JSON.stringify(preparedDataObject)
    );

    return { response };
  },
  "/add-transaction.html": async (data) => {
    const dataObject = Object.fromEntries(data.entries());
    const preparedDataObject = prepareTransactionData(dataObject);

    const response = await sendTransactionInformation(
      JSON.stringify(preparedDataObject)
    );

    return { response };
  },
  "/update-card-information.html": async (data, cardNumber) => {
    const dataObject = Object.fromEntries(data.entries());
    const preparedDataObject = prepareUpdateCardData(dataObject);

    const response = await updateCardInformation(
      JSON.stringify(preparedDataObject),
      cardNumber
    );

    return { response };
  },
};
