import Card from './card.js';
import FormValidator from './formvalidator.js';

const profileInfo = document.querySelector('.profile-info');
const editButtonProfile = profileInfo.querySelector('.profile-info__edit-button');
const addButtonElem = document.querySelector('.profile__add-button');

const profileInfoTitle = profileInfo.querySelector('.profile-info__title');
const profileInfoSubtitle = profileInfo.querySelector('.profile-info__subtitle');

const popupCover = document.querySelector('.popup_type_edit-form');
const popupCoverElem = document.querySelector('.popup_type_add-card');
const popupCoverImg = document.querySelector('.popup_type_show-image');

const popupContainer = popupCover.querySelector('.popup__content');
const popupContainerElem = popupCoverElem.querySelector('.popup__content');
const popupContainerImg = popupCoverImg.querySelector('.popup__content-img');

const popupItemElemPerson = popupContainer.querySelector('.popup__item_elem_person');
const popupItemElemIntro = popupContainer.querySelector('.popup__item_elem_intro');
const popupCloseButton = popupContainer.querySelector('.popup__close-button');
const popupCloseButtonElem = popupContainerElem.querySelector('.popup__close-button');
const popupItemElemTitle = popupContainerElem.querySelector('.popup__item_elem_title');
const popupItemElemLnk = popupContainerElem.querySelector('.popup__item_elem_lnk');
const popupCloseButtonImg = popupContainerImg.querySelector('.popup__close-button');

const popupBigImg = document.querySelector('.popup__big-img');
const popupTitle = document.querySelector('.popup__title');

// куда клонировать будем
const elemSection = document.querySelector('.elements');
// получить содержимое template, через его свойство content
const elemTemplate = document.querySelector('#element').content;

// Находим все 
// сделаем из них массив методом Array.from
const popupList = Array.from(document.querySelectorAll('.popup'));

function setPopupItemProfile () {
  popupItemElemPerson.value = profileInfoTitle.textContent;
  popupItemElemIntro.value = profileInfoSubtitle.textContent;
}

function openPopup (popupCoverParam) {
  popupCoverParam.classList.remove('popup_trans-delay');
  popupCoverParam.classList.add('popup_opened');
  // повесить обработчик закрытие popup esc
  document.addEventListener('keydown', closeByEscape);
}

function openPopupProfile () {
  openPopup(popupCover);
  // установим актуальные данные профиля
  setPopupItemProfile();  
  // очистим от прежних ошибок
  formValidatorProfile.prepareFormBeforeOpen();     
}

function openPopupElem () {
  openPopup(popupCoverElem);
  // очистим поля формы
  popupCoverElem.querySelector('.popup__content').reset();  
  // очистим от прежних ошибок
  formValidatorElem.prepareFormBeforeOpen(); 
}

function openPopupImg (imageSrc, imageAlt) {
  openPopup(popupCoverImg);
  popupBigImg.src = imageSrc;
  popupBigImg.alt = imageAlt;  
  popupTitle.textContent = imageAlt;  
}

editButtonProfile.addEventListener('click', openPopupProfile); 
addButtonElem.addEventListener('click', openPopupElem); 

function closePopup (popupCoverParam) {  
  popupCoverParam.classList.add('popup_trans-delay'); 
  popupCoverParam.classList.remove('popup_opened');   
  // удалить обработчик закрытие popup esc
  document.removeEventListener('keydown', closeByEscape);  
}

function closePopupProfile () {
  closePopup(popupCover); 
}

function closePopupElem () {
  closePopup(popupCoverElem); 
}

function closePopupImg () {
  closePopup(popupCoverImg); 
}

popupCloseButton.addEventListener('click', closePopupProfile); 
popupCloseButtonElem.addEventListener('click', closePopupElem); 
popupCloseButtonImg.addEventListener('click', closePopupImg); 

function keyHandlerClick(evt) {
  if (evt.target === evt.currentTarget){
    closePopup (evt.target); 
  }
}

// закрытие popup по клику на оверлее
popupList.forEach((item) => {
  item.addEventListener('click', keyHandlerClick);
});

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
  profileInfoTitle.textContent = popupItemElemPerson.value;
  profileInfoSubtitle.textContent = popupItemElemIntro.value;
  closePopup(popupCover);
}

function addNewElement(newElement){
  // отображаем на странице
  elemSection.prepend(newElement); 
}

function formSubmitHandlerElem (evt) {
  evt.preventDefault();
  // Получим параметры из формы
  // сформируем и добавим новый Element
  const card = new Card(
    {
      name: popupItemElemTitle.value,
      link: popupItemElemLnk.value
    },
     '#element',
     openPopupImg);
  addNewElement(card.generateCard()); 

  // очистим поля формы
  evt.target.closest('.popup__content').reset();
  // закроем форму
  closePopup(popupCoverElem);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupContainer.addEventListener('submit', formSubmitHandler); 
popupContainerElem.addEventListener('submit', formSubmitHandlerElem); 

function closeByEscape(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup); 
  }
}

const initialValid =
  {
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active'    
  };

const formValidatorProfile = new FormValidator(initialValid, popupContainer);
formValidatorProfile.enableValidation();

const formValidatorElem = new FormValidator(initialValid, popupContainerElem);
formValidatorElem.enableValidation();

// объявить массив
const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

initialCards.forEach((item) => {
 // console.log(item);
  const card = new Card(item, '#element', openPopupImg);
  addNewElement(card.generateCard());  
});

