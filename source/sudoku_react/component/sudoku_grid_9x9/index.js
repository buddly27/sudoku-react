/**
 * SudokuGrid9x9 Component.
 *
 * This component represents a square Sudoku grid composed of 81 cells.
 *
 * Each cell belong to one of nine blocks represented by a
 * :mod:`SudokuGrid3x3 <sudoku_react.component.sudoku_grid_3x3>`. Each block
 * has its own identifier in the form of 'bXX'. The first number and the second
 * number of the block identifier indicate respectfully the row index and the
 * column index. 'b00' indicates the block in the top left corner and 'b22' the
 * block in the bottom right corner.
 *
 * Example::
 *
 *     <SudokuGrid9x9
 *         c03="1" c05="5"
 *         c10="1" c11="4" c16="6" c17="7"
 *         c21="8" c25="2" c26="4"
 *         c31="6" c32="3" c34="7" c37="1"
 *         c40="9" c48="3"
 *         c51="1" c54="9" c56="5" c57="2"
 *         c62="7" c63="2" c67="8"
 *         c71="2" c72="6" c77="3" c78="5"
 *         c83="4" c85="9"
 *         fixedCells={[
 *             "c03", "c05",
 *             "c10", "c11", "c16", "c17",
 *             "c21", "c25", "c26",
 *             "c31", "c32", "c34", "c37",
 *             "c40", "c48",
 *             "c51", "c54", "c56", "c57",
 *             "c62", "c63", "c67",
 *             "c71", "c72", "c77", "c78",
 *             "c83", "c85",
 *         ]}
 *         onChange={
 *             (grid) => {
 *                 console.log(`Request new grid: ${JSON.stringify(grid)}`);
 *             }
 *         }
 *     />
 *
 */

/* eslint-disable object-property-newline, react/jsx-max-props-per-line */

import React from "react";
import PropTypes from "prop-types";

import SudokuGrid3X3 from "sudoku_react/component/sudoku_grid_3x3";

import StyledColumn from "./styled_column";
import StyledRow from "./styled_row";


/**
 * Render the SudokuGrid9X9 Component.
 *
 * *props* should contain:
 *
 * * cXX:
 *     Indicate the value contained in the corresponding cell between 0 and 9
 *     (0 means that the cell is not filled). The grid contains 81 cells with
 *     81 corresponding cell identifier properties that specify the position of
 *     the cell in the grid. The first number and the second number of the
 *     property name indicate respectfully the row index and the column index.
 *     'c00' indicates the cell in the top left corner and 'c88' the cell in the
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
const SudokuGrid9X9 = (props) => {
    const {
        c00, c01, c02, c03, c04, c05, c06, c07, c08,
        c10, c11, c12, c13, c14, c15, c16, c17, c18,
        c20, c21, c22, c23, c24, c25, c26, c27, c28,
        c30, c31, c32, c33, c34, c35, c36, c37, c38,
        c40, c41, c42, c43, c44, c45, c46, c47, c48,
        c50, c51, c52, c53, c54, c55, c56, c57, c58,
        c60, c61, c62, c63, c64, c65, c66, c67, c68,
        c70, c71, c72, c73, c74, c75, c76, c77, c78,
        c80, c81, c82, c83, c84, c85, c86, c87, c88,
    } = props;

    const {fixedCells, onChange} = props;

    const blocks = mapGridToBlock({
        c00, c01, c02, c03, c04, c05, c06, c07, c08,
        c10, c11, c12, c13, c14, c15, c16, c17, c18,
        c20, c21, c22, c23, c24, c25, c26, c27, c28,
        c30, c31, c32, c33, c34, c35, c36, c37, c38,
        c40, c41, c42, c43, c44, c45, c46, c47, c48,
        c50, c51, c52, c53, c54, c55, c56, c57, c58,
        c60, c61, c62, c63, c64, c65, c66, c67, c68,
        c70, c71, c72, c73, c74, c75, c76, c77, c78,
        c80, c81, c82, c83, c84, c85, c86, c87, c88,
    });

    const fixedBlocks = mapFixedBlock(fixedCells);

    return (
        <StyledColumn>
            <StyledRow>
                <SudokuGrid3X3
                    {...blocks.b00}
                    fixedCells={fixedBlocks.b00}
                    onChange={
                        (block) => {
                            const newBlocks = copyBlocks(blocks, {b00: block});
                            onChange(mapBlockToGrid(newBlocks));
                        }
                    }
                />
                <SudokuGrid3X3
                    {...blocks.b01}
                    fixedCells={fixedBlocks.b01}
                    onChange={
                        (block) => {
                            const newBlocks = copyBlocks(blocks, {b01: block});
                            onChange(mapBlockToGrid(newBlocks));
                        }
                    }
                />
                <SudokuGrid3X3
                    {...blocks.b02}
                    fixedCells={fixedBlocks.b02}
                    onChange={
                        (block) => {
                            const newBlocks = copyBlocks(blocks, {b02: block});
                            onChange(mapBlockToGrid(newBlocks));
                        }
                    }
                />
            </StyledRow>
            <StyledRow>
                <SudokuGrid3X3
                    {...blocks.b10}
                    fixedCells={fixedBlocks.b10}
                    onChange={
                        (block) => {
                            const newBlocks = copyBlocks(blocks, {b10: block});
                            onChange(mapBlockToGrid(newBlocks));
                        }
                    }
                />
                <SudokuGrid3X3
                    {...blocks.b11}
                    fixedCells={fixedBlocks.b11}
                    onChange={
                        (block) => {
                            const newBlocks = copyBlocks(blocks, {b11: block});
                            onChange(mapBlockToGrid(newBlocks));
                        }
                    }
                />
                <SudokuGrid3X3
                    {...blocks.b12}
                    fixedCells={fixedBlocks.b12}
                    onChange={
                        (block) => {
                            const newBlocks = copyBlocks(blocks, {b12: block});
                            onChange(mapBlockToGrid(newBlocks));
                        }
                    }
                />
            </StyledRow>
            <StyledRow>
                <SudokuGrid3X3
                    {...blocks.b20}
                    fixedCells={fixedBlocks.b20}
                    onChange={
                        (block) => {
                            const newBlocks = copyBlocks(blocks, {b20: block});
                            onChange(mapBlockToGrid(newBlocks));
                        }
                    }
                />
                <SudokuGrid3X3
                    {...blocks.b21}
                    fixedCells={fixedBlocks.b21}
                    onChange={
                        (block) => {
                            const newBlocks = copyBlocks(blocks, {b21: block});
                            onChange(mapBlockToGrid(newBlocks));
                        }
                    }
                />
                <SudokuGrid3X3
                    {...blocks.b22}
                    fixedCells={fixedBlocks.b22}
                    onChange={
                        (block) => {
                            const newBlocks = copyBlocks(blocks, {b22: block});
                            onChange(mapBlockToGrid(newBlocks));
                        }
                    }
                />
            </StyledRow>
        </StyledColumn>
    );
};


/**
 * Return a copy of the *blocks*.
 *
 * *updatedBlocks* can be an object containing a fragment of the block to apply
 * to the copy.
 *
 */
