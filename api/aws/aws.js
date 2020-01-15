const service = require("./service");

const respondWith = (func) => async (req, res) => {
    try {
        const result = await func();
        res.send(result);
    }
    catch (err) {
        console.error(err);
        res.send(err);
    }
}

const respondWithCloudWatch = (func) => async (req, res) => {
    try {
        const offset = req.query.minutesOffset || 2; // default 2 minutes
        const range = req.query.minutesRange || 10; // default 10 minutes
        const period = req.query.period || 300; // default 5 minutes

        const result = await func(Number(offset), Number(range), Number(period));
        res.send(result);
    } catch (err) {
        console.error(err)
        res.send(err)
    }
}

const getImages = respondWith(service.getImages);
const getInstanceSize = respondWith(service.getInstanceSize);
const getRDSInstances = respondWith(service.getRDSInstances);

const getTaskCountMetrics = respondWithCloudWatch(service.getTaskCountMetrics);
const getCPUMemoryMetrics = respondWithCloudWatch(service.getCPUMemoryMetrics);


module.exports = {
    getImages,
    getInstanceSize,
    getRDSInstances,
    getCPUMemoryMetrics,
    getTaskCountMetrics
};
