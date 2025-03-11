export function handleInputValidation(input) {
  const inputName = input.getAttribute("name");

  if (inputName === "email") {
    const isValid = validateAndWarnEmail(input);

    return isValid;
  } else if (inputName === "password") {
    const isValid = validateAndWarnPassword(input);

    return isValid;
  } else if (inputName === "name" || inputName === "surname") {
    const isValid = validateAndWarnName(input);

    return isValid;
  } else if (inputName === "terms") {
    const isValid = validateAndWarnTerms(input);

    return isValid;
  } else if (inputName === "security_code") {
    const isValid = validateAndWarnCode(input);

    return isValid;
  } else if (inputName === "new_password") {
    const isValid = validateAndWarnNewPassword(input);

    return isValid;
  } else if (
    inputName === "profession" ||
    inputName === "country" ||
    inputName === "city" ||
    inputName === "gender" ||
    inputName === "birthdate" ||
    inputName === "profile_picture"
  ) {
    const isValid = validateAndWarnUserDetails();

    return isValid;
  } else if (inputName === "balance") {
    const isValid = validateAndWarnCardBalance(input);

    return isValid;
  } else if (inputName === "primary_account_number") {
    const isValid = validateAndWarnCardNumber(input);

    return isValid;
  } else if (inputName === "expiration_date") {
    const isValid = validateAndWarnExpirationDate(input);

    return isValid;
  } else if (inputName === "title") {
    const isValid = validateAndWarnOwner(input);

    return isValid;
  } else if (inputName === "card_verification_value") {
    const isValid = validateAndWarnCardVerificationValue(input);

    return isValid;
  } else if (inputName === "sender_recipient") {
    const isValid = validateAndWarnSenderRecipient(input);

    return isValid;
  } else if (inputName === "amount") {
    const isValid = validateAndWarnAmount(input);

    return isValid;
  } else if (inputName === "type") {
    const isValid = validateAndWarnTransactionType(input);

    return isValid;
  } else if (inputName === "category") {
    const isValid = validateAndWarnAccountDetails();

    return isValid;
  }
}

function updateWarning(input, isValid, message) {
  const warnElement = input.nextElementSibling;

  const warnTextElement = warnElement.querySelector(".warn--message");

  if (isValid) {
    warnElement.classList.add("visually-hidden");
  } else {
    warnTextElement.innerHTML = message;
    warnElement.classList.remove("visually-hidden");
  }
}

export function validateAndWarnEmail(input) {
  const isValid = validateEmail(input.value);
  const warnMessage = "Enter your e-mail in this format simple@example.com";
  updateWarning(input, isValid, warnMessage);

  return isValid;
}

function validateAndWarnPassword(input) {
  const isValid = validatePassword(input.value);
  const warnMessage =
    "Enter a password with at least 8 characters, including uppercase, lowercase, and a number.";
  updateWarning(input, isValid, warnMessage);

  return isValid;
}

function validateAndWarnName(input) {
  const isValid = validateName(input.value);
  const warnMessage = "Please enter a valid value containing only letters.";
  updateWarning(input, isValid, warnMessage);

  return isValid;
}

function validateAndWarnTerms(input) {
  const isValid = input.hasAttribute("checked");
  const warnMessage = "The checkbox must be selected.";
  updateWarning(input.parentElement, isValid, warnMessage);

  return isValid;
}

function validateAndWarnCode(input) {
  const isValid = validateCode(input.value);
  const warnMessage = "Please enter a valid value containing exactly 6 digits.";
  updateWarning(input, isValid, warnMessage);

  return isValid;
}

function validateAndWarnNewPassword(input) {
  const isValid = validateNewPassword(input);
  const warnMessage = "Passwords don`t match.";
  updateWarning(input, isValid, warnMessage);

  return isValid;
}

function validateAndWarnUserDetails() {
  return true;
}

function validateAndWarnAccountDetails() {
  return true;
}

function validateAndWarnCardBalance(input) {
  const isValid = validateCardBalance(input.value);
  const warnMessage = "The balance field must be filled in the format 128.5";
  updateWarning(input, isValid, warnMessage);

  return isValid;
}

