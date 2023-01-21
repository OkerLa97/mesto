export default class Popup {
    constructor(popupSelector, closePopupButtonSelector, popupOverlaySelector) {
        
        this._popup = document.querySelector(popupSelector);
        this._closePopupButton = this._popup.querySelector(closePopupButtonSelector);
        this._popupOverlay = this._popup.querySelector(popupOverlaySelector);

        this._handleEscClose = this._handleEscClose.bind(this);
    }
    
    open() {
        this._popup.classList.add("popup_open");
        document.addEventListener("keydown", this._handleEscClose);
    }
    
    close() {
        this._popup.classList.remove("popup_open");
        document.removeEventListener("keydown", this._handleEscClose);
    }
    
    _handleEscClose(evt) {
        if (evt.key === "Escape") {
            this.close();
        }
    }
    
    setEventListeners() {
        this._closePopupButton.addEventListener("click", () => this.close());
        this._popupOverlay.addEventListener("click", () => this.close());
    }
}