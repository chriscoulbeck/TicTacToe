import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [winner, setWinner] = useState(null);
  const [squares, setSquares] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);

  const handlePlayAgain = () => {
    setWinner(null);
    setSquares(Array(9).fill(null));
    setXIsNext(true);
  }

  return (
    <div className="game">
      <Board onWin={setWinner} winner={winner} squares={squares}
        setSquares={setSquares} xIsNext={xIsNext} setXIsNext={setXIsNext} />
      {(winner || squares.every(s => s != null)) &&
        (<button onClick={handlePlayAgain}>Play again</button>)}
    </div>
  );
}

function Board({ onWin, winner, squares, xIsNext, setSquares, setXIsNext }) {
  const handleClick = (i) => {
    if (winner || squares[i]) return;

    const nextSquares = squares.slice();
    nextSquares[i] = xIsNext ? 'X' : 'O';

    setSquares(nextSquares);
    setXIsNext(!xIsNext);
  }

  const status = winner
    ? 'Winner: ' + winner
    : 'Next player: ' + (xIsNext ? 'X' : 'O');

  useEffect(() => {
    const result = calculateWinner(squares);
    if (result) {
      onWin(result);
    }
  }, [squares, onWin]);

  return (
    <div>
      <div className="board-status">{status}</div>
      <div className="board">
        <div className="board-row">
          <Square value={squares[0]} onSquareClick={() => handleClick(0)} />
          <Square value={squares[1]} onSquareClick={() => handleClick(1)} />
          <Square value={squares[2]} onSquareClick={() => handleClick(2)} />
        </div>
        <div className="board-row">
          <Square value={squares[3]} onSquareClick={() => handleClick(3)} />
          <Square value={squares[4]} onSquareClick={() => handleClick(4)} />
          <Square value={squares[5]} onSquareClick={() => handleClick(5)} />
        </div>
        <div className="board-row">
          <Square value={squares[6]} onSquareClick={() => handleClick(6)} />
          <Square value={squares[7]} onSquareClick={() => handleClick(7)} />
          <Square value={squares[8]} onSquareClick={() => handleClick(8)} />
        </div>
      </div>
    </div>
  );
}

function Square({ value, onSquareClick }) {
  return (
    <button className={`square ${value ? '' : 'unselected'}`} onClick={onSquareClick}>
      {value}
    </button>
  );
}

function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] == squares[b] && squares[a] == squares[c]) {
      return squares[a];
    }
  }
  return null;
}

export default App;
