let profileInfo = document.querySelector('.profile-info');
let editButtonProfile = profileInfo.querySelector('.profile-info__edit-button');
let addButtonElem = document.querySelector('.profile__add-button');

let profileInfoTitle = profileInfo.querySelector('.profile-info__title');
let profileInfoSubtitle = profileInfo.querySelector('.profile-info__subtitle');

let popupCover = document.querySelector('.popup-profile');
let popupCoverElem = document.querySelector('.popup-elem');
let popupCoverImg = document.querySelector('.popup-img');

let popupContainer = popupCover.querySelector('.popup__content');
let popupContainerElem = popupCoverElem.querySelector('.popup__content');
let popupContainerImg = popupCoverImg.querySelector('.popup__content-img');

let popupItemElemFio = popupContainer.querySelector('.popup__item_elem_fio');
let popupItemElemIntro = popupContainer.querySelector('.popup__item_elem_intro');
let popupCloseButton = popupContainer.querySelector('.popup__close-button');
let popupCloseButtonElem = popupContainerElem.querySelector('.popup__close-button');
let popupItemElemTitle = popupContainerElem.querySelector('.popup__item_elem_title');
let popupItemElemLnk = popupContainerElem.querySelector('.popup__item_elem_lnk');
let popupCloseButtonImg = popupContainerImg.querySelector('.popup__close-button');

function setPopupItemProfile () {
  popupItemElemFio.value = profileInfoTitle.textContent;
  popupItemElemIntro.value = profileInfoSubtitle.textContent;
}

function openPopup (popupCoverParam, popupContainerParam) {
  popupCoverParam.classList.remove('popup_trans-delay');
  popupCoverParam.classList.add('popup_opened');
}

function openPopupProfile () {
  openPopup(popupCover, popupContainer);
  setPopupItemProfile();  
}

function openPopupElem () {
  openPopup(popupCoverElem, popupContainerElem);
}

function openPopupImg (imageSrc, imageAlt) {
  openPopup(popupCoverImg, popupContainerImg);
  const popupBigImg = document.querySelector('.popup__big-img');
  const popupTitle = document.querySelector('.popup__title');
  popupBigImg.src = imageSrc;
  popupBigImg.alt = imageAlt;  
  popupTitle.textContent = imageAlt;  
}

editButtonProfile.addEventListener('click', openPopupProfile); 
addButtonElem.addEventListener('click', openPopupElem); 

function closePopup (popupCoverParam, popupContainerParam) {  
 popupCoverParam.classList.add('popup_trans-delay'); 
 popupCoverParam.classList.remove('popup_opened');   
}

function closePopupProfile () {
  closePopup(popupCover, popupContainer); 
}

function closePopupElem () {
  closePopup(popupCoverElem, popupContainerElem); 
}

function closePopupImg () {
  closePopup(popupCoverImg, popupContainerImg); 
}

popupCloseButton.addEventListener('click', closePopupProfile); 
popupCloseButtonElem.addEventListener('click', closePopupElem); 
popupCloseButtonImg.addEventListener('click', closePopupImg); 

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

function addNewElement(imageSrc, imageAlt, elemTitle){
  // куда клонировать будем
  const elemSection = document.querySelector('.elements');
  // получить содержимое template, через его свойство content
  const elemTemplate = document.querySelector('#element').content;
  // клонируем содержимое тега template
  const newElement = elemTemplate.querySelector('.element').cloneNode(true);
  // наполняем содержимым
  newElement.querySelector('.element__image').src = imageSrc;
  newElement.querySelector('.element__image').alt = imageAlt;  
  newElement.querySelector('.element__title').textContent = elemTitle;
  
  // повесить обработчик на новый добавленный элемент
  const likeButtonElem = newElement.querySelector('.element__like-button');
  likeButtonElem.addEventListener('click', function (evt) {
    // в переменной eventTarget окажется элемент
    // button, на который мы кликнули
    const eventTarget = evt.target;
    eventTarget.classList.toggle('element__like-button_liked');
  });
  
  // повесить обработчик картинки на новый добавленный элемент
  //  const imgElem = newElement.querySelector('.element__image');
  const imgElem = newElement.querySelector('.element__image');  
  imgElem.addEventListener('click', function (evt){
    const eventTarget = evt.target;
    openPopupImg (eventTarget.src, eventTarget.alt);
  });

  // повесить обработчик на новый добавленный элемент
  const delButtonElem = newElement.querySelector('.element__del-button');
  delButtonElem.addEventListener('click', function (evt) {
    // в переменной eventTarget окажется элемент
    // button, на который мы кликнули
    const parentElement = evt.target.parentElement;
    parentElement.remove();
  });

  // отображаем на странице
  elemSection.prepend(newElement); 
}

function formSubmitHandlerElem (evt) {
  evt.preventDefault();
  // Получим параметры из формы
  // дабавим новый Element
  addNewElement(popupItemElemLnk.value,popupItemElemTitle.value,popupItemElemTitle.value);
  // закроем форму
  closePopup(popupCoverElem);
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupContainer.addEventListener('submit', formSubmitHandler); 
popupContainerElem.addEventListener('submit', formSubmitHandlerElem); 

// инициализация
function initGrid(){
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


  // удалить существующие карточки
  const elemSection = document.querySelector('.elements');
  // псевдомассив дочерних элементов
  const listElements = elemSection.children;
  const listElementsLength = listElements.length;
  for (var i = 0; i < listElementsLength; i++) {
    listElements[0].remove();
  }
  
  // заполнить карточки из массива
  for (var i = 0; i < initialCards.length; i++) {
    addNewElement(initialCards[i].link,initialCards[i].name,initialCards[i].name);
  }
}

// инициализация
initGrid();

// повесить обработчики на все элементы
// повесить обработчик на новый добавленный элемент
//const likeButtonElem = document.querySelector('.element__like-button');
//likeButtonElem.addEventListener('click', function (evt) {
  // в переменной eventTarget окажется элемент
  // button, на который мы кликнули
  //  const eventTarget = evt.target;
  //  console.log(`Классы: ${eventTarget.classList}`);
 
   // eventTarget.classList.toggle('element__like-button_liked');
   // console.log(`Классы: ${eventTarget.classList}`);
//}); 
