/**
 * Home Selectors.
 *
 */
import {createSelector} from "reselect";


/**
 * Direct selector to the home state domain.
 */
const selectHome = (state) => state.get("home");


/**
 * Select the grid state.
 */
const makeSelectGrid = () => createSelector(
    selectHome,
    (state) => state.get("grid").toJS()
);


/**
 * Select the nonEditableCells state.
 */
const makeSelectFixedCells = () => createSelector(
    selectHome,
    (state) => state.get("fixedCells").toJS()
);


export {
    makeSelectGrid,
    makeSelectFixedCells,
};
