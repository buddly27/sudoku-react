/**
 * SudokuCell Component.
 *
 * This component represents a single cell of a Sudoku grid and should
 * generally be included in a block (e.g. 3x3 block).
 *
 * Example::
 *
 *     <SudokuCell
 *         value="5"
 *         fixed
 *         onChange={
 *             (value) => { console.log(`Request new value: ${value}.`); }
 *         }
 *     />
 *
 */

import React from "react";
import PropTypes from "prop-types";
import StyledInput from "./styled_input";


/**
 * Render the SudokuCell Component.
 *
 * *props* should contain:
 *
 * * fixed:
 *     Indicate whether the cell cannot be edited (false by default).
 *
 * * error:
 *     Indicate whether the cell has an error (false by default).
 *
 * * value:
 *     Indicate the value of the cell between 0 and 9
 *     (0 means that the cell is not filled).
 *
 * * onChange:
 *     Callback function called when the cell is edited. Its arguments
 *     contains the new *value*.
 *
 *     Signature::
 *
 *         function(value: number) => void
 *
 */
const SudokuCell = (props) => {
    const {fixed, error, value, onChange} = props;
    const number = (!isNaN(value) && value >= 0 && value <= 9) ?
        Number(value) : "";

    const style = {};

    if (fixed && value) {
        style.background = "#6f86ff";

        if (error) {
            style.border = "3px solid #db4646";
            style.boxSizing = "border-box";
        }
    }
    else if (error) {
        style.background = "#db4646";
    }

    return (
        <StyledInput
            type="text"
            style={style}
            value={(number !== 0) ? number : ""}
            disabled={fixed}
            onChange={
                (event) => onCellChange(event.target.value, onChange)
            }
            onKeyDown={
                (event) => onKeyPress(event, number, onChange)
            }
        />
    );
};


/**
 * Function called when a key is pressed over the cell.
 *
 * When pressing the ``ArrowDown`` or ``ArrowUp`` keys, the number of the cell is
 * respectively decremented or incremented.
 *
 * When pressing the ``Backspace`` or ``Delete`` keys, the value of the cell is
 * set to zero.
 *
 * *event* should be a :web-api-ref:`KeyboardEvent`.
 *
 * *number* should be the current value number of the cell (between 0 and 9).
 *
 * *onChange* should be the callback function called when the new value
 * requested is validated.
 *
 *     Signature::
 *
 *         function(value: number, cellId: string, blockId: string) => void
 *
 */
const onKeyPress = (event, number, onChange) => {
    let newNumber = number;

    if (!isNaN(event.key)) {
        onCellChange(event.key, onChange);
    }
    else {
        switch (event.key) {
            case "ArrowDown":
                newNumber -= 1;
                break;
            case "ArrowUp":
                newNumber += 1;
                break;
            case "Backspace":
            case "Delete":
                newNumber = 0;
                break;
            default:
                newNumber = null;
                break;
        }

        if (newNumber !== null) {
            onCellChange(newNumber, onChange);
        }
    }
};


/**
 * Function called when a modification of the cell value is requested.
 *
 * *value* should be the new value requested for the cell.
 *
 * *onChange* should be the callback function called when the new value
 * requested is validated.
 *
 *     Signature::
 *
 *         function(value: number, cellId: string, blockId: string) => void
 */
const onCellChange = (value, onChange) => {
    if (isNaN(value)) {
        return;
    }

    const number = Number(value);
    if (number >= 0 && number <= 9) {
        onChange(number);
    }
};


/**
 * Expected types for *props*.
 */
SudokuCell.propTypes = {
    fixed: PropTypes.bool,
    error: PropTypes.bool,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
};


/**
 * Default values for *props*.
 */
SudokuCell.defaultProps = {
    value: 0,
    fixed: false,
    error: false,
};


export default SudokuCell;
