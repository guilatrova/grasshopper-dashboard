const service = require("./service");

const listTests = async (req, res) => {
    try {
        const data = await service.listTests();
        res.send(data);
    } catch (err) {
        console.error(err);
        res.send(err);
    }
};

const getTest = async (req, res) => {
    try {
        const datetime = req.params.datetime;
        const data = await service.getTest(datetime);
        res.send(data);
    } catch (err) {
        console.error(err);
        res.send(err);
    }
};

const getLastExecutedTestId = async (req, res) => {
    const datetime = service.getLastExecutedTestId();
    if (datetime) {
        res.send({ datetime });
    }
    else {
        res.status(404);
        res.send("No test found");
    }
}

module.exports = {
    listTests,
    getTest,
    getLastExecutedTestId
}
