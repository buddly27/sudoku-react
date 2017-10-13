/* eslint-disable object-property-newline */

import React from "react";
import {mount, shallow} from "enzyme";

import SudokuGrid3X3 from "sudoku_react/component/sudoku_grid_3x3";


const renderComponent = (props) => mount(
    <SudokuGrid3X3 {...props} />
);


describe("<SudokuGrid3X3 />", () => {
    it("should render 9 empty <input> tags", () => {
        const renderedComponent = renderComponent({
            fixedCells: [],
            onChange: () => {},
        });
        const inputs = renderedComponent.find("input");
        expect(inputs.length).toEqual(9);
        inputs.forEach((input) =>
            expect(input.prop("value")).toEqual("")
        );
    });
    it("should render 9 <input> tags filled with a number", () => {
        const renderedComponent = renderComponent({
            c00: 1, c01: 2, c02: 3,
            c10: 4, c11: 5, c12: 6,
            c20: 7, c21: 8, c22: 9,
            fixedCells: [],
            onChange: () => {},
        });

        const inputValues = [1, 2, 3, 4, 5, 6, 7, 8, 9];

        const inputs = renderedComponent.find("input");
        expect(inputs.length).toEqual(9);
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

        expect(onChangeSpy).toHaveBeenCalledTimes(9);

        const grid = {
            c00: 0, c01: 0, c02: 0,
            c10: 0, c11: 0, c12: 0,
            c20: 0, c21: 0, c22: 0,
        };

        const keys = [
            "c00", "c01", "c02", "c10", "c11", "c12", "c20", "c21", "c22",
        ];

        const expected = keys.map(
            (key) => [Object.assign({}, grid, {[key]: 8})]
        );
        expect(onChangeSpy.mock.calls).toEqual(expected);
    });
});
