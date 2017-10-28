import React from "react";
import PropTypes from "prop-types";

import Button from "material-ui/Button";
import {FormControlLabel, FormGroup} from "material-ui/Form";
import Switch from "material-ui/Switch";


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
            padding: 10,
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
                <Button
                    color="primary"
                    onClick={onGridReset}
                >
                    Reset
                </Button>
                <Button
                    color="primary"
                    disabled={resolveDisabled}
                    onClick={onResolveNext}
                >
                    Resolve Next
                </Button>
                <Button
                    color="primary"
                    disabled={resolveDisabled}
                    onClick={onResolveAll}
                >
                    Resolve All
                </Button>
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

