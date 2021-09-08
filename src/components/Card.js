class Card {

  constructor(
      data, 
      cardSelector, 
      openPopupImg, 
      getPopupConfirm, 
      getUserId,
      handleLikeButtonClick
    ) {
    this._title = data.name;
    this._image = data.link; 
    this._likes = data.likes;
    this._ownerLike = data.ownerLike;
    this._ownerId = data.ownerId;
    this._id = data.id;
    this._cardSelector = cardSelector;
    this._openPopupImg = openPopupImg;
 //   this._getPopupConfirm = getPopupConfirm;
    this._handleRemoveMessageClick = getPopupConfirm;
    this._getUserId = getUserId;
    this._handleLikeButtonClick = handleLikeButtonClick;
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
    this._element.querySelector('.element__likes').textContent = this._likes;  

    if (this._ownerLike === 1) {
      this._element.querySelector('.element__like-button').classList.add('element__like-button_liked');      
    } else 
    {
      this._element.querySelector('.element__like-button').classList.remove('element__like-button_liked');      
    }

    if (this._ownerId === this._getUserId()) {
      this._element.querySelector('.element__del-button').classList.add('element__del-button_visible'); 
    } else
    {
      this._element.querySelector('.element__del-button').classList.remove('element__del-button_visible'); 
    };

    return this._element;
  }

  _setEventListeners() {
    // повесить обработчик like на новый добавленный элемент
    this._element.querySelector('.element__like-button').addEventListener('click', (evt) => {
      this._handleLikeButtonClick(evt);
    });
    // повесить обработчик картинки на новый добавленный элемент
    this._imgElem.addEventListener('click', () => {
      this._handleOpenPopupImgClick()
    });    
    // повесить обработчик del на новый добавленный элемент
    this._element.querySelector('.element__del-button').addEventListener('click', () => {
      // в переменной evt.target окажется элемент
      // button, на который мы кликнули
      this._handleRemoveMessageClick();
    });
  }

  /*  _handleLikeButtonClick(evt) {

    evt.target.classList.toggle('element__like-button_liked');    
  }  */

  setUnsetLike(evt){
    evt.target.classList.toggle('element__like-button_liked');
  }

  setLikeCount(likeCount){
    this._element.querySelector('.element__likes').textContent = likeCount;    
  }

  isLiked(){
    return this._element.
      querySelector('.element__like-button').
      classList.contains('element__like-button_liked');
  }

  _handleOpenPopupImgClick() {
    this._openPopupImg (
      {
        name: this._title,
        link: this._image
      }
    );
  }

  remove(){
    this._element.remove();
  }

  get_card_id(){
    return this._id;
  }
  /* _handleRemoveMessageClick() {
    if (this._getPopupConfirm()){
      this._element.remove();
    }
  } */
}

export default Card;