import React, { Component } from 'react';
import { observer } from 'mobx-react';
import GuideViewStore from '../../actions/GuideViewStore.js';
import HomeViewStore from '../../actions/HomeViewStore.js';
import InstallViewStore from '../../actions/InstallViewStore.js';
import OtherDevice from '../otherdevice';
import LinearProgress from 'material-ui/LinearProgress';
import AppBar from 'material-ui/AppBar';
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import ReactSwipe from 'react-swipe';
import SweetAlert from 'sweetalert-react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { browserHistory } from 'react-router';
import RaisedButton from 'material-ui/RaisedButton';



@observer
class Guide extends Component {

  rightButtons: null;

  constructor(props){
    super(props);
    this.state = {
      show : false,
      testDimension : true
    }
    this.updateDimensions = this.updateDimensions.bind(this);
    this.setRightButtons = this.setRightButtons.bind(this);
  }

  componentWillMount(){
    GuideViewStore._loadInitialState();
    GuideViewStore.setActuallyPage(GuideViewStore.indexPage);
    this.setRightButtons();
    this.updateDimensions();
  }

  componentWillReact(){
    console.log(GuideViewStore.actuallyPage.validation);
    if((GuideViewStore.indexPage <= (GuideViewStore.allPage.length-1)) && !GuideViewStore.actuallyPage.validation ){
      GuideViewStore.setActuallyPage(GuideViewStore.indexPage);
      this.setRightButtons();
    }else if((GuideViewStore.indexPage <= (GuideViewStore.allPage.length-1)) && GuideViewStore.actuallyPage.validation) {
      this.setState({show : true});
      GuideViewStore.setActuallyPage(GuideViewStore.indexPage);
      this.setRightButtons();
    } else {
      browserHistory.push('/');
    }
  }

  setRightButtons(){
    if(GuideViewStore.indexPage > 0){
      this.rightButtons = (
        <div>
          <i className="fa fa-arrow-circle-left" style={{backgroundColor: 'transparent',color: 'white','fontSize': '24px','fontWeight': '400','marginRight':20, 'marginTop':12}} onClick={() => this.prev()}></i>
          <i className="fa fa-arrow-circle-right" style={{backgroundColor: 'transparent',color: 'white','fontSize': '24px','fontWeight': '400', 'marginRight':20, 'marginTop':12}} onClick={() => this.next()}></i>
        </div>
      );
    } else {
        this.rightButtons = (<i className="fa fa-arrow-circle-right" style={{backgroundColor: 'transparent',color: 'white','fontSize': '24px','fontWeight': '400','marginRight': 20, 'marginTop': 12}} onClick={() =>  this.next()}></i>);
    }
  }

  next() {
    this.refs.reactSwipe.next();
    GuideViewStore.setIndexNextPage();
  }

  prev() {
    GuideViewStore.setIndexPrevPage();
    this.refs.reactSwipe.prev();
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

  nextByChoice(bool) {
    if(bool){
      GuideViewStore.setSautIndex(GuideViewStore.actuallyPage.sautIfChoice);
    } else {
      GuideViewStore.setIndexNextPage();
    }
    this.refs.reactSwipe.next();
  }


  render(){
    return(
      <div>
        {this.state.testDimension ?
        (<Grid>
          <Row>
            <AppBar
              title={GuideViewStore.actuallyPage.title}
              iconElementRight={!GuideViewStore.actuallyPage.choice ? this.rightButtons : ""}
              showMenuIconButton={false}
              style={{"backgroundColor":"#F26E00", fontWeight:700}}
            />
          </Row>
          <br/>
          <Row>
            <LinearProgress color="#F26E00" mode="determinate" style={{"height":"10px"}} value={GuideViewStore.indexProgress} />
          </Row>
          <br/>
          <ReactSwipe ref="reactSwipe" className="carousel" swipeOptions={{continuous: false}}>
              {GuideViewStore.allPage.map((item,index) =>
                  <Card key={index} style={{'boxShadow':'none'}}>
                    <CardMedia
                      overlay={<CardTitle title={GuideViewStore.etape} subtitle="" />}
                    style={{'alignItems':'center','justifyContent':'center'}} >
                        <img style={{'alignItems':'center','justifyContent':'center'}} className="img-responsive2" src={'/images/'+item.image} />
                    </CardMedia>
                    <CardTitle title={item.title2} subtitle="" />
                    <CardActions>
                    {GuideViewStore.actuallyPage.choice ?
                      <Row center="xs">
                        <Col xs={6}>
                          <RaisedButton
                            label="Non"
                            onClick={() => this.nextByChoice(false)}
                            backgroundColor="#dfdfdf"
                            labelStyle={{"color" : "#000000", "fontWeight" : 700}}
                            fullWidth={false}
                          />
                        </Col>
                        <Col xs={6}>
                          <RaisedButton
                            label="Oui"
                            onClick={() => this.nextByChoice(true)}
                            backgroundColor="#F26E00"
                            labelStyle={{"color" : "#FFFFFF", "fontWeight" : 700}}
                            fullWidth={false}
                          />
                        </Col>
                      </Row>
                      : <Row></Row>
                    }
                    </CardActions>
                  </Card>
              )}
          </ReactSwipe>
          <br/>
          <SweetAlert
            show={this.state.show}
            title={`Bravo ${InstallViewStore.getPrenom}`}
            text={GuideViewStore.actuallyPage.textValidation}
            onEscapeKey={() => this.setState({ show: false })}
            onOutsideClick={() => this.setState({ show: false })}
            onConfirm={() => this.setState({show:false})}
            confirmButtonColor="#F26E00"
            type="warning"
            confirmButtonText="Valider"
          />
        </Grid>)
        : <OtherDevice/>}
      </div>
    )
  }
}

export default Guide;
