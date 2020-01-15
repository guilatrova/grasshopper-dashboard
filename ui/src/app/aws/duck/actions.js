import { createAction } from '@reduxjs/toolkit'

// Types
const FETCH_AWS_CONTAINER_IMAGES = "aws/FETCH_AWS_CONTAINER_IMAGES";
const FETCH_AWS_CONTAINER_IMAGES_SUCCESS = "aws/FETCH_AWS_CONTAINER_IMAGES_SUCCESS";
const FETCH_AWS_CONTAINER_IMAGES_FAIL = "aws/FETCH_AWS_CONTAINER_IMAGES_FAIL";

const FETCH_AWS_INSTANCE_SIZE = "aws/FETCH_AWS_INSTANCE_SIZE";
const FETCH_AWS_INSTANCE_SIZE_SUCCESS = "aws/FETCH_AWS_INSTANCE_SIZE_SUCCESS";
const FETCH_AWS_INSTANCE_SIZE_FAIL = "aws/FETCH_AWS_INSTANCE_SIZE_FAIL";

const FETCH_AWS_RDS_INSTANCES = "aws/FETCH_AWS_RDS_INSTANCES";
const FETCH_AWS_RDS_INSTANCES_SUCCESS = "aws/FETCH_AWS_RDS_INSTANCES_SUCCESS";
const FETCH_AWS_RDS_INSTANCES_FAIL = "aws/FETCH_AWS_RDS_INSTANCES_FAIL";

const FETCH_AWS_TASK_REQUESTS = "aws/FETCH_TASK_REQUESTS";
const FETCH_AWS_TASK_REQUESTS_SUCCESS = "aws/FETCH_TASK_REQUESTS_SUCCESS";
const FETCH_AWS_TASK_REQUESTS_FAIL = "aws/FETCH_TASK_REQUESTS_FAIL";

const FETCH_AWS_METRICS = "aws/FETCH_METRICS_REQUESTS";
const FETCH_AWS_METRICS_SUCCESS = "aws/FETCH_METRICS_REQUESTS_SUCCESS";
const FETCH_AWS_METRICS_FAIL = "aws/FETCH_METRICS_REQUESTS_FAIL";

const OPEN_PREVIOUS_TEST = "aws/OPEN_PREVIOUS_TEST";
const CLEAN_UP = "aws/CLEAN_UP";

// Actions
export const fetchAWSContainerImages = createAction(FETCH_AWS_CONTAINER_IMAGES);
export const fetchAWSContainerImagesSuccess = createAction(FETCH_AWS_CONTAINER_IMAGES_SUCCESS);
export const fetchAWSContainerImagesFail = createAction(FETCH_AWS_CONTAINER_IMAGES_FAIL);

export const fetchAWSInstanceSize = createAction(FETCH_AWS_INSTANCE_SIZE);
export const fetchAWSInstanceSizeSuccess = createAction(FETCH_AWS_INSTANCE_SIZE_SUCCESS);
export const fetchAWSInstanceSizeFail = createAction(FETCH_AWS_INSTANCE_SIZE_FAIL);

export const fetchAWSRdsInstances = createAction(FETCH_AWS_RDS_INSTANCES);
export const fetchAWSRdsInstancesSuccess = createAction(FETCH_AWS_RDS_INSTANCES_SUCCESS);
export const fetchAWSRdsInstancesFail = createAction(FETCH_AWS_RDS_INSTANCES_FAIL);

export const fetchAWSTaskRequest = createAction(FETCH_AWS_TASK_REQUESTS);
export const fetchAWSTaskRequestSuccess = createAction(FETCH_AWS_TASK_REQUESTS_SUCCESS);
export const fetchAWSTaskRequestFail = createAction(FETCH_AWS_TASK_REQUESTS_FAIL);

export const fetchAWSMetrics = createAction(FETCH_AWS_METRICS);
export const fetchAWSMetricsSuccess = createAction(FETCH_AWS_METRICS_SUCCESS);
export const fetchAWSMetricsFail = createAction(FETCH_AWS_METRICS_FAIL);

export const openPreviousTest = createAction(OPEN_PREVIOUS_TEST);
export const cleanUp = createAction(CLEAN_UP);
