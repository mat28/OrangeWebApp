// @flow

import {observable, action, computed} from 'mobx';
import PouchDbService from '../services/PouchDbService.js';
import PageService from '../services/PageService.js'
import Cookie from 'react-cookie';
import config from '../config.js';


class PersoViewStore {
    @observable persoPage:Array;
    @observable title:string;
    @observable allData:Array;

    constructor(){
      this.persoPage = [];
      this.title = "L'équipement que vous avez ?";
      this.allData = [];
    }

    @action _loadInitialState(){
      this.persoPage = PageService.getPerso();
      console.log(this.persoPage);
    }

    @action setData(object){
      this.allData.push(object);
    }

}

export default new PersoViewStore();
