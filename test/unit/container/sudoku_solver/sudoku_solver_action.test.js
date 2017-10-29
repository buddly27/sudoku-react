/* eslint-disable object-property-newline */

import {
    REQUEST_GRID_INITIALISATION,
    REQUEST_GRID_CHANGE,
    REQUEST_GRID_RESOLVE_ALL,
    REQUEST_GRID_RESOLVE_NEXT,
    REQUEST_SHOW_CANDIDATES,
} from "sudoku_react/container/sudoku_solver/constant";

import {
    requestGridInitialisation,
    requestGridChange,
    requestGridResolveAll,
    requestGridResolveNext,
    requestShowCandidates,
} from "sudoku_react/container/sudoku_solver/action";


describe("actions", () => {
    it("should create an action to initiate the grid", () => {
        const valueMapping = {
            c00: 3,
            c10: 9, c11: 7, c14: 1,
            c20: 6, c23: 5, c24: 8, c25: 3,
            c30: 2, c36: 9,
            c40: 5, c43: 6, c44: 2, c45: 1, c48: 3,
            c52: 8, c58: 5,
            c63: 4, c64: 3, c65: 5, c68: 2,
            c74: 9, c77: 5, c78: 6,
            c88: 1,
        };

        const expectedAction = {
            type: REQUEST_GRID_INITIALISATION,
            valueMapping,
        };
        expect(requestGridInitialisation(valueMapping)).toEqual(expectedAction);
    });

    it("should create an action to update the grid", () => {
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

        const candidateMapping = {
            c00: [1, 2, 3, 5],
            c07: [1, 2, 4],
            c18: [3, 4],
        };

        const expectedAction = {
            type: REQUEST_GRID_CHANGE,
            valueMapping,
            candidateMapping,
        };
        expect(
            requestGridChange(valueMapping, candidateMapping)
        ).toEqual(expectedAction);
    });

    it("should create an action to resolve completely the grid", () => {
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

        const candidateMapping = {
            c00: [1, 2, 3, 5],
            c07: [1, 2, 4],
            c18: [3, 4],
        };

        const expectedAction = {
            type: REQUEST_GRID_RESOLVE_ALL,
            valueMapping,
            candidateMapping,
        };
        expect(
            requestGridResolveAll(valueMapping, candidateMapping)
        ).toEqual(expectedAction);
    });

    it("should create an action to resolve part of the grid", () => {
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

        const candidateMapping = {
            c00: [1, 2, 3, 5],
            c07: [1, 2, 4],
            c18: [3, 4],
        };

        const expectedAction = {
            type: REQUEST_GRID_RESOLVE_NEXT,
            valueMapping,
            candidateMapping,
        };
        expect(
            requestGridResolveNext(valueMapping, candidateMapping)
        ).toEqual(expectedAction);
    });

    it("should create an action to display the candidates", () => {
        const expectedAction = {
            type: REQUEST_SHOW_CANDIDATES,
            checked: true,
        };
        expect(
            requestShowCandidates(true)
        ).toEqual(expectedAction);
    });
});
