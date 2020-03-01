import React, { useState, useCallback, useRef } from "react";
import "./App.scss";
import produce from "immer";

function App() {
  console.log(window.innerHeight, window.innerWidth);

  // Compute the number of rows and cols, knowing that the header is 50px tall and each cell is a 20px square
  const ROWS = Math.floor((window.innerHeight - 50) / 20);
  const COLS = Math.floor(window.innerWidth / 20);

  const emptyGrid = () => {
    return Array(ROWS).fill(Array(COLS).fill(false)); // Init the matrix with empty cells
  };

  // List all relative positions of a cell. This array is used to reduce the code when checking the state of neighboring cells
  const neighborsRelativePositions = [
    [0, 1],
    [0, -1],
    [1, 0],
    [-1, 0],
    [1, 1],
    [1, -1],
    [-1, 1],
    [-1, -1]
  ];

  // Initialize the grid with empty cells
  const [grid, setGrid] = useState(() => {
    return emptyGrid();
  });

  // Simulation not running by default
  const [run, setRun] = useState(false);

  // Reference of the running state. Usefull to access within the simulation function
  const runRef = useRef(run);
  runRef.current = run;

  // Run the simulation. Memoïzed.
  const runSimulation = useCallback(() => {
    if (!runRef.current) {
      return; // Stop the simulation when the running state is false
    }

    setGrid(currGrid => {
      // Immer return a copy of the grid
      return produce(currGrid, copy => {
        for (let i = 0; i < ROWS; i++) {
          for (let j = 0; j < COLS; j++) {
            // 1 - Calculate the number of neighbors
            let neighbors = 0;

            neighborsRelativePositions.forEach(([x, y]) => {
              const neighborX = i + x; // X position of neighbor to test
              const neighborY = j + y; // Y position of neighbor to test

              // Test if the neighbor is within the grid limits, and increment the number of neighbors if its cell is alive
              if (
                neighborX >= 0 &&
                neighborX < ROWS &&
                neighborY >= 0 &&
                neighborY < COLS &&
                currGrid[neighborX][neighborY]
              ) {
                neighbors++;
              }
            });

            // 2 - Kill or revive the cell given the following rules :
            //    - Any live cell with two or three neighbors survives.
            //    - Any dead cell with three live neighbors becomes a live cell.
            //    - All other live cells die in the next generation. Similarly, all other dead cells stay dead.
            if (neighbors < 2 || neighbors > 3) {
              copy[i][j] = false;
            } else if (!currGrid[i][j] && neighbors === 3) {
              copy[i][j] = true;
            }
          }
        }
      });
    });

    // Recursively call the simulation to process the next phase.
    setTimeout(runSimulation, 100);
  }, [neighborsRelativePositions, COLS, ROWS]);

  return (
    <>
      <header>
        <a
          href="https://en.wikipedia.org/wiki/Conway%27s_Game_of_Life"
          title="Wikipedia page of Conway's game of life"
        >
          Conway's Game of Life
        </a>
        <button
          className="run-button"
          onClick={() => {
            // Toggle the running state, and run the simulation accordingly
            setRun(!run);
            if (!run) {
              runRef.current = true;
              runSimulation();
            }
          }}
        >
          {run ? "Stop" : "Start"} simulation
        </button>
        <button
          onClick={() => {
            // Regenerate an empty grid
            setGrid(emptyGrid());
          }}
        >
          Clear grid
        </button>
        <button
          onClick={() => {
            // Generate a grid randomly. Each cell has 70% chance to be a dead one to not instantly kill all cells by over-population
            let newGrid = [];
            for (let i = 0; i < ROWS; i++) {
              newGrid.push(
                Array.from(Array(COLS), () => (Math.random() > 0.7 ? 1 : 0))
              );
            }
            setGrid(newGrid);
          }}
        >
          Random
        </button>
      </header>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 20px)`
        }}
      >
        {grid.map((rows, i) =>
          rows.map((col, j) => (
            <div
              key={`${i}-${j}`}
              className="cell"
              style={{
                width: 20,
                height: 20,
                backgroundColor: grid[i][j] ? "black" : undefined,
                border: "solid 1px #aaa",
                boxSizing: "border-box",
                cursor: "pointer"
              }}
              onClick={() => {
                setGrid(
                  produce(grid, copy => {
                    copy[i][j] = !grid[i][j];
                  })
                );
              }}
            />
          ))
        )}
      </div>
    </>
  );
}

export default App;
