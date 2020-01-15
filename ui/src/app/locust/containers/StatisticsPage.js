import React, { useState } from 'react'
import { connect } from 'react-redux';
import { makeStyles, Paper, Typography, Grid, } from '@material-ui/core'
import StatisticsTable from '../components/StatisticsTable';
import RPSChart from './RPSChart';
import ResponseTimeChart from './ResponseTimeChart';
import SwarmLocust from './SwarmLocustContainer';
import ECSCpuChart from '/app/aws/containers/ECSCpuChart';
import ECSMemoryChart from '/app/aws/containers/ECSMemoryChart';
import FilterMetricsSelect from '/app/aws/components/FilterMetricsSelect';
import { selectors } from '../duck';
import { selectors as awsSelectors } from '/app/aws/duck';
import ExpandablePaper from '/app/shared/components/ExpandablePaper';

const useStyles = makeStyles({
  root: {
    height: '100%',
    margin: '8px'
  },
  form: {
    display: 'flex',
    justifyContent: 'center',
    flexGrow: 1,
  },
  formControl: {
    width: '100%'
  },
  paper: {
    margin: '8px',
    padding: '20px',
    overflowX: 'auto'
  },
})

const StatisticsPage = ({ stats, filterOptions }) => {
  const classes = useStyles();
  const [metricsFilter, setMetricsFilter] = useState([]);
  const handleFilterChanges = (e, value) => setMetricsFilter(value);

  return (
    <div className={classes.root}>
      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <ExpandablePaper title="Statistics">
            <StatisticsTable stats={stats} />
          </ExpandablePaper>

          <ExpandablePaper title="ECS Metrics">
            <FilterMetricsSelect
              options={filterOptions}
              value={metricsFilter}
              onChange={handleFilterChanges}
            />

            <Typography variant='h6'>Memory</Typography>
            <ECSMemoryChart filter={metricsFilter} />

            <Typography variant='h6'>CPU</Typography>
            <ECSCpuChart filter={metricsFilter} />
          </ExpandablePaper>
        </Grid>

        <Grid item xs={12} md={4}>
          <Paper className={classes.paper}>
            <SwarmLocust />
          </Paper>

          <ExpandablePaper title="Requests Per Second">
            <RPSChart />
          </ExpandablePaper>

          <ExpandablePaper title="Response Time (ms)">
            <ResponseTimeChart />
          </ExpandablePaper>
        </Grid>
      </Grid>
    </div>
  )
}

const mapStateToProps = (state) => ({
  stats: selectors.getStatistics(state),
  filterOptions: awsSelectors.getServicesWithMetrics(state)
})

export default connect(
  mapStateToProps
)(StatisticsPage);
