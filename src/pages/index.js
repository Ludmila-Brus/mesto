import './index.css';
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
    fetch('https://mesto.nomoreparties.co/v1/cohort-25/users/me', {
      method: 'PATCH',  
      headers: {
        authorization: '54b8222d-4fbc-42db-9de4-60158ca8ba24',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputValues.person,
        about: inputValues.intro
      })
    })
     .then((res) => {
      if (res.ok) {
        return res.json();
      }
      /* отклоняем промис, чтобы перейти
      в блок catch, если сервер вернул ошибку */
      return Promise.reject(`Профиль: Что-то пошло не так: ${res.status}`);
    })
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
          fetch(`https://mesto.nomoreparties.co/v1/cohort-25/cards/${cardId}`, {
            method: 'DELETE',
            headers: {
              authorization: '54b8222d-4fbc-42db-9de4-60158ca8ba24'
            }
          })
          .then((res) => {
            if (res.ok) {
              card.remove();
              popupConfirm.close();    
              return;
          }
          // отклоняем промис, чтобы перейти
          //в блок catch, если сервер вернул ошибку 
          return Promise.reject(`Удаление карточки: Что-то пошло не так: ${res.status}`);
          })
          .catch((err) => {
            console.log(err); // "Что-то пошло не так: ..."
          }); 
        }
      )
      popupConfirm.open();
    },
    () => {
      return userInfo.getUserId();
    }  
  );
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

    fetch('https://mesto.nomoreparties.co/v1/cohort-25/cards', {
      method: 'POST',  
      headers: {
        authorization: '54b8222d-4fbc-42db-9de4-60158ca8ba24',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name: inputValues["elem-title"],
        link: inputValues["elem-lnk"]
      })
    })
     .then((res) => {
      if (res.ok) {
        return res.json();
      }
      /* отклоняем промис, чтобы перейти
      в блок catch, если сервер вернул ошибку */
      return Promise.reject(`Карточка: Что-то пошло не так: ${res.status}`);
    })
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


fetch('https://mesto.nomoreparties.co/v1/cohort-25/users/me', {
  headers: {
    method: 'GET',
    authorization: '54b8222d-4fbc-42db-9de4-60158ca8ba24'
  }
})
.then((res) => {
  if (res.ok) {
    return res.json();
  }
  /* отклоняем промис, чтобы перейти
  в блок catch, если сервер вернул ошибку */
  return Promise.reject(`Профиль: Что-то пошло не так: ${res.status}`);
})
.then((result) => {
  userInfo.setUserInfo(
    {
      person: result.name,
      intro: result.about,
      id: result._id
    }  
  );
  // карточки грузим после профиля

 /*  fetch('https://mesto.nomoreparties.co/v1/cohort-25/cards', {
    headers: {
      method: 'GET',
      authorization: '54b8222d-4fbc-42db-9de4-60158ca8ba24'
    }
  })
  .then((res) => {
    if (res.ok) {
      return res.json();
    }
    // отклоняем промис, чтобы перейти
    //в блок catch, если сервер вернул ошибку 
    return Promise.reject(`Карточки: Что-то пошло не так: ${res.status}`);
  })
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
    console.log(err); // "Что-то пошло не так: ..."
  });  */
  
  // конец карточки после профиля
})
.catch((err) => {
  console.log(err); // "Что-то пошло не так: ..."
}); 


fetch('https://mesto.nomoreparties.co/v1/cohort-25/cards', {
  headers: {
    method: 'GET',
    authorization: '54b8222d-4fbc-42db-9de4-60158ca8ba24'
  }
})
.then((res) => {
  if (res.ok) {
    return res.json();
  }
  // отклоняем промис, чтобы перейти
  //в блок catch, если сервер вернул ошибку 
  return Promise.reject(`Карточки: Что-то пошло не так: ${res.status}`);
})
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
  console.log(err); // "Что-то пошло не так: ..."
}); 


//console.log('test1');
//console.log(initialCards);
//console.log('test2');
//console.log(cardsList);
//console.log(userInfo.getUserId());
//console.log(userId);


