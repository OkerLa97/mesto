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

    popupAvatarSelector,
    editAvatarFormSelector,
    editAvatarInputSelector,

    popupDeleteCardSelector,
    deleteCardFormSelector,
    
    popupCloseButtonSelector,
    popupOverlaySelector,
    profileEditButtonSelector,
    profileEditAvatarButtonSelector,
    popupProfileSelector,

    editProfileFormSelector,
    editProfileNameInputSelector,
    editProfileJobInputSelector,

    profileTitleSelector,
    profileTextSelector,
    profileAvatarSelector,

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
import { api } from '../components/Api.js';

//Загрузка информации о пользователе с сервера
const userInfo = new UserInfo(profileTitleSelector, profileTextSelector, profileAvatarSelector);
api.getUserInfo()
.then((data) => {
    userInfo.setUserInfo(data);
    renderCardSection();
});

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

// Редактирование аватара
const editAvatarForm = document.querySelector(editAvatarFormSelector);
const editAvatarPopup = new PopupWithForm(popupAvatarSelector, editAvatarForm, handleEditAvatarFormSubmit, popupCloseButtonSelector, popupOverlaySelector);
editAvatarPopup.setEventListeners();

const profileEditAvatarButton = document.querySelector(profileEditAvatarButtonSelector);
profileEditAvatarButton.addEventListener("click", () => {
    editAvatarPopup.open();
});

// Отправка формы редактирования аватара
function handleEditAvatarFormSubmit(formValues) {
    api.editAvatar(formValues.link)
    .then((data) => {
        userInfo.setUserInfo(data);
        editAvatarPopup.close();
    })
    .catch((err) => {
        console.log(err);
    });
}

// Отправка формы редактирования профайла
//- БЕРЁТ значения из первого и второго инпута и встовляет значения
// в соответствующие html елементы - profile__info , profile__title,
function handleEditProfileFormSubmit(formValues) {
    api.editProfile(formValues)
    .then((data) => {
        userInfo.setUserInfo(data);
        profilePopup.close();
    })
    .catch((err) => {
        console.log(err);
    });
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
    api.addCard(formValues)
    .then((data) => {
        const card = createCard(data);
        cardsSection.addItem(card);
        addCardPopup.close();
        renderCardSection();
    })
    .catch((err) => {
        console.log(err);
    });
}

let cardsSection = null;
function renderCardSection() {
    api.getInitialCards()
    .then((items) => {
        console.log(items);
        cardsSection = new Section({
            items: items,
            renderer: (item) => {
                const card = createCard(item);
                cardsSection.addItem(card);
            }
        }, cardsSectionSelector);
        cardsSection.renderItems();
    });
}

// Создание попапа изображения
//const imagePopup = new Popup(popupImageSelector, popupCloseButtonSelector, popupOverlaySelector);
const imagePopup = new PopupWithImage(popupImageSelector, popupImageImageSelector, popupImageNameSelector, popupCloseButtonSelector, popupOverlaySelector);

// Открытие попапа изображения
function handleCardClick(name, link) {
    imagePopup.open(name, link);
}

// Удаление карточки
const deleteCardForm = document.querySelector(deleteCardFormSelector);
const deleteCardPopup = new PopupWithForm(popupDeleteCardSelector, deleteCardForm, handleDeleteCardFormSubmit, popupCloseButtonSelector, popupOverlaySelector);
deleteCardPopup.setEventListeners();
function handleDeleteCardFormSubmit() {
    console.log(deleteCardPopup.cardId)
    api.deleteCard(deleteCardPopup.cardId)
    .then(() => {
        renderCardSection();
        deleteCardPopup.close();
    })
    .catch((err) => {
        console.log(err);
    });
}

// Создание карточки
function createCard(item) {
    const card = new Card(item, "#card-template", handleCardClick, handleDeleteClick, handleLikeClick, userInfo._id);
    return card.generateCard();
}

// Удаление карточки
function handleDeleteClick(cardId) {
    deleteCardPopup.open();
    deleteCardPopup.cardId = cardId;
}

// Лайк карточки
function handleLikeClick(card) {
    if (card.isLiked()) {
        api.deleteLike(card._id)
        .then((data) => {
            card.setLikesInfo(data.likes);
            card.toggleLikeButton();
        })
        .catch((err) => {
            console.log(err);
        });
    } else {
        api.addLike(card._id)
        .then((data) => {
            card.setLikesInfo(data.likes);
            card.toggleLikeButton();
        })
        .catch((err) => {
            console.log(err);
        });
    }
}

// Запускаем валидацию форм
const editProfileFormValidator = new FormValidator(validationConfig, editProfileForm);
editProfileFormValidator.enableValidation();

const addCardFormValidator = new FormValidator(validationConfig, addCardForm);
addCardFormValidator.enableValidation();

const editAvatarFormValidator = new FormValidator(validationConfig, editAvatarForm);
editAvatarFormValidator.enableValidation();