import ECSMetricsChart from '../components/ECSMetricsChart';

import { connect } from 'react-redux';
import { selectors } from '../duck';

const mapStateToProps = (state, ownProps) => ({
    data: selectors.getECSMetrics(state, "memory", ownProps.filter),
    lines: selectors.getLinesForEcsMetrics(state, "memory", ownProps.filter),
    metric: "memory"
});

export default connect(mapStateToProps)(ECSMetricsChart);
