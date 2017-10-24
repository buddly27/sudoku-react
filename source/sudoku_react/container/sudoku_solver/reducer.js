/**
 * SudokuSolver Reducer.
 *
 */

/* eslint-disable object-property-newline */

import {fromJS} from "immutable";
import {SudokuGrid, SudokuSolver} from "sudoku-javascript";

import {
    REQUEST_GRID_INITIALISATION,
    REQUEST_GRID_CHANGE,
    REQUEST_GRID_RESOLVE_ALL,
    REQUEST_GRID_RESOLVE_NEXT,
    REQUEST_SHOW_CANDIDATES,
} from "./constant";


/**
 * Initiate state for the container component.
 */
const INITIAL_STATE = fromJS({
    gridInitialValues: {
        c00: 3,
        c10: 9, c11: 7, c14: 1,
        c20: 6, c23: 5, c24: 8, c25: 3,
        c30: 2, c36: 9,
        c40: 5, c43: 6, c44: 2, c45: 1, c48: 3,
        c52: 8, c58: 5,
        c63: 4, c64: 3, c65: 5, c68: 2,
        c74: 9, c77: 5, c78: 6,
        c88: 1,
    },
    gridValues: {},
    gridCandidates: {},
    errorCells: [],
    showCandidates: false,
    gridSolved: false,
});


/**
 * Return modified container *state* depending on *action*.
 */
export default function reducer(state = INITIAL_STATE, action) {
    switch (action.type) {
        case REQUEST_GRID_INITIALISATION:
            return state
                .set("gridValues", fromJS(action.gridValues))
                .set("gridCandidates", fromJS({}))
                .set("errorCells", fromJS([]))
                .set("gridSolved", false);
        case REQUEST_GRID_CHANGE: {
            const grid = new SudokuGrid(
                action.gridValues,
                action.gridCandidates
            );

            const errorMapping = grid.validate();

            return state
                .set("gridCandidates", fromJS(grid.toCandidateMapping()))
                .set("gridValues", fromJS(grid.toValueMapping()))
                .set("errorCells", fromJS(Object.keys(errorMapping)))
                .set("gridSolved", grid.isSolved());
        }
        case REQUEST_GRID_RESOLVE_ALL: {
            const grid = new SudokuGrid(
                action.gridValues,
                action.gridCandidates
            );
            const solver = new SudokuSolver();
            const result = solver.resolve(grid);

            return state
                .set("gridValues", fromJS(grid.toValueMapping()))
                .set("gridCandidates", fromJS(grid.toCandidateMapping()))
                .set("gridSolved", result);
        }
        case REQUEST_GRID_RESOLVE_NEXT: {
            const grid = new SudokuGrid(
                action.gridValues,
                action.gridCandidates
            );

            const result = grid.update();
            if (!result) {
                const solver = new SudokuSolver();
                const mapping = solver.applyStrategiesUntilFirstResult(grid);
                Object.keys(mapping).forEach((identifier) => {
                    const cell = grid.cellFromId(identifier);
                    cell.candidates = mapping[identifier].candidates;
                });
            }

            return state
                .set("gridValues", fromJS(grid.toValueMapping()))
                .set("gridCandidates", fromJS(grid.toCandidateMapping()))
                .set("gridSolved", grid.isSolved());
        }
        case REQUEST_SHOW_CANDIDATES:
            return state.set("showCandidates", action.checked);
        default:
            return state;
    }
}
