import { errorMessages } from "../messages/error-messages.js";
import { getCardInformation } from "../api/account-api.js";
import { showModalQueue } from "../components/modal.js";
import {
  setLocalStorageItem,
  getLocalStorageItem,
} from "../local-storage-utils/local-storage-utils.js";
import {
  getCurrentAccountIncome,
  getCurrentAccountExpense,
} from "../api/account-api.js";
import {
  getTransactionInformation,
  getAllTransactionInformation,
} from "../api/transaction-api.js";

import SimpleBar from "simplebar";
import "simplebar/dist/simplebar.css";

const container = document.querySelector(".cards-information__accounts");
const transactionsList = document.querySelector(".transactions__list");
const currentUrl = "/" + window.location.pathname.split("/").pop();

if (container) {
  container.addEventListener("click", (event) => {
    const card = event.target.closest(".card");

    if (card) {
      const cardNumber = card.querySelector(".card__number");
      setLocalStorageItem("card_number", cardNumber.textContent);
      window.location.href = `${window.origin}/card-information.html`;
    }
  });
}

if (
  currentUrl === "/card-information.html" &&
  getLocalStorageItem("card_number")
) {
  const cardNumber = getLocalStorageItem("card_number");
  loadCardInformation(cardNumber);
  loadOperationData("income");
  loadOperationData("expense");
}

let offset = 0;
const limit = 15;
let isLoading = false;

if (transactionsList) {
  window.addEventListener("scroll", handleScroll);
  loadTransactionInformation();
}

const monthIncomeElement = document.querySelector(".input-income-js");
const monthExpenseElement = document.querySelector(".input-expense-js");

if (monthIncomeElement) {
  monthIncomeElement.addEventListener("change", () =>
    loadOperationData("income", monthIncomeElement)
  );
}

if (monthExpenseElement) {
  monthExpenseElement.addEventListener("change", () =>
    loadOperationData("expense", monthExpenseElement)
  );
}

async function loadOperationData(typeOperation, monthElement = null) {
  const cardNumber = getLocalStorageItem("card_number");

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

    const fetchFunction =
      typeOperation === "income"
        ? getCurrentAccountIncome
        : getCurrentAccountExpense;

    const response = await fetchFunction(cardNumber, monthNumber);

    if (!response.ok) {
      if (errorMessages[currentUrl]) {
        const errorMessage = errorMessages[currentUrl](response);

        throw new Error(errorMessage);
      }
    }

    const operationData = await response.json();

    typeOperation === "income"
      ? renderIncomeBlock(operationData)
      : renderExpenseBlock(operationData);
  } catch (error) {
    const errorMessage = error.message;

    showModalQueue("An error occurred!", errorMessage);
  }
}

async function loadCardInformation(cardNumber) {
  try {
    const response = await getCardInformation(cardNumber);

    if (!response.ok) {
      if (errorMessages[currentUrl]) {
        const errorMessage = errorMessages[currentUrl](response);

        throw new Error(errorMessage);
      }
    }

    const cardData = await response.json();

    renderCard(cardData);
  } catch (error) {
    const errorMessage = error.message;

    showModalQueue("An error occurred!", errorMessage);
  }
}

async function loadTransactionInformation() {
  if (isLoading) return;

  isLoading = true;

  const cardNumber = getLocalStorageItem("card_number");

  try {
    let response;
    if (currentUrl === "/transactions.html") {
      response = await getAllTransactionInformation(limit, offset);
    } else if (currentUrl === "/dashboard.html") {
      response = await getAllTransactionInformation(5, 0);
    } else {
      response = await getTransactionInformation(cardNumber);
    }

    if (!response.ok) {
      if (errorMessages[currentUrl]) {
        const errorMessage = errorMessages[currentUrl](response);

        throw new Error(errorMessage);
      }
    }

    const transactionsData = await response.json();
    renderTransaction(transactionsData);

    if (transactionsData.length < limit) {
      window.removeEventListener("scroll", handleScroll);
    }

    offset += limit;
  } catch (error) {
    let errorMessage = error.message;

    showModalQueue("An error occurred!", errorMessage);
  } finally {
    isLoading = false;
  }
}

function renderIncomeBlock(data) {
  const financialAmount = document.querySelector(".income-amount-js");
  const financialChangeRatio = document.querySelector(
    ".income-change-ratio-js"
  );

  financialAmount.innerHTML = `${data.amount} $`;
  financialChangeRatio.innerHTML = `${data["change_ratio"]}%`;

  if (data["change_ratio"] < 0) {
    financialChangeRatio.parentElement.classList.add(
      "financial-blocks__percent-wrapper--withdrawal"
    );
  } else {
    financialChangeRatio.parentElement.classList.remove(
      "financial-blocks__percent-wrapper--withdrawal"
    );
  }
}

