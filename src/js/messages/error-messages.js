export const errorMessages = {
  "/": (error) => checkError(error, "Login error occurred."),
  "/sign-up.html": (error) => checkError(error, "Signup error occurred."),
  "/password-change-email.html": (error) =>
    checkError(error, "Enter your e-mail in this format simple@example.com."),
  "/password-change-code.html": (error) =>
    checkError(error, "The code is incorrect."),

  "/password-change-newPassword.html": (error) =>
    checkError(error, "The password is incorrect."),

  "/user-information.html": (error) =>
    checkError(error, "The action is temporarily unavailable."),
  "/add-card.html": (error) => {
    if (error.detail) {
      checkError(error, "The action is temporarily unavailable.");
    } else {
      return "The action is temporarily unavailable.";
    }
  },
  "/cards-information.html": (error) =>
    checkError(error, "The action is temporarily unavailable."),
  "/card-information.html": (error) =>
    checkError(error, "The action is temporarily unavailable."),
  "/add-transaction.html": (error) =>
    checkError(error, "The action is temporarily unavailable."),
  "/update-card-information.html": (error) =>
    checkError(error, "The action is temporarily unavailable."),
  "/dashboard.html": (error) =>
    checkError(error, "The action is temporarily unavailable."),
  "/verify.html": (error) =>
    checkError(error, "The action is temporarily unavailable."),
};

function checkError(error, message) {
  if (typeof error.detail === "string") {
    return error.detail;
  } else {
    return message;
  }
}
