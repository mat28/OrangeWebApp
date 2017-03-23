import React, { Component } from 'react';
import { observer } from 'mobx-react';
import GuideViewStore from '../../actions/GuideViewStore.js';
import HomeViewStore from '../../actions/HomeViewStore.js';
import InstallViewStore  from '../../actions/InstallViewStore.js';
import OtherDevice from '../otherdevice';
import { Grid, Row, Col } from 'react-flexbox-grid';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ReactSwipe from 'react-swipe';
import TextField from 'material-ui/TextField';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';
import SweetAlert from 'sweetalert-react';
import {List, ListItem} from 'material-ui/List';

class ListChoice extends Component {
  constructor(props){
    super(props);
    this.state = {
      allChoice : this.props.choice
    }
  }

  componentWillReceiveProps(nextProps){
    this.setState({allChoice : nextProps.choice});
  }

  render(){
    return(
      <List>
        {this.state.allChoice.map((item, index) =>
          <ListItem primaryText={item.label} rightIcon={item.validation ? <i className="fa fa-check" style={{'color': 'green'}}/> : <i className="fa fa-times" style={{'color' : 'red'}}/>} />
        )}
      </List>
    )
  }
}

@observer
class Install extends Component {
  constructor(props){
    super(props);
    this.state = {
      prenom : "",
      testDimension : true,
      show : false
    }
    this.updateDimensions = this.updateDimensions.bind(this);
  }

  componentWillMount(){
    InstallViewStore._loadInitialState();
    InstallViewStore.setActuallyPage(InstallViewStore.indexPage);
  }


  componentWillReact(){
    console.log(InstallViewStore.getListeChoix);
  }


  next(bool) {
    InstallViewStore.setIndexNextPage();
    if((InstallViewStore.indexPage-1) > 0 && InstallViewStore.indexPage <= (InstallViewStore.equipPage.length-1)){
      var object = `{"label" : "${InstallViewStore.actuallyPage.title2}", "validation" : "${bool}"}`;
      InstallViewStore.setData(JSON.parse(object));
      InstallViewStore.setActuallyPage(InstallViewStore.indexPage);
    } else if(InstallViewStore.indexPage > (InstallViewStore.equipPage.length-1)){
        this.setState({show : true});
    } else {
      if(bool === false){
        browserHistory.push('/');
      }
      var object = `{"${InstallViewStore.actuallyPage.validation}" : "${this.state.prenom}"}`
      InstallViewStore.setData(JSON.parse(object));
      InstallViewStore.setActuallyPage(InstallViewStore.indexPage);
    }
    this.refs.reactSwipe.next();
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

  setPrenom(event){
    this.setState({
      prenom : event.target.value
    });
  }

  confirmValue(){
    this.setState({
      show : false
    });
    browserHistory.push('perso');
  }


  render(){
    return(
      <div>
        {this.state.testDimension ?
        (<Grid>
          <Row>
            <AppBar
              title={InstallViewStore.actuallyPage.title}
              showMenuIconButton={false}
              style={{"backgroundColor":"#F26E00", fontWeight:700}}
            />
          </Row>
          <br/>
          <ReactSwipe ref="reactSwipe" className="carousel" swipeOptions={{continuous: false}}>
              {InstallViewStore.equipPage.map((item,index) =>
                  <Card key={index} style={{'boxShadow':'none'}}>
                    {InstallViewStore.indexPage > 0 ?
                      <CardMedia
                        overlay={<CardTitle title={InstallViewStore.actuallyPage.title2} subtitle="" />}
                      >
                        <img className="img-responsive" src={"/images/"+item.image} />
                      </CardMedia>
                      :
                      <Row center="xs">
                        <TextField
                          hintText="Votre Prénom"
                          floatingLabelText="Tapez votre prénom ici"
                          onChange={(event) => this.setPrenom(event)}
                          value={this.state.prenom}
                          underlineStyle={{"borderColor" : "#F26E00"}}
                          underlineFocusStyle={{"borderColor" : "#F26E00"}}
                          floatingLabelStyle={{"color": "#F26E00"}}
                          style={{'width': '400px', 'height':'100px'}}
                        />
                      </Row>
                    }
                    <br/><br/><br/>
                    <CardActions>
                      <Row center="xs">
                        <Col xs={6}>
                          <RaisedButton
                            label={InstallViewStore.indexPage == 0 ? "Annuler" : "Non"}
                            onClick={() => this.next(false)}
                            buttonStyle={{"height":" 70px","lineHeight": "36px","width": "150%"}}
                            backgroundColor="#dfdfdf"
                            labelStyle={{"color" : "#000000", "fontWeight" : 700}}
                            fullWidth={false}
                          />
                        </Col>
                        <Col xs={6}>
                          <RaisedButton
                            label={InstallViewStore.indexPage == 0 ? "Valider" : "Oui"}
                            buttonStyle={{"height":" 70px","lineHeight": "36px","width": "150%"}}
                            onClick={() => this.next(true)}
                            backgroundColor="#F26E00"
                            labelStyle={{"color" : "#FFFFFF", "fontWeight" : 700}}
                            fullWidth={false}
                          />
                        </Col>
                      </Row>
                    </CardActions>
                  </Card>
              )}
          </ReactSwipe>
        </Grid>)
        : <OtherDevice/>}
        <SweetAlert
          show={this.state.show}
          title={`Merci ${InstallViewStore.getPrenom}`}
          text="Votre installation va commencer. C'est parti !"
          onEscapeKey={() => this.setState({ show: false })}
          onOutsideClick={() => this.setState({ show: false })}
          onConfirm={() => this.confirmValue()}
          confirmButtonColor="#F26E00"
          type="warning"
          confirmButtonText="Valider"
        />
      </div>
    )
  }
}

export default Install;
