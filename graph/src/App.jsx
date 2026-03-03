
import { useEffect, useState } from 'react';
import './App.css'
import Grid from './components/Grid';

import { bfs } from "./algorithms/bfs";
import { getShortestPath } from "./algorithms/getShortestPath";
import { animate } from './animations/animate';
import { dfs } from './algorithms/dfs';
import { dijkastra } from './algorithms/dijkastra';
import { gridInteractions } from './animations/gridInteractions';

const ROWS =35;
const COLS= 70;


function App() {
  const [grid,setGrid]=useState([])
  const [isMousePressed, setIsMousePressed] = useState(false);
  // ............
  const [mode, setMode] = useState(null); 
  const [weightValue, setWeightValue] = useState(5);
  const [isErasingWeight, setIsErasingWeight] = useState(false);

  // "start" | "end" | "weight" | null 

  const [startPos, setStartPos] = useState({ row: 10, col: 5 });
  const [endPos, setEndPos] = useState({ row: 30, col: 65 });
  useEffect(()=>{
    setGrid(createGrid());
  },[])

  const increaseWeight = () => {
    setWeightValue(prev => prev + 1);
  };

  const decreaseWeight = () => {
    setWeightValue(prev => (prev > 1 ? prev - 1 : 1));
  };
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

  const {
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp
  } = gridInteractions({
    grid,
    setGrid,
    startPos,
    endPos,
    setStartPos,
    setEndPos,
    weightValue,
    mode,
    isMousePressed,
    setIsMousePressed,
    isErasingWeight,
    setIsErasingWeight
  });

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
          distance: Infinity,
          weight :1,
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
  const runDijkastra =()=>{
    resetNodes(grid);
    const start=grid[startPos.row][startPos.col];
    const end=grid[endPos.row][endPos.col];
    const visited=dijkastra(grid,start,end);
    if(!end.previousNode){
      console.log("no path found");

    }
    const path=getShortestPath(end);
    animate(visited,path,setGrid);
  }


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
      <button onClick={ runDijkastra} className='bg-red-400 rounded-md px-4 py-2'>
        Run Dijkastra
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
      {/* Weight Controls */}
      <div className="flex items-center gap-2">
        <button 
          onClick={() => setMode("wall")}
          className={`px-4 py-2 rounded ${
            mode === "wall" ? "bg-black text-white" : "bg-gray-400"
          }`}
        >
          Wall
        </button>

        <button 
          onClick={decreaseWeight}
          className="bg-gray-500 px-3 py-2 rounded"
        >
          -
        </button>

        <span className="font-bold text-lg w-6 text-center">
          {weightValue}
        </span>

        <button 
          onClick={increaseWeight}
          className="bg-gray-500 px-3 py-2 rounded"
        >
          +
        </button>

        <button 
          onClick={() => setMode("weight")}
          className="bg-purple-500 px-4 py-2 rounded"
        >
          Add Weight
        </button>

      </div>
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
