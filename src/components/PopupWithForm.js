import Popup from "./Popup.js";
export default class PopupWithForm extends Popup {
  constructor(popupSelector, form, handleFormSubmit, popupCloseButtonSelector, popupOverlaySelector) {
    super(popupSelector, popupCloseButtonSelector, popupOverlaySelector);

    this._form = form;
    this._handleFormSubmit = handleFormSubmit;

    this._inputList = this._form.querySelectorAll(".popup__field");
    this._button = this._form.querySelector(".popup__submit-btn");
  }

  _getInputValues() {
    this._formValues = {};
    this._inputList.forEach(input => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", evt => {
      evt.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}