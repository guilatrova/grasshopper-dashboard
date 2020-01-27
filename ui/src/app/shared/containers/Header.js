import React from 'react'
import { connect } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles'
import { AppBar, Toolbar, Typography } from '@material-ui/core'

import HeaderViewMode from '../components/HeaderViewMode';
import HeaderRunMode from '../components/HeaderRunMode';
import { states as appStates } from '/app/shared/duck';
import { selectors as appSelectors } from '/app/shared/duck';
import { selectors as locustSelectors } from '/app/locust/duck';

const useStyles = makeStyles({
  root: {
    height: '100%',
    margin: '8px'
  },
  title: {
    flexGrow: 5
  },
  barItem: {
    flexGrow: 1
  },
  label: {
    fontWeight: "bold"
  }
})

const Header = ({ appState, status, rps, failRatio, testTitle }) => {
  const classes = useStyles();
  const calculateFailRatio = n => `${Math.round(n * 100)}%`;
  const failRatioDisplay = failRatio > -1 ? calculateFailRatio(failRatio) : "-";

  return (
    <AppBar position='static'>
      <Toolbar>
        <Typography variant='h6' className={classes.title}>
          Grasshopper Dashboard
        </Typography>

        {appState === appStates.RUN_STATE && <HeaderRunMode status={status} rps={rps} classes={classes} />}
        {appState === appStates.VIEW_STATE && <HeaderViewMode date={status} title={testTitle} classes={classes} />}

        <Typography className={classes.barItem}>
          <span className={classes.label}>Failures</span> {failRatioDisplay}
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

const mapStateToProps = state => ({
  appState: appSelectors.getCurrentState(state),

  status: locustSelectors.getStatus(state),
  rps: locustSelectors.getTotalRPS(state),
  failRatio: locustSelectors.getTotalFailuresRate(state),
  testTitle: locustSelectors.getTestTitle(state)
});

export default connect(
  mapStateToProps
)(Header);

