import React from "react";
import {mount} from "enzyme";

import SudokuCell from "sudoku_react/component/sudoku_cell";


const renderComponent = (props) => mount(
    <SudokuCell {...props} />
);


describe("<SudokuCell />", () => {
    it("should render an <input> tag with the type 'text'", () => {
        const renderedComponent = renderComponent({
            fixed: false,
            onChange: () => {},
        });
        expect(renderedComponent.find("input").length).toEqual(1);
        expect(renderedComponent.find("input").prop("type")).toEqual("text");
    });

    it("should render a empty string for a zero as an input", () => {
        const renderedComponent = renderComponent({
            value: 0,
            fixed: false,
            onChange: () => {},
        });
        expect(renderedComponent.find("input").prop("value")).toEqual("");
    });

    it("should render a empty string for an invalid number input (over than 9)", () => {
        const renderedComponent = renderComponent({
            value: 42,
            fixed: false,
            onChange: () => {},
        });
        expect(renderedComponent.find("input").prop("value")).toEqual("");
    });

    it("should not add a style for the 'fixed' props without a value", () => {
        const renderedComponent = renderComponent({
            fixed: true,
            onChange: () => {},
        });
        expect(renderedComponent.find("input").prop("style")).toBeUndefined();
    });

    it("should add a style for the 'fixed' props with a value", () => {
        const renderedComponent = renderComponent({
            fixed: true,
            value: 5,
            onChange: () => {},
        });
        expect(renderedComponent.find("input").prop("style")).toBeDefined();
    });

    it("should increase the value when the ArrowUp key is pressed", () => {
        const onChangeSpy = jest.fn();
        const renderedComponent = renderComponent({
            fixed: false,
            value: 5,
            onChange: onChangeSpy,
        });
        const input = renderedComponent.find("input");
        input.simulate("keydown", {key: "ArrowUp"});
        expect(onChangeSpy).toHaveBeenCalled();
        expect(onChangeSpy.mock.calls).toEqual([[6]]);
    });

    it("should descrease the value when the ArrowDown key is pressed", () => {
        const onChangeSpy = jest.fn();
        const renderedComponent = renderComponent({
            fixed: false,
            value: 5,
            onChange: onChangeSpy,
        });
        const input = renderedComponent.find("input");
        input.simulate("keydown", {key: "ArrowDown"});
        expect(onChangeSpy).toHaveBeenCalled();
        expect(onChangeSpy.mock.calls).toEqual([[4]]);
    });

    it("should remove the value when the Delete key is pressed", () => {
        const onChangeSpy = jest.fn();
        const renderedComponent = renderComponent({
            fixed: false,
            value: 5,
            onChange: onChangeSpy,
        });
        const input = renderedComponent.find("input");
        input.simulate("keydown", {key: "Delete"});
        expect(onChangeSpy).toHaveBeenCalled();
        expect(onChangeSpy.mock.calls).toEqual([[0]]);
    });

    it("should remove the value when the Backspace key is pressed", () => {
        const onChangeSpy = jest.fn();
        const renderedComponent = renderComponent({
            fixed: false,
            value: 5,
            onChange: onChangeSpy,
        });
        const input = renderedComponent.find("input");
        input.simulate("keydown", {key: "Backspace"});
        expect(onChangeSpy).toHaveBeenCalled();
        expect(onChangeSpy.mock.calls).toEqual([[0]]);
    });

    it("should modify the value when a numerical key is pressed", () => {
        const onChangeSpy = jest.fn();
        const renderedComponent = renderComponent({
            fixed: false,
            value: 5,
            onChange: onChangeSpy,
        });
        const input = renderedComponent.find("input");
        input.simulate("keydown", {key: "6"});
        expect(onChangeSpy).toHaveBeenCalled();
        expect(onChangeSpy.mock.calls).toEqual([[6]]);
    });

    it("should not call the callback function when a random key is pressed", () => {
        const onChangeSpy = jest.fn();
        const renderedComponent = renderComponent({
            fixed: true,
            onChange: onChangeSpy,
        });
        const input = renderedComponent.find("input");
        input.simulate("keydown", {key: "H"});
        expect(onChangeSpy).toHaveBeenCalledTimes(0);
    });

    it("should call the callback function when a new number value is entered", () => {
        const onChangeSpy = jest.fn();
        const renderedComponent = renderComponent({
            fixed: true,
            onChange: onChangeSpy,
        });
        const input = renderedComponent.find("input");
        input.simulate("change", {target: {value: 8}});
        expect(onChangeSpy).toHaveBeenCalled();
        expect(onChangeSpy.mock.calls).toEqual([[8]]);
    });

    it("should not call the callback function when a new number is not between 0 and 9", () => {
        const onChangeSpy = jest.fn();
        const renderedComponent = renderComponent({
            fixed: true,
            onChange: onChangeSpy,
        });
        const input = renderedComponent.find("input");
        input.simulate("change", {target: {value: 10}});
        expect(onChangeSpy).toHaveBeenCalledTimes(0);
    });

    it("should not call the callback function when a non digit number is entered", () => {
        const onChangeSpy = jest.fn();
        const renderedComponent = renderComponent({
            fixed: true,
            onChange: onChangeSpy,
        });
        const input = renderedComponent.find("input");
        input.simulate("change", {target: {value: "h"}});
        expect(onChangeSpy).toHaveBeenCalledTimes(0);
    });
});
