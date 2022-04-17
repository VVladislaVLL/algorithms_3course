import {GeneticValue} from "./GeneticValue";

export class Targets {
    public static getTargetEquationA(value: GeneticValue): number {
        const [u, w, x, y, z] = value.getValues();
        return Math.abs(x*y*z + x*y*(z**2) + y + u*x*(y**2)*(z**2) + (w**2)*x*(y**2)*z + 50);
    }
}