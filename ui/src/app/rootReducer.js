import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import locust from './locust/duck';
import aws from './aws/duck';
import storage from './storage/duck';
import app from './shared/duck';

const createRootReducer = (history) => combineReducers({
  app,
  router: connectRouter(history),
  locust,
  aws,
  storage
})

export default createRootReducer
