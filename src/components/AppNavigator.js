import React, {Component} from 'react';
import { Router, Route, browserHistory } from 'react-router';
import { observer } from 'mobx-react';
import home from './home';
import guide from './guide';
import install from './install';
import perso from './perso';

@observer
class AppNavigator extends Component {
  render(){
    return(
      <Router history={browserHistory}>
        <Route path="/" component={home} />
        <Route path="/guide" component={guide} />
        <Route path="/install" component={install} />
        <Route path="/perso" component={perso} />
      </Router>
    )
  }
}

export default AppNavigator;
