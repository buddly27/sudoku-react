import React from "react";
import PropTypes from "prop-types";

import Input, {InputLabel} from "material-ui/Input";
import {FormControl} from "material-ui/Form";

import Select from "material-ui/Select";
import {MenuItem} from "material-ui/Menu";


const GridSelector = (props) => {
    const {value, options, onChange} = props;

    return (
        <FormControl>
            <InputLabel htmlFor="sudoku-selector">Initial Grid</InputLabel>
            <Select
                value={value}
                onChange={(event) => onChange(event.target.value)}
                input={<Input id="sudoku-selector" />}
            >
                {
                    options.map((option) => (
                        <MenuItem
                            key={`item-${option}`}
                            value={option}
                        >
                            {option}
                        </MenuItem>
                    ))
                }
            </Select>
        </FormControl>
    );
};

/**
 * Expected types for *props*.
 */
GridSelector.propTypes = {
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
};


export default GridSelector;
