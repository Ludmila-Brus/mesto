class UserInfo {
    constructor(profileInfoTitleSelector, profileInfoSubtitleSelector) {
      this._profileInfo = document.querySelector('.profile-info');      
      this._profileInfoTitle = this._profileInfo.querySelector(profileInfoTitleSelector);
      this._profileInfoSubtitle = this._profileInfo.querySelector(profileInfoSubtitleSelector);
      this._avatar = document.querySelector('.profile-avatar');      
//      this.boundgetUserId = this._getUserId.bind(this);      
    }      
   
    getInputValues(){
      // возвращает объект с данными пользователя
      // Этот метод пригодится когда данные пользователя нужно будет подставить в форму при открытии  
      const userData = {};
      userData.person = this._profileInfoTitle.textContent;
      userData.intro = this._profileInfoSubtitle.textContent;
      return userData;       
    }
  
    setUserInfo(userData){
      // принимает новые данные пользователя и 
      // добавляет их на страницу
      this._profileInfoTitle.textContent = userData.person;
      this._profileInfoSubtitle.textContent = userData.intro;
      this._id = userData.id;
     // console.log(this._id);
    }  

    getUserId(){
    //  console.log(this._id);
      return this._id;
    }

    setUserAvatar(avatarLnk){
      this._avatar.src = avatarLnk;
     // console.log(`<%=require(${avatarLnk})%>`); 
    }
  } 
  
  export default UserInfo;