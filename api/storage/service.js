const database = require("./database");
const selectors = require("./selectors");
const { LAST_EXECUTED_KEY } = require("./constants");
const cache = require("../cache");

const listTests = async () => {
    const results = await database.listTests();
    const data = selectors.selectListItems(results);
    return data;
}

const getTest = async (datetime) => {
    const result = await database.queryTest(datetime);
    const item = database.convertToJs(result.Items[0]);
    return item;
};

const getLastExecutedTestId = () => {
    return cache.get(LAST_EXECUTED_KEY);
}

module.exports = {
    listTests,
    getTest,
    getLastExecutedTestId
}
