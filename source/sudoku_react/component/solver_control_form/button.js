import React from "react";
import PropTypes from "prop-types";

import Button from "material-ui/Button";


const ActionButton = (props) => {
    const {label, disabled, onClick} = props;
    return (
        <Button
            color="primary"
            disabled={disabled}
            onClick={onClick}
        >
            {label}
        </Button>
    );
};


/**
 * Expected types for *props*.
 */
ActionButton.propTypes = {
    label: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
};


/**
 * Default values for *props*.
 */
ActionButton.defaultProps = {
    disabled: false,
};


export default ActionButton;

