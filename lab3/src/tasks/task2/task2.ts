import {breakRules, floydWarshall, mostConvenientCrossroads, prim} from "../../common/helpers";

/*Задание 3.2.
    В городе есть N перекрестков и M дорог (каждая дорога начинается и заканчивается перекрестком, дороги имеют направление).
Известно время проезда каждой дороги (время проезда дорог i->j и j->i может быть различным).
Определить перекресток для расположения на нем пожарной станции с условием:
    пожарная машина должна попасть в наиболее удаленный от станции перекресток за минимальное возможное время
(пожарная машина может нарушать требования ПДД и ехать по встречному направлению).
Задачу реализовать 2-мя алгоритмами.*/

export function mainTask2() {
    const GRAPH = [
        [0, Infinity, Infinity, Infinity, Infinity, 3, 7],
        [Infinity, 0, 3, 1, Infinity, Infinity, Infinity],
        [Infinity, 6, 0, Infinity, Infinity, Infinity, Infinity],
        [Infinity, Infinity, 4, 0, Infinity, Infinity, 3],
        [Infinity, Infinity, Infinity, 1, 0, 1, Infinity],
        [5, Infinity, Infinity, Infinity, Infinity, 0, Infinity],
        [6, 9, Infinity, 11, Infinity, Infinity, 0]
    ]

    const [min_distance, crossroads] = mostConvenientCrossroads(floydWarshall(breakRules(GRAPH)))
    console.log(`Самые удобные перекрестки с максимальным    расстоянием ${min_distance}`);
    crossroads.forEach((crossroad) => {
        console.log(`${crossroad[0]}: ${crossroad[1]}`)
    })
}