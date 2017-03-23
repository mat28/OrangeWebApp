// @flow

import {observable, action, computed} from 'mobx';
import PouchDbService from '../services/PouchDbService.js';
import Cookie from 'react-cookie';
import config from '../config.js'


class HomeViewStore {
  @observable width:number = 0;
  @observable height:number = 0;

  @action _loadInitialState() {
    const cookie = Cookie.load(config.cookie);
    if (cookie !== undefined){
      // PouchDbService.getData(cookie).then((response) => {
      //   return response.json();
      // }).then((response) => {
      //
      // });
    }
  }

  @action updateDimensions(width:number, height:number){
      this.width = width;
      this.height = height;
  }

  @computed get dimensionWindow():boolean {
    return this.height > this.width;
  }
}

export default new HomeViewStore();
