import {
    changeLocale,
} from "sudoku_react/container/language_provider/action";

import {
    CHANGE_LOCALE,
} from "sudoku_react/container/language_provider/constant";


describe("LanguageProvider actions", () => {
    describe("Change Local Action", () => {
        it("has a type of CHANGE_LOCALE", () => {
            const expected = {
                type: CHANGE_LOCALE,
                locale: "de",
            };
            expect(changeLocale("de")).toEqual(expected);
        });
    });
});
