/**
 * SudokuSolver Reducer.
 *
 */

/* eslint-disable object-property-newline */

import {fromJS} from "immutable";
import {SudokuGrid} from "sudoku-javascript";

import {
    INITIATE_GRID,
    ON_GRID_CHANGE,
} from "./constant";


/**
 * Initiate state for the container component.
 */
const INITIAL_STATE = fromJS({
    grid: {
        c03: 1, c05: 5,
        c10: 1, c11: 4, c16: 6, c17: 7,
        c21: 8, c25: 2, c26: 4,
        c31: 6, c32: 3, c34: 7, c37: 1,
        c40: 9, c48: 3,
        c51: 1, c54: 9, c56: 5, c57: 2,
        c62: 7, c63: 2, c67: 8,
        c71: 2, c72: 6, c77: 3, c78: 5,
        c83: 4, c85: 9,
    },
    fixedCells: [],
    errorCells: [],
});


/**
 * Return modified container *state* depending on *action*.
 */
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case INITIATE_GRID:
            return state.set("fixedCells", fromJS(Object.keys(action.grid)));
        case ON_GRID_CHANGE: {
            const grid = new SudokuGrid(action.newGrid);
            const errorMapping = grid.validate();

            return state
                .set("grid", fromJS({...action.newGrid}))
                .set("errorCells", fromJS(Object.keys(errorMapping)));
        }
        default:
            return state;
    }
}
