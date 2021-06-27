class Popup {
  constructor(popupSelector) {
    this._popupCover = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupCover.querySelector('.popup__close-button');  
    this._boundHandleEscClose = this._handleEscClose.bind(this);
  
  } 

  _handleEscClose (evt){
    if (evt.key === 'Escape') {
        this.close(); 
      }
  }
  
  // закрытие popup по клику на оверлее
  _handleOverlayClick(evt) {
    if (evt.target === evt.currentTarget){
      this.close(); 
    }
  }
  
  open(){
    this._popupCover.classList.remove('popup_trans-delay');
    this._popupCover.classList.add('popup_opened');
    // повесить обработчик закрытие popup esc
    document.addEventListener('keydown', this._boundHandleEscClose);  
  }

  close(){
    this._popupCover.classList.add('popup_trans-delay'); 
    this._popupCover.classList.remove('popup_opened');   
    // удалить обработчик закрытие popup esc
    document.removeEventListener('keydown', this._boundHandleEscClose);  
  
  }

  setEventListeners(){
    this._popupCover.addEventListener('click', this._handleOverlayClick.bind(this));
    this._popupCloseButton.addEventListener(
      'click', 
      (evt) => {
        evt.preventDefault();
        this.close();
      }
    ); 
  }

}

export default Popup;