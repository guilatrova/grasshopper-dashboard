import { createReducer } from '@reduxjs/toolkit'
import { actions } from '.'

const initialState = {
    containerImages: [],
    rds: [],
    instanceSize: "",
    taskCount: [],
    ecsMetrics: [],
    isFetching: false,
    errors: null,
};

const mergeTimeLines = (state, compareProp, incoming = []) => {
    return [...state, ...incoming].reduce((acc, cur) => {
        const foundService = acc.find(svc => svc[compareProp] === cur[compareProp]);
        if (foundService) {
            foundService.timeline = [
                ...foundService.timeline,
                ...cur.timeline
            ];
        }
        else {
            acc.push({ ...cur });
        }
        return acc;
    }, [])
};

export default createReducer(initialState, {
    [actions.fetchAWSContainerImages]: (state) => ({
        ...state,
        isFetching: true
    }),
    [actions.fetchAWSContainerImagesSuccess]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        containerImages: payload
    }),
    [actions.fetchAWSContainerImagesFail]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        errors: payload
    }),
    [actions.fetchAWSInstanceSize]: (state) => ({
        ...state,
        isFetching: true
    }),
    [actions.fetchAWSInstanceSizeSuccess]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        instanceSize: payload.size
    }),
    [actions.fetchAWSInstanceSizeFail]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        errors: payload
    }),

    [actions.fetchAWSRdsInstances]: (state) => ({
        ...state,
        isFetching: true
    }),
    [actions.fetchAWSRdsInstancesSuccess]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        rds: payload
    }),
    [actions.fetchAWSRdsInstancesFail]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        errors: payload
    }),
    [actions.fetchAWSTaskRequest]: (state) => ({
        ...state,
        isFetching: true
    }),
    [actions.fetchAWSTaskRequestSuccess]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        taskCount: mergeTimeLines(state.taskCount.slice(), "service", payload)
    }),
    [actions.fetchAWSTaskRequestFail]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        errors: payload
    }),
    [actions.fetchAWSMetrics]: (state) => ({
        ...state,
        isFetching: true
    }),
    [actions.fetchAWSMetricsSuccess]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        ecsMetrics: mergeTimeLines(state.ecsMetrics.slice(), "name", payload)
    }),
    [actions.fetchAWSMetricsFail]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        errors: payload
    }),
    [actions.cleanUp]: (state) => ({
        ...state,
        taskCount: [],
        ecsMetrics: []
    }),
    [actions.openPreviousTest]: (state, { payload }) => ({
        ...state,
        containerImages: payload.infrastructure.containers,
        rds: payload.infrastructure.rds,
        instanceSize: payload.infrastructure.instance_size.size,
        taskCount: mergeTimeLines(payload.aws_task_count_timeline, "service"),
        ecsMetrics: mergeTimeLines(payload.aws_metrics_timeline, "name")
    })
});
