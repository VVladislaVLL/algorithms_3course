export function last(array: Array<any>) {
    return array.length - 1;
}
export function log(text: string, entity: any) {
    console.log(text, JSON.parse(JSON.stringify(entity)));
}

// TASK 2 ------------------------------------------
export function breakRules(graph: number[][]) {
    graph.forEach((_, i) => {
        graph.forEach((_, j) => {
            if (i < j) {
                graph[i][j] = graph[j][i] = Math.min(graph[i][j], graph[j][i]);
            }
        });
    });
    return graph;
}

export function floydWarshall(graph: number[][]) {
    const distances = graph.map(i => i.map(j => j));
    for (let k = 0; k < graph.length; k++) {
        for (let i = 0; i < graph.length; i++) {
            for (let j = 0; j < graph.length; j++) {
                distances[i][j] = Math.min(distances[i][j], distances[i][k] + distances[k][j]);
            }
        }
    }
    return distances;
}

export function mostConvenientCrossroads(graph: number[][]) {
    const maxDistancesList = [];

    graph.forEach((distancesList, crossroads) => {
        maxDistancesList.push([crossroads, Math.max(...distancesList)]);
    })

    const minDistancesList = [];
    let minDistance = maxDistancesList[0][1];


    maxDistancesList.forEach((crossroads) =>{
        if (crossroads[1] < minDistance) {
            minDistance = crossroads[1];
        }
    });


    maxDistancesList.forEach((crossroads) =>{
        if (crossroads[1] === minDistance) {
            minDistancesList.push([crossroads[0], graph[crossroads[0]]]);
        }
    });

    return [minDistance, minDistancesList];
}
// ------------------------------------------

// TASK 3 ------------------------------------------
export function minKey(graph, key, visited) {
    let min = Infinity;
    let minIndex;
    graph.forEach((_, i) => {
        if (key[i] < min && visited[i] === false) {
            min = key[i];
            minIndex = i;
        }
    });
    return minIndex;
}

export function prim(graph: number[][]) {
    const key = new Array(graph.length).fill(Infinity);
    const parent = new Array(graph.length).fill(null);
    const visited = new Array(graph.length).fill(false);
    key[0] = 0;
    parent[0] = -1;

    for (let i = 0; i < graph.length; i++) {
        const u = minKey(graph, key, visited);
        visited[u] = true;

        graph.forEach((_, i) => {
           if (graph[u][i] > 0 && visited[i] === false && key[i] > graph[u][i]) {
               key[i] = graph[u][i];
               parent[i] = u;
           }
        });
    }
    const ribs = [];
    for (let i = 1; i < graph.length; i++) {
        ribs.push([[parent[i] + 1, i + 1], graph[i][parent[i]]])
    }
    return ribs;
}
// ------------------------------------------

// TASK 4 ------------------------------------------
export function distributeWork(graph) {
    const completedTasks = graph.map((_, i) => ([i, null, false]));
    const uncompletedTasks = [];
    const unbusyEmployee = graph.map((_, i) => i);

    const taskList = graph.map((employee, task) => [employee, task].reverse());
    taskList.sort((a, b) => a[1].length > b[1].length ? 1 : -1);

    taskList.forEach((tasks) => {
        const [employee, task] = tasks;
        for (let i = 0; i < task.length; i++) {
            const completedTask = completedTasks[task[i]];
            if (!completedTask[last(completedTask)]) {
                completedTask[1] = employee;
                completedTask[last(completedTask)] = true;
                unbusyEmployee.splice(employee, 1);
                break;
            }
        }
    });
    completedTasks.forEach((task, i) => {
        if (!task[last(task)]) {
            task[1] = unbusyEmployee.pop();
            task[last(task)] = true;
            uncompletedTasks.push(task);
            completedTasks.splice(i, 1);
        }
    });

    completedTasks.sort((a, b) => a[1] > b[1] ? 1 : -1);
    uncompletedTasks.sort((a, b) => a[1] > b[1] ? 1 : -1);
    return [completedTasks, uncompletedTasks];
}
// ------------------------------------------


// TASK 5 ------------------------------------------
export function distributeHardWork(opportunitiesGraph: number[][], performanceGraph: number[][]) {
    const opportunitiesList = opportunitiesGraph.map((tasks, employee) => [employee, tasks, []]);
    const performanceList = performanceGraph.map((employees, task) => [task, employees, false]);

    performanceList.forEach(([task,employees, completed ]: [number, number[], boolean]) => {
        for (let i = 0; i < employees.length; i++) {
            const employee = employees[i];
            const employeeTasks = opportunitiesList[employee][1] as number[];
            const taskIndex = employeeTasks.indexOf(task);
            const moreInterestingTasks = employeeTasks.slice(0, taskIndex);

            let count = moreInterestingTasks.length;

            moreInterestingTasks.forEach((moreInterestingTask: number) => {
                const firstCondition = performanceList[moreInterestingTask][last(performanceList[moreInterestingTask])];
                const secondValue = opportunitiesList[employee][last(opportunitiesList[employee])] as number[];
                if (firstCondition && !secondValue.includes(moreInterestingTask)) {
                    count -= 1;
                }
            });

            if (!count) {
                performanceList[task][last(performanceList[task])] = true;
                (opportunitiesList[employee][last(opportunitiesList[employee])] as number[]).push(task);
                break;
            }
        }
    });

    opportunitiesList.sort((a, b) => a[0] > b[0] ? 1 : -1);
    performanceList.sort((a, b) => a[0] > b[0] ? 1 : -1);

    return [opportunitiesList, performanceList];
}
// ------------------------------------------

