const modal = document.querySelector(".modal");

if (modal) {
  const modalButtonClose = document.querySelector(".close-button");

  modalButtonClose.addEventListener("click", closeModal);
}

function getModalElement() {
  return {
    modalTitle: modal.querySelector(".modal__title"),
    modalDescription: modal.querySelector(".modal__description"),
    modalLink: modal.querySelector(".modal__link"),
  };
}

function showModal() {
  modal.classList.remove("visually-hidden-overlay");
}

function closeModal() {
  const modalElement = getModalElement();
  modal.classList.add("visually-hidden-overlay");

  modalElement.modalTitle.innerHTML = "";
  modalElement.modalDescription.innerHTML = "";
  modalElement.modalLink.innerHTML = "";
  modalElement.modalLink.setAttribute("href", "");
}

function showModalInformation(
  title,
  description,
  linkText = null,
  linkHref = null
) {
  const modalElement = getModalElement();
  modalElement.modalTitle.prepend(title);
  modalElement.modalDescription.prepend(description);

  if (linkText) {
    modalElement.modalLink.prepend(linkText);
  }

  if (linkHref) {
    modalElement.modalLink.setAttribute("href", linkHref);
  }
}

const modalQueue = [];
let isModalOpen = false;

export function showModalQueue(
  title,
  message,
  linkText = null,
  linkHref = null
) {
  modalQueue.push({ title, message, linkText, linkHref });

  processQueue();
}

function processQueue() {
  if (isModalOpen || modalQueue.length === 0) return;

  isModalOpen = true;
  const { title, message, linkText, linkHref } = modalQueue.shift();

  showModalInformation(title, message, linkText, linkHref);
  showModal();

  const closeModalButton = document.querySelector(".modal__close-button");

  closeModalButton?.addEventListener(
    "click",
    () => {
      isModalOpen = false;
      processQueue();
    },
    { once: true }
  );
}
