import { getCountry } from "../api/country-api.js";
import { errorMessages } from "../messages/error-messages.js";
import { showModalQueue } from "../components/modal.js";

const countrySelectElements = document.querySelector(".country-list-js");

if (countrySelectElements) {
  populateCountries();
}

async function populateCountries() {
  const currentUrl = window.location.pathname;

  try {
    const response = await getCountry();

    if (!response.ok) {
      const error = await response.json();

      if (errorMessages[currentUrl]) {
        const errorMessage = errorMessages[currentUrl](error);

        throw new Error(errorMessage);
      }
    }

    const country = await response.json();

    for (const key in country) {
      const countryInformation = country[key];
      const countryName = countryInformation.name.common;
      const countrySelectElement = document.createElement("li");
      countrySelectElement.classList.add("select__item");
      countrySelectElement.textContent = countryName;
      countrySelectElements.prepend(countrySelectElement);
    }
  } catch (error) {
    const errorMessage = error.message;
    showModalQueue("An error occurred!", errorMessage);
  }
}