export const copyBlocks = (blocks, updatedBlocks = {}) => (
    {
        b00: Object.assign({}, blocks.b00, updatedBlocks.b00),
        b01: Object.assign({}, blocks.b01, updatedBlocks.b01),
        b02: Object.assign({}, blocks.b02, updatedBlocks.b02),
        b10: Object.assign({}, blocks.b10, updatedBlocks.b10),
        b11: Object.assign({}, blocks.b11, updatedBlocks.b11),
        b12: Object.assign({}, blocks.b12, updatedBlocks.b12),
        b20: Object.assign({}, blocks.b20, updatedBlocks.b20),
        b21: Object.assign({}, blocks.b21, updatedBlocks.b21),
        b22: Object.assign({}, blocks.b22, updatedBlocks.b22),
    }
);


/**
 * Return a mapping of the *fixedCells* list to pass down the
 * :mod:`SudokuGrid3x3 <sudoku_react.component.sudoku_grid_3x3>` component.
 *
 * Example::
 *
 *    >>> mapFixedBlock([
 *    ...     "c03", "c05",
 *    ...     "c10", "c11", "c16", "c17",
 *    ...     "c21", "c25", "c26",
 *    ...     "c31", "c32", "c34", "c37",
 *    ...     "c40", "c48",
 *    ...     "c51", "c54", "c56", "c57",
 *    ...     "c62", "c63", "c67",
 *    ...     "c71", "c72", "c77", "c78",
 *    ...     "c83", "c85",
 *    ... ])
 *
 *    {
 *        b00: ["c10", "c11", "c21"],
 *        b01: ["c00", "c02", "c22"],
 *        b02: ["c10", "c11", "c20"],
 *        b10: ["c01", "c02", "c10", "c21"],
 *        b11: ["c01", "c21"],
 *        b12: ["c01", "c12", "c20", "c21"],
 *        b20: ["c02", "c11", "c12"],
 *        b21: ["c00", "c20", "c22"],
 *        b22: ["c01", "c11", "c12"],
 *    }
 */
