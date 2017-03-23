// @flow

import {observable, action, computed} from 'mobx';
import PouchDbService from '../services/PouchDbService.js';
import PageService from '../services/PageService.js'
import Cookie from 'react-cookie';
import config from '../config.js';


class InstallViewStore {
    @observable indexPage:number;
    @observable equipPage;
    @observable actuallyPage;
    @observable allData;
    @observable dataFilter;

    constructor(){
      this.indexPage = 0;
      this.equipPage = [];
      this.actuallyPage = {};
      this.allData = [];
      this.dataFilter = [];
    }

    @action _loadInitialState(){
      this.equipPage = PageService.getEquipements();
    }

    @computed get getPrenom() {
      if(this.allData.length > 0){
        return this.allData[0].prenom;
      } else {
        return "";
      }
    }

    @computed get getListeChoix() {
      this.allData.map((item, index) => {
        if(!item.prenom){
          this.dataFilter.push(item);
        }
      });
      return this.dataFilter;
    }

    @computed get etape(){
      return "Etape "  + (this.indexPage + 1);
    }

    @action setActuallyPage(index: number){
      this.actuallyPage = this.equipPage[index];
    }

    @computed get getAllData(){
      return this.allData;
    }

    @action setIndexNextPage(){
      this.indexPage++;
    }

    @action setData(object){
      this.allData.push(object);
    }
}

export default new InstallViewStore();
