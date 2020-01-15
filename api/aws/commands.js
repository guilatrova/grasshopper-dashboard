const AWS = require("./awscli");
const params = require("./params");
const cache = require("../cache");

const { ECS_CLUSTER_NAME } = process.env;

const CACHE_SERVICES_KEY = "ecs-services";
const flattenArray = (array) => [].concat.apply([], array);
const minutesAgo = (howMany) => new Date(Date.now() - (howMany * 60000));

const getServices = async () => {
    let services = cache.get(CACHE_SERVICES_KEY);
    if (!services) {
        services = await AWS.ecs.listServices({ cluster: ECS_CLUSTER_NAME, maxResults: 100 }).promise();
        cache.set(CACHE_SERVICES_KEY, services);
    }

    return services;
}

const getServiceNames = async () => {
    const services = await getServices();
    return services.serviceArns.map(svc => svc.match(/service\/(.*)/)[1]);
}

const describeServices = async () => {
    const services = (await getServices()).serviceArns;
    const results = [];
    const CHUNK_SIZE = 10;

    // Describe Services only supports 10 at max, so we need to get it into chunks
    for (let i = 0; i < services.length; i += CHUNK_SIZE) {
        let chunk = services.slice(i, i + CHUNK_SIZE);
        results.push(
            AWS.ecs.describeServices({ cluster: ECS_CLUSTER_NAME, services: chunk }).promise()
        );
    }

    return Promise.all(results).then(resolvedPromises =>
        flattenArray(
            resolvedPromises.map(response => response.services)
        )
    );
}

const describeTaskDefinition = (taskDefinition) => AWS.ecs.describeTaskDefinition({ taskDefinition }).promise();

const describeInstances = () => AWS.ec2.describeInstances(params.filterInstancesByClusterName()).promise();

const describeRdsInstances = () => AWS.rds.describeDBInstances().promise();

const getRunningTasksCount = async (offset, range, period) => {
    const serviceNames = await getServiceNames();

    return AWS.cloudwatch.getMetricData(
        params.getMetricsParamsForRunningTasks(serviceNames, minutesAgo(range + offset), minutesAgo(offset), period)
    ).promise();
}

const getMemoryAndCPU = async (offset, range, period) => {
    const serviceNames = await getServiceNames();

    return AWS.cloudwatch.getMetricData(
        params.getMetricsParamsForMemoryCPU(serviceNames, minutesAgo(range + offset), minutesAgo(offset), period)
    ).promise();
}

module.exports = {
    describeServices,
    getRunningTasksCount,
    describeTaskDefinition,
    describeInstances,
    describeRdsInstances,
    getMemoryAndCPU
};
