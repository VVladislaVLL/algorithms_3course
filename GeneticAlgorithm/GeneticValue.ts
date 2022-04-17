export class GeneticValue {
    public static readonly count: number = 5;

    public u: number;
    public w: number;
    public x: number;
    public y: number;
    public z: number;

    constructor(u: number, w: number, x: number, y: number, z: number) {
        this.u = u;
        this.w = w;
        this.x = x;
        this.y = y;
        this.z = z;
    }

    setValue(index: number, value: number): void {
        switch (index) {
            case 0:
                this.u = value;
                break;
            case 1:
                this.w = value;
                break;
            case 2:
                this.x = value;
                break;
            case 3:
                this.y = value;
                break;
            case 4:
                this.z = value;
                break;
            default:
                throw Error('Index out of the rage!');
        }
    }

    getValue(index: number): number {
        switch (index) {
            case 0:
                return this.u;
            case 1:
                return this.w;
            case 2:
                return this.x;
            case 3:
                return this.y;
            case 4:
                return this.z;
            default:
                throw Error('Index out of the rage!');
        }
    }

    copy(value: GeneticValue): void {
        this.u = value.u;
        this.w = value.w;
        this.x = value.x;
        this.y = value.y;
        this.z = value.z;
    }

    clone(): GeneticValue {
        return new GeneticValue(...this.getValues());
    }

    getValues(): [number, number, number, number, number] {
        return [this.u, this.w, this.x, this.y, this.z];
    }
}