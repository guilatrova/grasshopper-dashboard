import React from 'react'
import { connect } from 'react-redux';
import { makeStyles, Paper, Typography, Grid } from '@material-ui/core'

import SwarmLocust from './SwarmLocustContainer';
import ExpandablePaper from '/app/shared/components/ExpandablePaper';
import UsersChart from './UsersChart'
import { selectors } from '../duck';

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

const UsersPage = ({
  swarmControl,
  usersAmount

}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <ExpandablePaper title="Users">
            <UsersChart />
          </ExpandablePaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <SwarmLocust />
          </Paper>

          <Paper className={classes.paper}>
            <Typography variant='h6'>Goal</Typography>

            <Typography variant="subtitle1">Users: {swarmControl.users}</Typography>
            <Typography variant="subtitle1">Hatch rate: {swarmControl.rate}</Typography>
          </Paper>

          <Paper className={classes.paper}>
            <Typography variant='h6'>Currently</Typography>

            <Typography variant="subtitle1">Users: {usersAmount}</Typography>
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  swarmControl: selectors.getSwarm(state),
  usersAmount: selectors.getCurrentAmountUsers(state)
})

const mapDispatchToProps = {

}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UsersPage);
