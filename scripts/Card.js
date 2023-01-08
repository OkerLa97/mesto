export class Card {
  
  _imageErrorAlt = "Изображение не загрузилось";

  constructor(item, templateSelector, handleImageClick) {
    this._name = item.name;
    this._link = item.link;

    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
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

    this._elementLikeButton.addEventListener("click", () => {
      this._handleLikeClick();
    });

    this._elementDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick();
    });

    this._elementImageContainer.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });

    this._elementImage.addEventListener("error", () => {
      this._handleImageError();
    });
  }

  _handleLikeClick() {
    this._elementLikeButton.classList.toggle("element__like-button_active");
  }

  _handleDeleteClick() {
    this._element.remove();
  }

  _handleImageError() {
    this._elementImage.alt = this._imageErrorAlt;
  }

  // Функция создания карточки
  generateCard() {

    this._element = this._getTemplate();
    this._elementLikeButton = this._element.querySelector(".element__like-button");
    this._elementDeleteButton = this._element.querySelector(".element__delete-btn");
    this._elementImageContainer = this._element.querySelector(".element__image-container");
    this._elementImage = this._elementImageContainer.querySelector(".element__image");
    this._elementTitle = this._element.querySelector(".element__title");
    this._setEventListeners();

    // Добавление картинки
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    // Добавление названия
    this._elementTitle.textContent = this._name;

    return this._element;
  }
}