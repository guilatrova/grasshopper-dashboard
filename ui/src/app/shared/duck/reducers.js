import { createReducer } from '@reduxjs/toolkit';
import { actions } from '.';
import { states } from '.';

const initialState = {
    shouldPoll: true,
    state: states.RUN_STATE,
    testId: null
};

export default createReducer(initialState, {
    [actions.initAppViewMode]: (state, { payload }) => ({
        ...state,
        shouldPoll: false,
        state: states.VIEW_STATE,
        testId: payload.testId
    }),
    [actions.initAppRunMode]: (state) => ({
        ...state,
        shouldPoll: true,
        state: states.RUN_STATE,
        testId: null
    })
});
