import { connect } from 'react-redux';
import SwarmLocust from '../components/SwarmLocust';
import { actions } from '../duck';
import { selectors as appSelectors } from '/app/shared/duck';

const mapStateToProps = state => ({
  appState: appSelectors.getCurrentState(state)
});

const mapDispatchToProps = {
  onSwarm: actions.swarmLocust,
  onStop: actions.stopSwarmLocust
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwarmLocust);
