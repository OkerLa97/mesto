import '../pages/index.css';

import Section from '../components/Section.js';
import FormValidator from '../components/FormValidator.js';
import UserInfo from '../components/UserInfo.js';
import {
    initialCards,
    validationConfig,

    cardsSectionSelector,

    popupImageSelector,
    popupImageImageSelector,
    popupImageNameSelector,
    
    popupCloseButtonSelector,
    popupOverlaySelector,
    profileEditButtonSelector,
    popupProfileSelector,

    editProfileFormSelector,
    editProfileNameInputSelector,
    editProfileJobInputSelector,

    profileTitleSelector,
    profileTextSelector,

    addCardFormButtonSelector,
    popupAddCardSelector,
    addCardFormSelector,
    addCardNameInputSelector,
    addCardLinkInputSelector,
} from '../utils/constants.js';
import Card from '../components/Card.js';
import Popup from '../components/Popup.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

const userInfo = new UserInfo(profileTitleSelector, profileTextSelector);

// редактирования профиля
const editProfileForm = document.querySelector(editProfileFormSelector);
const profilePopup = new PopupWithForm(popupProfileSelector, editProfileForm, handleEditProfileFormSubmit, popupCloseButtonSelector, popupOverlaySelector)
profilePopup.setEventListeners();

const editProfileNameInput = document.querySelector(editProfileNameInputSelector);
const editProfileJobInput = document.querySelector(editProfileJobInputSelector);
const profileEditButton = document.querySelector(profileEditButtonSelector);

profileEditButton.addEventListener("click", () => {
    const userData = userInfo.getUserInfo();
    editProfileNameInput.value = userData.name;
    editProfileJobInput.value = userData.about;
    profilePopup.open();
});

// Отправка формы редактирования профайла
//- БЕРЁТ значения из первого и второго инпута и встовляет значения
// в соответствующие html елементы - profile__info , profile__title,
function handleEditProfileFormSubmit(formValues) {
    userInfo.setUserInfo(formValues);
    profilePopup.close();
}

// Добавление карточки
const addCardFormButton = document.querySelector(addCardFormButtonSelector);
const addCardForm = document.querySelector(addCardFormSelector);
const addCardPopup = new PopupWithForm(popupAddCardSelector, addCardForm, handleNewPlaceFormSubmit, popupCloseButtonSelector, popupOverlaySelector);
addCardPopup.setEventListeners();

addCardFormButton.addEventListener("click", () => {
    addCardPopup.open();
    addCardFormValidator.resetValidation()
});

// Отправка формы добавления карточки
function handleNewPlaceFormSubmit(formValues) {
    const card = createCard(formValues);
    cardsSection.prependItem(card);
    addCardPopup.close();
}


// Секция карточек
const cardsSection = new Section({
    items: initialCards,
    renderer: (item) => {
        const card = createCard(item);
        cardsSection.addItem(card);
    }
}, cardsSectionSelector);

// Создание попапа изображения
//const imagePopup = new Popup(popupImageSelector, popupCloseButtonSelector, popupOverlaySelector);
const imagePopup = new PopupWithImage(popupImageSelector, popupImageImageSelector, popupImageNameSelector, popupCloseButtonSelector, popupOverlaySelector);
// Открытие попапа изображения
function handleCardClick(name, link) {
    imagePopup.open(name, link);
}

// Создание карточки
function createCard(item) {
    const card = new Card(item, "#card-template", handleCardClick);
    return card.generateCard();
}

cardsSection.renderItems();

// Запускаем валидацию форм
const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();