import Popup from "./Popup.js";
export default class PopupWithImage extends Popup {

  constructor(popupSelector, popupImageSelector, popupCaptionSelector, popupCloseButtonSelector, popupOverlaySelector) {
    super(popupSelector, popupCloseButtonSelector, popupOverlaySelector);
    this._popupImage = this._popup.querySelector(popupImageSelector);
    this._popupCaption = this._popup.querySelector(popupCaptionSelector);

    super.setEventListeners();
  }

  open(name, link) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupCaption.textContent = name;
    super.open();
  }
}