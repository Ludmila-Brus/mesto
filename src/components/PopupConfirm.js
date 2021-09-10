import Popup from './Popup.js';

class PopupConfirm extends Popup {
  constructor(popupSelector
    //, formSubmitHandler
    ) {
    super(popupSelector);       
    //this._formSubmitHandler = formSubmitHandler;
    this.popupContainer = this._popupCover.querySelector('.popup__content');
  }      
 
  setEventListeners(){
    super.setEventListeners();
    this.popupContainer.addEventListener('submit',
      (evt) => {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        this._formSubmitHandler();        
        //this.close();
    }); 
  }

  setOnSubmit(formSubmitHandler){
    this._formSubmitHandler = formSubmitHandler;
  }

} 
export default PopupConfirm;