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