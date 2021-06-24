class Popup {
  constructor(popupSelector) {
    this._popupCover = document.querySelector(popupSelector);
    this._popupCloseButton = this._popupCover.querySelector('.popup__close-button');  
     
  } 

  _handleEscClose (evt){
    if (evt.key === 'Escape') {
      //  const openedPopup = document.querySelector('.popup_opened');
        this_.close(); 
      }
  }

  // закрытие popup по клику на оверлее
  _keyHandlerClick(evt) {
    if (evt.target === evt.currentTarget){
      this_.close(); 
    }
  }
  
  open(){
    this._popupCover.classList.remove('popup_trans-delay');
    this._popupCover.classList.add('popup_opened');
    // повесить обработчик закрытие popup esc
    document.addEventListener('keydown', this._handleEscClose);  
  }

  close(){
    this._popupCover.classList.add('popup_trans-delay'); 
    this._popupCover.classList.remove('popup_opened');   
    // удалить обработчик закрытие popup esc
    document.removeEventListener('keydown', this._handleEscClose);  
  
  }

  setEventListeners(){
    this._popupCover.addEventListener('click', keyHandlerClick);
    this._popupCloseButton.addEventListener('click', () => this.close()); 
  }

}

export default Popup;