import React from 'react';
import { connect } from 'react-redux';
import SimpleLineChart from '/app/shared/components/SimpleLineChart';
import { selectors } from '../duck';

const lines = [
    { dataKey: "rps", name: "Response Per Second", activeDot: { r: 8 } },
    { dataKey: "fail_ratio", name: "Failure Ratio" }
];

const mapStateToProps = state => ({
    data: selectors.getRequestsChartData(state),
    lines
});

export default connect(mapStateToProps)(SimpleLineChart);
