import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

function Square(props) { //function better for only render() classes
    return (
        <button className="square" onClick={props.onClick} style = {props.style}>
            {props.value}
        </button>
    );
}

class Board extends React.Component {

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

class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
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
                .sort((a,b) => {a.textContent.localeCompare(b.textContent)}).reverse()
                .forEach(li => moves.appendChild(li));
        }else{
            Array.from(moves.getElementsByTagName('li'))
                .sort((a,b) => {a.textContent.localeCompare(b.textContent)})
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

export function calculateWinner(squares) {
    const winnerPositions = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6],
    ];

    for (let i = 0; i < winnerPositions.length; i++){
        const [p0, p1, p2] = winnerPositions[i];
        if (squares[p0] && squares[p0] === squares[p1] && squares[p0] === squares[p2]){
            return [p0, p1, p2];
        }
    }
    return null;

}

// ========================================

ReactDOM.render(
    <Game
        rows={3}
        cols={3}
    />,
    document.getElementById('root')
);
