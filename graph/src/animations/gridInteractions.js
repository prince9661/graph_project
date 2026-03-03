// hooks/useGridInteractions.js

export function gridInteractions({
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
}) {

  const updateStartEnd = (row, col, type) => {
    setGrid(prevGrid => {
      const newGrid = [...prevGrid];

      if (type === "start") {
        const oldRow = [...newGrid[startPos.row]];
        oldRow[startPos.col] = {
          ...oldRow[startPos.col],
          isStart: false
        };
        newGrid[startPos.row] = oldRow;

        const newRow = [...newGrid[row]];
        newRow[col] = {
          ...newRow[col],
          isStart: true,
          isWall: false
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
          isWall: false
        };
        newGrid[row] = newRow;

        setEndPos({ row, col });
      }

      return newGrid;
    });
  };

  const toggleWall = (row, col) => {
    setGrid(prev => {
      const newGrid = [...prev];
      const newRow = [...newGrid[row]];

      const node = newRow[col];
      if (node.isStart || node.isEnd) return prev;

      newRow[col] = {
        ...node,
        isWall: !node.isWall,
        weight: 1
      };

      newGrid[row] = newRow;
      return newGrid;
    });
  };

  const applyWeight = (row, col, erase) => {
    setGrid(prev => {
      const newGrid = [...prev];
      const newRow = [...newGrid[row]];

      if (!newRow[col].isStart && !newRow[col].isEnd) {
        newRow[col] = {
          ...newRow[col],
          weight: erase ? 1 : weightValue,
          isWall: false
        };
      }

      newGrid[row] = newRow;
      return newGrid;
    });
  };

  const handleMouseDown = (row, col) => {
    if (mode === "start") {
      updateStartEnd(row, col, "start");
      return;
    }

    if (mode === "end") {
      updateStartEnd(row, col, "end");
      
      return;
    }

    if (mode === "weight") {
      const node = grid[row][col];
      const erase = node.weight > 1;

      setIsErasingWeight(erase);
      setIsMousePressed(true);

      applyWeight(row, col, erase);
      return;
    }

    if (mode === "wall") {
      setIsMousePressed(true);
      toggleWall(row, col);
      return;
    }
  };

  const handleMouseEnter = (row, col) => {
    if (!isMousePressed) return; 
    if (mode === "wall") {
      toggleWall(row, col);
      return;
    }
    if (mode === "weight") {
      applyWeight(row, col, isErasingWeight);
      return;
    }
  };

  const handleMouseUp = () => {
    setIsMousePressed(false);
  };

  return {
    handleMouseDown,
    handleMouseEnter,
    handleMouseUp
  };
}