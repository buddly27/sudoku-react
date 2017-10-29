/**
 * SudokuSolver.
 *
 */

/* eslint-disable react/prefer-stateless-function */

import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import SudokuGrid9X9 from "sudoku_react/component/sudoku_grid_9x9";
import SolverControlForm from "sudoku_react/component/solver_control_form";

import {
    requestGridInitialisation,
    requestGridChange,
    requestGridResolveAll,
    requestGridResolveNext,
    requestShowCandidates,
} from "./action";

import {
    makeSelectInitialValueMapping,
    makeSelectValueMapping,
    makeSelectCandidateMapping,
    makeSelectErrorCells,
    makeSelectShowCandidates,
    makeSelectGridSolved,
} from "./selector";


/**
 * SudokuSolver Container Component.
 */
export class SudokuSolver extends React.Component {
    /**
     * Expected types for *props*.
     */
    static propTypes = {
        initialValueMapping: PropTypes.object.isRequired,
        valueMapping: PropTypes.object.isRequired,
        candidateMapping: PropTypes.object.isRequired,
        errorCells: PropTypes.array.isRequired,
        showCandidates: PropTypes.bool.isRequired,
        gridSolved: PropTypes.bool.isRequired,
        requestGridInitialisation: PropTypes.func.isRequired,
        requestGridChange: PropTypes.func.isRequired,
        requestGridResolveAll: PropTypes.func.isRequired,
        requestGridResolveNext: PropTypes.func.isRequired,
        requestShowCandidates: PropTypes.func.isRequired,
    };

    /** Initiate the grid before mounting the component. */
    componentWillMount() {
        this.props.requestGridInitialisation(this.props.initialValueMapping);
    }

    render() {
        const {
            initialValueMapping,
            valueMapping,
            candidateMapping,
            errorCells,
            showCandidates,
            gridSolved,
        } = this.props;

        const style = {
            container: {
                paddingTop: 50,
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "center",
            },
        };

        return (
            <div style={style.container}>
                <SudokuGrid9X9
                    {...combineGridMapping(valueMapping, candidateMapping)}
                    fixedCells={Object.keys(initialValueMapping)}
                    errorCells={errorCells}
                    showCandidates={showCandidates}
                    onChange={
                        (newGrid) => {
                            const mapping = decanteGridMapping(newGrid);
                            this.props.requestGridChange(
                                mapping.value, mapping.candidate,
                            );
                        }
                    }
                />

                <SolverControlForm
                    onShowCandidateToggle={this.props.requestShowCandidates}
                    onGridReset={
                        () => this.props.requestGridInitialisation(
                            initialValueMapping
                        )
                    }
                    onResolveNext={
                        () => this.props.requestGridResolveNext(
                            valueMapping, candidateMapping
                        )
                    }
                    onResolveAll={
                        () => this.props.requestGridResolveAll(
                            valueMapping, candidateMapping
                        )
                    }
                    resolveDisabled={errorCells.length > 0 || gridSolved}
                />
            </div>
        );
    }
}


/**
 * Return combination of *valueMapping* and *candidateMapping* into one mapping.
 *
 * For each property with an empty array, the value from the corresponding
 * *valueMapping* is kept in the data mapping. Otherwise, the value from the
 * corresponding *candidateMapping* is kept.
 *
 * Example::
 *
 *     >>> const valueMapping = {
 *     ...     c00: 5, c01: 0, c02: 0, c03: 2,
 *     ... }
 *     >>> const candidateMapping = {
 *     ...     c00: [],
 *     ...     c01: [1, 2, 3, 4],
 *     ...     c02: [1, 2, 3],
 *     ...     c03: [],
 *     ... }
 *     >>> combineGridMapping()
 *     {
 *         c00: 5,
 *         c01: [1, 2, 3, 4],
 *         c02: [1, 2, 3],
 *         c03: 2,
 *     }
 */
export function combineGridMapping(valueMapping, candidateMapping) {
    const _candidateMapping = Object.keys(candidateMapping)
        .reduce((result, identifier) => {
            const parent = result;
            if (candidateMapping[identifier].length > 0) {
                parent[identifier] = candidateMapping[identifier];
            }
            return parent;
        }, {});

    return Object.assign({}, valueMapping, _candidateMapping);
}


/**
 * Return separated value and candidate mappings from the *dataMapping*.
 *
 * For each *dataMapping* property with an array, the value mapping will have a
 * zero value and the candidate mapping will keep the data value for the same
 * identifier. Otherwise, the value mapping will have the data value and the
 * candidate mapping will have an empty array.
 *
 * Example::
 *
 *     >>> const dataMapping = {
 *     ...     c00: 5,
 *     ...     c01: [1, 2, 3, 4],
 *     ...     c02: [1, 2, 3],
 *     ...     c03: 2,
 *     ... }
 *     >>> decanteGridMapping(dataMapping)
 *     {
 *         value: {
 *             c00: 5, c01: 0, c02: 0, c03: 2,
 *         },
 *         candidate: {
 *             c00: [],
 *             c01: [1, 2, 3, 4],
 *             c02: [1, 2, 3],
 *             c03: [],
 *         },
 *     }
 */
export function decanteGridMapping(dataMapping) {
    const mapping = {
        value: {},
        candidate: {},
    };

    Object.keys(dataMapping).forEach((cellIdentifier) => {
        const data = dataMapping[cellIdentifier];

        if (Array.isArray(data)) {
            mapping.value[cellIdentifier] = 0;
            mapping.candidate[cellIdentifier] = Array.from(data);
        }
        else {
            mapping.value[cellIdentifier] = data;
            mapping.candidate[cellIdentifier] = [];
        }
    });

    return mapping;
}


const mapStateToProps = createStructuredSelector({
    initialValueMapping: makeSelectInitialValueMapping(),
    valueMapping: makeSelectValueMapping(),
    candidateMapping: makeSelectCandidateMapping(),
    errorCells: makeSelectErrorCells(),
    showCandidates: makeSelectShowCandidates(),
    gridSolved: makeSelectGridSolved(),
});


export function mapDispatchToProps(dispatch) {
    return {
        requestGridInitialisation: (valueMapping) =>
            dispatch(requestGridInitialisation(valueMapping)),
        requestGridChange: (valueMapping, candidateMapping) =>
            dispatch(requestGridChange(valueMapping, candidateMapping)),
        requestGridResolveAll: (valueMapping, candidateMapping) =>
            dispatch(requestGridResolveAll(valueMapping, candidateMapping)),
        requestGridResolveNext: (valueMapping, candidateMapping) =>
            dispatch(requestGridResolveNext(valueMapping, candidateMapping)),
        requestShowCandidates: (checked) =>
            dispatch(requestShowCandidates(checked)),
    };
}


/**
 * SudokuSolver Container wrapped with the Redux connector.
 */
export default connect(mapStateToProps, mapDispatchToProps)(SudokuSolver);
