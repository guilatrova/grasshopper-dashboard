import React from 'react'
import { connect } from 'react-redux';
import { makeStyles, Paper, Typography, Grid } from '@material-ui/core'
import FailuresTable from '../components/FailuresTable';
import ExceptionsTable from '../components/ExceptionsTable';
import SwarmLocust from './SwarmLocustContainer';
import { actions, selectors } from '../duck';
import ExpandablePaper from '/app/shared/components/ExpandablePaper';

const useStyles = makeStyles({
  root: {
    height: '100%',
    margin: '8px'
  },
  paper: {
    margin: '8px',
    padding: '20px'
  },
})

const ErrorsPage = ({
  failures,
  exceptions
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <ExpandablePaper title="Failures">
            <FailuresTable failures={failures} />
          </ExpandablePaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <SwarmLocust />
          </Paper>

          <ExpandablePaper title="Exceptions">
            <ExceptionsTable exceptions={exceptions} />
          </ExpandablePaper>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  failures: selectors.getFailures(state),
  exceptions: selectors.getExceptions(state)
})

export default connect(
  mapStateToProps
)(ErrorsPage);
