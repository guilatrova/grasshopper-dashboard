import React from 'react'
import { connect } from 'react-redux';
import { makeStyles, Paper, Typography, Grid } from '@material-ui/core'
import TaskChart from './TaskChart'
import { selectors } from '../duck';
import ContainerImagesTable from './ContainerImagesTable';
import RDSTable from './RDSTable';
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

const AWSPage = ({ instanceSize }) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Grid container spacing={1}>
        <Grid item xs={12} md={8}>
          <ExpandablePaper title="Running Tasks">
            <TaskChart xAxisName='time' />
          </ExpandablePaper>

          <ExpandablePaper title="Containers">
            <ContainerImagesTable />
          </ExpandablePaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <Typography variant='h6'>Instance Size</Typography>
            <Typography variant='h5'>{instanceSize}</Typography>
          </Paper>

          <Paper className={classes.paper}>
            <Typography variant='h6'>RDS</Typography>
            <RDSTable />
          </Paper>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  instanceSize: selectors.getInstanceSize(state),
})

export default connect(
  mapStateToProps
)(AWSPage);
