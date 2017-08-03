/**
 * Home.
 *
 */

/* eslint-disable react/prefer-stateless-function */

import React from "react";
import PropTypes from "prop-types";
import {connect} from "react-redux";
import {createStructuredSelector} from "reselect";

import SudokuGrid9X9 from "sudoku_react/component/sudoku_grid_9x9";

import {
    initiateGrid,
    onGridChange,
} from "./action";

import {
    makeSelectGrid,
    makeSelectFixedCells,
} from "./selector";


/**
 * Home Container Component.
 *
 * .. note::
 *
 *    While this component should technically be a stateless functional
 *    component (SFC), hot reloading does not currently support SFCs. If hot
 *    reloading is not a necessity for you then you can refactor it and remove
 *    the linting exception.
 *
 */
export class Home extends React.Component {
    /**
     * Expected types for *props*.
     */
    static propTypes = {
        grid: PropTypes.object.isRequired,
        fixedCells: PropTypes.array.isRequired,
        initiateGrid: PropTypes.func.isRequired,
        onGridChange: PropTypes.func.isRequired,
    };

    componentWillMount() {
        this.props.initiateGrid(this.props.grid);
    }

    render() {
        const {grid, fixedCells} = this.props;

        return (
            <div>
                <div style={{paddingTop: 50}}>
                    <SudokuGrid9X9
                        {...grid}
                        fixedCells={fixedCells}
                        onChange={
                            (newGrid) => this.props.onGridChange(newGrid)
                        }
                    />
                </div>
            </div>
        );
    }
}


const mapStateToProps = createStructuredSelector({
    grid: makeSelectGrid(),
    fixedCells: makeSelectFixedCells(),
});


export function mapDispatchToProps(dispatch) {
    return {
        initiateGrid: (grid) => dispatch(initiateGrid(grid)),
        onGridChange: (newGrid) => dispatch(onGridChange(newGrid)),
    };
}


/**
 * Home Container wrapped with the Redux connector.
 */
export default connect(mapStateToProps, mapDispatchToProps)(Home);
