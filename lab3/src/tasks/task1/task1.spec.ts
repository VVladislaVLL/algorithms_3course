// import {Graph} from '../common/Graph';
//
// describe('Задание 3.1', () => {
//     describe('Проверка двудольности', () => {
//         it('Должен вернуть true для двудольного графа', () => {
//             const graph = new Graph(5);
//             graph
//                 .addVertexes(['A', 'B', 'C', 'D', 'E'])
//                 .addEdge('A', 'C')
//                 .addEdge('A', 'D')
//                 .addEdge('A', 'E')
//                 .addEdge('B', 'C')
//                 .addEdge('B', 'D')
//                 .addEdge('B', 'E')
//                 .addEdge('C', 'A')
//                 .addEdge('C', 'B')
//                 .addEdge('D', 'A')
//                 .addEdge('D', 'B')
//                 .addEdge('E', 'A')
//                 .addEdge('E', 'B')
//
//             expect(true).toBeTruthy();
//         });
//
//         it('Должен вернуть false для не двудольного графа', () => {
//             const graph = new Graph(4);
//             graph
//                 .addVertexes(['A', 'B', 'C', 'D'])
//                 .addEdge('A', 'B')
//                 .addEdge('B', 'A')
//                 .addEdge('B', 'C')
//                 .addEdge('C', 'B')
//                 .addEdge('C', 'A')
//                 .addEdge('A', 'D')
//                 .addEdge('D', 'A')
//                 .addEdge('C', 'D')
//                 .addEdge('D', 'C')
//                 .addEdge('B', 'D')
//                 .addEdge('D', 'B')
//
//             const actual = graph.myDfs();
//             expect(actual).toBeFalsy();
//         });
//     });
//
//
//     describe('Проверка Эйлеровосоти', () => {
//         it('Должен вернуть true, если граф Эйдеровый', function () {
//             const graph = new Graph(4);
//             graph
//                 .addVertexes(['A', 'B', 'C', 'D'])
//         });
//
//         it('Должен вернуть true, если граф Эйдеровый', function () {
//
//         });
//     });
// });
