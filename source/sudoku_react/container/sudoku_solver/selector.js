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
 * Select the nonEditableCells state.
 */
export const makeSelectFixedCells = () => createSelector(
    selectHome,
    (state) => state.get("fixedCells").toJS()
);
