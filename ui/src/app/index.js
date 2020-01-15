import React from 'react'
import { Switch, BrowserRouter as Router, Route, Redirect } from 'react-router-dom'

import Header from './shared/containers/Header';
import Navbar from './shared/components/Navbar';
import ListPage from './storage/containers/ListPage';
import Routes from './Routes';

const App = () => {
  return (
    <React.Fragment>
      <Header />
      <Router>
        <Navbar />

        <Switch>
          <Redirect exact strict from="/" to="/stats" />
          <Redirect exact strict from="/:id(\d+)" to="/stats/:id" />

          <Route strict path="/list" component={ListPage} />
          <Route strict path="/:area/:testId?" component={Routes} />
        </Switch>

      </Router>
    </React.Fragment>
  )
}

export default App;
