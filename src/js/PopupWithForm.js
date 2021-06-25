import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);       
    this._formSubmitHandler = formSubmitHandler;
    this.popupContainer = this._popupCover.querySelector('.popup__content');
  }      
 
  _getInputValues(){
    // собирает данные всех полей формы
    const inputListElem = Array.from(this.popupContainer.querySelectorAll('.popup__item'));
    const inputList = {}
    inputList.item_0 = inputListElem[0].value;
    inputList.item_1 = inputListElem[1].value;    
    return inputList;
  }

  setInputValues(inputValues){
    const inputListElem = Array.from(this.popupContainer.querySelectorAll('.popup__item'));
    inputListElem[0].value = inputValues[0];
    inputListElem[1].value = inputValues[1];
  }

  setEventListeners(){
    super.setEventListeners();
    this.popupContainer.addEventListener('submit',
      (evt) => {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        const inputList = this._getInputValues();
        this._formSubmitHandler(inputList);        
        this.close();
    }); 
  }

  close(){
    // очистим поля формы
    this.popupContainer.reset();
    super.close();    
  }

} 
export default PopupWithForm;