import React from "react";
import {shallow} from "enzyme";

import NotFound from "sudoku_react/container/not_found";

describe("<NotFound />", () => {
    it("should render the not found page with a message", () => {
        const renderedComponent = shallow(
            <NotFound />
        );
        expect(renderedComponent.text()).toEqual("<FormattedMessage />");
    });
});
