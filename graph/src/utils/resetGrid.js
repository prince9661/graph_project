// src/utils/resetGrid.js

export const resetGridState = (grid) => {
  return grid.map(row =>
    row.map(node => ({
      ...node,
      isVisited: false,
      previousNode: null,
      isPath: false,
      distance: Infinity,
    }))
  );
};