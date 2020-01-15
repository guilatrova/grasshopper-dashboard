const commands = require("./commands");
const selectors = require("./selectors");

const getImages = async () => {
    const servicesResp = await commands.describeServices();
    const taskArns = selectors.selectTaskDefinitionFromServicesDescription(servicesResp);

    const promises = taskArns.map(arn => commands.describeTaskDefinition(arn));
    const results = await Promise.all(promises);
    const formatted = results.map(r => selectors.selectImageInfoFromTaskDefinition(r.taskDefinition));

    return formatted;
}

const getInstanceSize = async () => {
    const instances = await commands.describeInstances();
    const size = selectors.selectInstanceSize(instances);

    return size;
}

const getRDSInstances = async () => {
    const rdsResp = await commands.describeRdsInstances();
    const formatted = selectors.selectRDSNameSize(rdsResp);

    return formatted;
}

const getTaskCountMetrics = async (offset, range, period) => {
    const resp = await commands.getRunningTasksCount(offset, range, period);
    const formatted = selectors.selectTaskCountMetrics(resp);

    return formatted;
}

const getCPUMemoryMetrics = async (offset, range, period) => {
    const resp = await commands.getMemoryAndCPU(offset, range, period);
    const formatted = selectors.selectCPUMemoryMetrics(resp);

    return formatted;
}

module.exports = {
    getImages,
    getInstanceSize,
    getRDSInstances,
    getTaskCountMetrics,
    getCPUMemoryMetrics
}
