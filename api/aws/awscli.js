const AWS = require("aws-sdk");

const { AWS_ACCESS_KEY, AWS_SECRET_KEY, AWS_DEFAULT_REGION } = process.env;

AWS.config.apiVersions = {
    ecs: "2014-11-13",
    cloudwatch: "2010-08-01",
    ec2: "2016-11-15",
    rds: "2014-10-31",
    dynamodb: "2012-08-10"
};
AWS.config.update({ region: AWS_DEFAULT_REGION });

const credentials = new AWS.Credentials({
    accessKeyId: AWS_ACCESS_KEY,
    secretAccessKey: AWS_SECRET_KEY
});

const ecs = new AWS.ECS({ credentials });
const cloudwatch = new AWS.CloudWatch({ credentials });
const ec2 = new AWS.EC2({ credentials });
const rds = new AWS.RDS({ credentials });
const autoscaling = new AWS.AutoScaling({ credentials });
const dynamodb = new AWS.DynamoDB({ credentials });

module.exports = {
    ecs,
    cloudwatch,
    ec2,
    rds,
    autoscaling,
    dynamodb
};
