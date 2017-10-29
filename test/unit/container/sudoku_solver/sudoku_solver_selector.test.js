/* eslint-disable object-property-newline */

import {fromJS} from "immutable";

import {
    makeSelectInitialValueMapping,
    makeSelectValueMapping,
    makeSelectCandidateMapping,
    makeSelectErrorCells,
    makeSelectShowCandidates,
    makeSelectGridSolved,
} from "sudoku_react/container/sudoku_solver/selector";


describe("selectors", () => {
    const state = fromJS({
        sudoku_solver: {
            initialValueMapping: {
                c00: 3,
                c10: 9, c11: 7, c13: 2, c14: 1,
                c20: 6, c23: 5, c24: 8, c25: 3,
                c30: 2, c36: 9,
                c40: 5, c43: 6, c44: 2, c45: 1, c48: 3,
                c52: 8, c58: 5,
                c63: 4, c64: 3, c65: 5, c68: 2,
                c74: 9, c77: 5, c78: 6,
                c88: 1,
            },
            valueMapping: {
                c00: 3, c01: 1,
                c10: 9, c11: 7, c13: 2, c14: 1,
                c20: 6, c23: 5, c24: 8, c25: 3,
                c30: 2, c36: 9,
            },
            candidateMapping: {
                c02: [1, 2, 4, 5], c03: [2, 7, 9],
                c04: [4, 6, 7], c05: [2, 4, 6, 7, 9],
                c06: [1, 2, 4, 5, 6, 7, 8], c07: [1, 2, 4, 6, 7, 8, 9],
                c08: [4, 7, 8, 9],
            },
            errorCells: [
                "c01", "c50", "c51", "c52", "c60",
            ],
            showCandidates: true,
            gridSolved: false,
        },
    });

    it("should select the initial value mapping as a plain JS object", () => {
        const selector = makeSelectInitialValueMapping();
        expect(selector(state)).toEqual({
            c00: 3,
            c10: 9, c11: 7, c13: 2, c14: 1,
            c20: 6, c23: 5, c24: 8, c25: 3,
            c30: 2, c36: 9,
            c40: 5, c43: 6, c44: 2, c45: 1, c48: 3,
            c52: 8, c58: 5,
            c63: 4, c64: 3, c65: 5, c68: 2,
            c74: 9, c77: 5, c78: 6,
            c88: 1,
        });
    });

    it("should select the value mapping as a plain JS object", () => {
        const selector = makeSelectValueMapping();
        expect(selector(state)).toEqual({
            c00: 3, c01: 1,
            c10: 9, c11: 7, c13: 2, c14: 1,
            c20: 6, c23: 5, c24: 8, c25: 3,
            c30: 2, c36: 9,
        });
    });

    it("should select the candidate mapping as a plain JS object", () => {
        const selector = makeSelectCandidateMapping();
        expect(selector(state)).toEqual({
            c02: [1, 2, 4, 5], c03: [2, 7, 9],
            c04: [4, 6, 7], c05: [2, 4, 6, 7, 9],
            c06: [1, 2, 4, 5, 6, 7, 8], c07: [1, 2, 4, 6, 7, 8, 9],
            c08: [4, 7, 8, 9],
        });
    });

    it("should select the error cells", () => {
        const selector = makeSelectErrorCells();
        expect(selector(state)).toEqual([
            "c01", "c50", "c51", "c52", "c60",
        ]);
    });

    it("should select the showCandidates bool state", () => {
        const selector = makeSelectShowCandidates();
        expect(selector(state)).toEqual(true);
    });

    it("should select the gridSolved bool state", () => {
        const selector = makeSelectGridSolved();
        expect(selector(state)).toEqual(false);
    });
});
