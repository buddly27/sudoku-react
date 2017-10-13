/**
 * SudokuSolver Actions.
 *
 */

import {
    INITIATE_GRID,
    ON_GRID_CHANGE,
} from "./constant";


export function initiateGrid(grid) {
    return {
        type: INITIATE_GRID,
        grid,
    };
}


export function onGridChange(newGrid) {
    return {
        type: ON_GRID_CHANGE,
        newGrid,
    };
}
