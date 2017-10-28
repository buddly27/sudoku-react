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
    initialValueMapping: {
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
    valueMapping: {},
    candidateMapping: {},
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
                .set("valueMapping", fromJS(action.valueMapping))
                .set("candidateMapping", fromJS({}))
                .set("errorCells", fromJS([]))
                .set("gridSolved", false);
        case REQUEST_GRID_CHANGE: {
            const grid = new SudokuGrid(
                action.valueMapping,
                action.candidateMapping
            );

            const errorMapping = grid.validate();

            return state
                .set("candidateMapping", fromJS(grid.toCandidateMapping()))
                .set("valueMapping", fromJS(grid.toValueMapping()))
                .set("errorCells", fromJS(Object.keys(errorMapping)))
                .set("gridSolved", grid.isSolved());
        }
        case REQUEST_GRID_RESOLVE_ALL: {
            const grid = new SudokuGrid(
                action.valueMapping,
                action.candidateMapping
            );
            const solver = new SudokuSolver();

            let errorCells = [];
            let gridSolved = false;

            try {
                gridSolved = solver.resolve(grid);
            }
            catch (error) {
                if (error.name === "SudokuCellError") {
                    const errorMapping = grid.validate();
                    errorCells = Object.keys(errorMapping);
                    errorCells.push(error.identifier);
                }
            }

            return state
                .set("errorCells", fromJS(errorCells))
                .set("valueMapping", fromJS(grid.toValueMapping()))
                .set("candidateMapping", fromJS(grid.toCandidateMapping()))
                .set("gridSolved", gridSolved);
        }
        case REQUEST_GRID_RESOLVE_NEXT: {
            const grid = new SudokuGrid(
                action.valueMapping,
                action.candidateMapping
            );

            let errorCells = [];

            try {
                // Apply strategies if the grid could not be updated
                if (!updateGrid(grid)) {
                    const solver = new SudokuSolver();
                    const mapping = solver.applyStrategiesUntilFirstResult(grid);
                    Object.keys(mapping).forEach((identifier) => {
                        const cell = grid.cellFromId(identifier);
                        cell.candidates = mapping[identifier].candidates;
                    });

                    // Update solved cells after applying the strategies
                    grid.updateSolvedCells();
                }
            }
            catch (error) {
                if (error.name === "SudokuCellError") {
                    errorCells.push(error.identifier);
                }
            }

            const errorMapping = grid.validate();
            errorCells = errorCells.concat(Object.keys(errorMapping));

            return state
                .set("errorCells", fromJS(errorCells))
                .set("valueMapping", fromJS(grid.toValueMapping()))
                .set("candidateMapping", fromJS(grid.toCandidateMapping()))
                .set("gridSolved", grid.isSolved());
        }
        case REQUEST_SHOW_CANDIDATES:
            return state.set("showCandidates", action.checked);
        default:
            return state;
    }
}


/**
 * Update the cells value and candidates of the *grid*.
 *
 * Return true as soon as a new value is found or as soon as new candidates are
 * set if *showCandidates* is positive. Otherwise return false.
 */
export function updateGrid(grid, showCandidates) {
    let candidatesUpdated = false;

    do {
        const solved = grid.updateSolvedCells();
        if (solved) {
            return true;
        }

        candidatesUpdated = grid.updateCandidates();
        if (candidatesUpdated && showCandidates) {
            return true;
        }
    } while (candidatesUpdated);

    return false;
}
