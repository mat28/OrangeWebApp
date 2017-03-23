// @flow

import {observable, action, computed} from 'mobx';
import PouchDbService from '../services/PouchDbService.js';
import PageService from '../services/PageService.js'
import Cookie from 'react-cookie';
import config from '../config.js';


class GuideViewStore {
  @observable allPage;
  @observable actuallyPage;
  @observable nextPage;
  @observable indexPage:number;

  constructor(){
    this.allPage = [];
    this.actuallyPage = {}
    this.nextPage = {};
    this.indexPage= 0;
  }

  @action _loadInitialState(){
    this.allPage = PageService.getAllPages();
  }

  @computed get indexProgress(){
    return this.indexPage * 10;
  }

  @computed get etape(){
    return "Etape "  + (this.indexPage + 1);
  }


  @action setActuallyPage(index: number){
    this.actuallyPage = this.allPage[index];
  }

  @action setIndexNextPage(){
    this.indexPage++;
  }

  @action setSautIndex(saut){
    this.indexPage+=saut;
  }

  @action setIndexPrevPage(){
    this.indexPage--;
  }

  @computed get getActuallyPage() {
    return this.actuallyPage;
  }
}

export default new GuideViewStore();
