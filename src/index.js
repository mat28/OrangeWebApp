import 'core-js/fn/object/assign';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/Main';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
// Render the main component into the dom
ReactDOM.render(<MuiThemeProvider muiTheme={getMuiTheme()}><App /></MuiThemeProvider>, document.getElementById('app'));
