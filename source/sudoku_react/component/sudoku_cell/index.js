/**
 * SudokuCell Component.
 *
 * This component represents a single cell of a Sudoku grid and should
 * generally be included in a block (e.g. 3x3 block).
 *
 * Example::
 *
 *     <SudokuCell
 *         id="c00"
 *         blockId="b00"
 *         value=5
 *         editable
 *         onChange={
 *             (value, cellId, blockId) => {
 *                 console.log(
 *                     `A new value ${value} is requested for the cell ` +
 *                     `'${cellId}' belonging to the block '${blockId}'`
 *                 )
 *             }
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
 * * id:
 *     Identifier of the cell (e.g. 'c01').
 *
 * * blockId:
 *     Identifier of the block containing this cell (e.g. 'b01').
 *
 * * editable:
 *     Indicate whether the cell is editable.
 *
 * * value:
 *     Indicate the value of the cell between 0 and 9
 *     (0 means that the cell is not filled).
 *
 * * onChange:
 *     Callback function called when the cell is edited. Its arguments
 *     contains the new *value*, the identifier of the cell (e.g. 'c01')
 *     and the identifier of the block (e.g. 'b01').
 *
 *     Signature::
 *
 *         function(value: number, cellId: string, blockId: string) => void
 *
 */
const SudokuCell = (props) => {
    const {id, blockId, editable, value, onChange} = props;
    const number = (!isNaN(value) && value >= 0 && value <= 9) ?
        Number(value) : "";
    const style = (editable && value) ?
        {background: "#6f86ff"} : undefined;

    return (
        <StyledInput
            id={`${blockId}.${id}`}
            type="text"
            style={style}
            value={(number !== 0) ? number : ""}
            disabled={editable}
            onChange={
                (event) => onCellChange(
                    event.target.value, id, blockId, onChange
                )
            }
            onKeyDown={
                (event) => onKeyPress(
                    event, number, id, blockId, onChange
                )
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
 * *id* should be the identifier of the cell.
 *
 * *blockId* should be the identifier of the block containing this cell.
 *
 * *onChange* should be the callback function called when the new value
 * requested is validated.
 *
 *     Signature::
 *
 *         function(value: number, cellId: string, blockId: string) => void
 *
 */
const onKeyPress = (event, number, id, blockId, onChange) => {
    let newNumber = number;

    if (!isNaN(event.key)) {
        onCellChange(event.key, id, blockId, onChange);
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
            onCellChange(newNumber, id, blockId, onChange);
        }
    }
};


/**
 * Function called when a modification of the cell value is requested.
 *
 * *value* should be the new value requested for the cell.
 *
 * *id* should be the identifier of the cell.
 *
 * *blockId* should be the identifier of the block containing this cell.
 *
 * *onChange* should be the callback function called when the new value
 * requested is validated.
 *
 *     Signature::
 *
 *         function(value: number, cellId: string, blockId: string) => void
 */
const onCellChange = (value, id, blockId, onChange) => {
    if (isNaN(value)) {
        return;
    }

    const number = Number(value);
    if (number >= 0 && number <= 9) {
        onChange(number, id, blockId);
    }
};


/**
 * Expected types for *props*.
 */
SudokuCell.propTypes = {
    id: PropTypes.string.isRequired,
    blockId: PropTypes.string.isRequired,
    editable: PropTypes.bool.isRequired,
    value: PropTypes.number,
    onChange: PropTypes.func.isRequired,
};


/**
 * Default values for *props*.
 */
SudokuCell.defaultProps = {
    value: 0,
};


export default SudokuCell;
