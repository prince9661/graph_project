export function recursiveDivisionMaze(grid, startPos, endPos) {
  const walls = [];

  function divide(rowStart, rowEnd, colStart, colEnd, orientation) {
    if (rowEnd - rowStart < 2 || colEnd - colStart < 2) return;

    const horizontal = orientation === "horizontal";

    if (horizontal) {
      const row = Math.floor(
        randomNumber(rowStart + 1, rowEnd - 1) / 2
      ) * 2;

      const gap = Math.floor(
        randomNumber(colStart, colEnd) / 2
      ) * 2 + 1;

      for (let col = colStart; col <= colEnd; col++) {
        if (col === gap || col===gap*2) continue;


        const node = grid[row][col];

        if (
          (node.row === startPos.row && node.col === startPos.col) ||
          (node.row === endPos.row && node.col === endPos.col)
        )
          continue;

        walls.push(node);
      }

      divide(rowStart, row - 1, colStart, colEnd, "vertical");
      divide(row + 1, rowEnd, colStart, colEnd, "vertical");

    } else {
      const col = Math.floor(
        randomNumber(colStart + 1, colEnd - 1) / 2
      ) * 2;

      const gap = Math.floor(
        randomNumber(rowStart, rowEnd) / 2
      ) * 2 + 1;

      for (let row = rowStart; row <= rowEnd; row++) {
        if (row === gap|| row===gap*2) continue;

        const node = grid[row][col];

        if (
          (node.row === startPos.row && node.col === startPos.col) ||
          (node.row === endPos.row && node.col === endPos.col)
        )
          continue;

        walls.push(node);
      }

      divide(rowStart, rowEnd, colStart, col - 1, "horizontal");
      divide(rowStart, rowEnd, col + 1, colEnd, "horizontal");
    }
  }

  divide(0, grid.length - 1, 0, grid[0].length - 1, "horizontal");

  return walls;
}

function randomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}