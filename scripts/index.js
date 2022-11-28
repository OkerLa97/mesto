// ПОИСК ЭЛЕМЕНТОВ ПО DOM
var editFormCloseButton = document.getElementById('popup__close-button');
var editForm = document.getElementById('popup')
var profileEditButton = document.getElementById('profile__edit-button');
var popupForm = document.getElementById("popup__form");

var profileNameInput = document.getElementById('profile_name_input');
var profileTitle = document.getElementById('profile__title');

var profileJobInput = document.getElementById('profile_job_input');
var profileText = document.getElementById('profile__text');


// КЛИК ПО КНОПКЕ РЕДАКТИРОВАНИЕ ПРОФАЙЛА
editFormCloseButton.addEventListener('click', onEditFormCloseButtonClick);
function onEditFormCloseButtonClick() {
  editForm.classList.remove('popup_open')
}

// КЛИК ПО КРЕСТИКУ ДЛЯ ЗАКРЫТИЯ ФОРМЫ
profileEditButton.addEventListener("click", onProfileEditButtonClick);
function onProfileEditButtonClick() {;
  editForm.classList.add("popup_open");
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

  onEditFormCloseButtonClick()
}

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

var elements = document.querySelector(".elements");

var cardTemplate = document.getElementById("card-template").content;
var element = cardTemplate.querySelector(".element");
initialCards.forEach( item => {
  var elementCopy = element.cloneNode(true);

  // Добавление картинки
  var elementImage = elementCopy.querySelector(".element__image");

  // После загрузки картинки, устанавливаем ей размеры
  elementImage.onload = function() {
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
  
  elements.append(elementCopy);
});