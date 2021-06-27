import Popup from './Popup.js';

class PopupWithForm extends Popup {
  constructor(popupSelector, formSubmitHandler) {
    super(popupSelector);       
    this._formSubmitHandler = formSubmitHandler;
    this.popupContainer = this._popupCover.querySelector('.popup__content');
    this._inputListElem = Array.from(this.popupContainer.querySelectorAll('.popup__item'));    
  }      
 
  _getInputValues(){
    // собирает данные всех полей формы
    const inputValues = {};
    this._inputListElem.forEach((item) => {
      const KeyObj = item.name;
      inputValues[KeyObj] = item.value;  
    }); 
    //inputList.item_0 = this._inputListElem[0].value;
    //inputList.item_1 = this._inputListElem[1].value;    
    return inputValues;
  }

  setInputValues(inputValues){
    // ключи - названия input-ов    
    this._inputListElem.forEach((item) => {
      const KeyObj = item.name;
      item.value = inputValues[KeyObj];
    }); 

   // this._inputListElem[0].value = inputValues[0];
   // this._inputListElem[1].value = inputValues[1];
  }

  setEventListeners(){
    super.setEventListeners();
    this.popupContainer.addEventListener('submit',
      (evt) => {
        evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
        const inputValues = this._getInputValues();
        this._formSubmitHandler(inputValues);        
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