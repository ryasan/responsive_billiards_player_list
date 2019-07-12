import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import './scss/style.scss';
import HomePage from './pages/home';
import DetailsPage from './pages/details';

const App = () => (
  <BrowserRouter basename="/mirum_assignment">
    <Switch>
      <Route path="/" exact component={HomePage} />
      <Route path="/details" component={DetailsPage} />
    </Switch>
  </BrowserRouter>
);

export default App;
