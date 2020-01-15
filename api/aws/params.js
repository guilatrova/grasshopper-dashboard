const { ECS_ENVIRONMENT, ECS_CLUSTER_NAME } = process.env;

const filterInstancesByClusterName = () => ({
    Filters: [
        { Name: "tag:Environment", Values: [ECS_ENVIRONMENT] }
    ]
});

const metricFor = (Id, ClusterName, ServiceName, MetricName, Namespace, Period, Stat) => ({
    Id,
    MetricStat: {
        Metric: {
            MetricName,
            Namespace,
            Dimensions: [
                { Name: "ServiceName", Value: ServiceName },
                { Name: "ClusterName", Value: ClusterName }
            ]
        },
        Period,
        Stat
    }
});

const getMetricsParamsForRunningTasks = (services, StartTime, EndTime, Period) => {
    const tasksMetrics = services.map((svc, i) =>
        metricFor(`tk${i}`, ECS_CLUSTER_NAME, svc, "RunningTaskCount", "ECS/ContainerInsights", Period, "Maximum"));

    return {
        StartTime,
        EndTime,
        MetricDataQueries: tasksMetrics
    };
};

const getMetricsParamsForMemoryCPU = (services, StartTime, EndTime, Period) => {

    const memoryMetrics = services.map((svc, i) =>
        metricFor(`mem${i}`, ECS_CLUSTER_NAME, svc, "MemoryUtilized", "ECS/ContainerInsights", Period, "Average"));
    const cpuMetrics = services.map((svc, i) =>
        metricFor(`cpu${i}`, ECS_CLUSTER_NAME, svc, "CPUUtilization", "AWS/ECS", Period, "Average"));

    return {
        StartTime,
        EndTime,
        MetricDataQueries: [
            ...memoryMetrics, ...cpuMetrics
        ]
    }
};

module.exports = {
    filterInstancesByClusterName,
    getMetricsParamsForRunningTasks,
    getMetricsParamsForMemoryCPU
}
