/**
 * SudokuSolver Selectors.
 *
 */

import {createSelector} from "reselect";


/**
 * Direct selector to the home state domain.
 */
const selectHome = (state) => state.get("sudoku_solver");


/**
 * Select the grid state.
 */
export const makeSelectGrid = () => createSelector(
    selectHome,
    (state) => state.get("grid").toJS()
);


/**
 * Select the fixedCells state.
 */
export const makeSelectFixedCells = () => createSelector(
    selectHome,
    (state) => state.get("fixedCells").toJS()
);


/**
 * Select the errorCells state.
 */
export const makeSelectErrorCells = () => createSelector(
    selectHome,
    (state) => state.get("errorCells").toJS()
);
