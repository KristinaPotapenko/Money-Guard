if (document.querySelector(".checkbox")) {
  const checkbox = document.querySelector(".checkbox");
  const checkboxEmulator = checkbox.querySelector(".checkbox__emulator");
  const inputCheckbox = checkboxEmulator.previousElementSibling;
  const currentCheckbox = checkboxEmulator.firstElementChild;

  checkboxEmulator.addEventListener("click", () => {
    if (currentCheckbox.classList.contains("visually-hidden")) {
      currentCheckbox.classList.remove("visually-hidden");
      inputCheckbox.setAttribute("checked", "");
    } else {
      currentCheckbox.classList.add("visually-hidden");
      inputCheckbox.removeAttribute("checked");
    }
  });
}

export function removeCheckbox() {
  if (document.querySelector(".checkbox")) {
    const checkbox = document.querySelector(".checkbox");
    const checkboxEmulator = checkbox.querySelector(".checkbox__emulator");
    const inputCheckbox = checkboxEmulator.previousElementSibling;
    const currentCheckbox = checkboxEmulator.firstElementChild;

    currentCheckbox.classList.add("visually-hidden");
    inputCheckbox.removeAttribute("checked");
  }
}
