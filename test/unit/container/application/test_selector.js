import {fromJS} from "immutable";

import {
    makeSelectLocationState,
} from "sudoku_react/container/application/selector";


describe("makeSelectLocationState", () => {
    const locationStateSelector = makeSelectLocationState();
    it("should select the route as a plain JS object", () => {
        const route = fromJS({
            locationBeforeTransitions: null,
        });
        const mockedState = fromJS({
            route,
        });
        expect(locationStateSelector(mockedState)).toEqual(route.toJS());
    });
});
