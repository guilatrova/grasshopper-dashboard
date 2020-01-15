const seconds = (n) => n * 1000;
const minutes = (n) => n * 60000;

export const BASE_URL = process.env.API_HOST || 'http://localhost:3000';

// Required to allow dynamo db item to be created before saving data
// Keeping it 0 is the same as discarding the initial data
export const START_POLL_DELAY = seconds(3);
export const AFTER_STOP_DELAY = seconds(3);

// How often Locust should poll
export const LOCUST_POLL_FREQUENCY = process.env.LOCUST_POLL_FREQUENCY || seconds(3);

// How often AWS should poll & CloudWatch params
// Read more: https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/cloudwatch_concepts.html
export const AWS_POLL_FREQUENCY = process.env.AWS_POLL_FREQUENCY || minutes(4);
export const AWS_CW_PERIOD = 60; // in seconds
export const AWS_CW_OFFSET = 2; // in minutes
export const AWS_CW_MIN_RANGE = 4; // in minutes
