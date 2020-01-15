import React from 'react';
import { connect } from 'react-redux';
import SimpleLineChart from '/app/shared/components/SimpleLineChart';
import { selectors } from '../duck';

const lines = [
    { dataKey: "current_response_time_percentile_50", name: "Median Response Time", activeDot: { r: 8 } },
    { dataKey: "current_response_time_percentile_95", name: "95% percentile" }
];

const mapStateToProps = state => ({
    data: selectors.getRequestsChartData(state),
    lines
});

export default connect(mapStateToProps)(SimpleLineChart);
