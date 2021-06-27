import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);  
    this._popupBigImg = this._popupCover.querySelector('.popup__big-img');
    this._popupTitle = this._popupCover.querySelector('.popup__title'); 
  }      
 
  open(name, link){
    super.open();
    this._popupBigImg.src = link;
    this._popupBigImg.setAttribute('alt', `увеличенное изображение ${name}`);
    this._popupTitle.textContent = name;  
  }

} 
export default PopupWithImage;