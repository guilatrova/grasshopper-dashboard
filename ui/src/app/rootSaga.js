import { all } from 'redux-saga/effects'
import locustSaga from './locust/duck/saga';
import awsSaga from './aws/duck/saga';
import appSaga from './shared/duck/saga';
import storageSaga from './storage/duck/saga';

export default function* rootSaga() {
  yield all([
    locustSaga(),
    awsSaga(),
    storageSaga(),
    appSaga()
  ])
}
