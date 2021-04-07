let profileInfo = document.querySelector('.profile-info');
let editButtonProfile = profileInfo.querySelector('.profile-info__edit-button');
let addButtonElem = document.querySelector('.profile__add-button');


let profileInfoTitle = profileInfo.querySelector('.profile-info__title');
let profileInfoSubtitle = profileInfo.querySelector('.profile-info__subtitle');

let popupCover = document.querySelector('.popup-profile');
let popupCoverElem = document.querySelector('.popup-elem');
let popupContainer = popupCover.querySelector('.popup__content');
let popupContainerElem = popupCoverElem.querySelector('.popup__content');
let popupItemElemFio = popupContainer.querySelector('.popup__item_elem_fio');
let popupItemElemIntro = popupContainer.querySelector('.popup__item_elem_intro');
let popupCloseButton = popupContainer.querySelector('.popup__close-button');
let popupCloseButtonElem = popupContainerElem.querySelector('.popup__close-button');

function setPopupItemProfile () {
  popupItemElemFio.value = profileInfoTitle.textContent;
  popupItemElemIntro.value = profileInfoSubtitle.textContent;
}

function openPopup (popupCoverParam) {
  popupCoverParam.classList.add('popup_opened');
}

function openPopupProfile () {
  openPopup(popupCover);
  setPopupItemProfile();  
}

function openPopupElem () {
  openPopup(popupCoverElem);
}

editButtonProfile.addEventListener('click', openPopupProfile); 
addButtonElem.addEventListener('click', openPopupElem); 

function closePopup (popupCoverParam) {
  popupCoverParam.classList.remove('popup_opened'); 
}

function closePopupProfile () {
  closePopup(popupCover); 
}

function closePopupElem () {
  closePopup(popupCoverElem); 
}

popupCloseButton.addEventListener('click', closePopupProfile); 
popupCloseButtonElem.addEventListener('click', closePopupElem); 

// Обработчик «отправки» формы, хотя пока
// она никуда отправляться не будет
function formSubmitHandler (evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.
                                              // Так мы можем определить свою логику отправки.
                                              // О том, как это делать, расскажем позже.

  // Получите значение полей jobInput и nameInput из свойства value

  // Выберите элементы, куда должны быть вставлены значения полей

  // Вставьте новые значения с помощью textContent
  profileInfoTitle.textContent = popupItemElemFio.value;
  profileInfoSubtitle.textContent = popupItemElemIntro.value;
  closePopup(popupCover);
}

function formSubmitHandlerElem (evt) {
  evt.preventDefault(); 
  // дабавим новый Element
  
  closePopup(popupCoverElem);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupContainer.addEventListener('submit', formSubmitHandler); 
popupContainerElem.addEventListener('submit', formSubmitHandlerElem); 