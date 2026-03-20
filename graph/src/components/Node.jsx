import React from 'react'

function Node({node , onMouseDown, onMouseEnter, onMouseUp}) {
    let bgColor = "bg-white";
    if(node.isStart){
        bgColor="bg-red-500"
    }
    else if(node.isEnd){
        bgColor="bg-green-500"
    }
    else if (node.isPath) bgColor = "bg-yellow-400";
    else if (node.isWall) bgColor = "bg-black";
    else if (node.weight > 1) bgColor = "bg-purple-400";
    else if (node.isVisited) bgColor = "bg-blue-400";

  return (
    <div 
    onMouseDown={onMouseDown}
    onMouseEnter={onMouseEnter}
    onMouseUp={onMouseUp}
    className={`w-5 h-5 border border-gray-400 ${bgColor} flex items-center justify-center`}>
      {node.weight > 1 && (
        <span className="text-xs text-white ">
          {node.weight}
        </span>
      )}
    </div>
  )
}

export default React.memo(Node);
// export default Node;