import './index.css';
import Api from '../components/Api';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import FormValidator from '../components/Formvalidator.js';
//import initialCards from '../js/const.js';
import UserInfo from '../components/UserInfo.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupConfirm from '../components/PopupConfirm';

let initialCards = [];

const profileInfo = document.querySelector('.profile-info');
const editButtonProfile = profileInfo.querySelector('.profile-info__edit-button');
const addButtonElem = document.querySelector('.profile__add-button');
const editButtonAvatar = document.querySelector('.profile-avatar-button');

const initialValid =
  {
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__item-error_active'    
  };

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',
  headers: {
    authorization: '54b8222d-4fbc-42db-9de4-60158ca8ba24',
    'Content-Type': 'application/json'
  }
});  

const userInfo = new UserInfo(
  '.profile-info__title',
  '.profile-info__subtitle'
);

const popupProfile = new PopupWithForm(
  '.popup_type_edit-form',
  (inputValues) => {
    api.editUserInfo(inputValues)
    .then((result) => {
      userInfo.setUserInfo(
        {
          person: result.name,
          intro: result.about,
          id: result._id 
        }  
      ); 
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    });      
  }
);
popupProfile.setEventListeners();

const popupImage = new PopupWithImage(
  '.popup_type_show-image'
);
popupImage.setEventListeners();

const popupConfirm = new PopupConfirm(
  '.popup_type_confirm'
);
popupConfirm.setEventListeners();

function createCard(item) {
  // сформируем и добавим новый Element
  const card = new Card(
    item,
    '#element',
    (item) => {
      popupImage.open(item.name, item.link);
    },
    () => {
      popupConfirm.setOnSubmit(
        () => {
          const cardId = card.get_card_id();
          api.deleteCard(cardId)
          .then(() => {
              card.remove();
              popupConfirm.close(); 
            }
          )
          .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
          }); 
        }
      )
      popupConfirm.open();
    },
    () => {
      return userInfo.getUserId();
    },
    (evt) => {
          let methodLike = 'PUT';
          if (card.isLiked()){
            methodLike = 'DELETE';
          }
          const cardId = card.get_card_id();
          api.editLikeCard(methodLike, cardId)
          .then((result) => {
            const item = {
              name: result.name,
              link: result.link,
              likes: result.likes.length,
              ownerId: result.owner._id, 
              id: result._id
            };
            card.setUnsetLike(evt);
            card.setLikeCount(result.likes.length);
            }
          )          
          .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
          }); 
        } 
      )
  return card.generateCard();
} 

const cardsList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardsList.addItem(createCard(item));
    },
  },
  '.elements'
); 
  
const popupCard = new PopupWithForm(
  '.popup_type_add-card',
  (inputValues) => {
    api.addCard(inputValues)
    .then((result) => {      
      const item = {
        name: result.name,
        link: result.link,
        likes: result.likes.length,
        ownerId: result.owner._id, 
        id: result._id
      };
      // сформируем и добавим новый Element
      cardsList.addItem(createCard(item));
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    });  

  }
);
popupCard.setEventListeners();

const popupAvatar = new PopupWithForm(
  '.popup_type_avatar',
  (inputValues) => {      
    api.editAvatar(inputValues["avatar-lnk"])
    .then((result) => {
      userInfo.setUserAvatar(result.avatar);
    })
    .catch((err) => {
      console.log(err); // "Что-то пошло не так: ..."
    });  
  }
);
popupAvatar.setEventListeners();

const formValidatorProfile = new FormValidator(initialValid, popupProfile.popupContainer);
formValidatorProfile.enableValidation();

const formValidatorElem = new FormValidator(initialValid, popupCard.popupContainer);
formValidatorElem.enableValidation();

const formValidatorAvatar = new FormValidator(initialValid, popupAvatar.popupContainer);
formValidatorAvatar.enableValidation();

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

editButtonAvatar.addEventListener(
  'click', 
  () => {
    popupAvatar.open();
    // очистим от прежних ошибок
    formValidatorAvatar.prepareFormBeforeOpen();     
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

api.getInitialUser()
  .then((result) => {
    userInfo.setUserInfo(
      {
        person: result.name,
        intro: result.about,
        id: result._id
      }  
    );
  })
  .catch((err) => {
    console.log(err); // "Что-то пошло не так: ..."
  });

api.getInitialCards()
  .then((result) => {
    result.forEach((item) => {
      initialCards.unshift({
        name: item.name,
        link: item.link,
        likes: item.likes.length,
        ownerId: item.owner._id,
        id: item._id
      }); 
    });
    cardsList.addInitData(initialCards);
    cardsList.renderItems();  
  })
  .catch((err) => {
    console.log(err); // выведем ошибку в консоль
  });


