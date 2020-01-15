import { createAction } from '@reduxjs/toolkit'

// Types
const FETCH_REQUESTS = "locust/FETCH_REQUESTS";
const FETCH_REQUESTS_SUCCESS = "locust/FETCH_REQUESTS_SUCCESS";
const FETCH_REQUESTS_FAIL = "locust/FETCH_REQUESTS_FAIL";

const FETCH_EXCEPTIONS = "locust/FETCH_EXCEPTIONS";
const FETCH_EXCEPTIONS_SUCCESS = "locust/FETCH_EXCEPTIONS_SUCCESS";
const FETCH_EXCEPTIONS_FAIL = "locust/FETCH_EXCEPTIONS_FAIL";

const SWARM = "locust/SWARM";
const SWARM_SUCCESS = "locust/SWARM_SUCCESS";
const SWARM_FAIL = "locust/SWARM_FAIL";

const STOP_SWARM = "locust/STOP_SWARM";
const STOP_SWARM_SUCCESS = "locust/STOP_SWARM_SUCCESS";
const STOP_SWARM_FAIL = "locust/STOP_SWARM_FAIL";

export const OPEN_PREVIOUS_TEST = "locust/OPEN_PREVIOUS_TEST";

// Actions
export const fetchLocustRequest = createAction(FETCH_REQUESTS);
export const fetchLocustRequestSuccess = createAction(FETCH_REQUESTS_SUCCESS);
export const fetchLocustRequestFail = createAction(FETCH_REQUESTS_FAIL);

export const fetchLocustExceptions = createAction(FETCH_EXCEPTIONS);
export const fetchLocustExceptionsSuccess = createAction(FETCH_EXCEPTIONS_SUCCESS);
export const fetchLocustExceptionsFail = createAction(FETCH_EXCEPTIONS_FAIL);

export const swarmLocust = createAction(SWARM, (title, count, rate) => ({ payload: { title, count, rate } }));
export const swarmLocustSuccess = createAction(SWARM_SUCCESS);
export const swarmLocustFail = createAction(SWARM_FAIL);

export const stopSwarmLocust = createAction(STOP_SWARM);
export const stopSwarmLocustSuccess = createAction(STOP_SWARM_SUCCESS);
export const stopSwarmLocustFail = createAction(STOP_SWARM_FAIL);

export const openPreviousTest = createAction(OPEN_PREVIOUS_TEST);
