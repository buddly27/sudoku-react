/**
 * SudokuSolver Reducer.
 *
 */

/* eslint-disable object-property-newline */

import {fromJS} from "immutable";
import {SudokuGrid, SudokuSolver} from "sudoku-javascript";

import {
    REQUEST_NEW_GRID,
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
    gridName: "Example 1",
    grids: {
        "Example 1": {
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
        "Example 2": {
            c01: 2, c03: 6, c05: 8,
            c10: 5, c11: 8, c15: 9, c16: 7,
            c24: 4,
            c30: 3, c31: 7, c36: 5,
            c40: 6, c48: 4,
            c52: 8, c57: 1, c58: 3,
            c64: 2,
            c72: 9, c73: 8, c77: 3, c78: 6,
            c83: 3, c85: 6, c87: 9,
        },
        "Example 3": {
            c03: 2, c07: 6, c08: 3,
            c10: 3, c15: 5, c16: 4, c18: 1,
            c22: 1, c25: 3, c26: 9, c27: 8,
            c37: 9,
            c43: 5, c44: 3, c45: 8,
            c51: 3,
            c61: 2, c62: 6, c63: 3, c66: 5,
            c70: 5, c72: 3, c73: 7, c78: 8,
            c80: 4, c81: 7, c85: 1,
        },
        "Example 4": {
            c03: 6, c06: 4,
            c10: 7, c15: 3, c16: 6,
            c24: 9, c25: 1, c27: 8,
            c41: 5, c43: 1, c44: 8, c48: 3,
            c53: 3, c55: 6, c57: 4, c58: 5,
            c61: 4, c63: 2, c67: 6,
            c70: 9, c72: 3,
            c81: 2, c86: 1,
        },
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
        case REQUEST_NEW_GRID: {
            const {gridName} = action;
            return state
                .set("gridName", gridName)
                .set("valueMapping", fromJS(state.get("grids").get(gridName)))
                .set("candidateMapping", fromJS({}))
                .set("errorCells", fromJS([]))
                .set("gridSolved", false);
        }
        case REQUEST_GRID_INITIALISATION: {
            const gridName = state.get("gridName");
            return state
                .set("valueMapping", fromJS(state.get("grids").get(gridName)))
                .set("candidateMapping", fromJS({}))
                .set("errorCells", fromJS([]))
                .set("gridSolved", false);
        }
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
