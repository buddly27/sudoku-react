/**
 * These represents all the routes of the application.
 *
 * .. seealso:: http://blog.mxstbr.com/2016/01/react-apps-with-pages
 *
 */

import {getAsyncInjectors} from "sudoku_react/utility/async_injector";


const errorLoading = (err) => {
    // eslint-disable-next-line no-console
    console.error("Dynamic page loading failed", err);
};


const loadModule = (cb) => (componentModule) => {
    cb(null, componentModule.default);
};


/**
 * Create all routes from *store*.
 */
export default function createRoutes(store) {
    // eslint-disable-next-line no-unused-vars
    const {injectReducer, injectSagas} = getAsyncInjectors(store);

    return [
        {
            path: "/",
            name: "solver",
            getComponent(nextState, cb) {
                const importModules = Promise.all([
                    System.import("sudoku_react/container/sudoku_solver/reducer"),
                    System.import("sudoku_react/container/sudoku_solver/index"),
                ]);

                const renderRoute = loadModule(cb);

                importModules.then(
                    ([reducer, component]) => {
                        injectReducer("sudoku_solver", reducer.default);
                        renderRoute(component);
                    }
                );

                importModules.catch(errorLoading);
            },
        }, {
            path: "*",
            name: "not_found",
            getComponent(nextState, cb) {
                System.import("sudoku_react/container/not_found/index")
                    .then(loadModule(cb))
                    .catch(errorLoading);
            },
        },
    ];
}
