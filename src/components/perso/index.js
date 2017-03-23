import React, { Component } from 'react';
import { observer } from 'mobx-react';
import GuideViewStore from '../../actions/GuideViewStore.js';
import HomeViewStore from '../../actions/HomeViewStore.js';
import InstallViewStore  from '../../actions/InstallViewStore.js';
import PersoViewStore from '../../actions/PersoViewStore.js';
import OtherDevice from '../otherdevice';
import { Grid, Row, Col } from 'react-flexbox-grid';
import AppBar from 'material-ui/AppBar';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import { browserHistory } from 'react-router';
import Divider from 'material-ui/Divider';

@observer
class Perso extends Component {
  constructor(props){
    super(props);
    this.state = {
      testDimension : true
    }
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount(){
    PersoViewStore._loadInitialState();
  }

  next() {
    browserHistory.push('/guide');
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

  choiceEquipement(event,item){
    var object = `{"${item.validation}" : "${event.target.value}"}`
    PersoViewStore.setData(JSON.parse(object));
  }


  render(){
    return(
      <div>
        {this.state.testDimension ?
        (<Grid>
          <Row>
            <AppBar
              title={PersoViewStore.title}
              showMenuIconButton={false}
              style={{"backgroundColor":"#F26E00", fontWeight:700}}
            />
          </Row>
          <br/>
          <Row center="xs">
            {PersoViewStore.persoPage.map((item,index) => (
                <Checkbox
                  key={index}
                  label={item.label}
                  style={{"marginBottom" : 16}}
                  iconStyle={{fill: "#F26E00"}}
                  inputStyle={{color:"#F26E00"}}
                  onCheck={(event) => this.choiceEquipement(event, item)}
                />)
            )}
          </Row>
          <br/>
          <br/>
          <br/>
          <Row center="xs">
            <RaisedButton
              label="Valider"
              onClick={() => this.next(true)}
              backgroundColor="#F26E00"
              fullWidth={false}
              labelStyle={{"color" : "#FFFFFF", "fontWeight" : 700}}
              buttonStyle={{"height":" 70px","lineHeight": "36px","width": "150%"}}
              style={{marginRight:20}}
            />
          </Row>
        </Grid>)
        : <OtherDevice/>}
      </div>
    )
  }
}

export default Perso;
