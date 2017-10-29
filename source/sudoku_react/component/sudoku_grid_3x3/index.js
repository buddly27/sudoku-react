/**
 * SudokuGrid3x3 Component.
 *
 * This component represents a square Sudoku grid composed of 9 cells.
 *
 * Example::
 *
 *     <SudokuGrid3x3
 *         c10="1"
 *         c11="4"
 *         c21="8"
 *         c22="9"
 *         fixedCells={["c10", "c11", "c21"]}
 *         onChange={
 *             (grid) => {
 *                 console.log(`Request new grid: ${JSON.stringify(grid)}`);
 *             }
 *         }
 *     />
 *
 */

/* eslint-disable object-property-newline */

import React from "react";
import PropTypes from "prop-types";

import SudokuCell from "sudoku_react/component/sudoku_cell";

import StyledColumn from "./styled_column";
import StyledRow from "./styled_row";


/**
 * Render the SudokuGrid3X3 Component.
 *
 * *props* should contain:
 *
 * * cXX:
 *     Indicate the value of the cell which must be a number between 1 and 9, or
 *     the list of candidates numbers. The grid contains 9 cells with
 *     9 corresponding cell identifier properties that specify the position of
 *     the cell in the grid. The first number and the second number of the
 *     property name indicate respectfully the row index and the column index.
 *     'c00' indicates the cell in the top left corner and 'c22' the cell in the
 *     bottom right corner. By default, each cell is initiated to a candidates
 *     list containing all possible values.
 *
 * * fixedCells:
 *     Indicate a list of the cell identifiers which cannot be edited.
 *
 * * errorCells:
 *     Indicate a list of the cell identifiers which have an error.
 *
 * * showCandidates:
 *     Indicate whether the candidates should be shown (false by default).
 *
 * * onChange:
 *     Callback function called when a cell is edited. Its arguments
 *     contains the entire *grid* with the requested update. The grid is an
 *     object where each value is represented by its cell identifier property
 *     name.
 *
 *     Signature::
 *
 *         function(grid) => void
 */
const SudokuGrid3X3 = (props) => {
    const {fixedCells, errorCells, showCandidates, onChange} = props;
    const {c00, c01, c02, c10, c11, c12, c20, c21, c22} = props;

    const grid = {c00, c01, c02, c10, c11, c12, c20, c21, c22};

    return (
        <StyledColumn>
            <StyledRow>
                <SudokuCell
                    data={c00}
                    fixed={fixedCells.indexOf("c00") !== -1}
                    error={errorCells.indexOf("c00") !== -1}
                    showCandidates={showCandidates}
                    onChange={
                        (data) => onChange(
                            Object.assign({}, grid, {c00: data})
                        )
                    }
                />
                <SudokuCell
                    data={c01}
                    fixed={fixedCells.indexOf("c01") !== -1}
                    error={errorCells.indexOf("c01") !== -1}
                    showCandidates={showCandidates}
                    onChange={
                        (data) => onChange(
                            Object.assign({}, grid, {c01: data})
                        )
                    }
                />
                <SudokuCell
                    data={c02}
                    fixed={fixedCells.indexOf("c02") !== -1}
                    error={errorCells.indexOf("c02") !== -1}
                    showCandidates={showCandidates}
                    onChange={
                        (data) => onChange(
                            Object.assign({}, grid, {c02: data})
                        )
                    }
                />
            </StyledRow>
            <StyledRow>
                <SudokuCell
                    data={c10}
                    fixed={fixedCells.indexOf("c10") !== -1}
                    error={errorCells.indexOf("c10") !== -1}
                    showCandidates={showCandidates}
                    onChange={
                        (data) => onChange(
                            Object.assign({}, grid, {c10: data})
                        )
                    }
                />
                <SudokuCell
                    data={c11}
                    fixed={fixedCells.indexOf("c11") !== -1}
                    error={errorCells.indexOf("c11") !== -1}
                    showCandidates={showCandidates}
                    onChange={
                        (data) => onChange(
                            Object.assign({}, grid, {c11: data})
                        )
                    }
                />
                <SudokuCell
                    data={c12}
                    fixed={fixedCells.indexOf("c12") !== -1}
                    error={errorCells.indexOf("c12") !== -1}
                    showCandidates={showCandidates}
                    onChange={
                        (data) => onChange(
                            Object.assign({}, grid, {c12: data})
                        )
                    }
                />
            </StyledRow>
            <StyledRow>
                <SudokuCell
                    data={c20}
                    fixed={fixedCells.indexOf("c20") !== -1}
                    error={errorCells.indexOf("c20") !== -1}
                    showCandidates={showCandidates}
                    onChange={
                        (data) => onChange(
                            Object.assign({}, grid, {c20: data})
                        )
                    }
                />
                <SudokuCell
                    data={c21}
                    fixed={fixedCells.indexOf("c21") !== -1}
                    error={errorCells.indexOf("c21") !== -1}
                    showCandidates={showCandidates}
                    onChange={
                        (data) => onChange(
                            Object.assign({}, grid, {c21: data})
                        )
                    }
                />
                <SudokuCell
                    data={c22}
                    fixed={fixedCells.indexOf("c22") !== -1}
                    error={errorCells.indexOf("c22") !== -1}
                    showCandidates={showCandidates}
                    onChange={
                        (data) => onChange(
                            Object.assign({}, grid, {c22: data})
                        )
                    }
                />
            </StyledRow>
        </StyledColumn>
    );
};


/**
 * Expected types for *props*.
 */
SudokuGrid3X3.propTypes = {
    c00: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c01: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c02: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c10: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c11: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c12: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c20: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c21: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c22: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    fixedCells: PropTypes.array.isRequired,
    errorCells: PropTypes.array.isRequired,
    showCandidates: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};


/**
 * Default values for *props*.
 */
SudokuGrid3X3.defaultProps = {
    c00: [1, 2, 3, 4, 5, 6, 7, 8],
    c01: [1, 2, 3, 4, 5, 6, 7, 8],
    c02: [1, 2, 3, 4, 5, 6, 7, 8],
    c10: [1, 2, 3, 4, 5, 6, 7, 8],
    c11: [1, 2, 3, 4, 5, 6, 7, 8],
    c12: [1, 2, 3, 4, 5, 6, 7, 8],
    c20: [1, 2, 3, 4, 5, 6, 7, 8],
    c21: [1, 2, 3, 4, 5, 6, 7, 8],
    c22: [1, 2, 3, 4, 5, 6, 7, 8],
    fixedCells: [],
    errorCells: [],
    showCandidates: false,
};


export default SudokuGrid3X3;
