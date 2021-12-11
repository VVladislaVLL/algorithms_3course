import {distributeWork} from '../../common/helpers';


/*Задание 3.4.
    Есть K сотрудников и K задач. Для каждого сотрудника i определены задачи N(i), которые он умеет выполнять.
    Назначить задачи сотрудникам, так чтобы каждый сотрудник работал только над одной задачей, и все задачи были выполнены.
    В случае невозможности такого назначения, указать, какого сотрудника необходимо обучить какой задаче для возможности искомого назначения.*/
export function mainTask4() {
    const EMPLOYEE_OPPORTUNITIES = [
        [0, 1],
        [2],
        [3],
        [0],
        [1, 2, 3]
    ];

    const [completedTask, uncompletedTasks] = distributeWork(EMPLOYEE_OPPORTUNITIES);
    completedTask.forEach((task) =>  console.log(`Сотрудник ${task[1]} -> Задание ${task[0]}`));
    uncompletedTasks.forEach((task) => console.log(`Обучить сотрудника ${task[1]} -> Заданию ${task[0]}`));
}