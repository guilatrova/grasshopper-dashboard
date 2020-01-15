import { connect } from 'react-redux';
import ContainerImagesTable from '../components/ContainerImagesTable';
import { selectors } from '../duck';

const mapStateToProps = (state) => ({
    containers: selectors.getContainerImages(state)
});

export default connect(mapStateToProps)(ContainerImagesTable);
