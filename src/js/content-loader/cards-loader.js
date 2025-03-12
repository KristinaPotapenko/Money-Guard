import { getCards, getTotalBalance } from "../api/cards-api.js";
import { showModalQueue } from "../components/modal.js";
import { errorMessages } from "../messages/error-messages";

import SimpleBar from "simplebar";
import "simplebar/dist/simplebar.css";

const currentUrl = "/" + window.location.pathname.split("/").pop();

let offset = 0;
const limit = 10;
let isLoading = false;

if (currentUrl === "/cards-information.html") {
  document.addEventListener("DOMContentLoaded", () => {
    window.addEventListener("scroll", handleScroll);
    loadCards();
    loadTotalBalance();
  });
}

if (currentUrl === "/dashboard.html") {
  loadCards(true);
  loadTotalBalance();
}

const monthTotalBalanceElement = document.querySelector(
  ".input-total-balance-js"
);

if (monthTotalBalanceElement) {
  monthTotalBalanceElement.addEventListener("change", () => {
    loadTotalBalance(monthTotalBalanceElement);
  });
}

async function loadTotalBalance(monthElement = null) {
  const totalBalanceAmount = document.querySelector(".total-balance-amount-js");
  const totalBalanceChangeRatio = document.querySelector(
    ".total-balance-change-ratio-js"
  );

  if (totalBalanceAmount) {
    try {
      const monthMap = {
        January: 1,
        February: 2,
        March: 3,
        April: 4,
        May: 5,
        June: 6,
        July: 7,
        August: 8,
        September: 9,
        October: 10,
        November: 11,
        December: 12,
      };
      const monthNumber = monthMap[monthElement?.value] || null;

      const response = await getTotalBalance(monthNumber);

      if (!response.ok) {
        if (errorMessages[currentUrl]) {
          const errorMessage = errorMessages[currentUrl](response);
          throw new Error(errorMessage);
        }
      }

      const totalBalanceData = await response.json();

      totalBalanceAmount.innerHTML = `${totalBalanceData.amount} $`;
      totalBalanceChangeRatio.innerHTML = `${totalBalanceData["change_ratio"]}%`;

      if (totalBalanceData["change_ratio"] < 0) {
        totalBalanceChangeRatio.parentElement.classList.add(
          "financial-blocks__percent-wrapper--withdrawal"
        );
      } else {
        totalBalanceChangeRatio.parentElement.classList.remove(
          "financial-blocks__percent-wrapper--withdrawal"
        );
      }
    } catch (error) {
      let errorMessage = error.message;
      showModalQueue("An error occurred!", errorMessage);
    }
  }
}

function renderCards(cards, scroll) {
  if (cards.length === 0) return;

  const container = document.querySelector(".cards-information__accounts");

  cards.forEach((card) => {
    const cardElement = document.createElement("div");
    cardElement.className = "card";

    if (currentUrl === "/dashboard.html") {
      cardElement.classList.add("card--compact");
    }
    cardElement.innerHTML = `
                <div class="card__header">
                  <div class="card__wrapper">
                    <div class="card__balance">
                      <p class="card__balance-title">Balance</p>
                      <div class="card__balance-wrapper">
                        <p class="card__balance-amount">${card.balance}</p>
                      </div>
                    </div>
                    <svg
                          class="card__payment-system-icon"
                          width="32"
                          height="20"
                          viewBox="0 0 32 20"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <circle cx="22" cy="10" r="10" fill="#707070" />
                          <circle cx="10" cy="10" r="10" fill="#9C9C9C" />
                        </svg>
                  </div>
                  <div class="card__number-wrapper">
                    <p class="card__number">${
                      card["primary_account_number"]
                    }</p>
                  </div>
                </div>
                <div class="card__body">
                  <p class="card__owner">${card.title}</p>
                  <p class="card__expiry-date">${(() => {
                    const date = new Date(card["expiration_date"]);
                    const month = String(date.getMonth() + 1).padStart(2, "0");
                    const year = date.getFullYear();
                    return `${month}/${year}`;
                  })()}</p>
                </div>
      `;
    container.prepend(cardElement);
  });

  if (scroll) {
    container.setAttribute("data-simplebar", "");

    new SimpleBar(container, {
      autoHide: false,
      direction: "rtl",
    });
  }
}

async function loadCards(scroll = false) {
  if (isLoading) return;

  isLoading = true;

  try {
    const response = await getCards(limit, offset);

    if (!response.ok) {
      if (errorMessages[currentUrl]) {
        const errorMessage = errorMessages[currentUrl](response);
        throw new Error(errorMessage);
      }
    }

    const cards = await response.json();
    renderCards(cards, scroll);

    if (cards.length < limit) {
      window.removeEventListener("scroll", handleScroll);
    }

    offset += limit;
    isLoading = false;
  } catch (error) {
    let errorMessage = error.message;
    showModalQueue("An error occurred!", errorMessage);
  }
}

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 10) {
    loadCards();
  }
}
