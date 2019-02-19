import React from "react";

export function Square(props) { //function better for only render() classes
    return (
        <button className="square" onClick={props.onClick} style = {props.style}>
            {props.value}
        </button>
    );
}