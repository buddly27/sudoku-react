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
 *     Indicate the value contained in the corresponding cell between 0 and 9
 *     (0 means that the cell is not filled). The grid contains 9 cells with
 *     9 corresponding cell identifier properties that specify the position of
 *     the cell in the grid. The first number and the second number of the
 *     property name indicate respectfully the row index and the column index.
 *     'c00' indicates the cell in the top left corner and 'c22' the cell in the
 *     bottom right corner. By default, each cell is initiated to 0.
 *
 * * fixedCells:
 *     Indicate a list of the cell identifiers which cannot be edited.
 *
 * * onChange:
 *     Callback function called when a cell is edited. Its arguments
 *     contains the entire *grid* with the requested update. The grid is an
 *     object where each value is represented by its cell identifier property
 *     name.
 *
 *     Signature::
 *
 *         function(grid: object) => void
 *
 */
const SudokuGrid3X3 = (props) => {
    const {fixedCells, onChange} = props;
    const {c00, c01, c02, c10, c11, c12, c20, c21, c22} = props;

    const block = {
        c00, c01, c02,
        c10, c11, c12,
        c20, c21, c22,
    };

    return (
        <StyledColumn>
            <StyledRow>
                <SudokuCell
                    value={c00}
                    fixed={fixedCells.indexOf("c00") !== -1}
                    onChange={
                        (value) => onChange(
                            Object.assign({}, block, {c00: value})
                        )
                    }
                />
                <SudokuCell
                    value={c01}
                    fixed={fixedCells.indexOf("c01") !== -1}
                    onChange={
                        (value) => onChange(
                            Object.assign({}, block, {c01: value})
                        )
                    }
                />
                <SudokuCell
                    value={c02}
                    fixed={fixedCells.indexOf("c02") !== -1}
                    onChange={
                        (value) => onChange(
                            Object.assign({}, block, {c02: value})
                        )
                    }
                />
            </StyledRow>
            <StyledRow>
                <SudokuCell
                    value={c10}
                    fixed={fixedCells.indexOf("c10") !== -1}
                    onChange={
                        (value) => onChange(
                            Object.assign({}, block, {c10: value})
                        )
                    }
                />
                <SudokuCell
                    value={c11}
                    fixed={fixedCells.indexOf("c11") !== -1}
                    onChange={
                        (value) => onChange(
                            Object.assign({}, block, {c11: value})
                        )
                    }
                />
                <SudokuCell
                    value={c12}
                    fixed={fixedCells.indexOf("c12") !== -1}
                    onChange={
                        (value) => onChange(
                            Object.assign({}, block, {c12: value})
                        )
                    }
                />
            </StyledRow>
            <StyledRow>
                <SudokuCell
                    value={c20}
                    fixed={fixedCells.indexOf("c20") !== -1}
                    onChange={
                        (value) => onChange(
                            Object.assign({}, block, {c20: value})
                        )
                    }
                />
                <SudokuCell
                    value={c21}
                    fixed={fixedCells.indexOf("c21") !== -1}
                    onChange={
                        (value) => onChange(
                            Object.assign({}, block, {c21: value})
                        )
                    }
                />
                <SudokuCell
                    value={c22}
                    fixed={fixedCells.indexOf("c22") !== -1}
                    onChange={
                        (value) => onChange(
                            Object.assign({}, block, {c22: value})
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
    c00: PropTypes.number,
    c01: PropTypes.number,
    c02: PropTypes.number,
    c10: PropTypes.number,
    c11: PropTypes.number,
    c12: PropTypes.number,
    c20: PropTypes.number,
    c21: PropTypes.number,
    c22: PropTypes.number,
    fixedCells: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};


/**
 * Default values for *props*.
 */
SudokuGrid3X3.defaultProps = {
    c00: 0, c01: 0, c02: 0,
    c10: 0, c11: 0, c12: 0,
    c20: 0, c21: 0, c22: 0,
};


export default SudokuGrid3X3;
