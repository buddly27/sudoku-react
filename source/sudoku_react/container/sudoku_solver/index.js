/**
 * SudokuSolver.
 *
 */

/* eslint-disable react/prefer-stateless-function */

import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";
import Button from "material-ui/Button";
import {FormControlLabel, FormGroup} from "material-ui/Form";
import Switch from "material-ui/Switch";

import SudokuGrid9X9 from "sudoku_react/component/sudoku_grid_9x9";

import {
    requestGridInitialisation,
    requestGridChange,
    requestGridResolve,
    requestShowCandidates,
} from "./action";

import {
    makeSelectGridInitialValues,
    makeSelectGridValues,
    makeSelectGridCandidates,
    makeSelectErrorCells,
    makeSelectShowCandidates,
} from "./selector";


/**
 * SudokuSolver Container Component.
 */
export class SudokuSolver extends React.Component {
    /**
     * Expected types for *props*.
     */
    static propTypes = {
        gridInitialValues: PropTypes.object.isRequired,
        gridValues: PropTypes.object.isRequired,
        gridCandidates: PropTypes.object.isRequired,
        errorCells: PropTypes.array.isRequired,
        showCandidates: PropTypes.bool.isRequired,
        requestGridInitialisation: PropTypes.func.isRequired,
        requestGridChange: PropTypes.func.isRequired,
        requestGridResolve: PropTypes.func.isRequired,
        requestShowCandidates: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.requestGridInitialisation(this.props.gridInitialValues);
    }

    onGridChange = (gridData) => {
        const valueGrid = {};
        const candidateGrid = {};

        Object.keys(gridData).forEach((cellIdentifier) => {
            const data = gridData[cellIdentifier];

            if (Array.isArray(data)) {
                valueGrid[cellIdentifier] = 0;
                candidateGrid[cellIdentifier] = Array.from(data);
            }
            else {
                valueGrid[cellIdentifier] = data;
                candidateGrid[cellIdentifier] = [];
            }
        });

        this.props.requestGridChange(valueGrid, candidateGrid);
    };

    render() {
        const {
            gridInitialValues,
            gridValues,
            gridCandidates,
            errorCells,
            showCandidates,
        } = this.props;

        const style = {
            container: {
                paddingTop: 50,
                display: "flex",
                flexWrap: "wrap",
            },
            controlPanel: {
                padding: 10,
            },
        };

        const formWidget = (
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            onChange={
                                (event, checked) =>
                                    this.props.requestShowCandidates(checked)
                            }

                        />
                    }
                    label="Show Candidates"
                />
                <Button
                    color="primary"
                    onClick={
                        () => this.props.requestGridInitialisation(
                            gridInitialValues
                        )
                    }
                >
                    Reset
                </Button>
                <Button
                    color="primary"
                    disabled={errorCells.length > 0}
                    onClick={
                        () => this.props.requestGridResolve(
                            gridValues, gridCandidates
                        )
                    }
                >
                    Resolve
                </Button>
            </FormGroup>
        );

        const _gridCandidates = Object.keys(gridCandidates)
            .reduce((result, identifier) => {
                const parent = result;
                if (gridCandidates[identifier].length > 0) {
                    parent[identifier] = gridCandidates[identifier];
                }
                return parent;
            }, {});

        const data = Object.assign({}, gridValues, _gridCandidates);

        return (
            <div>
                <div style={style.container}>
                    <SudokuGrid9X9
                        {...data}
                        fixedCells={Object.keys(gridInitialValues)}
                        errorCells={errorCells}
                        showCandidates={showCandidates}
                        onChange={
                            (newGrid) => this.onGridChange(newGrid)
                        }
                    />

                    <div style={style.controlPanel}>
                        {formWidget}
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = createStructuredSelector({
    gridInitialValues: makeSelectGridInitialValues(),
    gridValues: makeSelectGridValues(),
    gridCandidates: makeSelectGridCandidates(),
    errorCells: makeSelectErrorCells(),
    showCandidates: makeSelectShowCandidates(),
});


export function mapDispatchToProps(dispatch) {
    return {
        requestGridInitialisation: (gridValues) =>
            dispatch(requestGridInitialisation(gridValues)),
        requestGridChange: (gridValues, gridCandidates) =>
            dispatch(requestGridChange(gridValues, gridCandidates)),
        requestGridResolve: (gridValues, gridCandidates) =>
            dispatch(requestGridResolve(gridValues, gridCandidates)),
        requestShowCandidates: (checked) =>
            dispatch(requestShowCandidates(checked)),
    };
}


/**
 * SudokuSolver Container wrapped with the Redux connector.
 */
export default connect(mapStateToProps, mapDispatchToProps)(SudokuSolver);
