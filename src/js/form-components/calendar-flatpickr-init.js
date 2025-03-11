import flatpickr from "flatpickr";
import "flatpickr/dist/flatpickr.min.css";

document.addEventListener("DOMContentLoaded", () => {
  const inputDate = document.querySelector(".input-date-js");

  flatpickr(".input-date-js", {
    dateFormat: "Y-m-d",
    minDate: "1920-01-01",
    maxDate: "today",
    disableMobile: true,
    onReady: () => {
      if (!inputDate.hasAttribute("name")) {
        inputDate.setAttribute("name", `birthdate`);
      }
    },
  });
});