export const mapFixedBlock = (fixedCells) => {
    // Map the list of cell identifiers into an object grouped by block
    // identifiers, which store 9x9 grid objects with the value 'true'
    const blocks = mapGridToBlock(
        fixedCells.reduce(
            (result, cellId) => Object.assign({}, result, {[cellId]: true}), {}
        )
    );

    // Convert the 9x9 grid objects back into a list of cell identifiers which
    // can be given to the sub components
    return Object.keys(blocks).reduce(
        (result, blockId) => {
            const parent = result;
            parent[blockId] = Object.keys(blocks[blockId]).filter(
                (value) => blocks[blockId][value]
            );
            return parent;
        }, {}
    );
};


/**
 * Convert a 9x9 grid into a grid organized in 3x3 blocks.
 */
export const mapGridToBlock = ({
    c00, c01, c02, c03, c04, c05, c06, c07, c08,
    c10, c11, c12, c13, c14, c15, c16, c17, c18,
    c20, c21, c22, c23, c24, c25, c26, c27, c28,
    c30, c31, c32, c33, c34, c35, c36, c37, c38,
    c40, c41, c42, c43, c44, c45, c46, c47, c48,
    c50, c51, c52, c53, c54, c55, c56, c57, c58,
    c60, c61, c62, c63, c64, c65, c66, c67, c68,
    c70, c71, c72, c73, c74, c75, c76, c77, c78,
    c80, c81, c82, c83, c84, c85, c86, c87, c88,
}) => (
    {
        b00: {
            c00, c01, c02,
            c10, c11, c12,
            c20, c21, c22,
        },
        b01: {
            c00: c03, c01: c04, c02: c05,
            c10: c13, c11: c14, c12: c15,
            c20: c23, c21: c24, c22: c25,
        },
        b02: {
            c00: c06, c01: c07, c02: c08,
            c10: c16, c11: c17, c12: c18,
            c20: c26, c21: c27, c22: c28,
        },
        b10: {
            c00: c30, c01: c31, c02: c32,
            c10: c40, c11: c41, c12: c42,
            c20: c50, c21: c51, c22: c52,
        },
        b11: {
            c00: c33, c01: c34, c02: c35,
            c10: c43, c11: c44, c12: c45,
            c20: c53, c21: c54, c22: c55,
        },
        b12: {
            c00: c36, c01: c37, c02: c38,
            c10: c46, c11: c47, c12: c48,
            c20: c56, c21: c57, c22: c58,
        },
        b20: {
            c00: c60, c01: c61, c02: c62,
            c10: c70, c11: c71, c12: c72,
            c20: c80, c21: c81, c22: c82,
        },
        b21: {
            c00: c63, c01: c64, c02: c65,
            c10: c73, c11: c74, c12: c75,
            c20: c83, c21: c84, c22: c85,
        },
        b22: {
            c00: c66, c01: c67, c02: c68,
            c10: c76, c11: c77, c12: c78,
            c20: c86, c21: c87, c22: c88,
        },
    }
);


/**
 * Convert a grid organized in 3x3 blocks into a 9x9 grid.
 */
export const mapBlockToGrid = ({
    b00, b01, b02,
    b10, b11, b12,
    b20, b21, b22,
}) => (
    {
        c00: b00.c00,
        c01: b00.c01,
        c02: b00.c02,
        c03: b01.c00,
        c04: b01.c01,
        c05: b01.c02,
        c06: b02.c00,
        c07: b02.c01,
        c08: b02.c02,
        c10: b00.c10,
        c11: b00.c11,
        c12: b00.c12,
        c13: b01.c10,
        c14: b01.c11,
        c15: b01.c12,
        c16: b02.c10,
        c17: b02.c11,
        c18: b02.c12,
        c20: b00.c20,
        c21: b00.c21,
        c22: b00.c22,
        c23: b01.c20,
        c24: b01.c21,
        c25: b01.c22,
        c26: b02.c20,
        c27: b02.c21,
        c28: b02.c22,
        c30: b10.c00,
        c31: b10.c01,
        c32: b10.c02,
        c33: b11.c00,
        c34: b11.c01,
        c35: b11.c02,
        c36: b12.c00,
        c37: b12.c01,
        c38: b12.c02,
        c40: b10.c10,
        c41: b10.c11,
        c42: b10.c12,
        c43: b11.c10,
        c44: b11.c11,
        c45: b11.c12,
        c46: b12.c10,
        c47: b12.c11,
        c48: b12.c12,
        c50: b10.c20,
        c51: b10.c21,
        c52: b10.c22,
        c53: b11.c20,
        c54: b11.c21,
        c55: b11.c22,
        c56: b12.c20,
        c57: b12.c21,
        c58: b12.c22,
        c60: b20.c00,
        c61: b20.c01,
        c62: b20.c02,
        c63: b21.c00,
        c64: b21.c01,
        c65: b21.c02,
        c66: b22.c00,
        c67: b22.c01,
        c68: b22.c02,
        c70: b20.c10,
        c71: b20.c11,
        c72: b20.c12,
        c73: b21.c10,
        c74: b21.c11,
        c75: b21.c12,
        c76: b22.c10,
        c77: b22.c11,
        c78: b22.c12,
        c80: b20.c20,
        c81: b20.c21,
        c82: b20.c22,
        c83: b21.c20,
        c84: b21.c21,
        c85: b21.c22,
        c86: b22.c20,
        c87: b22.c21,
        c88: b22.c22,
    }
);


