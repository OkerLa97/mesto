
// КЛИК ПО КНОПКЕ РЕДАКТИРОВАНИЕ ПРОФАЙЛА
let edit_form__close_icon = document.getElementById('edit-form__close-icon');

edit_form__close_icon.addEventListener('click', editFormCloseIconClick);

function editFormCloseIconClick() {
  let edit_form = document.getElementById('edit-form')
  edit_form.classList.remove('open_end')
}

// КЛИК ПО КРЕСТИКУ ДЛЯ ЗАКРЫТИЯ ФОРМЫ
let profile_edit_button = document.getElementById('profile__edit-button');

profile_edit_button.addEventListener("click", onProfileEditButtonClick);

function onProfileEditButtonClick() {
  let edit_form = document.getElementById('edit-form');
  edit_form.classList.add("open_end");
}

// КЛИК ПО КНОПКЕ СОХРАНИТЬ ПРОФИЛЬ
//- БЕРЁТ значения из первого и второго инпута и встовляет значения
// в соответствующие html елементы - profile__info , profile__title
let edit_form__submit_btn = document.getElementById('edit-form__submit-btn');

edit_form__submit_btn.addEventListener('click', edit_form__submit_btn_click);

function edit_form__submit_btn_click(event) {

  event.preventDefault();

  let edit_form = document.getElementById('edit-form')
  edit_form.classList.remove('open_end')

  let edit_form__field_one = document.getElementById('edit-form__field-one');
  let edit_form__field_one_value = edit_form__field_one.value;

  let profile__title = document.getElementById('profile__title');
  profile__title.innerHTML = edit_form__field_one_value;

  let edit_form__field_two = document.getElementById('edit-form__field-two');
  let edit_form__field_two_value = edit_form__field_two.value;

  let profile__text = document.getElementById('profile__text');
  profile__text.innerHTML = edit_form__field_two_value;
}