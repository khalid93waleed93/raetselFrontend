import React, { useState } from 'react';
import './App.css';
import PuzzleForm from './components/PuzzleForm';
import PuzzleGrid from './components/PuzzleGrid';
import LoadingSpinner from './components/LoadingSpinner';

function App() {
  const [rows, setRows] = useState(0);
  const [columns, setColumns] = useState(0);
  const [horizontalWords, setHorizontalWords] = useState('');
  const [verticalWords, setVerticalWords] = useState('');
  const [puzzleGrid, setPuzzleGrid] = useState([]);
  const [selectedSolutionCells, setSelectedSolutionCells] = useState([]);
  const [selectedBlockCells, setSelectedBlockCells] = useState([]);
  const [loading, setLoading] = useState(false);
  const [solutionWord, setSolutionWord] = useState('');
	const [puzzleArray, setPuzzleArray] = useState(null);
  const generateGrid = () => {
    let newGrid = [];
    for (let rowIndex = 0; rowIndex < rows; rowIndex++) {
      let row = [];
      for (let colIndex = 0; colIndex < columns; colIndex++) {
        row.push({ row: rowIndex + 1, column: colIndex + 1, type: 'empty' });
      }
      newGrid.push(row);
    }
    setPuzzleGrid(newGrid);
  };

	const toggleCellState = (row, column) => {
    let newGrid = [...puzzleGrid];
    let cell = newGrid[row - 1][column - 1];
    if (cell.type === 'empty') {
      cell.type = 'block';
      setSelectedBlockCells([...selectedBlockCells, cell]);
    } else if (cell.type === 'block') {
      cell.type = 'solution';
      setSelectedBlockCells(selectedBlockCells.filter(c => c !== cell));
      setSelectedSolutionCells([...selectedSolutionCells, {...cell, pos: selectedSolutionCells.length + 1}]);
    } else {
      cell.type = 'empty';
      setSelectedSolutionCells(selectedSolutionCells.filter(c => c !== cell));
      updateSolutionPositions();
    }
    setPuzzleGrid(newGrid);
  };
	const updateSolutionPositions = () => {
    let counter = 0;
    const updatedSolutionCells = selectedSolutionCells.map(cell => {
      return { ...cell, pos: ++counter };
    });
    setSelectedSolutionCells(updatedSolutionCells);
  };

  const sendData = async () => {
    setLoading(true);
    const puzzleData = {
      rows,
      columns,
      horizontalWords: horizontalWords.split(',').map(w => w.trim()),
      verticalWords: verticalWords.split(',').map(w => w.trim()),
      blockedCells: selectedBlockCells,
      solutionCells: selectedSolutionCells
    };

    try {
      const response = await fetch('http://localhost:8081/puzzles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(puzzleData)
      });
			if (!response.ok) {
				throw new Error('Network response was not ok');
			}
      const data = await response.json();
      // Verarbeiten Sie hier die Antwort
      setSolutionWord(data.solution);
			setPuzzleArray(data.puzzleArray)
    } catch (error) {
      console.error('Error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app-container">
      <h1>Puzzle-Daten Sender</h1>
      <PuzzleForm 
        setRows={setRows} 
        setColumns={setColumns}
        setHorizontalWords={setHorizontalWords}
        setVerticalWords={setVerticalWords}
        generateGrid={generateGrid}
				sendData={sendData}
      />
      <PuzzleGrid 
        puzzleGrid={puzzleGrid}
        toggleCellState={toggleCellState}
				puzzleArray={puzzleArray}
				solutionWord={solutionWord}
      />
      {loading && <LoadingSpinner />}
      {/* Weitere Elemente für die Darstellung der Lösungswörter und anderer Informationen */}
    </div>
  );
}

export default App;
