import { showModalQueue } from "../components/modal.js";

export const successActions = {
  "/": () => {
    showModalQueue(
      "Success",
      "Login successful!",
      "Ok",
      `${window.location.origin}/Money-Guard/dashboard.html`
    );
  },
  "/sign-up.html": () => {
    showModalQueue(
      "Success",
      "A confirmation email has been sent to your email.",
      "Ok",
      `${window.location.origin}/Money-Guard/`
    );
  },
  "/password-change-email.html": () => {
    showModalQueue(
      "Success",
      "A confirmation code has been sent to your e-mail.",
      "Go",
      `${window.origin}/Money-Guard/password-change-code.html`
    );
  },
  "/password-change-code.html": () => {
    window.location.href = `${window.location.origin}/Money-Guard/password-change-newPassword.html`;
  },

  "/password-change-newPassword.html": () => {
    showModalQueue(
      "Success",
      "Password successfully changed!",
      "Go to the login page",
      `${window.location.origin}/Money-Guard/`
    );
  },

  "/user-information.html": () => {
    showModalQueue(
      "Success",
      "Profile info updated!",
      "Ok",
      `${window.location.origin}/Money-Guard/user-information.html`
    );
  },
  "/add-card.html": () => {
    showModalQueue(
      "Success",
      "Сard was successfully added!",
      "Ok",
      `${window.location.origin}/Money-Guard/cards-information.html`
    );
  },
  "/add-transaction.html": () => {
    showModalQueue(
      "Success",
      "Transaction was successfully added!",
      "Ok",
      `${window.location.origin}/Money-Guard/add-transaction.html`
    );
  },
  "/update-card-information.html": () => {
    showModalQueue(
      "Success",
      "Card information has been successfully changed!",
      "Ok",
      `${window.location.origin}/Money-Guard/card-information.html`
    );
  },
};
