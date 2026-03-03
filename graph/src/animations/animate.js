// src/animations/animateBFS.js

export function animate(visitedNodes, pathNodes, setGrid) {

  for (let i = 0; i <= visitedNodes.length; i++) {

    if (i === visitedNodes.length) {
      setTimeout(() => {
        animatePath(pathNodes, setGrid);
      }, 10 * i);
      
      return;
    }

    setTimeout(() => {
      const node = visitedNodes[i];

      setGrid(prevGrid => {
        // Method 1 here time complecties is more.............
        // const newGrid = prevGrid.map(row =>
        //   row.map(cell =>
        //     cell.row === node.row && cell.col === node.col
        //       ? { ...cell, isVisited: true }
        //       : cell
        //   )
        // );

        // Method 2 here time complecties is less because i doesn't copy i dont copy all row and all col........
        const newGrid=[...prevGrid];
        const newRow=[...newGrid[node.row]];
        newRow[node.col]={
            ...newRow[node.col],
            isVisited:true,
        }
        newGrid[node.row]=newRow;
        // next thing is same 
        return newGrid;
      });

    }, 10 * i);
  }
}

function animatePath(pathNodes, setGrid) {
  for (let i = 0; i < pathNodes.length; i++) {

    setTimeout(() => {
      const node = pathNodes[i];

      setGrid(prevGrid => {
        const newGrid = [...prevGrid];
        const newRow = [...newGrid[node.row]];

        newRow[node.col] = {
          ...newRow[node.col],
          isPath: true,
        };

        newGrid[node.row] = newRow;

        return newGrid;
      });

    }, 40 * i);
  }
}