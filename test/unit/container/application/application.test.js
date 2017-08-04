import React from "react";
import {mount} from "enzyme";

import Application from "sudoku_react/container/application/index";


describe("<Application />", () => {
    it("should render the application page", () => {
        const renderedComponent = mount(
            <Application>
                <h1> Grid #1</h1>
            </Application>
        );
        expect(renderedComponent.text()).toEqual("Sudoku Game Grid #1");
    });
});
