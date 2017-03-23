require('normalize.css/normalize.css');
require('styles/App.css');
require('styles/sweetalert.css');

import React, {Component} from 'react';
import { autobind } from 'core-decorators';
import AppNavigator from './AppNavigator.js';
import { observer } from 'mobx-react';
import AppViewStore from '../actions/AppViewStore.js';
import LoadingOrange from './AppLoading.js';

@autobind
class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.updateParent = this.updateParent.bind(this);
    AppViewStore.setLoader();
  }

  componentWillMount(){
    const cookie = AppViewStore.checkCookie();
    if(cookie !== undefined){
      AppViewStore.setAppLoading();
    }
  }

  updateParent(){
    this.forceUpdate();
  }

  @observer
  render() {
    return (
      <div>
      {AppViewStore.Loading ?
        <LoadingOrange updateParent={this.updateParent}/>
        :
        <AppNavigator />
      }
      </div>
    );
  }
}

export default AppComponent;
