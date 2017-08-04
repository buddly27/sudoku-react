/* eslint-disable object-property-newline */

import React from "react";
import {mount, shallow} from "enzyme";

import SudokuGrid9X9, {
    mapFixedBlock,
    copyBlocks,
} from "sudoku_react/component/sudoku_grid_9x9";


const renderComponent = (props) => mount(
    <SudokuGrid9X9 {...props} />
);


describe("<SudokuGrid9X9 />", () => {
    it("should render 81 empty <input> tags", () => {
        const renderedComponent = renderComponent({
            fixedCells: [],
            onChange: () => {},
        });
        const inputs = renderedComponent.find("input");
        expect(inputs.length).toEqual(81);
        inputs.forEach((input) =>
            expect(input.prop("value")).toEqual("")
        );
    });
    it("should render 81 <input> tags filled with a number", () => {
        const renderedComponent = renderComponent({
            c00: 1, c01: 2, c02: 3, c03: 4, c04: 5, c05: 6, c06: 7, c07: 8, c08: 9,
            c10: 1, c11: 2, c12: 3, c13: 4, c14: 5, c15: 6, c16: 7, c17: 8, c18: 9,
            c20: 1, c21: 2, c22: 3, c23: 4, c24: 5, c25: 6, c26: 7, c27: 8, c28: 9,
            c30: 1, c31: 2, c32: 3, c33: 4, c34: 5, c35: 6, c36: 7, c37: 8, c38: 9,
            c40: 1, c41: 2, c42: 3, c43: 4, c44: 5, c45: 6, c46: 7, c47: 8, c48: 9,
            c50: 1, c51: 2, c52: 3, c53: 4, c54: 5, c55: 6, c56: 7, c57: 8, c58: 9,
            c60: 1, c61: 2, c62: 3, c63: 4, c64: 5, c65: 6, c66: 7, c67: 8, c68: 9,
            c70: 1, c71: 2, c72: 3, c73: 4, c74: 5, c75: 6, c76: 7, c77: 8, c78: 9,
            c80: 1, c81: 2, c82: 3, c83: 4, c84: 5, c85: 6, c86: 7, c87: 8, c88: 9,
            fixedCells: [],
            onChange: () => {},
        });

        const inputValues = [
            1, 2, 3, 1, 2, 3, 1, 2, 3,
            4, 5, 6, 4, 5, 6, 4, 5, 6,
            7, 8, 9, 7, 8, 9, 7, 8, 9,
            1, 2, 3, 1, 2, 3, 1, 2, 3,
            4, 5, 6, 4, 5, 6, 4, 5, 6,
            7, 8, 9, 7, 8, 9, 7, 8, 9,
            1, 2, 3, 1, 2, 3, 1, 2, 3,
            4, 5, 6, 4, 5, 6, 4, 5, 6,
            7, 8, 9, 7, 8, 9, 7, 8, 9,
        ];

        const inputs = renderedComponent.find("input");
        expect(inputs.length).toEqual(81);
        inputs.forEach((input, index) => {
            expect(input.prop("value")).toEqual(inputValues[index]);
        });
    });
    it("should update a cell of the grid", () => {
        const onChangeSpy = jest.fn();
        const renderedComponent = renderComponent({
            fixedCells: [],
            onChange: onChangeSpy,
        });

        const input = shallow(renderedComponent.find("input").get(0));

        expect(input.prop("value")).toEqual("");

        const inputs = renderedComponent.find("input");
        inputs.forEach((_input) => {
            _input.simulate("keydown", {key: "8"});
        });

        expect(onChangeSpy).toHaveBeenCalledTimes(81);

        const grid = {
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

        const keys = [
            "c00", "c01", "c02", "c10", "c11", "c12", "c20", "c21", "c22",
            "c03", "c04", "c05", "c13", "c14", "c15", "c23", "c24", "c25",
            "c06", "c07", "c08", "c16", "c17", "c18", "c26", "c27", "c28",
            "c30", "c31", "c32", "c40", "c41", "c42", "c50", "c51", "c52",
            "c33", "c34", "c35", "c43", "c44", "c45", "c53", "c54", "c55",
            "c36", "c37", "c38", "c46", "c47", "c48", "c56", "c57", "c58",
            "c60", "c61", "c62", "c70", "c71", "c72", "c80", "c81", "c82",
            "c63", "c64", "c65", "c73", "c74", "c75", "c83", "c84", "c85",
            "c66", "c67", "c68", "c76", "c77", "c78", "c86", "c87", "c88",
        ];

        const expected = keys.map(
            (key) => [Object.assign({}, grid, {[key]: 8})]
        );
        expect(onChangeSpy.mock.calls).toEqual(expected);
    });
    it("should create the fixed blocks mapping", () => {
        const expected = {
            b00: ["c10", "c11", "c21"],
            b01: ["c00", "c02", "c22"],
            b02: ["c10", "c11", "c20"],
            b10: ["c01", "c02", "c10", "c21"],
            b11: ["c01", "c21"],
            b12: ["c01", "c12", "c20", "c21"],
            b20: ["c02", "c11", "c12"],
            b21: ["c00", "c20", "c22"],
            b22: ["c01", "c11", "c12"],
        };

        expect(
            mapFixedBlock([
                "c03", "c05",
                "c10", "c11", "c16", "c17",
                "c21", "c25", "c26",
                "c31", "c32", "c34", "c37",
                "c40", "c48",
                "c51", "c54", "c56", "c57",
                "c62", "c63", "c67",
                "c71", "c72", "c77", "c78",
                "c83", "c85",
            ])
        ).toEqual(expected);
    });
    it("should copy a block while updating some elements and avoid mutating original object", () => {
        const origin = {
            b00: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
            b01: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
            b02: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
            b10: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
            b11: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
            b12: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
            b20: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
            b21: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
            b22: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
        };

        expect(
            copyBlocks(origin)
        ).toEqual(
            {
                b00: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b01: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b02: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b10: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b11: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b12: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b20: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b21: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b22: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
            }
        );

        expect(
            copyBlocks(
                origin, {
                    b20: {c00: 8, c01: 8, c02: 8, c10: 8, c11: 8, c12: 8, c20: 8, c21: 8, c22: 8},
                }
            )
        ).toEqual(
            {
                b00: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b01: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b02: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b10: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b11: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b12: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b20: {c00: 8, c01: 8, c02: 8, c10: 8, c11: 8, c12: 8, c20: 8, c21: 8, c22: 8},
                b21: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b22: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
            }
        );

        expect(origin).toEqual(
            {
                b00: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b01: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b02: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b10: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b11: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b12: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b20: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b21: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
                b22: {c00: 1, c01: 2, c02: 3, c10: 4, c11: 5, c12: 6, c20: 7, c21: 8, c22: 9},
            }
        );
    });
});