function validateAndWarnCardNumber(input) {
  const isValid = validateCardNumber(input.value);
  const warnMessage = "The card number must consist of exactly 16 digits.";
  updateWarning(input, isValid, warnMessage);

  return isValid;
}

function validateAndWarnExpirationDate(input) {
  const isValid = validateExpirationDate(input.value);
  const warnMessage =
    "Expiration date must be in MM/YY format and not earlier than the current month/year.";
  updateWarning(input, isValid, warnMessage);

  return isValid;
}

function validateAndWarnOwner(input) {
  const isValid = validateOwner(input.value);
  const warnMessage =
    "The owner's name must be filled in and contain only letters and spaces.";
  updateWarning(input, isValid, warnMessage);

  return isValid;
}

function validateAndWarnCardVerificationValue(input) {
  const isValid = validateCardVerificationValue(input.value);
  const warnMessage =
    "The CVV field must consist of exactly 3 digits, e.g., 586";
  updateWarning(input, isValid, warnMessage);

  return isValid;
}

function validateAndWarnSenderRecipient(input) {
  const isValid = validateSenderRecipient(input.value);
  const warnMessage = "This field cannot be empty.";
  updateWarning(input, isValid, warnMessage);

  return isValid;
}

function validateAndWarnAmount(input) {
  const isValid = validateAmount(input.value);
  const warnMessage = "This field cannot be empty.";
  updateWarning(input, isValid, warnMessage);

  return isValid;
}

function validateAndWarnTransactionType(input) {
  const isValid = validateTransactionType(input.value);
  const warnMessage = "Please select a transaction type.";
  updateWarning(input, isValid, warnMessage);

  return isValid;
}

function validateEmail(email) {
  if (email.length === 0) {
    return false;
  } else {
    const reg =
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;

    return reg.test(String(email).toLowerCase());
  }
}

function validatePassword(password) {
  if (password.length === 0) {
    return false;
  } else {
    const reg = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;

    return reg.test(String(password));
  }
}

function validateName(name) {
  if (name.length === 0) {
    return false;
  } else {
    const reg = /^[A-Za-zА]+$/;

    return reg.test(String(name).toLowerCase());
  }
}

function validateCode(code) {
  if (code.length === 0) {
    return false;
  } else {
    const reg = /^\d{6}$/;

    return reg.test(code);
  }
}

function validateNewPassword(input) {
  const firstPasswordElement =
    input.parentElement.previousElementSibling.firstElementChild;

  const firstPassword = firstPasswordElement.value;
  const secondPassword = input.value;

  if (firstPassword !== secondPassword || secondPassword.length === 0) {
    return false;
  } else {
    return true;
  }
}

function validateCardBalance(value) {
  if (value.length === 0) {
    return false;
  } else {
    const reg = /^[0-9]\d*(\.\d{1,2})?$/;

    return reg.test(value);
  }
}

function validateCardNumber(value) {
  if (value.length === 0) {
    return false;
  } else {
    const sanitizedValue = value.replace(/[^0-9]/g, "");
    const reg = /^\d{16}$/;

    return reg.test(sanitizedValue);
  }
}

function validateExpirationDate(value) {
  if (value.length === 0) {
    return false;
  } else {
    const reg = /^(0[1-9]|1[0-2])\/(\d{4})$/;

    if (!reg.test(value)) return false;

    const [, month, year] = value.match(reg);

    const currentDate = new Date();
    const currentMonth = currentDate.getMonth() + 1;
    const currentYear = currentDate.getFullYear();

    if (year < currentYear || (year === currentYear && month < currentMonth)) {
      return false;
    }

    return true;
  }
}

function validateOwner(value) {
  if (value.length === 0) {
    return false;
  } else {
    const reg = /^[a-zA-Zа-яА-Я\s]+$/;

    return reg.test(value.trim());
  }
}

function validateCardVerificationValue(value) {
  if (value.length === 0) {
    return false;
  } else {
    const reg = /^\d{3}$/;

    return reg.test(value);
  }
}

function validateSenderRecipient(value) {
  if (value.length === 0) {
    return false;
  } else {
    return true;
  }
}

function validateAmount(value) {
  if (value.length === 0) {
    return false;
  } else {
    return true;
  }
}

function validateTransactionType(value) {
  if (value.length === 0) {
    return false;
  } else {
    return true;
  }
}
