/* eslint-disable object-property-newline */

import {fromJS} from "immutable";

import reducer from "sudoku_react/container/sudoku_solver/reducer";

import {
    requestGridInitialisation,
    requestGridChange,
} from "sudoku_react/container/sudoku_solver/action";


describe("reducer", () => {
    let state;
    beforeEach(() => {
        state = fromJS({
            initialValueMapping: {},
            valueMapping: {
                c01: 4,
            },
            candidateMapping: {
                c00: [1, 2, 3, 4],
            },
            errorCells: ["c00", "c01"],
            showCandidates: false,
            gridSolved: true,
        });
    });


    it("should return the initial state", () => {
        expect(
            reducer(undefined, {})
        ).toEqual(fromJS({
            initialValueMapping: {
                c00: 3,
                c10: 9, c11: 7, c14: 1,
                c20: 6, c23: 5, c24: 8, c25: 3,
                c30: 2, c36: 9,
                c40: 5, c43: 6, c44: 2, c45: 1, c48: 3,
                c52: 8, c58: 5,
                c63: 4, c64: 3, c65: 5, c68: 2,
                c74: 9, c77: 5, c78: 6,
                c88: 1,
            },
            valueMapping: {},
            candidateMapping: {},
            errorCells: [],
            showCandidates: false,
            gridSolved: false,
        }));
    });

    it("should handle an action with no type", () => {
        expect(reducer(state, {})).toEqual(state);
    });

    it("should handle the requestGridInitialisation action correctly", () => {
        const valueMapping = {
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
            reducer(state, requestGridInitialisation(valueMapping))
        ).toEqual(
            state
                .set("valueMapping", fromJS({
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
                .set("candidateMapping", fromJS({}))
                .set("errorCells", fromJS([]))
                .set("gridSolved", false)
        );
    });

    it("should handle the requestGridChange action correctly", () => {
        const valueMapping = {
            c03: 1, c05: 5, c08: 1,
            c10: 1, c11: 4, c16: 6, c17: 7,
            c21: 8, c25: 2, c26: 4,
            c31: 6, c32: 3, c34: 7, c37: 1,
            c40: 9, c48: 3,
            c51: 1, c54: 9, c56: 5, c57: 2,
            c62: 7, c63: 2, c67: 8,
            c71: 2, c72: 6, c77: 3, c78: 5,
            c83: 4, c85: 9,
        };

        const candidateMapping = {
            c00: [1, 2, 3, 5],
            c07: [1, 2, 4],
            c18: [3, 4],
        };

        expect(
            reducer(state, requestGridChange(valueMapping, candidateMapping))
        ).toEqual(
            state
                .set("valueMapping", fromJS({
                    c00: 0, c01: 0, c02: 0, c03: 1, c04: 0, c05: 5, c06: 0,
                    c07: 0, c08: 1,
                    c10: 1, c11: 4, c12: 0, c13: 0, c14: 0, c15: 0, c16: 6,
                    c17: 7, c18: 0,
                    c20: 0, c21: 8, c22: 0, c23: 0, c24: 0, c25: 2, c26: 4,
                    c27: 0, c28: 0,
                    c30: 0, c31: 6, c32: 3, c33: 0, c34: 7, c35: 0, c36: 0,
                    c37: 1, c38: 0,
                    c40: 9, c41: 0, c42: 0, c43: 0, c44: 0, c45: 0, c46: 0,
                    c47: 0, c48: 3,
                    c50: 0, c51: 1, c52: 0, c53: 0, c54: 9, c55: 0, c56: 5,
                    c57: 2, c58: 0,
                    c60: 0, c61: 0, c62: 7, c63: 2, c64: 0, c65: 0, c66: 0,
                    c67: 8, c68: 0,
                    c70: 0, c71: 2, c72: 6, c73: 0, c74: 0, c75: 0, c76: 0,
                    c77: 3, c78: 5,
                    c80: 0, c81: 0, c82: 0, c83: 4, c84: 0, c85: 9, c86: 0,
                    c87: 0, c88: 0,
                }))
                .set("candidateMapping", fromJS({
                    c00: [1, 2, 3, 5],
                    c01: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c02: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c03: [],
                    c04: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c05: [],
                    c06: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c07: [1, 2, 4],
                    c08: [],
                    c10: [],
                    c11: [],
                    c12: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c13: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c14: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c15: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c16: [],
                    c17: [],
                    c18: [3, 4],
                    c20: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c21: [],
                    c22: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c23: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c24: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c25: [],
                    c26: [],
                    c27: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c28: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c30: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c31: [],
                    c32: [],
                    c33: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c34: [],
                    c35: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c36: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c37: [],
                    c38: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c40: [],
                    c41: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c42: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c43: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c44: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c45: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c46: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c47: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c48: [],
                    c50: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c51: [],
                    c52: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c53: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c54: [],
                    c55: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c56: [],
                    c57: [],
                    c58: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c60: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c61: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c62: [],
                    c63: [],
                    c64: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c65: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c66: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c67: [],
                    c68: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c70: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c71: [],
                    c72: [],
                    c73: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c74: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c75: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c76: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c77: [],
                    c78: [],
                    c80: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c81: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c82: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c83: [],
                    c84: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c85: [],
                    c86: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c87: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                    c88: [1, 2, 3, 4, 5, 6, 7, 8, 9],
                }))
                .set("errorCells", fromJS([
                    "c03", "c08",
                ]))
                .set("gridSolved", false)
        );
    });

    it("should handle the requestGridResolveAll action correctly", () => {
    });
});
