import styled from "styled-components";


/**
 * Render an custom :html-ref:`input` field to represent a cell.
 */
const StyledInput = styled.input`
    color: transparent;
    text-shadow: 0 0 0 #07080a;
    font-size: 1.25em;
    text-align: center;
    height: 60px;
    width: 60px;
    border: 1px solid #343f7a;
    outline: none;

    &:focus, &:active {
        background: #ffea5a;
    }
    &:hover {
        background: #5169e9;
    }
`;


export default StyledInput;
