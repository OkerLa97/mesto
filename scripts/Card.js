export class Card {

  _imageErrorSource = "https://images.unsplash.com/photo-1525785967371-87ba44b3e6cf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1473&q=80";
  _imageErrorAlt = "Котик";

  // Попап изображения
  _popupImage = document.querySelector("#popup-image");
  _popupImageCloseBtn = document.querySelector("#popup-image-close-button");
  _popupImageImage = document.querySelector("#popup-image-image");
  _popupImageName = document.querySelector("#popup-image-name");

  constructor(item, templateSelector) {
    this._name = item.name;
    this._link = item.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {

    const cardElement = document
      .querySelector(this._templateSelector)
      .content
      .querySelector(".element")
      .cloneNode(true);

    return cardElement;
  }

  _setEventListeners(){

    this._element.querySelector(".element__like-button").addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._element.querySelector(".element__delete-btn").addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._element.querySelector(".element__image-container").addEventListener("click", () => {
      this._handleImageClick();
    });

    this._element.querySelector(".element__image").addEventListener("error", () => {
      this._handleImageError();
    });

    this._element.querySelector(".element__image").addEventListener("load", () => {
      this._handleImageLoad();
    });
  }

  _handleLikeClick() {
    this._element.querySelector(".element__like-button").classList.toggle("element__like-button_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImageClick() {
    this._openImagePopup();
  }

  _openImagePopup() {
    this._popupImageImage.src = this._link;
    this._popupImageImage.alt = this._name;
    this._popupImageName.textContent = this._name;
    this._popupImage.classList.add("popup_open");
    // добавляем слушатель на Esc
    document.addEventListener("keydown", event => {
      this._handleEscClose(event);
    });
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") {
      this._closePopup();
    }
  }

  _closePopup() {
    this._popupImage.classList.remove("popup_open");
    // удаляем слушатель на Esc
    document.removeEventListener("keydown", event => {
      this._handleEscClose(event);
    });
  }

  _handleImageError() {
    this._element.querySelector(".element__image").src = this._imageErrorSource;
    this._element.querySelector(".element__image").alt = this._imageErrorAlt;

    this._link = this._imageErrorSource;
  }

  _handleImageLoad() {
    const width = this._element.querySelector(".element__image").naturalWidth;
    const height = this._element.querySelector(".element__image").naturalHeight;
    const format = width / height;
    if (format > 1) {
      this._element.querySelector(".element__image").classList.add("element__image_position-height");
    } else {
      this._element.querySelector(".element__image").classList.add("element__image_position-width");
    }
  }

  // Функция создания карточки
  generateCard() {

    this._element = this._getTemplate();
    this._setEventListeners();

    // Добавление картинки
    this._element.querySelector(".element__image").src = this._link;
    this._element.querySelector(".element__image").alt = this._name;

    // Добавление названия
    this._element.querySelector(".element__title").textContent = this._name;

    return this._element;
  }
}