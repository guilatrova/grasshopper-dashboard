const AWSSDK = require("aws-sdk");
const AWS = require("../aws/awscli");
const state = require("./state");
const { DB_TABLE_NAME } = process.env;

const now = () => new Date().getTime();
const convertItem = (raw) => AWSSDK.DynamoDB.Converter.marshall(raw);
const convertToJs = (raw) => AWSSDK.DynamoDB.Converter.unmarshall(raw);
const VALID_STATES_TO_RECORD = ["hatching", "running"];

const getActiveTestKey = async () => state.readRunningTest();


const createTest = (infrastructure, swarm) => {
    const { title, ...swarmClean } = swarm;
    const id = now()
    const Item = AWSSDK.DynamoDB.Converter.marshall({
        datetime: id,
        state: "running",
        title,
        fail_ratio: 0,
        failures: [],
        exceptions: [],
        swarm: swarmClean,
        infrastructure,
        locust_requests_timeline: [],
        aws_task_count_timeline: [],
        aws_metrics_timeline: []
    });

    state.saveRunningTest(id);
    return AWS.dynamodb.putItem({ TableName: DB_TABLE_NAME, Item }).promise();
};

const appendLocustRequest = async (payload) => {
    if (!VALID_STATES_TO_RECORD.includes(payload.state)) {
        return;
    }

    const datetime = await getActiveTestKey();
    const item = convertItem({
        time: Date.now(),
        rps: payload.total_rps,
        users: payload.user_count,
        fail_ratio: payload.fail_ratio,
        current_response_time_percentile_50: payload.current_response_time_percentile_50,
        current_response_time_percentile_95: payload.current_response_time_percentile_95
    });
    const errorsItem = payload.errors.map(x => ({ "M": convertItem(x) }));
    const stats = payload.stats.map(x => ({ "M": convertItem(x) }));

    const params = {
        TableName: DB_TABLE_NAME,
        Key: {
            datetime: { N: datetime.toString() }
        },
        UpdateExpression: "SET #REQS = list_append(#REQS, :req), #ST = :st, #ERR = :err, #STS = :sts, #FARAT = :farat",
        ExpressionAttributeNames: {
            "#REQS": "locust_requests_timeline",
            "#STS": "stats",
            "#ST": "state",
            "#ERR": "errors",
            "#FARAT": "fail_ratio"
        },
        ExpressionAttributeValues: {
            ":req": {
                "L": [{ "M": item }]
            },
            ":st": { "S": payload.state },
            ":err": { "L": errorsItem },
            ":sts": { "L": stats },
            ":farat": { "N": payload.fail_ratio.toString() }
        },
        ReturnValues: "NONE"
    };

    return AWS.dynamodb.updateItem(params).promise();
};

const updateExceptions = async (payload) => {
    const datetime = await getActiveTestKey();
    const exceptions = payload.exceptions.map(x => ({ "M": convertItem(x) }));

    const params = {
        TableName: DB_TABLE_NAME,
        Key: {
            datetime: { N: datetime.toString() }
        },
        UpdateExpression: "SET #EXCPS = :excps",
        ExpressionAttributeNames: {
            "#EXCPS": "exceptions"
        },
        ExpressionAttributeValues: {
            ":excps": { "L": exceptions }
        },
        ReturnValues: "NONE"
    };

    return AWS.dynamodb.updateItem(params).promise();
};

const updateStateToStopped = async () => {
    const datetime = await getActiveTestKey();

    const params = {
        TableName: DB_TABLE_NAME,
        Key: {
            datetime: { N: datetime.toString() }
        },
        UpdateExpression: "SET #ST = :st",
        ExpressionAttributeNames: {
            "#ST": "state"
        },
        ExpressionAttributeValues: {
            ":st": { "S": "stopped" }
        },
        ReturnValues: "NONE"
    };

    state.clear();
    return AWS.dynamodb.updateItem(params).promise();
};

const appendAWSTasks = async (payload) => {
    const datetime = await getActiveTestKey();
    const tasks = payload.map(x => ({ "M": convertItem(x) }));

    const params = {
        TableName: DB_TABLE_NAME,
        Key: {
            datetime: { N: datetime.toString() }
        },
        UpdateExpression: "SET #TASKS = list_append(#TASKS, :tasks)",
        ExpressionAttributeNames: {
            "#TASKS": "aws_task_count_timeline"
        },
        ExpressionAttributeValues: {
            ":tasks": {
                "L": tasks
            }
        },
        ReturnValues: "NONE"
    };

    return AWS.dynamodb.updateItem(params).promise();
};

const appendAWSMetrics = async (payload) => {
    const datetime = await getActiveTestKey();
    const metrics = payload.map(x => ({ "M": convertItem(x) }));

    const params = {
        TableName: DB_TABLE_NAME,
        Key: {
            datetime: { N: datetime.toString() }
        },
        UpdateExpression: "SET #LIST = list_append(#LIST, :newitem)",
        ExpressionAttributeNames: {
            "#LIST": "aws_metrics_timeline"
        },
        ExpressionAttributeValues: {
            ":newitem": {
                "L": metrics
            }
        },
        ReturnValues: "NONE"
    };

    return AWS.dynamodb.updateItem(params).promise();
};

const listTests = () => {
    const params = {
        TableName: DB_TABLE_NAME,
        ExpressionAttributeNames: {
            "#DT": "datetime",
            "#T": "title"
        },
        ProjectionExpression: "#DT, #T"
    };
    return AWS.dynamodb.scan(params).promise();
};

const queryTest = (datetime) => {
    const params = {
        TableName: DB_TABLE_NAME,
        Select: "ALL_ATTRIBUTES",
        KeyConditionExpression: "#DT = :dt",
        ExpressionAttributeNames: {
            "#DT": "datetime"
        },
        ExpressionAttributeValues: {
            ":dt": {
                N: datetime
            }
        },
    };
    return AWS.dynamodb.query(params).promise();
};

module.exports = {
    createTest,
    appendLocustRequest,
    updateExceptions,
    updateStateToStopped,
    appendAWSTasks,
    appendAWSMetrics,
    listTests,
    queryTest,
    convertToJs
}
