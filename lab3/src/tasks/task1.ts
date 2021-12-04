import {Graph, Vertex} from '../common/Graph';


/* Задание 3.1.
Граф G задан списками смежностей вершин.Найти компоненты связности графа G.
Определить, является ли граф G эйлеровым; если граф G - эйлеров, построить эйлеров цикл. 
Определить, является ли граф G двудольным; если G - двудольный, найти разбиение на доли. */

export function mainTask1() {
    // const graph = new Graph(7);
    // const r = graph
    //     .addVertexes(['A', 'B', 'C', 'D', 'E', 'K', 'M'])
    //     .addEdge('A', 'C')
    //     .addEdge('A', 'D')
    //     .addEdge('A', 'E')
    //     .addEdge('B', 'C')
    //     .addEdge('B', 'D')
    //     .addEdge('B', 'E')
    //     .addEdge('C', 'A')
    //     .addEdge('C', 'B')
    //     .addEdge('D', 'A')
    //     .addEdge('D', 'B')
    //     .addEdge('E', 'A')
    //     .addEdge('K', 'M')
    //     .addEdge('M', 'K')
    //     .addEdge('E', 'B').findConnectivityComponent();

    // console.log('r = ', r)

    const graph = new Graph(4);
    const path = graph
        .addVertexes(['A', 'B', 'C', 'D'])
        .addEdge('A', 'B')
        .addEdge('B', 'A')
        .addEdge('B', 'C')
        .addEdge('C', 'B')
        .addEdge('C', 'A')
        .addEdge('A', 'C')
        .addEdge('C', 'D')
        .addEdge('D', 'C')
        .addEdge('D', 'A')
        .addEdge('A', 'D')
        .findEulerianPath();

    console.log('path', path)

}
