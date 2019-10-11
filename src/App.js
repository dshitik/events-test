import { hot, setConfig } from 'react-hot-loader';
import React, { StrictMode } from 'react';
import { Switch, Route } from "react-router-dom";
import { EventsList } from './page/EventsList'
import { Registration } from './page/Registration'
import { Home } from './page/Home'
import { Menu } from './components/Menu'
import { PrivateRoute } from './components/PrivateRoute'
import { EventInfo } from './components/EventInfo'
import 'bootstrap/dist/css/bootstrap.min.css';

setConfig({
  logLevel: 'debug',
});

const App = () => {
  return (
    <StrictMode>
      <div className="app d-flex flex-column vh-100 ">
        <Menu/>
        <Switch>
          <PrivateRoute path={'/'} exact component={Home}/>
          <Route path={'/registration'} component={Registration}/>
          <PrivateRoute exact path='/actions-list' component={EventsList}/>
          <PrivateRoute path='/action/:id' component={EventInfo}/>
        </Switch>
      </div>
    </StrictMode>
  );
};

export default hot(module)(App)