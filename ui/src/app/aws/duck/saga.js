import { put, takeLatest, all } from 'redux-saga/effects'
import { actions } from '.';
import { BASE_URL, AWS_CW_PERIOD, AWS_CW_OFFSET, AWS_CW_MIN_RANGE } from '/app/constants';

function createSaga(endpoint, successAction, failAction) {
  return function* newSaga() {
    try {
      const result = yield fetch(`${BASE_URL}/aws/${endpoint}`).then(res => res.json());
      yield put(successAction(result));

    } catch (error) {
      console.error(error);
      yield put(failAction(error));
    }
  }
}

const cwQueryParams = `?minutesOffset=${AWS_CW_OFFSET}&minutesRange=${AWS_CW_MIN_RANGE}&period=${AWS_CW_PERIOD}`;

const fetchContainerImages = createSaga("images", actions.fetchAWSContainerImagesSuccess, actions.fetchAWSContainerImagesFail);
const fetchInstanceSize = createSaga("instance-size", actions.fetchAWSInstanceSizeSuccess, actions.fetchAWSInstanceSizeFail);
const fetchRDSInstances = createSaga("rds", actions.fetchAWSRdsInstancesSuccess, actions.fetchAWSRdsInstancesFail);
const fetchTaskCount = createSaga(`tasks${cwQueryParams}`, actions.fetchAWSTaskRequestSuccess, actions.fetchAWSTaskRequestFail);
const fetchECSMetrics = createSaga(`metrics${cwQueryParams}`, actions.fetchAWSMetricsSuccess, actions.fetchAWSMetricsFail);

export default function* locustSaga() {
  yield all([
    takeLatest(actions.fetchAWSContainerImages, fetchContainerImages),
    takeLatest(actions.fetchAWSInstanceSize, fetchInstanceSize),
    takeLatest(actions.fetchAWSRdsInstances, fetchRDSInstances),
    takeLatest(actions.fetchAWSTaskRequest, fetchTaskCount),
    takeLatest(actions.fetchAWSMetrics, fetchECSMetrics)
  ]);
}
