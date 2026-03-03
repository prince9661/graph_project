export function getShortestPath(endNode) {
  const path = [];

  // 🚨 if BFS never reached end
  if (!endNode || !endNode.previousNode) {
    return path;
  }

  let current = endNode;

  while (current) {
    path.unshift(current);
    current = current.previousNode;
  }

  return path;
}