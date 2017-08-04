import React from "react";
import {shallow} from "enzyme";

import StyledRow from "sudoku_react/component/sudoku_grid_3x3/styled_row";


describe("<StyledRow />", () => {
    it("should render an <div> tag", () => {
        const renderedComponent = shallow(<StyledRow />);
        expect(renderedComponent.type()).toEqual("div");
    });
});
