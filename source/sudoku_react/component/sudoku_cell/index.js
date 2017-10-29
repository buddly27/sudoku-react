/**
 * SudokuCell Component.
 *
 * This component represents a single cell of a Sudoku grid and should
 * generally be included in a block (e.g. 3x3 block).
 *
 * Example::
 *
 *     <SudokuCell
 *         data="5"
 *         fixed
 *         onChange={
 *             (value, candidates) => {
 *                 console.log(`Request new value: ${value}.`);
 *             }
 *         }
 *     />
 *
 */

import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";


/**
 * Render the SudokuCell Component.
 *
 * *props* should contain:
 *
 * * data:
 *     Indicate the value of the cell which must be a number between 1 and 9, or
 *     the list of candidates numbers. By default, the data is initiated to a
 *     candidates list containing all possible values.
 *
 * * fixed:
 *     Indicate whether the cell cannot be edited (false by default).
 *
 * * error:
 *     Indicate whether the cell has an error (false by default).
 *
 * * showCandidates:
 *     Indicate whether the candidates should be shown (false by default).
 *
 * * onChange:
 *     *onChange* should be the callback function called when the new data
 *     requested is validated.
 *
 *     Signature::
 *
 *         function(data) => void
 */
export default class SudokuCell extends React.PureComponent {
    /**
     * Expected types for *props*.
     */
    static propTypes = {
        data: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
        fixed: PropTypes.bool,
        error: PropTypes.bool,
        showCandidates: PropTypes.bool,
        onChange: PropTypes.func.isRequired,
    };

    /**
     * Default values for *props*.
     */
    static defaultProps = {
        data: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        fixed: false,
        error: false,
        showCandidates: false,
    };

    /** Create the component with local states. */
    constructor(props) {
        super(props);
        this.state = {
            editionMode: false,
        };
    }

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
     * *onChange* should be the callback function called when the new data
     * requested is validated.
     *
     *     Signature::
     *
     *         function(data) => void
     *
     */
    onKeyPress = (event, number, onChange) => {
        let newNumber = number;

        if (!isNaN(event.key)) {
            this.onCellChange(event.key, onChange);
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
                this.onCellChange(newNumber, onChange);
            }
        }
    };


    /**
     * Function called when a modification of the cell value is requested.
     *
     * *value* should be the new value requested for the cell.
     *
     * *onChange* should be the callback function called when the new data
     * requested is validated.
     *
     *     Signature::
     *
     *         function(data) => void
     */
    onCellChange = (value, onChange) => {
        if (isNaN(value)) {
            return;
        }

        const number = Number(value);
        if (number === 0) {
            onChange([1, 2, 3, 4, 5, 6, 7, 8, 9]);
        }
        else if (number > 0 && number <= 9) {
            onChange(number);
        }
    };

    /**
     * Function called when a modification of the candidates list is requested.
     *
     * *candidatesJoined* should be a string containing the entire number of
     * candidate numbers.
     *
     * *onChange* should be the callback function called when the new data
     * requested is validated.
     *
     *     Signature::
     *
     *         function(data) => void
     */
    onCandidatesChange = (candidatesJoined, onChange) => {
        const candidates = candidatesJoined.split("")
            .filter((number) => !isNaN(number) && number > 0 && number <= 9)
            .map(Number);

        const _candidates = Array.from(new Set(candidates)).sort();
        if (_candidates.length > 0) {
            onChange(_candidates);
        }
    };

    /** Render the component. */
    render() {
        const {
            fixed,
            error,
            data,
            showCandidates,
            onChange,
        } = this.props;

        // Guess cell value number and candidates
        const candidates = Array.isArray(data) ? data : [];
        const number = (!isNaN(data) && data > 0 && data <= 9) ? data : 0;

        const style = {
            container: {
                border: "1px solid #343f7a",
                height: "62px",
                width: "62px",
                boxSizing: "border-box",
                display: "flex",
                flexWrap: "wrap",
            },
            value: {
                background: (this.state.editionMode) ? "#ffea5a" : "none",
                border: 0,
                height: "60px",
                width: "60px",
                fontSize: "1.25em",
                color: "transparent",
                textShadow: "0 0 0 #07080a",
                textAlign: "center",
                outline: "none",
            },
            candidate: {
                border: 0,
                height: "20px",
                width: "20px",
                fontSize: "0.80em",
                color: "transparent",
                textShadow: "0 0 0 #07080a",
                textAlign: "center",
                outline: "none",
            },
            candidateEditor: {
                background: "#ffea5a",
                resize: "none",
                border: 0,
                height: "60px",
                width: "60px",
                fontSize: "0.90em",
                outline: "none",
                letterSpacing: "5px",
                textAlign: "center",
            },
        };

        if (fixed) {
            style.value.background = "#6f86ff";

            if (error) {
                style.value.border = "3px solid #db4646";
                style.value.boxSizing = "border-box";
            }
        }
        else if (error) {
            style.value.background = "#db4646";
            style.candidate.background = "#db4646";
        }

        if (showCandidates && this.state.editionMode) {
            return (
                <div style={style.container}>
                    <textarea
                        autoFocus // eslint-disable-line jsx-a11y/no-autofocus
                        style={style.candidateEditor}
                        onFocus={() => this.setState({editionMode: true})}
                        onBlur={() => this.setState({editionMode: false})}
                        onChange={
                            (event) => this.onCandidatesChange(
                                event.target.value, onChange
                            )
                        }
                        value={candidates.join("")}
                    />
                </div>
            );
        }

        if (showCandidates && number === 0) {
            return (
                <div style={style.container}>
                    {
                        _.range(1, 10).map((candidate) => (
                            <input
                                key={`candidate-${candidate}`}
                                type="text"
                                style={style.candidate}
                                value={
                                    (candidates.includes(candidate)) ?
                                        candidate : ""
                                }
                                onFocus={
                                    () => this.setState({editionMode: true})
                                }
                                onBlur={
                                    () => this.setState({editionMode: false})
                                }
                                readOnly
                            />
                        ))
                    }
                </div>
            );
        }

        return (
            <div style={style.container}>
                <input
                    type="text"
                    style={style.value}
                    value={(number !== 0) ? number : ""}
                    disabled={fixed}
                    onChange={
                        (event) => this.onCellChange(
                            event.target.value, onChange
                        )
                    }
                    onKeyDown={
                        (event) => this.onKeyPress(
                            event, number, onChange
                        )
                    }
                    onFocus={() => this.setState({editionMode: true})}
                    onBlur={() => this.setState({editionMode: false})}
                />
            </div>
        );
    }
}
