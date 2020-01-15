export const getContainerImages = state => state.aws.containerImages;

export const getInstanceSize = state => state.aws.instanceSize;

export const getRdsInstances = state => state.aws.rds;

// Task Count Metrics
export const getTaskCount = state => state.aws.taskCount.reduce((acc, cur) => {
    for (let i = 0; i < cur.timeline.length; i++) {
        const curTime = cur.timeline[i].time;
        const curValue = cur.timeline[i].value;
        const timeFound = acc.find(item => item.time === curTime);

        if (timeFound) {
            timeFound[cur.service] = curValue;
        }
        else {
            acc.push({
                time: curTime,
                [cur.service]: curValue
            })
        }
    }

    return acc;
}, []).sort((a, b) => a.time - b.time);

export const getLinesForTaskCount = state => state.aws.taskCount.map(svc =>
    ({ name: svc.service, dataKey: svc.service })
);

// ECS Metrics
export const getECSMetrics = (state) => state.aws.ecsMetrics.reduce((acc, cur) => {
    for (let i = 0; i < cur.timeline.length; i++) {
        const curTime = cur.timeline[i].time;
        const curValue = cur.timeline[i].value;
        const timeFound = acc.find(item => item.time === curTime);

        if (timeFound) {
            timeFound[cur.name] = curValue;
        }
        else {
            acc.push({
                time: curTime,
                [cur.name]: curValue
            })
        }
    }

    return acc;
}, []).sort((a, b) => a.time - b.time);

const filterMetrics = (metric, services) => item => item.metric === metric &&
    (services.length ? services.includes(item.service) : true);

export const getLinesForEcsMetrics = (state, metric, service) => state.aws.ecsMetrics.filter(filterMetrics(metric, service)).map(svc =>
    ({ name: svc.name, dataKey: svc.name })
);

const onlyUnique = (value, index, self) => self.indexOf(value) === index;
export const getServicesWithMetrics = (state) => state.aws.ecsMetrics.map(x => x.service).filter(onlyUnique);
