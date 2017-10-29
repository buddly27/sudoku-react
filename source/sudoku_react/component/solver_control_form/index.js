import React from "react";
import PropTypes from "prop-types";

import {FormControlLabel, FormGroup} from "material-ui/Form";
import Switch from "material-ui/Switch";

import ActionButton from "./button";


const SolverControlForm = (props) => {
    const {
        onShowCandidateToggle,
        onGridReset,
        onResolveNext,
        onResolveAll,
        resolveDisabled,
    } = props;

    const style = {
        container: {
            padding: 30,
        },
    };

    return (
        <div style={style.container}>
            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            onChange={
                                (event, checked) =>
                                    onShowCandidateToggle(checked)
                            }
                        />
                    }
                    label="Show Candidates"
                />
                <ActionButton
                    message="Reset"
                    onClick={onGridReset}
                />
                <ActionButton
                    message="Resolve Next"
                    disabled={resolveDisabled}
                    onClick={onResolveNext}
                />
                <ActionButton
                    message="Resolve All"
                    disabled={resolveDisabled}
                    onClick={onResolveAll}
                />
            </FormGroup>
        </div>
    );
};


/**
 * Expected types for *props*.
 */
SolverControlForm.propTypes = {
    onShowCandidateToggle: PropTypes.func.isRequired,
    onGridReset: PropTypes.func.isRequired,
    onResolveNext: PropTypes.func.isRequired,
    onResolveAll: PropTypes.func.isRequired,
    resolveDisabled: PropTypes.bool,
};


/**
 * Default values for *props*.
 */
SolverControlForm.defaultProps = {
    resolveDisabled: false,
};


export default SolverControlForm;

