/* eslint-disable object-property-newline */

import React from "react";
import {mount} from "enzyme";

import {
    SudokuSolver,
    mapDispatchToProps,
} from "sudoku_react/container/sudoku_solver/index";

import {
    requestGridInitialisation,
    requestGridChange,
    requestGridResolveNext,
    requestGridResolveAll,
    requestShowCandidates,
} from "sudoku_react/container/sudoku_solver/action";


describe("<SudokuSolver />", () => {
    it("should render the home container", () => {
        const requestNewGridSpy = jest.fn();
        const requestGridInitialisationSpy = jest.fn();
        const requestGridChangeSpy = jest.fn();
        const requestGridResolveAllSpy = jest.fn();
        const requestGridResolveNextSpy = jest.fn();
        const requestShowCandidatesSpy = jest.fn();

        const renderedComponent = mount(
            <SudokuSolver
                gridName="Example 1"
                grids={{
                    "Example 1": {
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
                }}
                valueMapping={{}}
                candidateMapping={{}}
                errorCells={[]}
                showCandidates={false}
                gridSolved={false}
                requestNewGrid={requestNewGridSpy}
                requestGridInitialisation={requestGridInitialisationSpy}
                requestGridChange={requestGridChangeSpy}
                requestGridResolveAll={requestGridResolveAllSpy}
                requestGridResolveNext={requestGridResolveNextSpy}
                requestShowCandidates={requestShowCandidatesSpy}
            />
        );

        const sudokuGrid = renderedComponent.find("SudokuGrid9X9");
        expect(sudokuGrid.length).toEqual(1);

        expect(requestGridInitialisationSpy).toHaveBeenCalledTimes(1);
        expect(requestGridChangeSpy).toHaveBeenCalledTimes(0);
        expect(requestGridResolveAllSpy).toHaveBeenCalledTimes(0);
        expect(requestGridResolveNextSpy).toHaveBeenCalledTimes(0);
        expect(requestShowCandidatesSpy).toHaveBeenCalledTimes(0);
    });

    describe("mapDispatchToProps ", () => {
        it("should be calling requestGridInitialisation", () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);

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

            result.requestGridInitialisation(valueMapping);
            expect(dispatch).toHaveBeenCalledWith(
                requestGridInitialisation(valueMapping)
            );
        });

        it("should be calling requestGridChange", () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);

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

            result.requestGridChange(valueMapping, candidateMapping);
            expect(dispatch).toHaveBeenCalledWith(
                requestGridChange(valueMapping, candidateMapping)
            );
        });

        it("should be calling requestGridResolveNext", () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);

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

            result.requestGridResolveNext(valueMapping, candidateMapping);
            expect(dispatch).toHaveBeenCalledWith(
                requestGridResolveNext(valueMapping, candidateMapping)
            );
        });

        it("should be calling requestGridResolveAll", () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);

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

            result.requestGridResolveAll(valueMapping, candidateMapping);
            expect(dispatch).toHaveBeenCalledWith(
                requestGridResolveAll(valueMapping, candidateMapping)
            );
        });

        it("should be calling requestShowCandidates", () => {
            const dispatch = jest.fn();
            const result = mapDispatchToProps(dispatch);

            result.requestShowCandidates(true);
            expect(dispatch).toHaveBeenCalledWith(
                requestShowCandidates(true)
            );
        });
    });
});
