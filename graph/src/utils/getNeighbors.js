

export function getNeighbors(node, grid) {
  const neighbors = [];
  const { row, col } = node;

  // UP
  if (row > 0) neighbors.push(grid[row - 1][col]);

  // DOWN
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);

  // LEFT
  if (col > 0) neighbors.push(grid[row][col - 1]);

  // RIGHT
  if (col < grid[0].length - 1) neighbors.push(grid[row][col + 1]);

  return neighbors;
}