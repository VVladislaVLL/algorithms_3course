export type Vertex = string;

export type ConnectivityComponent = Vertex[];

export type VisitedVertexes = { [vertex: Vertex]: boolean };

export type Rib = [Vertex, Vertex];

export enum Colors {
    White,
    Black
}