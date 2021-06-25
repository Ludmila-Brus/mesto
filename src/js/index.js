import '../pages/index.css';
import Section from './Section.js';
import Card from './Card.js';
import FormValidator from './Formvalidator.js';
import initialCards from './const.js';

import UserInfo from './UserInfo.js';
import PopupWithForm from './PopupWithForm.js';
import PopupWithImage from './PopupWithImage.js';

const profileInfo = document.querySelector('.profile-info');
const editButtonProfile = profileInfo.querySelector('.profile-info__edit-button');
const addButtonElem = document.querySelector('.profile__add-button');

const initialValid =
  {
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active'    
  };

const userInfo = new UserInfo(
  '.profile-info__title',
  '.profile-info__subtitle'
);

const popupProfile = new PopupWithForm(
  '.popup_type_edit-form',
  (inputList) => {
    userInfo.setUserInfo({
      infoTitle : inputList.item_0,
      infoSubTitle : inputList.item_1
    });
  }
);
popupProfile.setEventListeners();
  
const popupCard = new PopupWithForm(
  '.popup_type_add-card',
  (inputList) => {
    const item =  {
      name: inputList.item_0,
      link: inputList.item_1
    };
    // сформируем и добавим новый Element
    const card = new Card(
       item,
       '#element',
       (item) => {
         const popupImage = new PopupWithImage(
           '.popup_type_show-image',
           item
         );
         popupImage.setEventListeners();
         popupImage.open();
       });
    cardsList.addItem(card.generateCard());
  }
);
popupCard.setEventListeners();

const formValidatorProfile = new FormValidator(initialValid, popupProfile.popupContainer);
formValidatorProfile.enableValidation();

const formValidatorElem = new FormValidator(initialValid, popupCard.popupContainer);
formValidatorElem.enableValidation();

editButtonProfile.addEventListener(
  'click', 
  () => {
    popupProfile.open();
    // получим актуальные данные профиля
    const inputValues = userInfo.getInputValues();
    // установим в форму актуальные данные профиля    
    popupProfile.setInputValues(inputValues);
    // очистим от прежних ошибок
    formValidatorProfile.prepareFormBeforeOpen();     
  }
); 

addButtonElem.addEventListener(
  'click', 
  () => {
    popupCard.open();
    // очистим поля формы
    // popupCoverElem.querySelector('.popup__content').reset();  
    // очистим от прежних ошибок
    formValidatorElem.prepareFormBeforeOpen();     
  }
); 

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(
        item, 
        '#element', 
        (item) => {
          const popupImage = new PopupWithImage(
            '.popup_type_show-image',
            item
          )
          popupImage.setEventListeners();
          popupImage.open();
        }
      );
      cardsList.addItem(card.generateCard());
    },
  },
  '.elements'
); 

cardsList.renderItems(); 
