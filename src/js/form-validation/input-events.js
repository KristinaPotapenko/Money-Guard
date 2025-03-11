import { handleInputValidation } from "./form-validation.js";

const form = document.querySelector(".form-js");

if (form) {
  const inputElements = form.querySelectorAll(".input-js");

  inputElements.forEach((inputElement) => {
    if (inputElement.getAttribute("name") !== "terms") {
      inputElement.addEventListener("focus", () => {
        if (inputElement.nextElementSibling.classList.contains("warn")) {
          inputElement.nextElementSibling.classList.add("visually-hidden");
        }
      });

      inputElement.addEventListener("blur", () => {
        handleInputValidation(inputElement);
      });
    }
  });
}
