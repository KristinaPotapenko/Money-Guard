const selectsElement = document.querySelectorAll(".select");
let activeSelect = null;

function handleSelectClick(event) {
  selectToggle(event.currentTarget);
}

if (selectsElement) {
  selectsElement.forEach((selectElement) => {
    selectElement.removeEventListener("click", handleSelectClick);
    selectElement.addEventListener("click", handleSelectClick);
  });
}

function selectToggle(selectElement) {
  const selectListElement = selectElement.querySelector(".select__list");

  if (activeSelect && activeSelect !== selectListElement) {
    activeSelect.classList.add("visually-hidden");
  }

  selectListElement.classList.toggle("visually-hidden");

  activeSelect = selectListElement.classList.contains("visually-hidden")
    ? null
    : selectListElement;

  if (activeSelect) {
    Array.from(activeSelect.children).forEach((selectItem) => {
      if (!selectItem.dataset.listenerAdded) {
        selectItem.addEventListener("click", (event) => {
          selectChoose(selectItem, event);
        });
        selectItem.dataset.listenerAdded = "true";
      }
    });
  }
}

function selectChoose(selectItem, event) {
  event.stopPropagation();

  const text = selectItem.innerText;

  const selectCurrent = selectItem
    .closest(".select__list")
    .previousElementSibling.querySelector(".input-js");

  selectCurrent.value = text;

  selectCurrent.dispatchEvent(new Event("change", { bubbles: true }));
  selectItem.parentElement.classList.add("visually-hidden");
  activeSelect = null;
}

document.body.addEventListener("click", function (event) {
  if (!event.target.closest(".select")) {
    document.querySelectorAll(".select__list").forEach((selectListElement) => {
      selectListElement.classList.add("visually-hidden");
    });
    activeSelect = null;
  }
});
