import { getExpenseCategories } from "../api/categories-api.js";
import { errorMessages } from "../messages/error-messages.js";
import { showModalQueue } from "../components/modal.js";

const categoriesList = document.querySelector(".categories-select-js");

if (categoriesList) {
  populateCountries();
}

async function populateCountries() {
  const currentUrl = document.location.pathname;

  try {
    const response = await getExpenseCategories();

    if (!response.ok) {
      const error = await response.json();

      if (errorMessages[currentUrl]) {
        const erorMessage = errorMessages[currentUrl](error);
        throw new Error(erorMessage);
      }
    }

    const categoriesResponse = await response.json();

    for (let category of categoriesResponse) {
      const categoriesItem = document.createElement("li");
      categoriesItem.classList.add("select__item");
      categoriesItem.innerHTML = category;
      categoriesList.append(categoriesItem);
    }
  } catch (error) {
    const errorMessage = error.message;
    showModalQueue("An error occurred!", errorMessage);
  }
}
