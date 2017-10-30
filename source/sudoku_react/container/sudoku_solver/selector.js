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
 * Select the gridName state.
 */
export const makeSelectGridName = () => createSelector(
    selectSudokuSolver,
    (state) => state.get("gridName")
);


/**
 * Select the grids state.
 */
export const makeSelectGrids = () => createSelector(
    selectSudokuSolver,
    (state) => state.get("grids").toJS()
);


/**
 * Select the valueMapping state.
 */
export const makeSelectValueMapping = () => createSelector(
    selectSudokuSolver,
    (state) => state.get("valueMapping").toJS()
);

/**
 * Select the candidateMapping state.
 */
export const makeSelectCandidateMapping = () => createSelector(
    selectSudokuSolver,
    (state) => state.get("candidateMapping").toJS()
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
