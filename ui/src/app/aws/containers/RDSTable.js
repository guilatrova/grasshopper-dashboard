import { connect } from 'react-redux';
import RDSTable from '../components/RDSTable';
import { selectors } from '../duck';

const mapStateToProps = (state) => ({
    instances: selectors.getRdsInstances(state)
});

export default connect(mapStateToProps)(RDSTable);
