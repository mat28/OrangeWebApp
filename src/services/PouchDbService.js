// @flow

import PouchDb from 'pouchdb';
import type {PersonType} from '../types/PersonType.js';
import config from '../config.js';

var db = new PouchDb(config.root);


function getInfoDb(){
  const data = db.info();
  return data;
}

function getData(_id: string){
  const data = db.get(_id);
  return data;
}

function putData(data: PersonType) {

}

export default {getInfoDb, getData, putData};
