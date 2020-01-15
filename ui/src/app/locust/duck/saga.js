import { put, takeLatest, all } from 'redux-saga/effects'
import { actions } from '.';
import { BASE_URL } from '/app/constants';

function createSaga(endpoint, successAction, failAction) {
  return function* newSaga() {
    try {
      const result = yield fetch(`${BASE_URL}/locust/${endpoint}`).then(res => res.json());
      yield put(successAction(result));

    } catch (error) {
      console.error(error);
      yield put(failAction(error));
    }
  }
}

function* swarm({ payload }) {
  try {
    const body = new URLSearchParams();
    body.append("locust_count", payload.count);
    body.append("hatch_rate", payload.rate);
    body.append("title", payload.title);

    const result = yield fetch(`${BASE_URL}/locust/swarm`, { method: "POST", body }).then(res => res.json());
    yield put(actions.swarmLocustSuccess(result));

  } catch (error) {
    console.error(error);
    yield put(actions.swarmLocustFail(error));
  }
}

const fetchRequest = createSaga("stats/requests", actions.fetchLocustRequestSuccess, actions.fetchLocustRequestFail);
const fetchExceptions = createSaga("exceptions", actions.fetchLocustExceptionsSuccess, actions.fetchLocustExceptionsFail);
const stopSwarm = createSaga("stop", actions.stopSwarmLocustSuccess, actions.stopSwarmLocustFail);

export default function* locustSaga() {
  yield all([
    takeLatest(actions.fetchLocustRequest, fetchRequest),
    takeLatest(actions.fetchLocustExceptions, fetchExceptions),
    takeLatest(actions.swarmLocust, swarm),
    takeLatest(actions.stopSwarmLocust, stopSwarm)
  ]);
}
