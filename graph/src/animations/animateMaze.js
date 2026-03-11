export function animateMaze(walls, setGrid) {
  for (let i = 0; i < walls.length; i++) {
    setTimeout(() => {
      const node = walls[i];

      setGrid(prev => {
        const newGrid = [...prev];
        const newRow = [...newGrid[node.row]];

        newRow[node.col] = {
          ...newRow[node.col],
          isWall: true,
          weight: 1
        };

        newGrid[node.row] = newRow;
        return newGrid;
      });
    }, 10 * i);
  }
}