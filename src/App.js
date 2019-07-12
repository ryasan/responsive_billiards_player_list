import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './scss/style.scss';
import HomePage from './pages/home';
import DetailsPage from './pages/details';

const App = () => (
  <BrowserRouter basename="/responsive_billiards_player_list">
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/details" component={DetailsPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
