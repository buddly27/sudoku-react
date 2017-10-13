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

import SudokuGrid9X9 from "sudoku_react/component/sudoku_grid_9x9";

import {
    initiateGrid,
    onGridChange,
} from "./action";

import {
    makeSelectGrid,
    makeSelectFixedCells,
    makeSelectErrorCells,
} from "./selector";


/**
 * SudokuSolver Container Component.
 */
export class SudokuSolver extends React.Component {
    /**
     * Expected types for *props*.
     */
    static propTypes = {
        grid: PropTypes.object.isRequired,
        fixedCells: PropTypes.array.isRequired,
        errorCells: PropTypes.array.isRequired,
        initiateGrid: PropTypes.func.isRequired,
        onGridChange: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.initiateGrid(this.props.grid);
    }

    render() {
        const {grid, fixedCells, errorCells} = this.props;

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

        return (
            <div>
                <div style={style.container}>
                    <SudokuGrid9X9
                        {...grid}
                        fixedCells={fixedCells}
                        errorCells={errorCells}
                        onChange={
                            (newGrid) => this.props.onGridChange(newGrid)
                        }
                    />

                    <div style={style.controlPanel}>
                        <Button
                            color="primary"
                            disabled={errorCells.length}
                        >
                            Next Step
                        </Button>
                    </div>
                </div>
            </div>
        );
    }
}


const mapStateToProps = createStructuredSelector({
    grid: makeSelectGrid(),
    fixedCells: makeSelectFixedCells(),
    errorCells: makeSelectErrorCells(),
});


export function mapDispatchToProps(dispatch) {
    return {
        initiateGrid: (grid) => dispatch(initiateGrid(grid)),
        onGridChange: (newGrid) => dispatch(onGridChange(newGrid)),
    };
}


/**
 * SudokuSolver Container wrapped with the Redux connector.
 */
export default connect(mapStateToProps, mapDispatchToProps)(SudokuSolver);
