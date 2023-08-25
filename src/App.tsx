import {useState} from "react";
import logo from './logo.svg';
import './App.css';

function myButton() {
    return (
        <button>
            i am a button
        </button>
    )
}

function App() {
    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <p>
                    Edit <code>src/App.tsx</code> and save to reload.
                </p>
                <a
                    className="App-link"
                    href="https://reactjs.org"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Learn React
                </a>
            </header>
        </div>
    );
}

function Square(props: {value?: string, onSquareClick?: any}) {
    return <button className="square" onClick={props.onSquareClick}>{props.value}</button>
}
function Board(props: {xIsNext: boolean, squares: string[], onPlay: any}) {
    const squares = props.squares
    const xIsNext = props.xIsNext
    const onPlay = props.onPlay

    function handleClick(i: number) {
        if (squares[i] || calculateWinner(squares)) {
            return
        }

        const nextSquares = squares.slice()
        if (xIsNext) {
            nextSquares[i] = "X"
        } else {
            nextSquares[i] = "O"
        }
        onPlay(nextSquares)
    }

    function calculateWinner(squares: string[]) {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ]
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a]
            }
        }
        return null
    }

    const winner = calculateWinner(squares)
    let status
    if (winner) {
        status = 'winner: ' + winner;
    } else {
        status = "next player: " + (xIsNext ? "x" : "o")
    }

    return (
        <>
            <div className="status">{status}</div>
            <div className="board-row">
                <Square value={squares[0]} onSquareClick={() => handleClick(0)}/>
                <Square value={squares[1]} onSquareClick={() => handleClick(1)}/>
                <Square value={squares[2]} onSquareClick={() => handleClick(2)}/>
            </div>
            <div className="board-row">
                <Square value={squares[3]} onSquareClick={() => handleClick(3)}/>
                <Square value={squares[4]} onSquareClick={() => handleClick(4)}/>
                <Square value={squares[5]} onSquareClick={() => handleClick(5)}/>
            </div>
            <div className="board-row">
                <Square value={squares[6]} onSquareClick={() => handleClick(6)}/>
                <Square value={squares[7]} onSquareClick={() => handleClick(7)}/>
                <Square value={squares[8]} onSquareClick={() => handleClick(8)}/>
            </div>
        </>
    )
}

export default function Game() {
    const [xIsNext, setXIsNext] = useState(true)
    const [history, setHistory] = useState(Array(9).fill(null))
    const currentSquares = history[history.length - 1]

    function handlePlay(nextSquares?: string[]) {
        setHistory([...history, nextSquares])
        setXIsNext(!xIsNext)
    }

    return (
        <div className="game">
            <div className="game-board">
                <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay}/>
            </div>
            <div className="game-info">
                <ol>{/*todo*/}</ol>
            </div>
        </div>
    )
}
