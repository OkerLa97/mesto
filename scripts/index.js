import { Card } from './Card.js';
import { FormValidator } from './FormValidator.js';

import { initialCards } from './constants.js';

// 2. Поиск элементов по ДОМ

// Секция елементов карточек
const elements = document.querySelector(".elements");

// Кнопка редактирования профайла
const profileEditButton = document.querySelector('#profile__edit-button');

// Попап редактирования профайла
const editProfilePopup = document.querySelector('#edit-profile-popup')

// Форма редактирования профайла в попапе
const editProfileForm = document.querySelector("#edit-profile_form");
const editProfileNameInput = document.querySelector('#edit-profile-name-input');
const editProfileJobInput = document.querySelector('#edit-profile-job-input');

// Элементы профайл загаловка и текста на странице
const profileTitle = document.querySelector('#profile-title');
const profileText = document.querySelector('#profile__text');

// Кнопка добавления места
const addNewPlaceBtn = document.querySelector(".profile__add-button");

// Попап добавления места
const newPlacePopUp = document.querySelector("#new-place-popup");

// Форма добавления места в попапе
const newPlaceForm = document.querySelector("#new-place-popup-form");
const newPlaceNameInput = document.querySelector("#new-place-name-input");
const newPlaceLinkInput = document.querySelector("#new-place-link-input");

// Попап изображения
const popupImage = document.querySelector("#popup-image");
const popupImageImage = document.querySelector("#popup-image-image");
const popupImageName = document.querySelector("#popup-image-name");

// 3. Регистрирование событий и обработка
// Клик по кнопке редактировать профайл
profileEditButton.addEventListener("click", handleProfileEditButtonClick);
function handleProfileEditButtonClick() {
  // Заполняем поля формы данными из профайла
  editProfileNameInput.value = profileTitle.textContent;
  editProfileJobInput.value = profileText.textContent;
  openPopup(editProfilePopup);
}

// Клик по кнопкам закрытия попапа
const closeButtons = document.querySelectorAll(".popup__close-button");
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");
  button.addEventListener("click", event => {
    closePopup(popup);
  });
});

// Клик по оверлею для закрытия попапа
const popupOverlays = document.querySelectorAll(".popup__overlay");
popupOverlays.forEach((overlay) => {
  overlay.addEventListener("click", event => {
    const popup = event.target.closest(".popup");
    closePopup(popup);
  });
});

// Отправка формы редактирования профайла
//- БЕРЁТ значения из первого и второго инпута и встовляет значения
// в соответствующие html елементы - profile__info , profile__title
editProfileForm.addEventListener('submit', handleEditProfileFormSubmit);
function handleEditProfileFormSubmit(event) {

  event.preventDefault();

  const profileName = editProfileNameInput.value;
  profileTitle.textContent = profileName;

  const profileJob = editProfileJobInput.value;
  profileText.textContent = profileJob;

  closePopup(editProfilePopup);
}

// Клик по кнопке добавить место
addNewPlaceBtn.addEventListener("click", handleAddNewPlaceBtnClick);
function handleAddNewPlaceBtnClick() {
  openPopup(newPlacePopUp);
}

// Отправка формы добавления места
newPlaceForm.addEventListener("submit", handleNewPlaceFormSubmit);
function handleNewPlaceFormSubmit(event) {
  event.preventDefault();
  const card = new Card({name:newPlaceNameInput.value, link:newPlaceLinkInput.value}, "#card-template");
  const workingCard = card.generateCard();
  insertCardIntoElementsBeforeAll(workingCard);
  closePopup(newPlacePopUp);
  event.target.reset();
  newPlaceFormValidator.resetValidation();
}

// 3. Вспомогательные функции

// Колбэк функция для открытия изображения
function handleOpenImagePopup(name, link) {
  popupImageImage.src = link;
  popupImageImage.alt = name;
  popupImageName.textContent = name;
  openPopup(popupImage);
}

// Функции для открытия и закрытия попапов
function closePopup(popup) {
  popup.classList.remove("popup_open");
  // удаляем слушатель на Esc
  document.removeEventListener("keydown", handleEscClose);
}

function openPopup(popup) {
  popup.classList.add("popup_open");
  // добавляем слушатель на Esc
  document.addEventListener("keydown", handleEscClose);
}

// Функция закрытия попапа по Esc
function handleEscClose(event) {
  if (event.key === "Escape") {
    const openedPopup = document.querySelector(".popup_open");
    closePopup(openedPopup);
  }
}

// функция для вставки карточки в начало списка
function insertCardIntoElementsBeforeAll(card) {
  elements.prepend(card);
}

// Функция для вставки карточки в конец списка
function insertCardIntoElementsAfterAll(card) {
  elements.append(card);
}

// 4. Создание карточки
function createCard(item) {
  const card = new Card(item, "#card-template", handleOpenImagePopup);
  return card.generateCard();
}

// 4. Стартуем
// Добавляем карточки из стандартного массива
initialCards.forEach( item => {
  const workingCard = createCard(item);
  insertCardIntoElementsAfterAll(workingCard);
});

// Запускаем валидацию форм
const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
}

const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
editProfileFormValidator.enableValidation();

const newPlaceFormValidator = new FormValidator(validationConfig, newPlaceForm);
newPlaceFormValidator.enableValidation();