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


export function requestGridInitialisation(gridValues) {
    return {
        type: REQUEST_GRID_INITIALISATION,
        gridValues,
    };
}


export function requestGridChange(gridValues, gridCandidates) {
    return {
        type: REQUEST_GRID_CHANGE,
        gridValues,
        gridCandidates,
    };
}


export function requestGridResolveAll(gridValues, gridCandidates) {
    return {
        type: REQUEST_GRID_RESOLVE_ALL,
        gridValues,
        gridCandidates,
    };
}


export function requestGridResolveNext(gridValues, gridCandidates) {
    return {
        type: REQUEST_GRID_RESOLVE_NEXT,
        gridValues,
        gridCandidates,
    };
}


export function requestShowCandidates(checked) {
    return {
        type: REQUEST_SHOW_CANDIDATES,
        checked,
    };
}
