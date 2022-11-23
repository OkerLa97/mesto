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