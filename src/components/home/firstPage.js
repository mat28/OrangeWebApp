import React, { Component } from 'react';
import { observer } from 'mobx-react';
import HomeViewStore from '../../actions/HomeViewStore.js';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';
import { Grid, Row, Col } from 'react-flexbox-grid';
import Divider from 'material-ui/Divider';


@observer
class FirstPage extends Component {
  constructor(props){
    super(props);
  }

  componentWillMount(){
    HomeViewStore._loadInitialState();
  }

  render(){
    return(
      <Grid>
        <Row center="xs">
          <span className="title-home">Livebox Play</span>
        </Row>
        <br/>
        <Row center="xs">
          <Col xs={8}>
            <img style={{"marginLeft":"-5rem"}}className="img-responsive-home" src="/images/I3_LB-Play-FaceAvant.png"/>
          </Col>
        </Row>
        <br/><br/><br/>
        <Row center="xs">
          <Col xs={12}>
          <RaisedButton
            label="Commencez votre nouvelle installation"
            href="/install"
            backgroundColor="#F26E00"
            fullWidth={false}
            buttonStyle={{'height':'40px'}}
            labelStyle={{"color" : "#FFFFFF", "fontSize": "14px","fontWeight" : 700}}
          />
          </Col>
        </Row>
        <br/><br/><br/><br/>
        <Divider />
        <br/><br/>
        <Row center="xs">
            <RaisedButton
              label="Modifier votre installation actuelle"
              href="/perso"
              backgroundColor="#dfdfdf"
              fullWidth={false}
              labelStyle={{"color" : "#000000", "fontSize": "14px","fontWeight" : 700, 'height':'20px','flex':1,'alignItems':'center','justifyContent':'center'}}
            />
        </Row>
        <br/><br/>
        <Row center="xs">
            <RaisedButton
              label="Informations"
              href="/info"
              backgroundColor="#dfdfdf"
              fullWidth={false}
              labelStyle={{"color" : "#000000", "fontWeight" : 700, 'height':'20px','flex':1,'alignItems':'center','justifyContent':'center'}}
            />
        </Row>
      </Grid>
    )
  }
}

export default FirstPage;
