import React, { useEffect } from 'react'
import { connect } from 'react-redux';
import { Switch, Route, Redirect } from 'react-router-dom'

import StatisticsPage from './locust/containers/StatisticsPage';
import ErrorsPage from './locust/containers/ErrorsPage';
import UsersPage from './locust/containers/UsersPage';
import AWSPage from './aws/containers/AWSPage';

import StateControl from './shared/components/StateControl';

const Routes = ({ ...props }) => {
  return (
    <StateControl {...props}>
      <Switch>
        <Route strict path="/errors/:testId?" component={ErrorsPage} />
        <Route strict path="/users/:testId?" component={UsersPage} />
        <Route strict path="/aws/:testId?" component={AWSPage} />
        <Route strict path="/stats/:testId?" component={StatisticsPage} />
      </Switch>
    </StateControl>
  )
};

export default Routes;
