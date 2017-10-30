import React from "react";
import PropTypes from "prop-types";

import {FormGroup} from "material-ui/Form";

import ActionButton from "./button";
import OptionSwitch from "./switch";
import GridSelector from "./selector";


const SolverControlForm = (props) => {
    const {
        gridName,
        gridOptions,
        onGridChange,
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
                <GridSelector
                    value={gridName}
                    options={gridOptions}
                    onChange={onGridChange}
                />
                <OptionSwitch
                    onToggle={onShowCandidateToggle}
                    label="Show Candidates"
                />
                <ActionButton
                    label="Reset"
                    onClick={onGridReset}
                />
                <ActionButton
                    label="Resolve Next"
                    disabled={resolveDisabled}
                    onClick={onResolveNext}
                />
                <ActionButton
                    label="Resolve All"
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
    gridName: PropTypes.string.isRequired,
    gridOptions: PropTypes.array.isRequired,
    onGridChange: PropTypes.func.isRequired,
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

