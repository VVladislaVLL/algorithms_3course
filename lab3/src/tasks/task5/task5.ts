import {distributeHardWork} from "../../common/helpers";

export function mainTask5() {
    const EMPLOYEE_OPPORTUNITIES = [
        [5, 1, 9, 6],
        [0, 1, 7, 2, 4],
        [8, 9, 5],
        [6, 2, 3, 5],
        [4, 0, 9, 7, 5]
    ]

    const EMPLOYEE_PERFORMANCE = [
        [4, 1],
        [0, 1],
        [3, 1],
        [3],
        [1, 4],
        [0, 2, 4, 3],
        [3, 0],
        [4, 1],
        [2],
        [2, 4, 0]
    ]
    const [opportunitiesList, performanceList] = distributeHardWork(EMPLOYEE_OPPORTUNITIES, EMPLOYEE_PERFORMANCE)

    opportunitiesList.forEach(([employee, tasks, completedTasks]: [number, number[], boolean]) => {
        if (completedTasks) {
            console.log(`Сотрудник ${employee} получил задания: ${completedTasks}`)
        } else {
            console.log(`Сотрудник ${employee} не получил задания`);
        }
    })

    performanceList.forEach(([task, employees, completed]: [number, number[], boolean]) => {
        if (!completed) {
            console.log(`Задание ${task} никто не получил`)
        }
    })
}