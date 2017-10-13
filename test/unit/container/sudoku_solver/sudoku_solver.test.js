/* eslint-disable object-property-newline */

import React from "react";
import {mount, shallow} from "enzyme";

import {
    SudokuSolver,
    mapDispatchToProps,
} from "sudoku_react/container/sudoku_solver/index";

import {
    initiateGrid,
    onGridChange,
} from "sudoku_react/container/sudoku_solver/action";


describe("<SudokuSolver />", () => {
    it("should render the home container", () => {
        const initiateGridSpy = jest.fn();
        const onGridChangeSpy = jest.fn();

        const renderedComponent = mount(
            <SudokuSolver
                grid={{
                    c03: 1, c05: 5,
                    c10: 1, c11: 4, c16: 6, c17: 7,
                    c21: 8, c25: 2, c26: 4,
                    c31: 6, c32: 3, c34: 7, c37: 1,
                    c40: 9, c48: 3,
                    c51: 1, c54: 9, c56: 5, c57: 2,
                    c62: 7, c63: 2, c67: 8,
                    c71: 2, c72: 6, c77: 3, c78: 5,
                    c83: 4, c85: 9,
                }}
                fixedCells={[
                    "c03", "c05",
                    "c10", "c11", "c16", "c17",
                    "c21", "c25", "c26",
                    "c31", "c32", "c34", "c37",
                    "c40", "c48",
                    "c51", "c54", "c56", "c57",
                    "c62", "c63", "c67",
                    "c71", "c72", "c77", "c78",
                    "c83", "c85",
                ]}
                initiateGrid={initiateGridSpy}
                onGridChange={onGridChangeSpy}
            />
        );

        const sudokuGrid = renderedComponent.find("SudokuGrid9X9");
        expect(sudokuGrid.length).toEqual(1);

        expect(initiateGridSpy).toHaveBeenCalledTimes(1);
        expect(onGridChangeSpy).toHaveBeenCalledTimes(0);

        const input = shallow(sudokuGrid.find("input").get(0));
        input.simulate("keydown", {key: "6"});

        expect(onGridChangeSpy).toHaveBeenCalledTimes(1);
        expect(onGridChangeSpy.mock.calls).toEqual([[
            {
                c00: 6, c01: 0, c02: 0, c03: 1, c04: 0, c05: 5, c06: 0, c07: 0, c08: 0,
                c10: 1, c11: 4, c12: 0, c13: 0, c14: 0, c15: 0, c16: 6, c17: 7, c18: 0,
                c20: 0, c21: 8, c22: 0, c23: 0, c24: 0, c25: 2, c26: 4, c27: 0, c28: 0,
                c30: 0, c31: 6, c32: 3, c33: 0, c34: 7, c35: 0, c36: 0, c37: 1, c38: 0,
                c40: 9, c41: 0, c42: 0, c43: 0, c44: 0, c45: 0, c46: 0, c47: 0, c48: 3,
                c50: 0, c51: 1, c52: 0, c53: 0, c54: 9, c55: 0, c56: 5, c57: 2, c58: 0,
                c60: 0, c61: 0, c62: 7, c63: 2, c64: 0, c65: 0, c66: 0, c67: 8, c68: 0,
                c70: 0, c71: 2, c72: 6, c73: 0, c74: 0, c75: 0, c76: 0, c77: 3, c78: 5,
                c80: 0, c81: 0, c82: 0, c83: 4, c84: 0, c85: 9, c86: 0, c87: 0, c88: 0,
            },
        ]]);
    });

    describe("dispatch initiateGrid to props ", () => {
        it("should be calling initiateGrid", () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);

            const grid = {
                c03: 1, c05: 5,
                c10: 1, c11: 4, c16: 6, c17: 7,
                c21: 8, c25: 2, c26: 4,
                c31: 6, c32: 3, c34: 7, c37: 1,
                c40: 9, c48: 3,
                c51: 1, c54: 9, c56: 5, c57: 2,
                c62: 7, c63: 2, c67: 8,
                c71: 2, c72: 6, c77: 3, c78: 5,
                c83: 4, c85: 9,
            };

            result.initiateGrid(grid);
            expect(dispatch).toHaveBeenCalledWith(
                initiateGrid(grid)
            );
        });
    });

    describe("dispatch onGridChange to props ", () => {
        it("should be calling onGridChange", () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);

            const newGrid = {
                c03: 1, c05: 5,
                c10: 1, c11: 4, c16: 6, c17: 7,
                c21: 8, c25: 2, c26: 4,
                c31: 6, c32: 3, c34: 7, c37: 1,
                c40: 9, c48: 3,
                c51: 1, c54: 9, c56: 5, c57: 2,
                c62: 7, c63: 2, c67: 8,
                c71: 2, c72: 6, c77: 3, c78: 5,
                c83: 4, c85: 9,
            };

            result.onGridChange(newGrid);
            expect(dispatch).toHaveBeenCalledWith(
                onGridChange(newGrid)
            );
        });
    });
});
