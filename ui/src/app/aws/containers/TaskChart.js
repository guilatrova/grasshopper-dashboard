import { connect } from 'react-redux';
import { selectors } from '../duck';
import SimpleLineChart from '/app/shared/components/SimpleLineChart';

const mapStateToProps = (state) => ({
    data: selectors.getTaskCount(state),
    lines: selectors.getLinesForTaskCount(state)
});

export default connect(mapStateToProps)(SimpleLineChart);
