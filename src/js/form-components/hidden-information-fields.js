const cvvBlock = document.querySelector(".cvv-block-js");

let visibilityCvvInformation = false;

const balanceBlock = document.querySelector(".card-form__balance");

let visibilityBalanceInformation = false;

if (cvvBlock) {
  const cvvInput = cvvBlock.querySelector(".cvv-input-js");

  if (cvvInput) {
    cvvInput.addEventListener("input", () =>
      handleInputChange(cvvBlock, cvvInput, visibilityCvvInformation)
    );

    cvvInput.addEventListener("click", () => trackCursor(cvvInput, cvvBlock));
    cvvInput.addEventListener("keydown", () => trackCursor(cvvInput, cvvBlock));
    cvvInput.addEventListener("keyup", () => trackCursor(cvvInput, cvvBlock));
  }

  const hidingCvvBlock = cvvBlock.querySelector(".hidden-information");

  if (hidingCvvBlock) {
    hidingCvvBlock.addEventListener("click", () => {
      cvvInput.focus();
    });
  }

  const toggleCvvElement = cvvBlock.querySelector(".toggle-visibility");

  toggleCvvElement.addEventListener("click", () => {
    visibilityCvvInformation = toggleInformation(cvvBlock);

    cvvInput.focus();
  });
}

if (balanceBlock) {
  const balanceInput = balanceBlock.querySelector(".card-form__balance-input");

  if (balanceInput) {
    balanceInput.addEventListener("input", () => {
      handleInputChange(
        balanceBlock,
        balanceInput,
        visibilityBalanceInformation
      );
    });

    balanceInput.addEventListener("click", () =>
      trackCursor(balanceInput, balanceBlock)
    );
    balanceInput.addEventListener("keydown", () =>
      trackCursor(balanceInput, balanceBlock)
    );
    balanceInput.addEventListener("keyup", () =>
      trackCursor(balanceInput, balanceBlock)
    );
  }

  const hidingBalanceBlock = balanceBlock.querySelector(".hidden-information");

  if (hidingBalanceBlock) {
    hidingBalanceBlock.addEventListener("click", () => {
      balanceInput.focus();
    });
  }

  const toggleBalanceElement = balanceBlock.querySelector(".toggle-visibility");

  toggleBalanceElement.addEventListener("click", () => {
    visibilityBalanceInformation = toggleInformation(balanceBlock);

    balanceInput.focus();
  });
}

function handleInputChange(informationBlock, input, visibilityInformation) {
  const currentValue = input.value;

  let reg;

  if (input.getAttribute("name") === "balance") {
    reg = /^[1-9]\d*(\.\d{0,2})?$/;
  } else if (input.getAttribute("name") === "card_verification_value") {
    reg = /^\d{1,3}$/;
  }

  if (reg.test(currentValue)) {
    if (visibilityInformation) {
      showInformation(informationBlock);
    } else {
      hideInformation(informationBlock);
    }

    addInformation(input, currentValue, informationBlock);
  } else if (currentValue === "") {
    showInformation(informationBlock);
    addInformation(input, currentValue, informationBlock);
  } else {
    let sanitizedValue;

    if (input.getAttribute("name") === "balance") {
      sanitizedValue = currentValue.replace(/[^0-9.]/g, "");

      if (sanitizedValue.startsWith(".")) {
        sanitizedValue = "0" + sanitizedValue;
      }

      sanitizedValue = sanitizedValue.replace(/\.(?=.*\.)/g, "");
      sanitizedValue = sanitizedValue.replace(/(\.\d{2})\d+/g, "$1");
    } else if (input.getAttribute("name") === "card_verification_value") {
      sanitizedValue = currentValue.replace(/[^0-9]/g, "");
    }

    input.value = sanitizedValue;
    addInformation(input, sanitizedValue, informationBlock);
  }
}

function showInformation(informationBlock) {
  const hidingBlock = informationBlock.querySelector(".hidden-information");
  hidingBlock.classList.add("visually-hidden");
}

function hideInformation(informationBlock) {
  const hidingBlock = informationBlock.querySelector(".hidden-information");

  hidingBlock.classList.remove("visually-hidden");
}

function addInformation(input, currentValue, informationBlock) {
  const hidingValue = informationBlock.querySelector(
    ".hidden-information-text"
  );
  trackCursor(input, informationBlock);

  const message = "X".repeat(currentValue.length);
  hidingValue.innerHTML = message;
}

export function trackCursor(input, informationBlock) {
  const hidingBlock = informationBlock.querySelector(".hidden-information");
  const cursorPosition = input.selectionStart * 11;

  hidingBlock.style.setProperty("--cursor-position", `${cursorPosition}px`);
  input.focus();

  return cursorPosition;
}

function toggleInformation(informationBlock) {
  const hidingBlock = informationBlock.querySelector(".hidden-information");
  const hidingValue = informationBlock.querySelector(
    ".hidden-information-text"
  );

  if (
    hidingBlock.classList.contains("visually-hidden") &&
    hidingValue.textContent
  ) {
    hidingBlock.classList.remove("visually-hidden");
    return false;
  } else {
    hidingBlock.classList.add("visually-hidden");
    return true;
  }
}
