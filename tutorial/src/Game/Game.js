import React from "react";
import './Game.css';

import {Board} from "./Board";
import {calculateWinner} from "./Utils";

export class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(this.props.rows * this.props.cols).fill(null),
                newStepRow: null,
                newStepColumn: null,
            }],
            selected: null,
            stepNumber: 0,
            xIsNext: true,
            sort: true,
        };
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber];
        const winnerResult = calculateWinner(current.squares);
        let winner = false;
        if(winnerResult) {
            winner = current.squares[winnerResult[0]];
        }

        let style = {
            fontWeight: 'bold',
            color: 'skyblue',
        };

        const moves = history.map((step, move) =>{
            const desc = move ?
                'Go to move #' + move + ' (' + step.nextStepRow + ',' + step.nextStepColumn + ')':
                'Go to game start';
            return (
                <li key = {move}>
                    <button
                        onClick = {() => this.jumpTo(move)}
                        style = {this.state.selected === move ? style : null}
                    >
                        {desc}
                    </button>
                </li>
            );
        });

        let status;
        if(winner){
            alert('Winner: ' + winner);
            status = 'Winner: ' + winner;
        }else {
            status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
        }

        return (
            <div className="game">
                <div className="game-board">
                    <Board
                        winSquares = {winner ? winnerResult : []}
                        rows={this.props.rows}
                        cols={this.props.cols}
                        squares={current.squares}
                        onClick={(i)=>this.handleClick(i)}
                    />
                </div>
                <div className="game-info">
                    <div>{status}</div>
                    <ol id="moves">{moves}</ol>
                </div>
                <div className="sort-button">
                    <button onClick={()=>this.sortMoves()}>Sort moves</button>
                </div>
            </div>
        );
    }

    sortMoves(){
        let moves = document.getElementById('moves');
        if(this.state.sort){
            Array.from(moves.getElementsByTagName('li'))
                .sort((a,b) => a.textContent.localeCompare(b.textContent)).reverse()
                .forEach(li => moves.appendChild(li));
        }else{
            Array.from(moves.getElementsByTagName('li'))
                .sort((a,b) => a.textContent.localeCompare(b.textContent))
                .forEach(li => moves.appendChild(li));
        }
        this.setState({
            sort:!this.state.sort
        });
    }

    jumpTo(step){
        this.setState({
            selected: step,
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        });
    }

    handleClick(i){
        const history = this.state.history.slice(0, this.state.stepNumber + 1);
        const current = history[history.length - 1];
        // non-mutating approach:
        const squares = current.squares.slice();

        if(squares[i]) {
            return;
        }

        squares[i] = this.state.xIsNext ? 'X' : 'O';
        this.setState({
            selected: null,
        });
        this.setState({
            history: history.concat([{ // concat doesn't mutate the original
                squares:squares,
                nextStepRow:Math.floor(i/3+1),
                nextStepColumn:i%3+1,
            }]),
            stepNumber: history.length,
            xIsNext:!this.state.xIsNext,
        });

        if(calculateWinner(squares)){
            return;
        }
        if(history.length >= this.props.rows * this.props.cols){
            alert('Draw game!');
        }
    }
}