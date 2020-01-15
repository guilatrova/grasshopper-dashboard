const { RDS_NAME_FILTER } = process.env;

const selectTaskDefinitionFromServicesDescription = (services) => services.map(svc => svc.taskDefinition);

const selectGitHubCommitLink = (image) => {
    if (image.includes("amazonaws.com")) {
        const hash = image.match(/:.*/)[0].slice(1);
        const service = image.match(/\/.*:/)[0].slice(1, -1);

        return `https://github.com/academicmerit/${service}/tree/${hash}`;
    }
}

const selectImageInfoFromTaskDefinition = (taskDefinition) => ({
    container: taskDefinition.family,
    image: taskDefinition.containerDefinitions[0].image,
    commit_link: selectGitHubCommitLink(taskDefinition.containerDefinitions[0].image)
});

const selectInstanceSize = (instances) => ({ size: instances.Reservations[0].Instances[0].InstanceType });

const selectRDSNameSize = (instances) => instances.DBInstances
    .filter(instance => instance.DBInstanceIdentifier.includes(RDS_NAME_FILTER))
    .map(instance => ({ rds: instance.DBInstanceIdentifier, size: instance.DBInstanceClass }));

const selectCPUMemoryMetrics = (metrics) => {
    const formatted = metrics.MetricDataResults
        .map(metricGroup => {
            const labelMatches = metricGroup.Label.match(/ (.*) (CPUUtilization|MemoryUtilized)$/);
            const name = labelMatches[1];
            const metric = labelMatches[2] == "CPUUtilization" ? "cpu" : "memory";

            return {
                name: `${name}-${metric}`,
                service: name,
                metric,
                timeline:
                    metricGroup.Timestamps.map((time, i) => ({
                        time: new Date(time).getTime(),
                        value: metricGroup.Values[i]
                    }))
            };
        });

    return formatted;
};

const selectTaskCountMetrics = (metrics) => {
    const formatted = metrics.MetricDataResults
        .map(metricGroup => ({
            service: metricGroup.Label,
            timeline:
                metricGroup.Timestamps.map((time, i) => ({
                    time: new Date(time).getTime(),
                    value: metricGroup.Values[i]
                }))
        }));

    return formatted;
}

module.exports = {
    selectTaskDefinitionFromServicesDescription,
    selectImageInfoFromTaskDefinition,
    selectInstanceSize,
    selectRDSNameSize,
    selectCPUMemoryMetrics,
    selectTaskCountMetrics
}
