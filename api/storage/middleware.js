const bodyParser = require("body-parser");
const _ = require("lodash");
const events = require("./events");

const SWARM_ACTION = "/swarm";
const STATS_ACTION = "/stats/requests";
const EXCEPTIONS_ACTION = "/exceptions";
const STOP_ACTION = "/stop";
const TASKS_ACTION = "/tasks";
const METRICS_ACTION = "/metrics";

const readBodyStream = (req, res) => {
    // Read more here: https://stackoverflow.com/questions/44567329/node-express-request-piping-a-post-request-with-body-parsing
    const cloned = _.clone(req);
    const jsonParser = bodyParser.json();
    const urlEncoded = bodyParser.urlencoded({ extended: true });

    return new Promise((resolve) => {
        jsonParser(cloned, res, () => {
            urlEncoded(cloned, res, () => {
                resolve(cloned.body);
            });
        });
    });
}

const afterResponseIsOver = (res, callback) => {
    // Read more here: https://stackoverflow.com/questions/19215042/express-logging-response-body
    const oldWrite = res.write;
    const oldEnd = res.end;
    const chunks = [];

    res.write = (...restArgs) => {
        chunks.push(Buffer.from(restArgs[0]));
        oldWrite.apply(res, restArgs);
    };

    res.end = (...restArgs) => {
        if (restArgs[0]) {
            chunks.push(Buffer.from(restArgs[0]));
        }
        const body = Buffer.concat(chunks).toString('utf8');
        oldEnd.apply(res, restArgs);
        callback(JSON.parse(body));
    };
};

const storeLocustData = async (req, res, next) => {
    const { url } = req;

    switch (url) {
        case SWARM_ACTION:
            readBodyStream(req, res).then(body => {
                events.onStartTest(body);
            });
            break;

        case STATS_ACTION:
            afterResponseIsOver(res,
                events.onLocustStatsReceived);
            break;

        case EXCEPTIONS_ACTION:
            afterResponseIsOver(res,
                events.onExceptionsReceived);
            break;

        case STOP_ACTION:
            events.onStopTest();
            break;
    }

    next();
}

const storeAWSData = async (req, res, next) => {
    let { url } = req;
    url = url.replace(/\?.*/g, ""); // Remove query params

    switch (url) {
        case TASKS_ACTION:
            afterResponseIsOver(res,
                events.onAWSTasksReceived);
            break;

        case METRICS_ACTION:
            afterResponseIsOver(res,
                events.onAWSMetricsReceived);
            break;
    }

    next();
}

module.exports = {
    storeLocustData,
    storeAWSData
};
