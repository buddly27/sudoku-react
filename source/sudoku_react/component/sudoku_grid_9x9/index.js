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
 *     Indicate the value of the cell which must be a number between 1 and 9, or
 *     the list of candidates numbers. The grid contains 81 cells with
 *     81 corresponding cell identifier properties that specify the position of
 *     the cell in the grid. The first number and the second number of the
 *     property name indicate respectfully the row index and the column index.
 *     'c00' indicates the cell in the top left corner and 'c88' the cell in the
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

    const {fixedCells, errorCells, showCandidates, onChange} = props;

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

    const fixedBlocks = mapIdentifiersToBlock(fixedCells);
    const errorBlocks = mapIdentifiersToBlock(errorCells);

    return (
        <StyledColumn>
            <StyledRow>
                <SudokuGrid3X3
                    {...blocks.b00}
                    fixedCells={fixedBlocks.b00}
                    errorCells={errorBlocks.b00}
                    showCandidates={showCandidates}
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
                    errorCells={errorBlocks.b01}
                    showCandidates={showCandidates}
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
                    errorCells={errorBlocks.b02}
                    showCandidates={showCandidates}
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
                    errorCells={errorBlocks.b10}
                    showCandidates={showCandidates}
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
                    errorCells={errorBlocks.b11}
                    showCandidates={showCandidates}
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
                    errorCells={errorBlocks.b12}
                    showCandidates={showCandidates}
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
                    errorCells={errorBlocks.b20}
                    showCandidates={showCandidates}
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
                    errorCells={errorBlocks.b21}
                    showCandidates={showCandidates}
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
                    errorCells={errorBlocks.b22}
                    showCandidates={showCandidates}
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
 * Return a mapping of the *cellIdentifiers* list to pass down the
 * :mod:`SudokuGrid3x3 <sudoku_react.component.sudoku_grid_3x3>` component.
 *
 * Example::
 *
 *    >>> mapIdentifiersToBlock([
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
export const mapIdentifiersToBlock = (cellIdentifiers) => {
    // Map the list of cell identifiers into an object grouped by block
    // identifiers, which store 9x9 grid objects with the value 'true'
    const blocks = mapGridToBlock(
        cellIdentifiers.reduce(
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
    c00: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c01: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c02: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c03: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c04: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c05: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c06: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c07: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c08: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c10: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c11: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c12: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c13: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c14: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c15: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c16: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c17: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c18: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c20: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c21: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c22: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c23: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c24: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c25: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c26: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c27: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c28: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c30: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c31: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c32: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c33: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c34: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c35: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c36: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c37: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c38: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c40: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c41: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c42: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c43: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c44: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c45: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c46: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c47: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c48: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c50: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c51: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c52: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c53: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c54: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c55: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c56: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c57: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c58: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c60: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c61: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c62: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c63: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c64: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c65: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c66: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c67: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c68: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c70: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c71: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c72: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c73: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c74: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c75: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c76: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c77: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c78: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c80: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c81: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c82: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c83: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c84: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c85: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c86: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c87: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    c88: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
    fixedCells: PropTypes.array.isRequired,
    errorCells: PropTypes.array.isRequired,
    showCandidates: PropTypes.bool.isRequired,
    onChange: PropTypes.func.isRequired,
};


/**
 * Default values for *props*.
 */
SudokuGrid9X9.defaultProps = {
    c00: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c01: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c02: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c03: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c04: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c05: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c06: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c07: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c08: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c10: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c11: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c12: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c13: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c14: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c15: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c16: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c17: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c18: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c20: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c21: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c22: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c23: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c24: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c25: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c26: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c27: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c28: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c30: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c31: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c32: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c33: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c34: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c35: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c36: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c37: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c38: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c40: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c41: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c42: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c43: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c44: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c45: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c46: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c47: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c48: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c50: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c51: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c52: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c53: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c54: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c55: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c56: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c57: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c58: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c60: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c61: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c62: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c63: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c64: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c65: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c66: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c67: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c68: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c70: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c71: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c72: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c73: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c74: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c75: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c76: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c77: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c78: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c80: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c81: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c82: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c83: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c84: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c85: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c86: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c87: [1, 2, 3, 4, 5, 6, 7, 8, 9],
    c88: [1, 2, 3, 4, 5, 6, 7, 8, 9],
};


export default SudokuGrid9X9;
