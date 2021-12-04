export type Vertex = string;
export type ConnectivityComponent = Vertex[];
export type VisitedVertexes = { [vertex: Vertex]: boolean };
export type Rib = [Vertex, Vertex];

export class Graph {
    private readonly numberOfVertices: number;
    private adjacentList: Map<Vertex, Vertex[]>;
    private isBipartite: boolean = true;

    constructor(noOfVertices: any) {
        this.numberOfVertices = noOfVertices;
        this.adjacentList = new Map();
    }

    get vertexes(): Vertex[] {
        return Array.from(this.adjacentList.keys());
    }

    get ribs(): Rib[] {
        const copyAdjacentList = new Map(this.adjacentList);
        return this.vertexes.reduce((ribs: Rib[], vertex: Vertex) => {
            const adjacentVertexes = this.adjacentList.get(vertex);
            adjacentVertexes.forEach((adjacentVertex: Vertex) => {
                if (!this.isRibsContainsThisRib([vertex, adjacentVertex], ribs)) {
                    ribs.push([vertex, adjacentVertex]);
                }
            });
            return ribs;
        }, []);
    }

    private isRibsContainsThisRib(ribToCheck: Rib, ribs: Rib[]): boolean {
        return !!ribs.find((rib: Rib) => {
           return JSON.stringify(rib) === JSON.stringify(ribToCheck) || JSON.stringify(rib) === JSON.stringify(ribToCheck.reverse())
        });
    }

    public addVertex(vertex: Vertex): this {
        this.adjacentList.set(vertex, []);
        return this;
    }

    public addVertexes(vertex: Vertex[]): this {
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

        return this.vertexes.reduce((connectivityComponents: ConnectivityComponent[], vertex: Vertex) => {
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

    public isEulerian(): boolean {
        this.vertexes.forEach((vertex: Vertex) => {
            if (!this.adjacentList.get(vertex).length || this.adjacentList.get(vertex).length % 2 !== 0) {
                return false;
            }
        });
        return true;
    }

    public findEulerianPath(): Vertex[] {
        if (!this.isEulerian()) {
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

    private getRibByVertex(vertex: Vertex, ribs: Rib[]) {
        return ribs.find((rib: Rib) => {
            return rib.includes(vertex);
        });
    }
}