function renderExpenseBlock(data) {
  const financialAmount = document.querySelector(".expense-amount-js");
  const financialChangeRatio = document.querySelector(
    ".expense-change-ratio-js"
  );

  financialAmount.innerHTML = `${data.amount} $`;
  financialChangeRatio.innerHTML = `${data["change_ratio"]}%`;

  if (data["change_ratio"] < 0) {
    financialChangeRatio.parentElement.classList.add(
      "financial-blocks__percent-wrapper--withdrawal"
    );
  } else {
    financialChangeRatio.parentElement.classList.remove(
      "financial-blocks__percent-wrapper--withdrawal"
    );
  }
}

function renderCard(card) {
  const containerCard = document.querySelector(".card-information-js");

  const cardElement = document.createElement("div");
  cardElement.className = "card-information__wrapper";
  cardElement.innerHTML = `
  <div class="card card--automatic">
                  <div class="card__front">
                    <div class="card__header">
                      <div class="card__wrapper">
                        <div class="card__balance">
                          <p class="card__balance-title">Balance</p>
                          <div class="card__balance-wrapper">
                            <div class="information-block-js">
                              <p class="card__balance-amount data-simplebar">${
                                card.balance
                              }</p>
                              <div
                                class="card__hidden-information hidden-information"
                              >
                                <p class="hidden-information-text">XXX</p>
                              </div>
                            </div>

                            <div
                              class="card__toggle-visibility toggle-visibility"
                            >
                              <svg
                                width="12"
                                height="12"
                                viewBox="0 0 12 12"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <g clip-path="url(#clip0_1_65)">
                                  <path
                                    d="M6.69727 2.73517C6.46836 2.71041 6.23577 2.69622 6 2.69269C4.96975 2.69726 3.90177 2.94786 2.89087 3.42805C2.14029 3.79927 1.40914 4.32334 0.77417 4.96979C0.46232 5.29979 0.06431 5.77761 0 6.28741C0.0076 6.72903 0.48153 7.27411 0.77417 7.60505C1.3696 8.22611 2.08171 8.73518 2.89087 9.14679C2.91837 9.16014 2.94597 9.17333 2.97363 9.18634L2.22291 10.4974L3.24296 11.1002L8.75712 1.49989L7.77526 0.899811L6.69727 2.73517ZM9.02563 3.38996L8.27636 4.68853C8.62106 5.13635 8.82568 5.68859 8.82568 6.28741C8.82568 7.77998 7.56046 8.99005 5.99926 8.99005C5.93177 8.99005 5.86636 8.98277 5.80004 8.97833L5.30419 9.83673C5.53287 9.86122 5.76409 9.87906 5.99999 9.88214C7.03122 9.87751 8.0986 9.62402 9.10839 9.14679C9.85897 8.77557 10.5908 8.2515 11.2258 7.60505C11.5377 7.27506 11.9357 6.79723 12 6.28741C11.9924 5.8458 11.5185 5.30072 11.2258 4.96978C10.6304 4.34872 9.91755 3.83965 9.10839 3.42803C9.08108 3.41479 9.05312 3.40288 9.02563 3.38996ZM5.99927 3.58479C6.06773 3.58479 6.13565 3.58753 6.20288 3.59211L5.62207 4.59772C4.80693 4.76298 4.19531 5.45652 4.19531 6.28669C4.19531 6.49523 4.23372 6.69488 4.30444 6.87994C4.30452 6.88015 4.30436 6.88047 4.30444 6.88068L3.72216 7.88922C3.37665 7.44099 3.17284 6.88693 3.17284 6.2874C3.17285 4.79485 4.43808 3.58478 5.99927 3.58479ZM7.68896 5.70514L6.38013 7.97272C7.19089 7.80435 7.7981 7.11397 7.7981 6.28669C7.7981 6.08195 7.75724 5.8873 7.68896 5.70514Z"
                                    fill="#F8F8F8"
                                  />
                                </g>
                                <defs>
                                  <clipPath id="clip0_1_65">
                                    <rect width="12" height="12" fill="white" />
                                  </clipPath>
                                </defs>
                              </svg>
                            </div>
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
                      <div class="card__body">
                        <div class="card__number-wrapper">
                          <div class="hidden-block-js">
                            <p class="card__number">${
                              card.primary_account_number
                            }</p>
                            <div
                              class="card__hidden-information hidden-information"
                            >
                              <p class="hidden-information-text">
                                XXXXXXXXXXXX
                              </p>
                            </div>
                          </div>
                          <div
                            class="card__toggle-visibility toggle-visibility"
                          >
                            <svg
                              width="12"
                              height="12"
                              viewBox="0 0 12 12"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <g clip-path="url(#clip0_1_65)">
                                <path
                                  d="M6.69727 2.73517C6.46836 2.71041 6.23577 2.69622 6 2.69269C4.96975 2.69726 3.90177 2.94786 2.89087 3.42805C2.14029 3.79927 1.40914 4.32334 0.77417 4.96979C0.46232 5.29979 0.06431 5.77761 0 6.28741C0.0076 6.72903 0.48153 7.27411 0.77417 7.60505C1.3696 8.22611 2.08171 8.73518 2.89087 9.14679C2.91837 9.16014 2.94597 9.17333 2.97363 9.18634L2.22291 10.4974L3.24296 11.1002L8.75712 1.49989L7.77526 0.899811L6.69727 2.73517ZM9.02563 3.38996L8.27636 4.68853C8.62106 5.13635 8.82568 5.68859 8.82568 6.28741C8.82568 7.77998 7.56046 8.99005 5.99926 8.99005C5.93177 8.99005 5.86636 8.98277 5.80004 8.97833L5.30419 9.83673C5.53287 9.86122 5.76409 9.87906 5.99999 9.88214C7.03122 9.87751 8.0986 9.62402 9.10839 9.14679C9.85897 8.77557 10.5908 8.2515 11.2258 7.60505C11.5377 7.27506 11.9357 6.79723 12 6.28741C11.9924 5.8458 11.5185 5.30072 11.2258 4.96978C10.6304 4.34872 9.91755 3.83965 9.10839 3.42803C9.08108 3.41479 9.05312 3.40288 9.02563 3.38996ZM5.99927 3.58479C6.06773 3.58479 6.13565 3.58753 6.20288 3.59211L5.62207 4.59772C4.80693 4.76298 4.19531 5.45652 4.19531 6.28669C4.19531 6.49523 4.23372 6.69488 4.30444 6.87994C4.30452 6.88015 4.30436 6.88047 4.30444 6.88068L3.72216 7.88922C3.37665 7.44099 3.17284 6.88693 3.17284 6.2874C3.17285 4.79485 4.43808 3.58478 5.99927 3.58479ZM7.68896 5.70514L6.38013 7.97272C7.19089 7.80435 7.7981 7.11397 7.7981 6.28669C7.7981 6.08195 7.75724 5.8873 7.68896 5.70514Z"
                                  fill="#F8F8F8"
                                />
                              </g>
                              <defs>
                                <clipPath id="clip0_1_65">
                                  <rect width="12" height="12" fill="white" />
                                </clipPath>
                              </defs>
                            </svg>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="card card--automatic">
                  <div class="card__back">
                    <div class="card__header">
                      <div class="card__wrapper">
                        <p class="card__expiry-date">${(() => {
                          const date = new Date(card.expiration_date);
                          const month = String(date.getMonth() + 1).padStart(
                            2,
                            "0"
                          );
                          const year = date.getFullYear();
                          return `${month}/${year}`;
                        })()}</p>
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
                    </div>
                    <div class="card__body">
                      <p class="card__owner card__owner--decoration">
                      ${card.title}
                      </p>
                    </div>
                  </div>
                </div>
    `;

  containerCard.prepend(cardElement);

  const balanceElement = document.querySelector(".card__balance-amount");

  if (balanceElement) {
    new SimpleBar(balanceElement, {
      autoHide: false,
      direction: "rtl",
    });
  }
}

function renderTransaction(transactions) {
  if (!transactions) return;

  transactions.forEach((item) => {
    const transaction = document.createElement("li");
    transaction.classList.add("transactions__item");
    transaction.classList.add("transactions__item--bold");

    let amountStatus =
      item.amount >= 0
        ? (amountStatus = "transactions__text--recharge")
        : (amountStatus = "transactions__text--withdrawal");

    transaction.innerHTML = `
         <p class="transactions__text transactions__text--big">
                        ${item.sender_recipient}
                      </p>
                      <p class="transactions__text transactions__text--big">
                      ${item.category}
                      </p>
                      <p class="transactions__text transactions__text--big">
                      ${item.timestamp
                        .split("T")[0]
                        .split("-")
                        .reverse()
                        .join("-")}
                      </p>
                      <p
                        class="transactions__text transactions__text--big ${amountStatus}"
                      >
                      ${item.amount} $
                      </p>
        `;

    transactionsList.append(transaction);
  });
}

function handleScroll() {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 15) {
    loadTransactionInformation();
  }
}
