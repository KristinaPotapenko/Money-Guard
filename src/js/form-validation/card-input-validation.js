const cardNumber = document.querySelector(
  ".input-js[name='primary_account_number']"
);

if (cardNumber) {
  cardNumber.addEventListener("input", () => {
    const sanitizedValue = cardNumber.value.replace(/\D/g, "");

    if (/^\d{4,19}$/.test(sanitizedValue)) {
      cardNumber.value = sanitizedValue.replace(/(\d{4})(?=\d)/g, "$1 ");
    } else {
      cardNumber.value = sanitizedValue.slice(0, 16);
    }
  });
}

const dateInput = document.querySelector(".input-expiry-date-js");

if (dateInput) {
  dateInput.addEventListener("input", () => {
    const value = dateInput.value;

    if (value.length === 0) dateInput.value = "";

    switch (value.length) {
      case 1:
        if (!/^[0-1]$/.test(value)) {
          dateInput.value = "";
        }
        break;

      case 2:
        if (!/^(0[1-9]|1[0-2])$/.test(value)) {
          dateInput.value = value[0];
        }
        break;
      case 3:
        if (value[2] !== "/") {
          dateInput.value = value.slice(0, 2);
        }
        break;
      case 4:
      case 5:
      case 6:
      case 7:
        if (!/^((0[1-9]|1[0-2])\/\d{0,4})$/.test(value)) {
          dateInput.value = value.slice(0, -1);
        }
        break;
      default:
        if (value.length > 7) {
          dateInput.value = value.slice(0, 7);
        }
        break;
    }

    let sanitizedValue = dateInput.value.replace(/[^0-9\/]/g, "");

    if (sanitizedValue.indexOf("/") !== 2) {
      sanitizedValue = sanitizedValue.replace(/\//g, "");
    }

    dateInput.value = sanitizedValue;
  });
}
