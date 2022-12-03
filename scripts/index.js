// ПОИСК ЭЛЕМЕНТОВ ПО DOM
var editFormCloseButton = document.getElementById('popup__close-button');
var editForm = document.getElementById('popup')
var profileEditButton = document.getElementById('profile__edit-button');
var popupForm = document.getElementById("popup__form");

var profileNameInput = document.getElementById('profile_name_input');
var profileTitle = document.getElementById('profile__title');

var profileJobInput = document.getElementById('profile_job_input');
var profileText = document.getElementById('profile__text');

var addNewPlaceBtn = document.querySelector(".profile__add-button");
var newPlacePopUp = document.querySelector("#new-place-popup");
var newPlacePopUpCloseBtn = document.querySelector("#new-place-popup__close-button");
var newPlaceForm = document.querySelector("#new-place-popup__form");
var newPlaceNameInput = document.querySelector("#new-place-name-input");
var newPlaceLinkInput = document.querySelector("#new-place-link-input");

var popupImage = document.querySelector("#popup-image");
var popupImageCloseBtn = document.querySelector("#popup-image__close-button");
var popupImageImage = document.querySelector("#popup-image__image");
var popupImageName = document.querySelector("#popup-image__name");
popupImageCloseBtn.addEventListener("click", event => {
  closePopup(popupImage);
});

function closePopup(popup) {
    popup.classList.remove("popup_open");
}

function openPopup(popup) {
    popup.classList.add("popup_open");
}

// КЛИК ПО КНОПКЕ РЕДАКТИРОВАНИЕ ПРОФАЙЛА
editFormCloseButton.addEventListener('click', onEditFormCloseButtonClick);
function onEditFormCloseButtonClick() {
  closePopup(editForm);
}

// КЛИК ПО КРЕСТИКУ ДЛЯ ЗАКРЫТИЯ ФОРМЫ РЕДАКТИРОВАНИЕ ПРОФАЙЛА
profileEditButton.addEventListener("click", onProfileEditButtonClick);
function onProfileEditButtonClick() {;
  openPopup(editForm);
}

// КЛИК ПО КНОПКЕ СОХРАНИТЬ ПРОФИЛЬ
//- БЕРЁТ значения из первого и второго инпута и встовляет значения
// в соответствующие html елементы - profile__info , profile__title
popupForm.addEventListener('submit', onPopupFormSubmit);
function onPopupFormSubmit(event) {

  event.preventDefault();

  let profileName = profileNameInput.value;
  profileTitle.textContent = profileName;

  let profileJob = profileJobInput.value;
  profileText.textContent = profileJob;

  closePopup(editForm);
}

// КЛИК ПО КНОПКУ ДОБАВИТЬ МЕСТО
addNewPlaceBtn.addEventListener("click", onAddNewPlaceBtnClick);
function onAddNewPlaceBtnClick() {
  openPopup(newPlacePopUp);
}

// КЛИК ПО КРЕСИКУ ДЛЯ ЗАКРЫТИЯ ФОРМЫ ДОБАВИТЬ МЕСТО
newPlacePopUpCloseBtn.addEventListener("click", onNewPlacePopUpCloseBtn);
function onNewPlacePopUpCloseBtn(){
  closePopup(newPlacePopUp);
}

// КЛИК ПО КНОПКЕ СОХРАНИТЬ МЕСТО
newPlaceForm.addEventListener("submit", onNewPlaceFormSubmit);
function onNewPlaceFormSubmit(event) {
  event.preventDefault();
  addNewPlace(newPlaceNameInput.value, newPlaceLinkInput.value);
  closePopup(newPlacePopUp);
}

function addNewPlace(name, link) {

  let newPlace = {
    name: name,
    link: link,
  }
  
  // Создаём карточку в начале списка
  initialCards.unshift(newPlace);
  renderCards();
}

var initialCards = [
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

var elements = document.querySelector(".elements");

var cardTemplate = document.getElementById("card-template").content;
var element = cardTemplate.querySelector(".element");
renderCards();

function renderCards(){
  initialCards.forEach( (item, index) => {

    // Удалить предыдущий элемент
    if(item.node){
      item.node.remove();
    }
  
    var elementCopy = element.cloneNode(true);
    item.node = elementCopy;
  
    // Добавление картинки
    var elementImage = elementCopy.querySelector(".element__image");

    var elementImageContainer = elementCopy.querySelector(".element__image-container");
    elementImageContainer.addEventListener("click", event => {
      openPopup(popupImage);
      popupImageImage.src = item.link;
      popupImageName.textContent = item.name;
    });
  
    // После загрузки картинки, устанавливаем ей размеры
    elementImage.onload = () => {
      var width = elementImage.naturalWidth;
      var height = elementImage.naturalHeight;
      var format = width / height;
      if (format > 1) {
        elementImage.classList.add("element__image_position-height");
      } else {
        elementImage.classList.add("element__image_position-width");
      }
    };
    
    elementImage.src = item.link;
    elementImage.alt = item.name;
  
    // Добавление названия
    var elementTitle = elementCopy.querySelector(".element__title");
    elementTitle.textContent = item.name;
  
    // Добавление лайка
    var elementLike = elementCopy.querySelector(".element__like-button");
    elementLike.addEventListener("click", onElementLikeClick);
    function onElementLikeClick() {
      elementLike.classList.toggle("element__like-button_active");
    }
  
    // Добавление удаления
    var elementDelete = elementCopy.querySelector(".element__delete-btn");
    // Добавление индекса
    elementDelete.setAttribute("data-index", index);
    elementDelete.addEventListener("click", onElementDeleteClick);
    elements.append(elementCopy);
  });
}


function onElementDeleteClick(event) {
  var elementDelete = event.currentTarget;
  var index = elementDelete.getAttribute("data-index");
  initialCards.splice(index, 1);
  var element = elementDelete.closest(".element");
  element.remove();
}