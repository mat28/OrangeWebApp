import React, {Component} from 'react';
import { observer } from 'mobx-react';
import HomeViewStore from '../../actions/HomeViewStore';
import FirstPage from './firstPage.js';
import OtherDevice from '../otherdevice';
import config  from '../../config.js';
import Cookie from 'react-cookie';


@observer
class Home extends Component {
  constructor(props){
    super(props);
    this.updateDimensions = this.updateDimensions.bind(this);
    this.state = {
      testDimension : false
    }
  }

  componentWillMount(){
    this.updateDimensions();
  }

  updateDimensions(){
    HomeViewStore.updateDimensions($(window).width(), $(window).height());
    this.setState({
      testDimension : HomeViewStore.dimensionWindow
    });
  }

  componentDidMount(){
    window.addEventListener('resize', this.updateDimensions);
  }

  componentWillUnMount(){
    window.removeEventListener('resize', this.updateDimensions);
  }
  /* eslint-disable no-alert, no-console */
  render(){
    return(
      <div>
      {this.state.testDimension ?
        (<FirstPage/>)
        :
        (<OtherDevice/>)
      }
      </div>
    )
  }
}

export default Home;
