import React from 'react';

function PuzzleForm({ setRows, setColumns, setHorizontalWords, setVerticalWords, generateGrid, sendData }) {
  return (
    <form className="puzzle-form">
      <div className="form-group">
        <label htmlFor="rows">Reihen:</label>
        <input type="number" id="rows" name="rows" onChange={(e) => setRows(parseInt(e.target.value))} />
      </div>

      <div className="form-group">
        <label htmlFor="columns">Spalten:</label>
        <input type="number" id="columns" name="columns" onChange={(e) => setColumns(parseInt(e.target.value))} />
      </div>

      <div className="form-group">
        <label htmlFor="horizontalWords">Horizontale Wörter (getrennt durch Kommas):</label>
        <input type="text" id="horizontalWords" name="horizontalWords" onChange={(e) => setHorizontalWords(e.target.value)} />
      </div>

      <div className="form-group">
        <label htmlFor="verticalWords">Vertikale Wörter (getrennt durch Kommas):</label>
        <input type="text" id="verticalWords" name="verticalWords" onChange={(e) => setVerticalWords(e.target.value)} />
      </div>

      <button type="button" onClick={generateGrid}>Grid erstellen</button>
			<button type="button" onClick={sendData}>Solve it !!!</button>
    </form>
  );
}

export default PuzzleForm;
