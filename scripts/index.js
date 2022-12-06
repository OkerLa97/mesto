// 1. Стагдартные значения (Конфигурация)
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

// Стандартное изображение в случае если ссылка не правильная или возникла ошибка
const imageErrorSource = "https://images.unsplash.com/photo-1525785967371-87ba44b3e6cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80";
const imageErrorAlt = "Изображение не загрузилось";

// 2. Поиск элементов по ДОМ

// Темлейт карточки
const cardTemplate = document.getElementById("card-template").content;
const element = cardTemplate.querySelector(".element");

// Секция елементов карточек
const elements = document.querySelector(".elements");

// Кнопка редактирования профайла
const profileEditButton = document.getElementById('profile__edit-button');

// Попап редактирования профайла
const editProfilePopupCloseButton = document.getElementById('edit-profile-popup-close-button');
const editProfilePopup = document.getElementById('edit-profile-popup')

// Форма редактирования профайла в попапе
const editProfileForm = document.getElementById("edit-profile_form");
const editProfileNameInput = document.getElementById('edit-profile_name_input');
const editProfileJobInput = document.getElementById('edit-profile-job-input');

// Элементы профайл загаловка и текста на странице
const profileTitle = document.getElementById('profile-title');
const profileText = document.getElementById('profile__text');

// Кнопка добавления места
const addNewPlaceBtn = document.querySelector(".profile__add-button");

// Попап добавления места
const newPlacePopUp = document.querySelector("#new-place-popup");
const newPlacePopUpCloseBtn = document.querySelector("#new-place-popup-close-button");

// Форма добавления места в попапе
const newPlaceForm = document.querySelector("#new-place-popup-form");
const newPlaceNameInput = document.querySelector("#new-place-name-input");
const newPlaceLinkInput = document.querySelector("#new-place-link-input");

// Попап изображения
const popupImage = document.querySelector("#popup-image");
const popupImageCloseBtn = document.querySelector("#popup-image-close-button");
const popupImageImage = document.querySelector("#popup-image-image");
const popupImageName = document.querySelector("#popup-image-name");

// 3. Регистрирование событий и обработка

// Клик по кнопке редактировать профайл
profileEditButton.addEventListener("click", handleProfileEditButtonClick);
function handleProfileEditButtonClick() {;
  openPopup(editProfilePopup);
}

// Клик по кнопке закрытия попапа добавления места
newPlacePopUpCloseBtn.addEventListener("click", handleNewPlacePopUpCloseBtn);
function handleNewPlacePopUpCloseBtn(){
  closePopup(newPlacePopUp);
}

// Клик по кнопкам закрытия попапа
const closeButtons = document.querySelectorAll(".popup__close-button");
closeButtons.forEach((button) => {
  const popup = button.closest(".popup");   // 1 раз находим попап (а не при каждом клике)
  button.addEventListener("click", event => {
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
  const newCard = createCard(newPlaceNameInput.value, newPlaceLinkInput.value);
  insertCardIntoElementsBefore(newCard);
  closePopup(newPlacePopUp);
  event.target.reset();
}

// Обработка ошибки загрузки изображения
popupImageImage.addEventListener("error", handleImagePopupError);
function handleImagePopupError(event) {
  const target = event.target;
  target.src = imageErrorSource;
  target.alt = imageErrorAlt;
}

// 3. Вспомогательные функции

// Функции для открытия и закрытия попапов
function closePopup(popup) {
  popup.classList.remove("popup_open");
}

function openPopup(popup) {
  popup.classList.add("popup_open");
}

// функция для вставки карточки в начало списка
function insertCardIntoElementsBefore(card) {
  elements.prepend(card);
}

// Функция для вставки карточки в конец списка
function insertCardIntoElementsAfter(card) {
  elements.append(card);
}

// Функция создания карточки
function createCard(name, link){

  const elementCopy = element.cloneNode(true);

  // Добавление картинки
  const elementImage = elementCopy.querySelector(".element__image");
  const elementImageContainer = elementCopy.querySelector(".element__image-container");
  elementImageContainer.addEventListener("click", event => {
    openPopup(popupImage);
    popupImageImage.src = link;
    popupImageImage.alt = name;
    popupImageName.textContent = name
  });

  // После загрузки картинки, устанавливаем ей размеры
  elementImage.onload = () => {
    const width = elementImage.naturalWidth;
    const height = elementImage.naturalHeight;
    const format = width / height;
    if (format > 1) {
      elementImage.classList.add("element__image_position-height");
    } else {
      elementImage.classList.add("element__image_position-width");
    }
  };

  // Ошибка загрузки картинки
  elementImage.onerror = () => {
    console.log("С картинкой что то не так. Там будет грустный котик (((");
    console.log("CORS политика, или неправильная ссылка");
    elementImage.src = imageErrorSource;
    elementImage.alt = imageErrorAlt;
  }

  elementImage.src = link;
  elementImage.alt = name;

  // Добавление названия
  const elementTitle = elementCopy.querySelector(".element__title");
  elementTitle.textContent = name;

  // Добавление лайка
  const elementLike = elementCopy.querySelector(".element__like-button");
  elementLike.addEventListener("click", handleElementLikeClick);

  // Добавление удаления
  const elementDelete = elementCopy.querySelector(".element__delete-btn");
  elementDelete.addEventListener("click", handleElementDeleteClick);

  return elementCopy;
}

// Кнопка лайк
function handleElementLikeClick(event) {
  event.currentTarget.classList.toggle("element__like-button_active");
}

// Кнопка удаления карточки
function handleElementDeleteClick(event) {
  const elementDelete = event.currentTarget;
  const element = elementDelete.closest(".element");
  element.remove();
}

// 4. Стартуем
// Реверсируем массив с карточками и добавляем их на страницу
initialCards.forEach( item => {
  const newCard =  createCard(item.name, item.link);
  insertCardIntoElementsAfter(newCard);
});
