import React, { useState } from "react";

function App() {
  const [m, setM] = useState(0);
  const [n, setN] = useState(0);
  const [grid, setGrid] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [isdigonal, setIsdigonal] = useState(false);
  const [iseast, setIseast] = useState(false);
  const [issouth, setIssouth] = useState(false);

  const handleInputChange = (e) => {
    if (e.target.name === "m") {
      setM(parseInt(e.target.value));
    } else if (e.target.name === "n") {
      setN(parseInt(e.target.value));
    }
  };

  const handleGridCreation = () => {
    const totalCells = m * n;
    const alphabets = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const newGrid = [];
    let currentIndex = 0;

    for (let i = 0; i < m; i++) {
      const row = [];
      for (let j = 0; j < n; j++) {
        if (currentIndex >= totalCells) break;
        const alphabet = alphabets[currentIndex % alphabets.length];
        row.push(alphabet);
        currentIndex++;
      }
      newGrid.push(row);
    }

    setGrid(newGrid);
  };

  const handleSearch = () => {
    const results = [];
    const searchArray = searchText.split("").map((char) => char.toUpperCase());
    const rowarray = [];
    const colomarray = [];

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (searchArray.includes(grid[i][j])) {
          results.push({ row: i, column: j });
          rowarray.push(i);
          colomarray.push(j);

          if (i === j && searchArray.length === m && m === n) {
            setIsdigonal(true);
          } else {
            setIsdigonal(false);
          }
        }
      }
    }

    if (results.length === 0) {
      alert("Alphabets are not available.");
    } else {
      colomarray.length > 0 &&
        colomarray.map((li, index) => {
          if (rowarray[index] === rowarray[0] && li === colomarray[0] + index) {
            setIseast(true);
          } else {
            setIseast(false);
          }
        });
      rowarray.length > 0 &&
        rowarray.map((li, index) => {
          if (
            colomarray[index] === colomarray[0] &&
            li === rowarray[0] + index
          ) {
            setIssouth(true);
          } else {
            setIssouth(false);
          }
        });
      setSearchResults(results);
    }
  };

  const isHighlighted = (row, column) => {
    return searchResults.find(
      (result) => result.row === row && result.column === column
    );
  };

  const getCellStyle = (row, column) => {
    const isHighlightedCell = isHighlighted(row, column);
    let style = {
      backgroundColor: isHighlightedCell ? "yellow" : "transparent",
    };

    if (isHighlightedCell) {
      const nextRow = row + 1;
      const nextColumn = column + 1;
      const isNextRowHighlighted = isHighlighted(nextRow, column);
      const isNextColumnHighlighted = isHighlighted(row, nextColumn);
      const isNextDiagonalHighlighted = isHighlighted(nextRow, nextColumn);

      if (isNextRowHighlighted) {
        style = { ...style, borderBottom: "2px solid black" };
      }

      if (isNextColumnHighlighted) {
        style = { ...style, borderRight: "2px solid black" };
      }

      if (isNextDiagonalHighlighted) {
        style = {
          ...style,
          borderBottom: "2px solid black",
          borderRight: "2px solid black",
        };
      }
    }

    return style;
  };

  return (
    <div>
      <h1>Splash Screen</h1>
      <label>
        Enter the number of rows (m):
        <input type="number" name="m" value={m} onChange={handleInputChange} />
      </label>
      <label>
        Enter the number of columns (n):
        <input type="number" name="n" value={n} onChange={handleInputChange} />
      </label>
      <button onClick={handleGridCreation}>Create Grid</button>

      <h2>Grid:</h2>
      {grid.length > 0 && (
        <table>
          <tbody>
            {grid.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((cell, cellIndex) => (
                  <td key={cellIndex} style={getCellStyle(rowIndex, cellIndex)}>
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <h2>Search:</h2>
      <label>
        Enter alphabets to search (separated by comma):
        <input
          type="text"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value.toUpperCase())}
        />
      </label>
      <button onClick={handleSearch}>Search</button>

      {searchResults.length > 0 && (
        <div>
          <h2>Search Results:</h2>
          {iseast && <p>east</p>}
          {issouth && <p>south</p>}
          {isdigonal && <p>south-east</p>}
          <ul>
            {searchResults.map((result, index) => (
              <li key={index}>
                Found at row {result.row}, column {result.column}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
