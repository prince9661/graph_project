import MinHeap from "../structures/MinHeap";
import { getNeighbors } from "../utils/getNeighbors";

export function astar(grid, startNode, endNode) {

  const pq = new MinHeap((a, b) => a.fScore - b.fScore);
  const visitedNodes = [];

  startNode.distance = 0;
  startNode.fScore = heuristic(startNode, endNode);

  pq.insert(startNode);

  while (!pq.isEmpty()) {

    const current = pq.extractMin();

    if (current.isWall || current.Visited) continue;

    current.Visited = true;
    visitedNodes.push(current);

    if (current === endNode) return visitedNodes;

    const neighbors = getNeighbors(current, grid);

    for (const neighbor of neighbors) {

      if (neighbor.Visited || neighbor.isWall) continue;

      const gScore = current.distance + neighbor.weight;

      if (gScore < neighbor.distance) {

        neighbor.distance = gScore;

        const hScore = heuristic(neighbor, endNode);

        neighbor.fScore = gScore + hScore;

        neighbor.previousNode = current;

        pq.insert(neighbor);
      }
    }
  }

  return visitedNodes;
}

function heuristic(node, endNode) {
  return Math.abs(node.row - endNode.row) + Math.abs(node.col - endNode.col);
}