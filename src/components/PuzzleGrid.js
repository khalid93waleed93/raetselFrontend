import React from 'react';
function PuzzleGrid({ puzzleGrid, toggleCellState, puzzleArray, solutionWord }) {
	console.log(puzzleArray)

  return (
    <><div className="puzzle-grid">
			{puzzleGrid.map((row, rowIndex) => (
				<div key={rowIndex} className="grid-row">
					{row.map((cell) => (
						<div
							key={`${cell.row}-${cell.column}`}
							className={`grid-cell ${cell.type}`}
							onClick={() => toggleCellState(cell.row, cell.column)} />
					))}
				</div>
			))}
		</div>
		{puzzleArray instanceof Array ?
			<><div className="puzzle-grid">
				  {puzzleArray.map((rowString, rowIndex) => (
					  <div key={rowIndex} className="grid-row">
						  {rowString.split('').map((cellChar, colIndex) => (
							  <div key={colIndex} className="grid-cell">
								  {cellChar}
							  </div>
						  ))}
					  </div>
				  ))}
			  </div><h1>Die Lösungswort ist: <span>{solutionWord}</span></h1></>
		 : null}
		</>
  );
}

export default PuzzleGrid;
