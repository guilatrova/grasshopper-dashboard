import { all, call, put, race, take, takeLatest, takeEvery, delay } from 'redux-saga/effects'
import { actions } from '.';
import { actions as locustActions } from '/app/locust/duck'
import { actions as awsActions } from '/app/aws/duck'
import { actions as storageActions } from '/app/storage/duck';
import {
    START_POLL_DELAY,
    AFTER_STOP_DELAY,
    LOCUST_POLL_FREQUENCY,
    AWS_POLL_FREQUENCY
} from '/app/constants';

function* fetchAppRunMode(requests) {
    yield all(requests.map(request => put(request())))
}

function* fetchAppViewMode({ payload }) {
    yield put(storageActions.fetchTest(payload.testId));
}

function* pollRequests(requests, frequency) {
    try {
        yield all(requests.map(request => put(request())))
    } catch (err) {
        yield put(actions.pollRequestsFail())
    }

    yield delay(frequency)
    yield call(pollRequests, requests, frequency);
}

function* onSwam() {
    yield put(awsActions.cleanUp());
    yield delay(START_POLL_DELAY);

    yield all([
        race([
            call(pollRequests, [
                locustActions.fetchLocustRequest,
                locustActions.fetchLocustExceptions
            ], LOCUST_POLL_FREQUENCY),
            take(locustActions.stopSwarmLocust)
        ]),

        race([
            call(pollRequests, [
                awsActions.fetchAWSMetrics,
                awsActions.fetchAWSTaskRequest
            ], AWS_POLL_FREQUENCY),
            take(locustActions.stopSwarmLocust)
        ])
    ]);
}

function* onStop() {
    yield delay(AFTER_STOP_DELAY);
    yield put(locustActions.fetchLocustRequest());
}

export default function* appSaga() {
    yield all([
        // On app start
        takeLatest(
            actions.initAppRunMode,
            fetchAppRunMode,
            [
                awsActions.fetchAWSInstanceSize,
                awsActions.fetchAWSContainerImages,
                awsActions.fetchAWSRdsInstances,
                locustActions.fetchLocustRequest,
            ]
        ),
        takeLatest(actions.initAppViewMode, fetchAppViewMode),
        takeLatest(locustActions.swarmLocustSuccess, onSwam),
        takeLatest(locustActions.stopSwarmLocustSuccess, onStop)
    ]);
}
