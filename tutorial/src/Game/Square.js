import React from "react";
import PropTypes from 'prop-types';

export function Square(props) { //function better for only render() classes
    return (
        <button className="square" onClick={props.onClick} style = {props.style}>
            {props.value}
        </button>
    );
}

Square.propTypes = {
    onClick: PropTypes.func,
    style: PropTypes.object,
    value: PropTypes.string,
};