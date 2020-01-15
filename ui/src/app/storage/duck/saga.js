import { put, takeLatest, all } from 'redux-saga/effects'
import { actions } from '.';
import { actions as locustActions } from '/app/locust/duck';
import { actions as awsActions } from '/app/aws/duck';
import { BASE_URL } from '/app/constants';

function createSaga(endpoint, successAction, failAction) {
  return function* newSaga() {
    try {
      const result = yield fetch(`${BASE_URL}/storage/${endpoint}`).then(res => res.json());
      yield put(successAction(result));

    } catch (error) {
      console.error(error);
      yield put(failAction(error));
    }
  }
}

function* fetchTest({ payload }) {
  try {
    const result = yield fetch(`${BASE_URL}/storage/${payload.datetime}`).then(res => res.json());
    yield put(actions.fetchTestSuccess(result));
    yield put(locustActions.openPreviousTest(result));
    yield put(awsActions.openPreviousTest(result));
  }
  catch (error) {
    console.error(error);
    yield put(actions.fetchTestFail(error));
  }
}

const fetchTests = createSaga("", actions.fetchTestsSuccess, actions.fetchTestsFail);

export default function* locustSaga() {
  yield all([
    takeLatest(actions.FETCH_TESTS, fetchTests),
    takeLatest(actions.FETCH_TEST, fetchTest)
  ]);
}
