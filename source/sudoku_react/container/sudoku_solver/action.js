/**
 * SudokuSolver Actions.
 *
 */

import {
    REQUEST_GRID_INITIALISATION,
    REQUEST_GRID_CHANGE,
    REQUEST_GRID_RESOLVE_ALL,
    REQUEST_GRID_RESOLVE_NEXT,
    REQUEST_SHOW_CANDIDATES,
} from "./constant";


export function requestGridInitialisation(valueMapping) {
    return {
        type: REQUEST_GRID_INITIALISATION,
        valueMapping,
    };
}


export function requestGridChange(valueMapping, candidateMapping) {
    return {
        type: REQUEST_GRID_CHANGE,
        valueMapping,
        candidateMapping,
    };
}


export function requestGridResolveAll(valueMapping, candidateMapping) {
    return {
        type: REQUEST_GRID_RESOLVE_ALL,
        valueMapping,
        candidateMapping,
    };
}


export function requestGridResolveNext(valueMapping, candidateMapping) {
    return {
        type: REQUEST_GRID_RESOLVE_NEXT,
        valueMapping,
        candidateMapping,
    };
}


export function requestShowCandidates(checked) {
    return {
        type: REQUEST_SHOW_CANDIDATES,
        checked,
    };
}
