export default class Card {
  
  _imageErrorAlt = "Изображение не загрузилось";

  constructor(item, templateSelector, handleImageClick, handleDeleteClick, handleLikeClick, userId) {
    this._name = item.name;
    this._link = item.link;
    this._likes = item.likes;
    this._id = item._id;
    this._ownerId = item.owner._id;
    this._userId = userId;

    this._templateSelector = templateSelector;
    this._handleImageClick = handleImageClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
  }

  toggleLikeButton() {
    this._elementLikeButton.classList.toggle("element__like-button_active");
  }

  isLiked() {
    return this._elementLikeButton.classList.contains("element__like-button_active");
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
      this._handleLikeClick(this);
    });

    this._elementDeleteButton.addEventListener("click", () => {
      this._handleDeleteClick(this);
    });

    this._elementImageContainer.addEventListener("click", () => {
      this._handleImageClick(this._name, this._link);
    });

    this._elementImage.addEventListener("error", () => {
      this._handleImageError();
    });
  }

  _handleImageError() {
    this._elementImage.alt = this._imageErrorAlt;
  }

  // Функция создания карточки
  generateCard() {

    this._element = this._getTemplate();
    this._elementLikeButton = this._element.querySelector(".element__like-button");
    this._elementLikeCounter = this._element.querySelector(".element__like-counter");
    this._elementDeleteButton = this._element.querySelector(".element__delete-btn");
    this._elementImageContainer = this._element.querySelector(".element__image-container");
    this._elementImage = this._elementImageContainer.querySelector(".element__image");
    this._elementTitle = this._element.querySelector(".element__title");
    this._setEventListeners();

    // Проверка, является ли карточка созданной текущим пользователем
    if (this._ownerId !== this._userId) {
      this._elementDeleteButton.remove();
    }

    // Проверка, поставлен ли лайк текущим пользователем
    this._likes.forEach(like => {
      if (like._id === this._userId) {
        this.toggleLikeButton();
      }
    });

    // Добавление картинки
    this._elementImage.src = this._link;
    this._elementImage.alt = this._name;

    // Добавление названия
    this._elementTitle.textContent = this._name;

    // Добавление количества лайков
    this._elementLikeCounter.textContent = this._likes.length;

    return this._element;
  }

  // Функция удаления карточки
  deleteCard() {
    this._element.remove();
    this._element = null;
  }

  // Функция обновления количества лайков
  setLikesInfo(likes) {
    this._likes = likes;
    this._elementLikeCounter.textContent = this._likes.length;
  }
}