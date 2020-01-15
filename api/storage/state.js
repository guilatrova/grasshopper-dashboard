const errors = require("./errors");
const { RUNNING_KEY, LAST_EXECUTED_KEY } = require("./constants");
const cache = require("../cache");

const saveRunningTest = async (id) => {
    try {
        cache.set(RUNNING_KEY, id);
        cache.set(LAST_EXECUTED_KEY, id);
        console.log(`State created for test id ${id}`);
    }
    catch (err) {
        console.error(err);
    }
};

const readRunningTest = async () => {
    const id = cache.get(RUNNING_KEY);
    if (!id) {
        throw new errors.NoRunningTest();
    }

    return id;
}

const clear = () => cache.del(RUNNING_KEY);

module.exports = {
    saveRunningTest,
    readRunningTest,
    clear
}
