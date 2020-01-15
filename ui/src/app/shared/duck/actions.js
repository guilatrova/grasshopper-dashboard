import { createAction } from '@reduxjs/toolkit';

// Types
const INIT_APP_VIEW_MODE = "INIT_APP_VIEW_MODE";
const INIT_APP_RUN_MODE = "INIT_APP_RUN_MODE";
const INIT_POLL_REQUESTS = "INIT_POLL_REQUESTS";
const POLL_REQUESTS_FAIL = "POLL_REQUESTS_FAIL";

// Actions
export const initAppViewMode = createAction(INIT_APP_VIEW_MODE, (testId) => ({ payload: { testId } }));
export const initAppRunMode = createAction(INIT_APP_RUN_MODE);
export const initPollRequests = createAction(INIT_POLL_REQUESTS);
export const pollRequestsFail = createAction(POLL_REQUESTS_FAIL);
