import { connect } from 'react-redux';
import SimpleLineChart from '/app/shared/components/SimpleLineChart';
import { selectors } from '../duck';

const lines = [
    { dataKey: "users", activeDot: { r: 8 } },
];

const mapStateToProps = state => ({
    data: selectors.getRequestsChartData(state),
    lines
});

export default connect(mapStateToProps)(SimpleLineChart);
