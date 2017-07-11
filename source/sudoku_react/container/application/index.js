/**
 * Application.
 *
 */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import AppBar from "material-ui/AppBar";


const Title = styled.h1`
    padding: 5px 30px;
    margin: 0px;
`;


const Content = styled.div`
    padding: 50px;
`;


/**
 * Application Container Component.
 *
 * This component is the skeleton around all other containers. It contains
 * code that will be executed on all containers.
 *
 * *props* should contain:
 *
 * * children:
 *      Nested React children nodes.
 *
 * .. note::
 *
 *    While this component should technically be a stateless functional
 *    component (SFC), hot reloading does not currently support SFCs. If hot
 *    reloading is not a necessity for you then you can refactor it and remove
 *    the linting exception.
 *
 */
// eslint-disable-next-line react/prefer-stateless-function
export default class Application extends React.Component {
    /**
     * Expected types for *props*.
     */
    static propTypes = {
        children: PropTypes.node.isRequired,
    };

    /**
     * Render the component.
     */
    render() {
        const {children} = this.props;

        return (
            <div>
                <AppBar>
                    <Title>Sudoku Game</Title>
                </AppBar>
                <Content>
                    {React.Children.toArray(children)}
                </Content>
            </div>
        );
    }
}
