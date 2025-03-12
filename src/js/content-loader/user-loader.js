import { getUserInformation } from "../api/user-api.js";
import { showModalQueue } from "../components/modal.js";
import { errorMessages } from "../messages/error-messages.js";

const currentUrl = "/" + window.location.pathname.split("/").pop();
const userInformationBlock = document.querySelector(
  ".sidebar__user-information"
);

if (userInformationBlock) {
  populateUserData();
}

async function populateUserData() {
  try {
    const response = await getUserInformation();

    if (!response.ok) {
      if (errorMessages[currentUrl]) {
        const errorMessage = errorMessages[currentUrl](response);

        throw new Error(errorMessage);
      }
    }
    const responseData = await response.json();
    const userElements = getUserDOMElements();

    updateUserDOM(responseData, userElements);
  } catch (error) {
    const errorMessage = error.message;

    showModalQueue("An error occurred!", errorMessage);
  }
}

function getUserDOMElements() {
  return {
    userPhotoElements: document.querySelectorAll(".user-photo-js"),
    userFullNameElement: document.querySelector(".user-name-js"),
    userNameElement: document.querySelector(".input-js[name='name']"),
    userSurnameElement: document.querySelector(".input-js[name='surname']"),
    userProfessionElement: document.querySelector(
      ".input-js[name='profession']"
    ),
    userEmailElement: document.querySelector(".input-js[name='email']"),
    userCountryElement: document.querySelector(".input-js[name='country']"),
    userCityElement: document.querySelector(".input-js[name='city']"),
    userBirthdateElement: document.querySelector(".input-js[name='birthdate']"),
    userGenderElement: document.querySelector(".input-js[name='gender']"),
  };
}

function updateUserDOM(data, elements) {
  elements.userPhotoElements?.forEach((userPhotoElement) =>
    userPhotoElement.setAttribute(
      "src",
      `${
        data["profile_picture"] ?? userPhotoElement.getAttribute("src")
      }?t=${Date.now()}`
    )
  );

  elements.userFullNameElement.innerHTML = `${data.name} ${data.surname}`;
  elements.userNameElement?.setAttribute("value", data.name);
  elements.userSurnameElement?.setAttribute("value", data.surname);
  elements.userProfessionElement?.setAttribute(
    "value",
    data.profession ?? "Profession"
  );
  elements.userEmailElement?.setAttribute("value", data.email);
  elements.userCountryElement?.setAttribute("value", data.country ?? "Country");
  elements.userCityElement?.setAttribute("value", data.city ?? "City");
  elements.userBirthdateElement?.setAttribute(
    "value",
    data.birthdate ? data.birthdate.split("T")[0].split("-").join("-") : ""
  );
  elements.userGenderElement?.setAttribute("value", data.gender ?? "Gender");
}
