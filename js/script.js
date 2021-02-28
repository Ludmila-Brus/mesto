let profileInfo = document.querySelector('.profile-info');
let editButton = profileInfo.querySelector('.profile-info__edit-button');

let profileInfoTitle = profileInfo.querySelector('.profile-info__title');
let profileInfoSubtitle = profileInfo.querySelector('.profile-info__subtitle');

let popup = document.querySelector('.popup');
let popupContainer = document.querySelector('.popup__container');
let popupItemElemFio = popupContainer.querySelector('.popup__item_elem_fio');
let popupItemElemIntro = popupContainer.querySelector('.popup__item_elem_intro');
let popupCloseButton = popupContainer.querySelector('.popup__close-button');

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
  popupContainer.classList.add('popup__container_opened');
  popupItemElemFio.value = profileInfoTitle.textContent;
  popupItemElemIntro.value = profileInfoSubtitle.textContent;
}); 

popupCloseButton.addEventListener('click', function () {
  popup.classList.remove('popup_opened');
  popupContainer.classList.remove('popup__container_opened');
}); 

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
  popup.classList.remove('popup_opened');
  popupContainer.classList.remove('popup__container_opened');
}

// Прикрепляем обработчик к форме:
// он будет следить за событием “submit” - «отправка»
popupContainer.addEventListener('submit', formSubmitHandler); 