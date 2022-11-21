// ПОИСК ЭЛЕМЕНТОВ ПО DOM
var editFormCloseIcon = document.getElementById('popup__close-icon');
var editForm = document.getElementById('popup')
var profileEditButton = document.getElementById('profile__edit-button');
var editFormSubmitButton = document.getElementById('popup__submit-btn');

var profileNameInput = document.getElementById('profile_name_input');
var profileTitle = document.getElementById('profile__title');

var profileJobInput = document.getElementById('profile_job_input');
var profileText = document.getElementById('profile__text');


// КЛИК ПО КНОПКЕ РЕДАКТИРОВАНИЕ ПРОФАЙЛА
editFormCloseIcon.addEventListener('click', editFormCloseIconClick);
function editFormCloseIconClick() {
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
editFormSubmitButton.addEventListener('click', editFormSubmitButtonClick);
function editFormSubmitButtonClick(event) {

  event.preventDefault();

  let profileName = profileNameInput.value;
  profileTitle.innerHTML = profileName;

  let profileJob = profileJobInput.value;
  profileText.innerHTML = profileJob;

  editFormCloseIconClick()
}