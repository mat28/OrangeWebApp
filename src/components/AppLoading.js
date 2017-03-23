import React, {Component} from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import AppViewStore from '../actions/AppViewStore.js';
import config from '../config.js';
import Cookie from 'react-cookie';


@observer
class AppLoading extends Component {
  constructor(props){
    super(props);
    this.state = {
      loading : false
    }
  }
  render(){
    setTimeout(function() {
      this.setState({loading: true});
      AppViewStore.setAppLoading();
      setTimeout(function(){
        this.props.updateParent();
      }.bind(this),500);
    }.bind(this), 3000);
    var classNameAnimation = !this.state.loading ? '' : 'animated fadeOut';
    return(
      <div className="center">
        <p className={classNameAnimation}><img src='/images/orange.png'  alt="logo_orange" /></p>
      </div>
    )
  }
}

export default AppLoading;
