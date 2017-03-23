import data from './data/data.json';



function getAllPages(){
  return data.allpages
}

function getEquipements(){
  return data.equipements;
}

function getPerso(){
  return data.perso;
}

export default {getAllPages, getEquipements, getPerso};
