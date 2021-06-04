class Card {

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
    this._imgElem.addEventListener('click', () => {
      this._handleOpenPopupImgClick()
    });    
    // повесить обработчик на новый добавленный элемент
    this._element.querySelector('.element__del-button').addEventListener('click', () => {
      // в переменной evt.target окажется элемент
      // button, на который мы кликнули
      this._handleRemoveMessageClick();
    });
  }

  _handleLikeButtonMessageClick(evt) {
    evt.target.classList.toggle('element__like-button_liked');    
  }

  _handleOpenPopupImgClick() {
    this._openPopupImg (this._image, this._title);
  }

  _handleRemoveMessageClick() {
    //evt.target.closest('.element').remove();
    this._element.remove();
  }

}

export default Card;