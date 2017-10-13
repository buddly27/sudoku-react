/* eslint-disable object-property-newline */

import {fromJS} from "immutable";

import reducer from "sudoku_react/container/sudoku_solver/reducer";

import {
    initiateGrid,
    onGridChange,
} from "sudoku_react/container/sudoku_solver/action";


describe("Home reducer", () => {
    let state;
    beforeEach(() => {
        state = fromJS({
            grid: {},
            fixedCells: [],
        });
    });


    it("should return the initial state", () => {
        expect(
            reducer(undefined, {})
        ).toEqual(fromJS({
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
            fixedCells: [],
        }));
    });
    it("should handle an action with no type", () => {
        expect(reducer(state, {})).toEqual(state);
    });
    it("should handle the initiateGrid action correctly", () => {
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

        expect(
            reducer(state, initiateGrid(grid))
        ).toEqual(
            state.set("fixedCells", fromJS([
                "c03", "c05",
                "c10", "c11", "c16", "c17",
                "c21", "c25", "c26",
                "c31", "c32", "c34", "c37",
                "c40", "c48",
                "c51", "c54", "c56", "c57",
                "c62", "c63", "c67",
                "c71", "c72", "c77", "c78",
                "c83", "c85",
            ]))
        );
    });
    it("should handle the onGridChange action correctly", () => {
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

        expect(
            reducer(state, onGridChange(newGrid))
        ).toEqual(
            state.set("grid", fromJS({
                c03: 1, c05: 5,
                c10: 1, c11: 4, c16: 6, c17: 7,
                c21: 8, c25: 2, c26: 4,
                c31: 6, c32: 3, c34: 7, c37: 1,
                c40: 9, c48: 3,
                c51: 1, c54: 9, c56: 5, c57: 2,
                c62: 7, c63: 2, c67: 8,
                c71: 2, c72: 6, c77: 3, c78: 5,
                c83: 4, c85: 9,
            }))
        );
    });
});
