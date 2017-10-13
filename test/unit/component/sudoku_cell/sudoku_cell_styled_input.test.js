import React from "react";
import {shallow} from "enzyme";

import StyledInput from "sudoku_react/component/sudoku_cell/styled_input";


describe("<StyledInput />", () => {
    it("should render an <input> tag", () => {
        const renderedComponent = shallow(<StyledInput />);
        expect(renderedComponent.type()).toEqual("input");
    });

    it("should adopt a valid attribute", () => {
        const id = "test";
        const renderedComponent = shallow(<StyledInput id={id} />);
        expect(renderedComponent.prop("id")).toEqual(id);
    });

    it("should not adopt an invalid attribute", () => {
        const renderedComponent = shallow(<StyledInput attribute={"test"} />);
        expect(renderedComponent.prop("attribute")).toBeUndefined();
    });
});
