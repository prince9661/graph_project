
import { useEffect, useState } from 'react';
import './App.css'
import Grid from './components/Grid';

import { bfs } from "./algorithms/bfs";
import { getShortestPath } from "./algorithms/getShortestPath";
import { animate } from './animations/animate';
import { dfs } from './algorithms/dfs';

const ROWS =35;
const COLS= 70;


function App() {
  const [grid,setGrid]=useState([])
  const [isMousePressed, setIsMousePressed] = useState(false);
  // ............
  const [mode, setMode] = useState(null); 
  // "start" | "end" | null

  const [startPos, setStartPos] = useState({ row: 10, col: 5 });
  const [endPos, setEndPos] = useState({ row: 30, col: 65 });
  useEffect(()=>{
    setGrid(createGrid());
  },[])


  function createNode(row, col) {
    return {
      row,
      col,
      isStart: row === startPos.row && col === startPos.col,
      isEnd: row === endPos.row && col === endPos.col,
      isWall: false,
      Visited: false,
      isVisited: false,
      isPath: false,
      previousNode: null,
      distance: Infinity,
      weight: 1,
    };
  }
  const createGrid = () => {
    const grid = [];

    for (let r = 0; r < ROWS; r++) {
      const row = [];
      for (let c = 0; c < COLS; c++) {
        row.push(createNode(r, c));
      }
      grid.push(row);
    }

    return grid;
  };


  // const updateStartEnd = (row, col, type) => {

  //   setGrid(prevGrid => {

  //     const newGrid = prevGrid.map(r => r.map(node => ({ ...node })));

  //     // remove old start/end
  //     for (let r of newGrid) {
  //       for (let node of r) {
  //         if (type === "start") node.isStart = false;
  //         if (type === "end") node.isEnd = false;
  //       }
  //     }

  //     // set new one
  //     if (type === "start") {
  //       newGrid[row][col].isStart = true;
  //       setStartPos({ row, col });
  //     } else {
  //       newGrid[row][col].isEnd = true;
  //       setEndPos({ row, col });
  //     }

  //     return newGrid;
  //   });
  // };
  const updateStartEnd = (row, col, type) => {

    setGrid(prevGrid => {

      const newGrid = [...prevGrid];

      if (type === "start") {

        // copy old start row
        const oldRow = [...newGrid[startPos.row]];
        oldRow[startPos.col] = {
          ...oldRow[startPos.col],
          isStart: false
        };
        newGrid[startPos.row] = oldRow;

        // copy new row
        const newRow = [...newGrid[row]];
        newRow[col] = {
          ...newRow[col],
          isStart: true,
          isWall:false
        };
        newGrid[row] = newRow;

        setStartPos({ row, col });

      } else {

        const oldRow = [...newGrid[endPos.row]];
        oldRow[endPos.col] = {
          ...oldRow[endPos.col],
          isEnd: false
        };
        newGrid[endPos.row] = oldRow;

        const newRow = [...newGrid[row]];
        newRow[col] = {
          ...newRow[col],
          isEnd: true,
          isWall:false
        };
        newGrid[row] = newRow;

        setEndPos({ row, col });
      }

      return newGrid;
    });
  };
  const toggleWall =(row ,col)=>{
    setGrid(prevGrid=>{
      const newgrid=prevGrid.map(r =>r.map(cell=>({...cell})))
      const node=newgrid[row][col];
      if(node.isStart || node.isEnd)return prevGrid;
      node.isWall=!node.isWall
      return newgrid

    })
  }
  const handleMouseDown = (row, col) => {
    if (mode === "start") {
      updateStartEnd(row, col, "start");
      setMode(null);
      return;
    }

    if (mode === "end") {
      updateStartEnd(row, col, "end");
      setMode(null);
      return;
    }
    setIsMousePressed(true);
    toggleWall(row, col);
  };

  const handleMouseEnter = (row, col) => {
    if (!isMousePressed) return;
    toggleWall(row, col);
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };
  const cleargrid = () => {
    setGrid(prevGrid =>
      prevGrid.map(row =>
        row.map(node => ({
          ...node,
          isWall: false,
          isVisited:false,
          Visited:false,
          isPath:false,
          previousNode:null,
          distance: Infinity
        }))
      )
    );
  };
  const resetGridState = () => {
    setGrid(prevGrid =>
      prevGrid.map(row =>
        row.map(node => ({
          ...node,
          Visited:false,
          isVisited: false,
          previousNode: null,
          isPath:false,          
          distance: Infinity,
          
        }))
      )
    );
  };
  const resetNodes = (grid) => {
    for (let row of grid) {
      for (let node of row) {
        node.Visited=false,
        node.isVisited = false;
        node.previousNode = null;
        node.isPath = false;
        node.distance = Infinity;
      }
    }
  };

   const runBFS = () => {

    resetNodes(grid)

    const start = grid[startPos.row][startPos.col];
    const end = grid[endPos.row][endPos.col];
    // console.log(grid);
    const visited = bfs(grid, start, end);
    // console.log(visited);
    if (!end.previousNode) {
      console.log("No path found");
      // return;
    }
    const path = getShortestPath(end);

    console.log("Visited:", visited.length);
    console.log("Path:", path.length);
    animate(visited, path, setGrid)
    

  };
  const runDFS = () => {

    resetNodes(grid)

    // console.log(grid);
    const start = grid[startPos.row][startPos.col];
    const end = grid[endPos.row][endPos.col];
    
    const visited = dfs(grid, start, end);
    // console.log(visited);
    if (!end.previousNode) {
      console.log("No path found");
      // return;
    }
    const path = getShortestPath(end);

    console.log("Visited:", visited.length);
    console.log("Path:", path.length);
    animate(visited, path, setGrid)
    

    
  };



  return (
    <>
    <div className='min-h-screen p-4'>

    <div className='p-2 flex items-center justify-center gap-2'>
      <button onClick={cleargrid} className='bg-red-400 rounded-md px-4 py-2'>clear grid</button>
      <button onClick={ runDFS} className='bg-red-400 rounded-md px-4 py-2'>
        Run DFS
      </button>
      <button onClick={ runBFS} className='bg-red-400 rounded-md px-4 py-2'>
        Run BFS
      </button>
      <button onClick={resetGridState} className='bg-red-400 rounded-md px-4 py-2'>
        Reset grid
      </button>
      <button 
        onClick={() => setMode("start")}
        className="bg-blue-500 px-4 py-2 rounded"
      >
        Select Start
      </button>

      <button 
        onClick={() => setMode("end")}
        className="bg-green-500 px-4 py-2 rounded"
      >
        Select End
      </button>
    </div>
      <div className=" bg-gray-100 flex items-center justify-center">
      <Grid grid={grid} 
      handleMouseDown={handleMouseDown}
      handleMouseEnter={handleMouseEnter}
      handleMouseUp={handleMouseUp}
      />
      
    </div>
    </div>
    </>
  )
}

export default App
