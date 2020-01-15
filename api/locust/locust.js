const request = require("request");
const FORWARD_HOST = process.env.LOCUST_HOST;

const getUrl = (raw) => {
    const trimmed = raw.replace("/locust", "");
    return `${FORWARD_HOST}${trimmed}`;
}

const handleError = (res) => (err) => {
    const msg = `Couldn't pipe to ${FORWARD_HOST}`;
    res.status(503);
    res.send(msg);
    console.error(msg, err);
};

const locust = (req, res) => {
    const url = getUrl(req.url);
    const methodName = req.method.toLowerCase().replace("delete", "del");

    console.log(`Forwarding ${methodName} to ${url}`);
    const newReq = request[methodName]({
        uri: url,
        json: req.body
    });

    req.pipe(newReq)
        .on("error", handleError(res))
        .pipe(res);
}

module.exports = locust;
