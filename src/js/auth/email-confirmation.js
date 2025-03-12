import { showModalQueue } from "../components/modal";
import { confirmationEmail } from "../api/email-confirmation-api";
import { requestEmailVerification } from "../api/auth-api";
import { errorMessages } from "../messages/error-messages";
import { validateAndWarnEmail } from "../form-validation/form-validation";

const currentUrl = window.location.href;
const loader = document.querySelector(".loader");

if (currentUrl.includes("verify.html")) {
  const token = currentUrl.match(/#(.+)$/).slice(1)[0];

  if (loader) {
    loader.classList.remove("visually-hidden-overlay");
    document.documentElement.classList.add("is-lock");
  }

  if (token) {
    try {
      const response = await confirmationEmail(token);

      if (!response.ok) {
        if (errorMessages["/verify.html"]) {
          const details = await response.json();
          const errorMessage = errorMessages["/verify.html"](details);

          throw new Error(errorMessage);
        }
      }

      showModalQueue(
        "Success",
        "Your e-mail has been confirmed!",
        "Go to login",
        `${window.location.origin}/Money-Guard/`
      );
    } catch (error) {
      let errorMessage = error.message;
      showModalQueue("An error occurred!", errorMessage);
    } finally {
      if (loader) {
        loader.classList.add("visually-hidden-overlay");
        document.documentElement.classList.remove("is-lock");
      }
    }
  }
}

const resendConfirmationEmailButton = document.querySelector(
  ".resend-confirmation-email-button"
);

const emailInput = document.querySelector('.input-js[name="email"]');

if (resendConfirmationEmailButton) {
  resendConfirmationEmailButton.addEventListener("click", async (event) => {
    event.preventDefault();
    const currentUrl = "/" + window.location.pathname.split("/").pop();

    const isValid = validateAndWarnEmail(emailInput);

    if (isValid) {
      try {
        const data = {};
        data.email = emailInput.value;
        const response = await requestEmailVerification(JSON.stringify(data));

        if (!response.ok) {
          const error = await response.json();

          if (errorMessages[currentUrl]) {
            const errorMessage = errorMessages[currentUrl](error);

            throw new Error(errorMessage);
          }
        }

        showModalQueue(
          "Success!",
          "A confirmation email has been sent to your email."
        );
      } catch (error) {
        const errorMessage = error.message;

        showModalQueue("An error occurred!", errorMessage);
      }
    }
  });
}
