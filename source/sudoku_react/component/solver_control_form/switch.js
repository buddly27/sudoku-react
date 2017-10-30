import React from "react";
import PropTypes from "prop-types";

import {FormControlLabel} from "material-ui/Form";
import Switch from "material-ui/Switch";


const OptionSwitch = (props) => {
    const {label, onToggle} = props;
    return (
        <FormControlLabel
            control={
                <Switch
                    onChange={
                        (event, checked) =>
                            onToggle(checked)
                    }
                />
            }
            label={label}
        />
    );
};


/**
 * Expected types for *props*.
 */
OptionSwitch.propTypes = {
    label: PropTypes.string.isRequired,
    onToggle: PropTypes.func.isRequired,
};


export default OptionSwitch;

