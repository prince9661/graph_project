import Node from "./Node";
import React from "react";
function Grid({ grid ,handleMouseDown,
  handleMouseEnter,
  handleMouseUp}) {
    // if (!grid.length) return null;
  return (
    <div
      className="grid"
      style={{
        gridTemplateColumns: `repeat(${grid[0]?.length || 0}, 20px)`

      }}
    >
      {grid.map((row, rowIndex) =>
        row.map((node, colIndex) => (
          <Node key={`${rowIndex}-${colIndex}`} node={node} 
          onMouseDown={() => handleMouseDown(rowIndex, colIndex)}
          onMouseEnter={() => handleMouseEnter(rowIndex, colIndex)}
          onMouseUp={handleMouseUp}
          />
        ))
      )}
    </div>
  );
}

export default React.memo(Grid);
// export default Grid;
