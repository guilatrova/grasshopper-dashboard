database = require("./database");
service = require("../aws/service");

const onStartTest = async (swarm) => {
    const containers = service.getImages();
    const instanceSize = service.getInstanceSize();
    const rds = service.getRDSInstances();

    const infrastructure = {
        containers: await containers,
        instance_size: await instanceSize,
        rds: await rds
    };

    database.createTest(infrastructure, swarm);
};

const onLocustStatsReceived = async (stats) => {
    database.appendLocustRequest(stats);
};

const onExceptionsReceived = async (exceptions) => {
    database.updateExceptions(exceptions);
};

const onStopTest = async () => {
    database.updateStateToStopped();
};

const onAWSTasksReceived = async (tasks) => {
    database.appendAWSTasks(tasks);
};

const onAWSMetricsReceived = async (metrics) => {
    database.appendAWSMetrics(metrics);
};

module.exports = {
    onStartTest,
    onLocustStatsReceived,
    onExceptionsReceived,
    onStopTest,
    onAWSTasksReceived,
    onAWSMetricsReceived
};
