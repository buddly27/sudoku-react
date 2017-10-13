import React from "react";
import {shallow} from "enzyme";

import StyledColumn from "sudoku_react/component/sudoku_grid_3x3/styled_column";


describe("<StyledColumn />", () => {
    it("should render an <div> tag", () => {
        const renderedComponent = shallow(<StyledColumn />);
        expect(renderedComponent.type()).toEqual("div");
    });
});
