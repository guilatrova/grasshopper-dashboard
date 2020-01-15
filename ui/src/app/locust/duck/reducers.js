import { createReducer } from '@reduxjs/toolkit'
import { actions } from '.'

const VALID_STATES_TO_RECORD = ["hatching", "running"];

const initialState = {
    requests: {
        stats: [],
        state: "unknown",
        total_rps: -1,
        fail_ratio: null,
        errors: [],
        user_count: 0
    },
    chartData: [],
    swarmControl: {
        users: 0,
        rate: 0
    },
    testTitle: null,
    isFetching: false,
    exceptions: [],
    errors: null,
};

export default createReducer(initialState, {
    [actions.fetchLocustRequest]: (state) => ({
        ...state,
        isFetching: true
    }),
    [actions.fetchLocustRequestSuccess]: (state, { payload }) => {

        const chartData = VALID_STATES_TO_RECORD.includes(payload.state) ? [
            ...state.chartData,
            {
                time: Date.now(),
                rps: payload.total_rps,
                users: payload.user_count,
                fail_ratio: payload.fail_ratio,
                current_response_time_percentile_50: payload.current_response_time_percentile_50,
                current_response_time_percentile_95: payload.current_response_time_percentile_95
            }
        ] : state.chartData;

        return {
            ...state,
            isFetching: false,
            requests: payload,
            chartData
        }
    },
    [actions.fetchLocustRequestFail]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        errors: payload
    }),

    [actions.fetchLocustExceptions]: (state) => ({
        ...state,
        isFetching: true
    }),
    [actions.fetchLocustExceptionsSuccess]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        exceptions: payload.exceptions
    }),
    [actions.fetchLocustExceptionsFail]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        errors: payload
    }),

    [actions.swarmLocust]: (state, { payload }) => ({
        ...initialState, // When starting a new test, we want to clean state
        isFetching: true,
        swarmControl: {
            users: payload.count,
            rate: payload.rate
        }
    }),
    [actions.swarmLocustSuccess]: (state) => ({
        ...state,
        isFetching: false
    }),
    [actions.swarmLocustFail]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        errors: payload
    }),

    [actions.stopSwarmLocust]: (state) => ({
        ...state,
        isFetching: true
    }),
    [actions.stopSwarmLocustSuccess]: (state) => ({
        ...state,
        status: "stopped",
        isFetching: false
    }),
    [actions.stopSwarmLocustFail]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        errors: payload
    }),
    [actions.OPEN_PREVIOUS_TEST]: (state, { payload }) => ({
        ...state,
        testTitle: payload.title,
        requests: {
            stats: payload.stats,
            state: new Date(payload.datetime).toString(),
            total_rps: -1,
            fail_ratio: payload.fail_ratio,
            errors: payload.errors,
            user_count: 0
        },
        chartData: payload.locust_requests_timeline,
        swarmControl: {
            users: Number(payload.swarm.locust_count),
            rate: Number(payload.swarm.hatch_rate)
        },
        exceptions: payload.exceptions,
    })
});
