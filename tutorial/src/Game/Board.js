import React from "react";
import PropTypes from 'prop-types';

import {Square} from "./Square";

export class Board extends React.Component {

    renderSquare(i) {

        let styleWinner = {
            backgroundColor: 'skyblue',
            fontWeight: 'bold',
        };

        return (
            <Square
                value={this.props.squares[i]}
                onClick={() => this.props.onClick(i)}
                style={this.props.winSquares.includes(i) ? styleWinner : null}
            />
        );
    }

    render() {
        let counter = 0;
        let squares = [];
        for(let row = 0; row < this.props.rows; row ++) {
            let children = [];
            for(let cols = 0; cols < this.props.cols; cols++, counter++){
                children.push(this.renderSquare(counter));
            }
            squares.push(<div className={"board-row"}>{children}</div>)
        }

        return (
            <div>
                {squares}
            </div>
        );
    }
}

Board.propTypes = {
    cols: PropTypes.number,
    rows: PropTypes.number,
    squares: PropTypes.array,
    winSquares: PropTypes.array,
    onClick: PropTypes.func,
};