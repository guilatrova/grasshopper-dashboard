import { createReducer } from '@reduxjs/toolkit'
import { actions } from '.'

const initialState = {
    tests: [],
    isFetching: false,
    errors: null,
};

export default createReducer(initialState, {
    [actions.FETCH_TESTS]: (state) => ({
        ...state,
        isFetching: true
    }),
    [actions.FETCH_TESTS_SUCCESS]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        tests: payload
    }),
    [actions.FETCH_TESTS_FAIL]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        errors: payload
    }),
    [actions.FETCH_TEST]: (state) => ({
        ...state,
        isFetching: true
    }),
    [actions.FETCH_TEST_SUCCESS]: (state, { payload }) => ({
        ...state,
        isFetching: false
    }),
    [actions.FETCH_TEST_FAIL]: (state, { payload }) => ({
        ...state,
        isFetching: false,
        errors: payload
    }),
});
