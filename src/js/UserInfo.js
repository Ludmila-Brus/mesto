class UserInfo {
    constructor(profileInfoTitleSelector, profileInfoSubtitleSelector) {
      this._profileInfoTitle = this._profileInfo.querySelector(profileInfoTitleSelector);
      this._profileInfoSubtitle = this._profileInfo.querySelector(profileInfoSubtitleSelector);
    }      
   
    getInputValues(){
      // возвращает объект с данными пользователя
      // Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии  
      const userData = {
        infoTitle : this._profileInfoTitle.textContent,
        infoSubtitle : this._profileInfoSubtitle.textContent  
      }           
      return userData;      
    }
  
    setUserInfo(userData){
      // принимает новые данные пользователя и 
      // добавляет их на страницу
      this._profileInfoTitle.textContent = userData.infoTitle;
      this._profileInfoSubtitle.textContent = userData.infoSubTitle;
    
    }
  
  } 
  export default UserInfo;