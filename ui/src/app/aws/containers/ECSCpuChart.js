import ECSMetricsChart from '../components/ECSMetricsChart';

import { connect } from 'react-redux';
import { selectors } from '../duck';

const mapStateToProps = (state, ownProps) => ({
    data: selectors.getECSMetrics(state, "cpu", ownProps.filter),
    lines: selectors.getLinesForEcsMetrics(state, "cpu", ownProps.filter),
    metric: "cpu"
});

export default connect(mapStateToProps)(ECSMetricsChart);
