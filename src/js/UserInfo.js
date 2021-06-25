class UserInfo {
    constructor(profileInfoTitleSelector, profileInfoSubtitleSelector) {
      this._profileInfo = document.querySelector('.profile-info');      
      this._profileInfoTitle = this._profileInfo.querySelector(profileInfoTitleSelector);
      this._profileInfoSubtitle = this._profileInfo.querySelector(profileInfoSubtitleSelector);
    }      
   
    getInputValues(){
      // возвращает объект с данными пользователя
      // Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии  
      const inputValues = [];
      inputValues[0] = this._profileInfoTitle.textContent;
      inputValues[1] = this._profileInfoSubtitle.textContent; 
      return inputValues;      
    }
  
    setUserInfo(userData){
      // принимает новые данные пользователя и 
      // добавляет их на страницу
      this._profileInfoTitle.textContent = userData.infoTitle;
      this._profileInfoSubtitle.textContent = userData.infoSubTitle;
    }  
  } 
  
  export default UserInfo;