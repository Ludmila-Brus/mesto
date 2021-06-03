class Card {
  _openPopupImg;

  constructor(data, cardSelector, openPopupImg) {
    this._title = data.name;
    this._image = data.link;
    this._cardSelector = cardSelector;
    this._openPopupImg = openPopupImg;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector(this._cardSelector)
      .content
      .querySelector('.element')
      .cloneNode(true);

    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._imgElem = this._element.querySelector('.element__image');  
    // добавим обработчики    
    this._setEventListeners(); 

    // наполняем содержимым
    this._imgElem.src = this._image;
    this._imgElem.alt = this._title;  
    this._element.querySelector('.element__title').textContent = this._title;

    return this._element;
  }

  _setEventListeners() {
    // повесить обработчик на новый добавленный элемент
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._handleLikeButtonMessageClick(evt);
    });
    // повесить обработчик картинки на новый добавленный элемент
    this._imgElem.addEventListener('click', (evt) => {
      this._handleOpenPopupImgClick(evt)
    });    
    // повесить обработчик на новый добавленный элемент
    this._element.querySelector('.element__del-button').addEventListener('click', (evt) => {
      // в переменной evt.target окажется элемент
      // button, на который мы кликнули
      this._handleRemoveMessageClick(evt);
    });
  }

  _handleLikeButtonMessageClick(evt) {
    evt.target.classList.toggle('element__like-button_liked');    
  }

  _handleOpenPopupImgClick(evt) {
  //  console.log(evt);
  //  console.log(this._openPopupImg);
    // openPopupImg (evt.target.src, evt.target.alt);
    this._openPopupImg (evt.target.src, evt.target.alt);
  }

  _handleRemoveMessageClick(evt) {
    evt.target.closest('.element').remove();
  }

}

export default Card;