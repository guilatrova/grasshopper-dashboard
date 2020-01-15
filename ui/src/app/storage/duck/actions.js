import { createAction } from '@reduxjs/toolkit';

// Types
export const FETCH_TESTS = "storage/FETCH_TESTS";
export const FETCH_TESTS_SUCCESS = "storage/FETCH_TESTS_SUCCESS";
export const FETCH_TESTS_FAIL = "storage/FETCH_TESTS_FAIL";

export const FETCH_TEST = "storage/FETCH_TEST";
export const FETCH_TEST_SUCCESS = "storage/FETCH_TEST_SUCCESS";
export const FETCH_TEST_FAIL = "storage/FETCH_TEST_FAIL";

// Actions
export const fetchTests = createAction(FETCH_TESTS);
export const fetchTestsSuccess = createAction(FETCH_TESTS_SUCCESS);
export const fetchTestsFail = createAction(FETCH_TESTS_FAIL);

export const fetchTest = createAction(FETCH_TEST, (datetime) => ({ payload: { datetime } }));
export const fetchTestSuccess = createAction(FETCH_TEST_SUCCESS);
export const fetchTestFail = createAction(FETCH_TEST_FAIL);
