// @flow

import {observable, action, computed} from 'mobx';
import Cookie from 'react-cookie';
import config from '../config.js';


class AppViewStore {
  @observable Loading:boolean;

  @action setLoader(){
    this.Loading = true;
  }

  @action setAppLoading(){
    this.Loading = false;
    console.log("je suis passer ici")
    Cookie.save(config.cookieAppLoading, this.Loading, {path : "/"});
  }

  @action checkCookie(){
    const cookie = Cookie.load(config.cookieAppLoading);
    return cookie;
  }

  @computed get AppLoading():boolean {
    console.log("coucou",this.Loading);
    return this.Loading;
  }

}

export default new AppViewStore();
