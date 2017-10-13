/**
 * SudokuSolver Actions.
 *
 */

import {
    INITIATE_GRID,
    REQUEST_GRID_CHANGE,
    REQUEST_GRID_RESOLVE,
} from "./constant";


export function initiateGrid(grid) {
    return {
        type: INITIATE_GRID,
        grid,
    };
}


export function requestGridChange(grid) {
    return {
        type: REQUEST_GRID_CHANGE,
        grid,
    };
}


export function requestGridResolve(grid) {
    return {
        type: REQUEST_GRID_RESOLVE,
        grid,
    };
}
