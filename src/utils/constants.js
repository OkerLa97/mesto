// 1. Стандартные значения (Конфигурация)
export const initialCards = [
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

export const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__field",
  submitButtonSelector: ".popup__submit-btn",
  inactiveButtonClass: "popup__submit-btn_disabled",
  inputErrorClass: "popup__field_type_error",
  errorClass: "popup__field-error_active",
}

export const cardsSectionSelector = '.elements';

// Кнопка редактирования профайла
export const profileEditButtonSelector = ".profile__edit-button";
// Кнопка Редактирования аватара
export const profileEditAvatarButtonSelector = ".profile__avatar-edit";

// Форма редактирования профайла в попапе
export const editProfileFormSelector = "#edit-profile_form";
export const editProfileNameInputSelector = '#edit-profile-name-input';
export const editProfileJobInputSelector = '#edit-profile-job-input';

// Форма редактирования аватара в попапе
export const editAvatarFormSelector = "#edit-avatar-popup-form";
export const editAvatarInputSelector = '#edit-avatar-link-input';

// Элементы профайл загаловка и текста на странице
export const profileTitleSelector = '#profile-title';
export const profileTextSelector = '#profile__text';
export const profileAvatarSelector = '.profile__avatar';

// Кнопка закрытия попапа
export const popupCloseButtonSelector = ".popup__close-button";

// Оверлей попапа
export const popupOverlaySelector = ".popup__overlay";

// Попап профайла
export const popupProfileSelector = "#edit-profile-popup";

// Попап аватара
export const popupAvatarSelector = "#edit-avatar-popup";

// Попап изображения
export const popupImageSelector = "#popup-image";
export const popupImageImageSelector = "#popup-image-image";
export const popupImageNameSelector = "#popup-image-name";

// Попап добавления карточки
export const addCardFormButtonSelector = ".profile__add-button";
export const popupAddCardSelector = "#new-place-popup";
export const addCardFormSelector = "#new-place-popup-form";
export const addCardNameInputSelector = "#new-place-name-input";
export const addCardLinkInputSelector = "#new-place-link-input";

// Попап подтверждения удаления карточки
export const popupDeleteCardSelector = "#delete-card-popup";
export const deleteCardFormSelector = "#delete-card-popup-form";