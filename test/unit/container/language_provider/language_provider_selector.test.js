import {fromJS} from "immutable";

import {
    selectLanguage,
} from "sudoku_react/container/language_provider/selector";


describe("selectLanguage", () => {
    it("should select the global state", () => {
        const globalState = fromJS({});
        const mockedState = fromJS({
            language: globalState,
        });
        expect(selectLanguage(mockedState)).toEqual(globalState);
    });
});
