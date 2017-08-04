/* eslint-disable object-property-newline */

import {
    INITIATE_GRID,
    ON_GRID_CHANGE,
} from "sudoku_react/container/home/constant";

import {
    initiateGrid,
    onGridChange,
} from "sudoku_react/container/home/action";


describe("Home actions", () => {
    it("should create an action to initiate the grid", () => {
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

        const expectedAction = {
            type: INITIATE_GRID,
            grid,
        };
        expect(initiateGrid(grid)).toEqual(expectedAction);
    });
    it("should create an action to update the grid", () => {
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

        const expectedAction = {
            type: ON_GRID_CHANGE,
            newGrid,
        };
        expect(onGridChange(newGrid)).toEqual(expectedAction);
    });
});
