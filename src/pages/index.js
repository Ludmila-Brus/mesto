import './index.css';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/Formvalidator.js';
import initialCards from '../js/const.js';

import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';

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
  (inputValues) => {
    userInfo.setUserInfo(inputValues);
  }
);
popupProfile.setEventListeners();

const popupImage = new PopupWithImage(
  '.popup_type_show-image'
);
popupImage.setEventListeners();

function createCard(item) {
  // сформируем и добавим новый Element
  const card = new Card(
    item,
    '#element',
    (item) => {
      popupImage.open(item.name, item.link);
    });
  return card.generateCard();
} 
  
const popupCard = new PopupWithForm(
  '.popup_type_add-card',
  (inputValues) => {
    const item = {
      name: inputValues["elem-title"],
      link: inputValues["elem-lnk"]
    };
    // сформируем и добавим новый Element
    cardsList.addItem(createCard(item));
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
      cardsList.addItem(createCard(item));
    },
  },
  '.elements'
); 

cardsList.renderItems(); 
