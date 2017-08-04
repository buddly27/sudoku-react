/* eslint-disable object-property-newline */

import {fromJS} from "immutable";

import {
    makeSelectGrid,
    makeSelectFixedCells,
} from "sudoku_react/container/home/selector";


describe("Home selectors", () => {
    const state = fromJS({
        home: {
            grid: {
                c03: 1, c05: 5,
                c10: 1, c11: 4, c16: 6, c17: 7,
                c21: 8, c25: 2, c26: 4,
                c31: 6, c32: 3, c34: 7, c37: 1,
                c40: 9, c48: 3,
                c51: 1, c54: 9, c56: 5, c57: 2,
                c62: 7, c63: 2, c67: 8,
                c71: 2, c72: 6, c77: 3, c78: 5,
                c83: 4, c85: 9,
            },
            fixedCells: [
                "c03", "c05", "c72", "c77", "c78", "c83", "c85",
            ],
        },
    });

    it("should select the grid as a plain JS object", () => {
        const gridSelector = makeSelectGrid();
        expect(gridSelector(state)).toEqual({
            c03: 1, c05: 5,
            c10: 1, c11: 4, c16: 6, c17: 7,
            c21: 8, c25: 2, c26: 4,
            c31: 6, c32: 3, c34: 7, c37: 1,
            c40: 9, c48: 3,
            c51: 1, c54: 9, c56: 5, c57: 2,
            c62: 7, c63: 2, c67: 8,
            c71: 2, c72: 6, c77: 3, c78: 5,
            c83: 4, c85: 9,
        });
    });
    it("should select the fixed cells", () => {
        const fixedCellsSelector = makeSelectFixedCells();
        expect(fixedCellsSelector(state)).toEqual([
            "c03", "c05", "c72", "c77", "c78", "c83", "c85",
        ]);
    });
});