/**
 * Expected types for *props*.
 */
SudokuGrid9X9.propTypes = {
    c00: PropTypes.number,
    c01: PropTypes.number,
    c02: PropTypes.number,
    c03: PropTypes.number,
    c04: PropTypes.number,
    c05: PropTypes.number,
    c06: PropTypes.number,
    c07: PropTypes.number,
    c08: PropTypes.number,
    c10: PropTypes.number,
    c11: PropTypes.number,
    c12: PropTypes.number,
    c13: PropTypes.number,
    c14: PropTypes.number,
    c15: PropTypes.number,
    c16: PropTypes.number,
    c17: PropTypes.number,
    c18: PropTypes.number,
    c20: PropTypes.number,
    c21: PropTypes.number,
    c22: PropTypes.number,
    c23: PropTypes.number,
    c24: PropTypes.number,
    c25: PropTypes.number,
    c26: PropTypes.number,
    c27: PropTypes.number,
    c28: PropTypes.number,
    c30: PropTypes.number,
    c31: PropTypes.number,
    c32: PropTypes.number,
    c33: PropTypes.number,
    c34: PropTypes.number,
    c35: PropTypes.number,
    c36: PropTypes.number,
    c37: PropTypes.number,
    c38: PropTypes.number,
    c40: PropTypes.number,
    c41: PropTypes.number,
    c42: PropTypes.number,
    c43: PropTypes.number,
    c44: PropTypes.number,
    c45: PropTypes.number,
    c46: PropTypes.number,
    c47: PropTypes.number,
    c48: PropTypes.number,
    c50: PropTypes.number,
    c51: PropTypes.number,
    c52: PropTypes.number,
    c53: PropTypes.number,
    c54: PropTypes.number,
    c55: PropTypes.number,
    c56: PropTypes.number,
    c57: PropTypes.number,
    c58: PropTypes.number,
    c60: PropTypes.number,
    c61: PropTypes.number,
    c62: PropTypes.number,
    c63: PropTypes.number,
    c64: PropTypes.number,
    c65: PropTypes.number,
    c66: PropTypes.number,
    c67: PropTypes.number,
    c68: PropTypes.number,
    c70: PropTypes.number,
    c71: PropTypes.number,
    c72: PropTypes.number,
    c73: PropTypes.number,
    c74: PropTypes.number,
    c75: PropTypes.number,
    c76: PropTypes.number,
    c77: PropTypes.number,
    c78: PropTypes.number,
    c80: PropTypes.number,
    c81: PropTypes.number,
    c82: PropTypes.number,
    c83: PropTypes.number,
    c84: PropTypes.number,
    c85: PropTypes.number,
    c86: PropTypes.number,
    c87: PropTypes.number,
    c88: PropTypes.number,
    fixedCells: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};


/**
 * Default values for *props*.
 */
SudokuGrid9X9.defaultProps = {
    c00: 0, c01: 0, c02: 0, c03: 0, c04: 0, c05: 0, c06: 0, c07: 0, c08: 0,
    c10: 0, c11: 0, c12: 0, c13: 0, c14: 0, c15: 0, c16: 0, c17: 0, c18: 0,
    c20: 0, c21: 0, c22: 0, c23: 0, c24: 0, c25: 0, c26: 0, c27: 0, c28: 0,
    c30: 0, c31: 0, c32: 0, c33: 0, c34: 0, c35: 0, c36: 0, c37: 0, c38: 0,
    c40: 0, c41: 0, c42: 0, c43: 0, c44: 0, c45: 0, c46: 0, c47: 0, c48: 0,
    c50: 0, c51: 0, c52: 0, c53: 0, c54: 0, c55: 0, c56: 0, c57: 0, c58: 0,
    c60: 0, c61: 0, c62: 0, c63: 0, c64: 0, c65: 0, c66: 0, c67: 0, c68: 0,
    c70: 0, c71: 0, c72: 0, c73: 0, c74: 0, c75: 0, c76: 0, c77: 0, c78: 0,
    c80: 0, c81: 0, c82: 0, c83: 0, c84: 0, c85: 0, c86: 0, c87: 0, c88: 0,
};


export default SudokuGrid9X9;
