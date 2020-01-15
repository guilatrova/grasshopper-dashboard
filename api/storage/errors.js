class NoRunningTest extends Error {
    constructor(message = "There is no test running", ...args) {
        super(message, ...args)
    }
};

module.exports = {
    NoRunningTest
};
