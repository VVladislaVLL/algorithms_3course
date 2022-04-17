import { Selecting } from "./Selecting";
import {Targets} from "./Targets";

export function main() {
    const POPULATION_SIZE: number = 3000;
    const VALUE_MIN: number = -200;
    const VALUE_MAX: number = 200;

    const VALUES_FOR_SELECTION: number = 2000;
    const VALUES_FOR_MUTATION: number = 800;
    const MUTATION_CHANCE: number = 0.5;
    const SUBSTITUTION_CHANCE: number = 0.5;

    const target = Targets.getTargetEquationA;

    const geneticAlgorithms = new Selecting(
        target,
        POPULATION_SIZE,
        VALUE_MIN,
        VALUE_MAX,
        VALUES_FOR_SELECTION,
        VALUES_FOR_MUTATION,
        MUTATION_CHANCE,
        SUBSTITUTION_CHANCE,
    );

    geneticAlgorithms.useGeneticSelecting();
}