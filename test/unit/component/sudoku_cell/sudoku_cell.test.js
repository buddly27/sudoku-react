import React from "react";
import {mount} from "enzyme";

import SudokuCell from "sudoku_react/component/sudoku_cell";


const renderComponent = (props) => mount(
    <SudokuCell {...props} />
);


describe("<SudokuCell />", () => {
    describe("display cell value", () => {
        it("should render an <input> tag with the type 'text'", () => {
            const renderedComponent = renderComponent({onChange: () => {}});

            const input = renderedComponent.find("input");
            expect(input.length).toEqual(1);
            expect(input.prop("type")).toEqual("text");
            expect(input.prop("disabled")).toEqual(false);
        });

        it("should render a disable input if the cell is fixed", () => {
            const renderedComponent = renderComponent({
                data: 3,
                fixed: true,
                onChange: () => {},
            });
            const input = renderedComponent.find("input");
            expect(input.prop("disabled")).toEqual(true);
        });

        it("should render the proper style by default", () => {
            const renderedComponent = renderComponent({onChange: () => {}});
            const input = renderedComponent.find("input");
            expect(input.prop("style"))
                .toEqual({
                    background: "none",
                    border: 0,
                    color: "transparent",
                    fontSize: "1.25em",
                    height: "60px",
                    outline: "none",
                    textAlign: "center",
                    textShadow: "0 0 0 #07080a",
                    width: "60px",
                });
        });

        it("should render the proper style if the cell is fixed", () => {
            const renderedComponent = renderComponent({
                data: 3,
                fixed: true,
                onChange: () => {},
            });
            const input = renderedComponent.find("input");
            expect(input.prop("style"))
                .toEqual({
                    background: "#6f86ff",
                    border: 0,
                    color: "transparent",
                    fontSize: "1.25em",
                    height: "60px",
                    outline: "none",
                    textAlign: "center",
                    textShadow: "0 0 0 #07080a",
                    width: "60px",
                });
        });

        it("should render the proper style if the cell is invalid", () => {
            const renderedComponent = renderComponent({
                data: 3,
                error: true,
                onChange: () => {},
            });
            const input = renderedComponent.find("input");
            expect(input.prop("style"))
                .toEqual({
                    background: "#db4646",
                    border: 0,
                    color: "transparent",
                    fontSize: "1.25em",
                    height: "60px",
                    outline: "none",
                    textAlign: "center",
                    textShadow: "0 0 0 #07080a",
                    width: "60px",
                });
        });

        it("should render the proper style if the cell is fixed and invalid",
            () => {
                const renderedComponent = renderComponent({
                    data: 3,
                    fixed: true,
                    error: true,
                    onChange: () => {},
                });
                const input = renderedComponent.find("input");
                expect(input.prop("style"))
                    .toEqual({
                        background: "#6f86ff",
                        border: "3px solid #db4646",
                        boxSizing: "border-box",
                        color: "transparent",
                        fontSize: "1.25em",
                        height: "60px",
                        outline: "none",
                        textAlign: "center",
                        textShadow: "0 0 0 #07080a",
                        width: "60px",
                    });
            }
        );

        it("should render a empty string from default input", () => {
            const renderedComponent = renderComponent({onChange: () => {}});
            expect(renderedComponent.find("input").prop("value")).toEqual("");
        });

        it("should render the proper value", () => {
            const renderedComponent = renderComponent({
                data: 3,
                onChange: () => {},
            });
            expect(renderedComponent.find("input").prop("value")).toEqual(3);
        });

        it("should render a empty string from candidates input", () => {
            const renderedComponent = renderComponent({
                data: [1, 2, 3],
                onChange: () => {},
            });
            expect(renderedComponent.find("input").prop("value")).toEqual("");
        });

        it(
            "should render a empty string for an invalid number input " +
            "(over than 9)", () => {
                const renderedComponent = renderComponent({
                    data: 42,
                    onChange: () => {},
                });
                const input = renderedComponent.find("input");
                expect(input.prop("value")).toEqual("");
            }
        );

        it("should increase the value when the ArrowUp key is pressed", () => {
            const onChangeSpy = jest.fn();
            const renderedComponent = renderComponent({
                data: 5,
                onChange: onChangeSpy,
            });
            const input = renderedComponent.find("input");
            input.simulate("keydown", {key: "ArrowUp"});
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
            expect(onChangeSpy).toHaveBeenCalledWith(6);
        });

        it("should descrease the value when the ArrowDown key is pressed",
            () => {
                const onChangeSpy = jest.fn();
                const renderedComponent = renderComponent({
                    data: 5,
                    onChange: onChangeSpy,
                });
                const input = renderedComponent.find("input");
                input.simulate("keydown", {key: "ArrowDown"});
                expect(onChangeSpy).toHaveBeenCalledTimes(1);
                expect(onChangeSpy).toHaveBeenCalledWith(4);
            }
        );

        it("should remove the value when the Delete key is pressed", () => {
            const onChangeSpy = jest.fn();
            const renderedComponent = renderComponent({
                data: 5,
                onChange: onChangeSpy,
            });
            const input = renderedComponent.find("input");
            input.simulate("keydown", {key: "Delete"});
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
            expect(onChangeSpy)
                .toHaveBeenCalledWith([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });

        it("should remove the value when the Backspace key is pressed", () => {
            const onChangeSpy = jest.fn();
            const renderedComponent = renderComponent({
                data: 5,
                onChange: onChangeSpy,
            });
            const input = renderedComponent.find("input");
            input.simulate("keydown", {key: "Backspace"});
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
            expect(onChangeSpy)
                .toHaveBeenCalledWith([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        });

        it("should modify the value when a numerical key is pressed", () => {
            const onChangeSpy = jest.fn();
            const renderedComponent = renderComponent({
                data: 5,
                onChange: onChangeSpy,
            });
            const input = renderedComponent.find("input");
            input.simulate("keydown", {key: "6"});
            expect(onChangeSpy).toHaveBeenCalledTimes(1);
            expect(onChangeSpy).toHaveBeenCalledWith(6);
        });

        it("should not call the callback function when a random key is pressed",
            () => {
                const onChangeSpy = jest.fn();
                const renderedComponent = renderComponent({
                    fixed: true,
                    onChange: onChangeSpy,
                });
                const input = renderedComponent.find("input");
                input.simulate("keydown", {key: "H"});
                expect(onChangeSpy).toHaveBeenCalledTimes(0);
            }
        );

        it(
            "should call the callback function when a new number value is " +
            "entered", () => {
                const onChangeSpy = jest.fn();
                const renderedComponent = renderComponent({
                    fixed: true,
                    onChange: onChangeSpy,
                });
                const input = renderedComponent.find("input");
                input.simulate("change", {target: {value: 8}});
                expect(onChangeSpy).toHaveBeenCalledTimes(1);
                expect(onChangeSpy).toHaveBeenCalledWith(8);
            }
        );

        it(
            "should not call the callback function when a new number is not " +
            "between 0 and 9", () => {
                const onChangeSpy = jest.fn();
                const renderedComponent = renderComponent({
                    fixed: true,
                    onChange: onChangeSpy,
                });
                const input = renderedComponent.find("input");
                input.simulate("change", {target: {value: 10}});
                expect(onChangeSpy).toHaveBeenCalledTimes(0);
            }
        );

        it(
            "should not call the callback function when a non digit number " +
            "is entered", () => {
                const onChangeSpy = jest.fn();
                const renderedComponent = renderComponent({
                    fixed: true,
                    onChange: onChangeSpy,
                });
                const input = renderedComponent.find("input");
                input.simulate("change", {target: {value: "h"}});
                expect(onChangeSpy).toHaveBeenCalledTimes(0);
            }
        );

        it("should modify the edition state", () => {
            const renderedComponent = renderComponent({onChange: () => {}});

            const input = renderedComponent.find("input");
            expect(input.prop("style").background).toEqual("none");

            input.prop("onFocus")();
            expect(input.prop("style").background).toEqual("#ffea5a");

            input.prop("onBlur")();
            expect(input.prop("style").background).toEqual("none");
        });
    });

    describe("display cell candidates", () => {
        it("should render 9 <input> tags with the type 'text'", () => {
            const renderedComponent = renderComponent({
                showCandidates: true,
                onChange: () => {},
            });
            const inputs = renderedComponent.find("input");
            expect(inputs.length).toEqual(9);
            inputs.forEach((node) => {
                expect(node.prop("type")).toEqual("text");
            });
        });

        it("should render the all candidates from default input", () => {
            const renderedComponent = renderComponent({
                showCandidates: true,
                onChange: () => {},
            });

            const candidates = [1, 2, 3, 4, 5, 6, 7, 8, 9];
            const inputs = renderedComponent.find("input");
            inputs.forEach((node, index) => {
                expect(node.prop("value")).toEqual(candidates[index]);
            });
        });

        it("should render the proper input candidates", () => {
            const renderedComponent = renderComponent({
                data: [1, 2, 3, 7, 9],
                showCandidates: true,
                onChange: () => {},
            });

            const candidates = [1, 2, 3, "", "", "", 7, "", 9];
            const inputs = renderedComponent.find("input");
            inputs.forEach((node, index) => {
                expect(node.prop("value")).toEqual(candidates[index]);
            });
        });

        it("should handle the cell edition", () => {
            const onChangeSpy = jest.fn();
            const renderedComponent = renderComponent({
                showCandidates: true,
                onChange: onChangeSpy,
            });

            expect(renderedComponent.find("input").length).toEqual(9);
            expect(renderedComponent.find("textarea").length).toEqual(0);

            const oneInput = renderedComponent.find("input").first();
            oneInput.simulate("focus");

            expect(renderedComponent.find("input").length).toEqual(0);
            expect(renderedComponent.find("textarea").length).toEqual(1);

            const textArea = renderedComponent.find("textarea");
            expect(textArea.prop("value")).toEqual("123456789");

            textArea.simulate("change", {target: {value: ""}});
            expect(onChangeSpy).toHaveBeenCalledTimes(0);

            textArea.simulate("change", {target: {value: "13257s-"}});
            expect(onChangeSpy).toHaveBeenLastCalledWith([1, 2, 3, 5, 7]);
            textArea.simulate("blur");

            expect(renderedComponent.find("input").length).toEqual(9);
            expect(renderedComponent.find("textarea").length).toEqual(0);
        });
    });
});
