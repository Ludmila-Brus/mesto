class FormValidator {

  constructor(dataInit, formElement) {
    this._inputSelector = dataInit.inputSelector;
    this._submitButtonSelector = dataInit.submitButtonSelector;
    this._inactiveButtonClass = dataInit.inactiveButtonClass;
    this._inputErrorClass = dataInit.inputErrorClass;
    this._errorClass = dataInit.errorClass;
    this._formElement = formElement;
  }

  
  _showInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._errorClass);
  };

  _hideInputError (inputElement) {
    const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._inputErrorClass);
    errorElement.classList.remove(this._errorClass);
    errorElement.textContent = '';
  };

  _checkInputValidity (inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  };

  _hasInvalidInput (inputList) {
    return inputList.some(inputElement => !inputElement.validity.valid);  
  }; 

  _toggleButtonState (inputList, buttonElement) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.disabled = true;
      buttonElement.classList.add(this._inactiveButtonClass);
    } else {
      // иначе сделай кнопку активной
      buttonElement.disabled = false;
      buttonElement.classList.remove(this._inactiveButtonClass);
    }
  }; 

  _setEventListeners () {
    // найти все input	
    const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
    // Найдём в текущей форме кнопку отправки
    const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
    // цикл по input с установкой события на ввод
    inputList.forEach((inputElement) => {
      inputElement.addEventListener('input', () => {
        this._checkInputValidity(inputElement);
        // Вызовем toggleButtonState и передадим ей массив полей и кнопку
        this._toggleButtonState(inputList, buttonElement);      
      });
    });
  };

prepareFormBeforeOpen(){
  // скрыть подсветку прежнмх ошибок
  const inputList = Array.from(this._formElement.querySelectorAll(this._inputSelector));
  inputList.forEach((inputElement) => {
    this._hideInputError(inputElement);       
  }); 
  // Найдём в текущей форме кнопку отправки
  const buttonElement = this._formElement.querySelector(this._submitButtonSelector);
  this._toggleButtonState(inputList, buttonElement);    
}

  //dataSet, formElement
  enableValidation () {
    this._setEventListeners();
  };

}


export default FormValidator;