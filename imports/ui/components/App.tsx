import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ThemeProvider } from 'styled-components'
import { Login } from './Login';
import { Main } from './Main';
import theme from '../themes/NormalTheme'
import moment from 'moment';

const App = (props:any):JSX.Element => {
  console.log('test dans App.js : ',typeof moment().toDate(), moment().toDate())
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route exact path='/' component={Login} />
          <Route path='/chats' component={Main} />
        </Switch>
      </Router>
    </ThemeProvider>
  )
}

export default App;
