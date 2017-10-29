/* eslint-disable object-property-newline */

import React from "react";
import {mount} from "enzyme";

import SudokuGrid3X3 from "sudoku_react/component/sudoku_grid_3x3";


const renderComponent = (props) => mount(
    <SudokuGrid3X3 {...props} />
);


describe("<SudokuGrid3X3 />", () => {
    it("should render 9 SudokuCell components", () => {
        const renderedComponent = renderComponent({onChange: () => {}});
        const cells = renderedComponent.find("SudokuCell");
        expect(cells.length).toEqual(9);
        cells.forEach((node) =>
            expect(node.prop("data")).toEqual([1, 2, 3, 4, 5, 6, 7, 8])
        );
    });

    it("should render 9 SudokuCell filled with data", () => {
        const renderedComponent = renderComponent({
            c00: 1, c01: 2, c02: [1, 2, 4, 5],
            c10: 4, c11: 5, c12: 6,
            c20: [1, 2], c21: 8, c22: 9,
            onChange: () => {},
        });

        const data = [1, 2, [1, 2, 4, 5], 4, 5, 6, [1, 2], 8, 9];

        const cells = renderedComponent.find("SudokuCell");
        expect(cells.length).toEqual(9);
        cells.forEach((node, index) => {
            expect(node.prop("data")).toEqual(data[index]);
        });
    });

    it("should update a cell of the grid", () => {
        const onChangeSpy = jest.fn();
        const renderedComponent = renderComponent({onChange: onChangeSpy});

        const identifiers = [
            "c00", "c01", "c02",
            "c10", "c11", "c12",
            "c20", "c21", "c22",
        ];

        const grid = {
            c00: [1, 2, 3, 4, 5, 6, 7, 8],
            c01: [1, 2, 3, 4, 5, 6, 7, 8],
            c02: [1, 2, 3, 4, 5, 6, 7, 8],
            c10: [1, 2, 3, 4, 5, 6, 7, 8],
            c11: [1, 2, 3, 4, 5, 6, 7, 8],
            c12: [1, 2, 3, 4, 5, 6, 7, 8],
            c20: [1, 2, 3, 4, 5, 6, 7, 8],
            c21: [1, 2, 3, 4, 5, 6, 7, 8],
            c22: [1, 2, 3, 4, 5, 6, 7, 8],
        };

        const cells = renderedComponent.find("SudokuCell");
        cells.forEach((node, index) => {
            node.prop("onChange")(5);

            expect(onChangeSpy).toHaveBeenLastCalledWith(
                Object.assign({}, grid, {[identifiers[index]]: 5})
            );
        });
    });
});
