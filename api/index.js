const express = require("express");
const cors = require("cors");
const locust = require("./locust/locust");
const aws = require("./aws/aws");
const storage = require("./storage/storage");
const middleware = require("./storage/middleware");

const port = 3000;

const app = express();
app.use(cors());
app.use("/locust/", middleware.storeLocustData);
app.use("/aws/", middleware.storeAWSData);

app.all(/locust\/.*/, locust);
app.get("/aws/images", aws.getImages);
app.get("/aws/tasks", aws.getTaskCountMetrics);
app.get("/aws/instance-size", aws.getInstanceSize);
app.get("/aws/rds", aws.getRDSInstances);
app.get("/aws/metrics", aws.getCPUMemoryMetrics);
app.get("/storage/last", storage.getLastExecutedTestId);
app.get("/storage/:datetime", storage.getTest);
app.get("/storage", storage.listTests);

app.listen(port, () => console.log(`API listening on port ${port}!`));
