import {Colors, ConnectivityComponent, Rib, Vertex, VisitedVertexes} from './model';

export class Graph {
    private readonly numberOfVertices: number;
    private readonly adjacentList: Map<Vertex, Vertex[]>;
    private vertexColors: Map<Vertex, Colors>

    constructor(noOfVertices: any) {
        this.numberOfVertices = noOfVertices;
        this.adjacentList = new Map();
        this.vertexColors = new Map();
    }

    private get vertices(): Vertex[] {
        return Array.from(this.adjacentList.keys());
    }

    private get ribs(): Rib[] {
        return this.vertices.reduce((ribs: Rib[], vertex: Vertex) => {
            const adjacentVertexes = this.adjacentList.get(vertex);
            adjacentVertexes.forEach((adjacentVertex: Vertex) => {
                if (!this.isRibsContainsThisRib([vertex, adjacentVertex], ribs)) {
                    ribs.push([vertex, adjacentVertex]);
                }
            });
            return ribs;
        }, []);
    }

    public get isEulerian(): boolean {
        let flag: boolean = true;
        let oddVertex: number = 0;

        this.vertices.forEach((vertex: Vertex) => {
            const vertexDegree = this.adjacentList.get(vertex).length;
            if (!vertexDegree) {
                flag = false;
                return;
            } else if (vertexDegree % 2) {
                oddVertex += 1;
            }
        })

        if (oddVertex > 2 || oddVertex === 1) {
            return false;
        }

        return flag;
    }

    public get isBipartite(): boolean {
        const queue = [Array.from(this.adjacentList)[0]];
        this.vertexColors.set(queue[0][0], Colors.White);

        let flag: boolean = true;
        while (queue.length) {
            const v1 = queue.shift();
            v1[1].forEach((v2: Vertex) => {
                if (!this.vertexColors.get(v2)) {
                    this.vertexColors.set(v2, this.vertexColors.get(v1[0]) === Colors.White ? Colors.Black : Colors.White);
                    queue.unshift([v2, this.adjacentList.get(v2)]);
                } else if (this.vertexColors.get(v2) === this.vertexColors.get(v1[0])) {
                    flag = false;
                    return;
                }
            });
        }

        return flag;
    }

    public addVertex(vertex: Vertex): this {
        this.adjacentList.set(vertex, []);
        return this;
    }

    public addVertices(vertex: Vertex[]): this {
        vertex.forEach((vertex: Vertex) => {
            this.addVertex(vertex);
        });
        return this;
    }

    public addEdge(u: Vertex, v: Vertex): this {
        this.adjacentList.get(u).push(v);
        this.adjacentList.get(v).push(u);
        return this;
    }

    private isRibsContainsThisRib(ribToCheck: Rib, ribs: Rib[]): boolean {
        return !!ribs.find((rib: Rib) => {
            return JSON.stringify(rib) === JSON.stringify(ribToCheck)
                || JSON.stringify(rib) === JSON.stringify(ribToCheck.reverse());
        });
    }

    public dfs(vertex: Vertex, visitedVertexes: VisitedVertexes, component: ConnectivityComponent ): void {
        visitedVertexes[vertex] = true;
        component.push(vertex);
        const adjacentVertexes = this.adjacentList.get(vertex);
        adjacentVertexes.forEach((adjacentVertex: Vertex) => {
            if (!visitedVertexes[adjacentVertex]) {
                this.dfs(adjacentVertex, visitedVertexes, component);
            }
        });
    }

    public findConnectivityComponent(): ConnectivityComponent[] {
        // https://e-maxx.ru/algo/connected_components
        const visitedVertexes: VisitedVertexes = {};
        let component: ConnectivityComponent = [];

        return this.vertices.reduce((connectivityComponents: ConnectivityComponent[], vertex: Vertex) => {
            if (!visitedVertexes[vertex]) {
                component = [];
                this.dfs(vertex, visitedVertexes, component);
                if (component.length !== 0) {
                    connectivityComponents.push(component);
                }
            }
            return connectivityComponents;
        }, []);
    }

    public findEulerianPath(): Vertex[] {
        if (!this.isEulerian) {
            return [];
        }

        const ribs = this.ribs;
        const stack = [ribs[0][0]];
        const path = [];
        while (stack.length > 0) {
            const vertex = stack[stack.length - 1];
            const vertexDegree = this.getVertexDegree(vertex, ribs);

            if (vertexDegree === 0) {
                stack.pop();
                path.push(vertex);
            } else {
                const rib = this.getRibByVertex(vertex, ribs);
                this.removeFromRibs(rib, ribs);
                stack.push(rib[0] !== vertex ? rib[0] : rib[1]);
            }
        }
        return path;
    }

    private getVertexDegree(vertex: Vertex, ribs: Rib[]): number {
        return ribs.reduce((degree: number, rib: Rib) => {
           if (rib.includes(vertex)) {
               degree += 1;
           }
           return degree;
        }, 0);
    }

    private removeFromRibs(ribToDelete: Rib, ribs: Rib[]): void {
        const indexes = [];
        ribs.forEach((rib: Rib, index: number) => {
            if (JSON.stringify(rib) === JSON.stringify(ribToDelete)
                || JSON.stringify(rib) === JSON.stringify(ribToDelete.reverse())
            ) {
                indexes.push(index);
            }
        });

        indexes.forEach((index: number, i: number) => {
            if (i === 0) {
                ribs.splice(index, 1);
            } else {
                ribs.splice(index - 1, 1);
            }
        });
    }

    private getRibByVertex(vertex: Vertex, ribs: Rib[]): Rib | undefined {
        return ribs.find((rib: Rib) => rib.includes(vertex));
    }

    public getEulerianPath(): Vertex[] {
        if (!this.isEulerian) {
            return [];
        }

        const ribs = this.ribs;
        const stack = [ribs[0][0]];
        const path = [];
        while (stack.length) {
            const vertex = stack[stack.length - 1];
            const vertexDegree = this.getVertexDegree(vertex, ribs);

            if (vertexDegree) {
                const rib = this.getRibByVertex(vertex, ribs);
                this.removeFromRibs(rib, ribs);
                stack.push(rib[0] !== vertex ? rib[0] : rib[1]);
            } else {
                stack.pop();
                path.push(vertex);
            }
        }

        return path;
    }

    public bipartiteComponents(): {[key: string]: Vertex[]} {
        if (!this.isBipartite) {
            return {};
        }

        const L: Vertex[] = [];
        const R: Vertex[] = [];
        Array.from(this.vertexColors).forEach(([v, color]: [Vertex, Colors]) => {
            color === Colors.White ? L.push(v) : R.push(v);
        })
        return { L, R };
    }

    public printGraph(): void {
        const keys = Array.from(this.adjacentList.keys());
        keys.forEach((key: Vertex) => {
            const values = this.adjacentList.get(key);
            let representation: string = '';
            values.forEach((value: Vertex) => {
                representation += value + ' ';
                console.log(value + ' -> ' + representation);
            });
        });
    }

    public floydWarshallAlgorithm() {

    }
}