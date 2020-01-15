import React, { useEffect } from 'react'
import { useHistory } from "react-router-dom";
import { connect } from 'react-redux';
import { makeStyles, Paper, Typography, Grid, FormControl, OutlinedInput, Button } from '@material-ui/core'
import TestsList from '../components/TestsList';
import { actions, selectors } from '../duck';

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

const ListPage = ({ onShow, tests }) => {
  const classes = useStyles();
  const history = useHistory();

  useEffect(() => {
    onShow();
  }, []);

  const handleTestSelect = (testId) => {
    history.push(`/stats/${testId}`);
  }

  const handleCopy = (testId) => {
    const text = `${location.protocol}//${location.host}/${testId}`;
    navigator.clipboard.writeText(text)
  }

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12}>
          <Paper className={classes.paper}>
            <Typography variant='h6'>Pick one test to view</Typography>

            <TestsList items={tests} onClick={handleTestSelect} onCopy={handleCopy} />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  tests: selectors.getTests(state)
});

const mapDispatchToProps = {
  onShow: actions.fetchTests
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListPage);
