import Popup from './Popup.js';

class PopupWithImage extends Popup {
  constructor(popupSelector, 
    data) {
    super(popupSelector);  
    this._popupBigImg = this._popupCover.querySelector('.popup__big-img');
    this._popupTitle = this._popupCover.querySelector('.popup__title'); 
    
    this._imageAlt = data.name;
    this._imageSrc = data.link;
  }      
 

  open(){
    super.open();
    this._popupBigImg.src = this._imageSrc;
    this._popupBigImg.alt = this._imageAlt;  
    this._popupTitle.textContent = this._imageAlt;  
  }

} 
export default PopupWithImage;