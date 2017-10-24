/**
 * SudokuSolver Selectors.
 *
 */

import {createSelector} from "reselect";


/**
 * Direct selector to the home state domain.
 */
const selectSudokuSolver = (state) => state.get("sudoku_solver");


/**
 * Select the gridInitialValues state.
 */
export const makeSelectGridInitialValues = () => createSelector(
    selectSudokuSolver,
    (state) => state.get("gridInitialValues").toJS()
);


/**
 * Select the gridValues state.
 */
export const makeSelectGridValues = () => createSelector(
    selectSudokuSolver,
    (state) => state.get("gridValues").toJS()
);

/**
 * Select the gridCandidates state.
 */
export const makeSelectGridCandidates = () => createSelector(
    selectSudokuSolver,
    (state) => state.get("gridCandidates").toJS()
);


/**
 * Select the errorCells state.
 */
export const makeSelectErrorCells = () => createSelector(
    selectSudokuSolver,
    (state) => state.get("errorCells").toJS()
);


/**
 * Select the showCandidates state.
 */
export const makeSelectShowCandidates = () => createSelector(
    selectSudokuSolver,
    (state) => state.get("showCandidates")
);


/**
 * Select the gridSolved state.
 */
export const makeSelectGridSolved = () => createSelector(
    selectSudokuSolver,
    (state) => state.get("gridSolved")
);
