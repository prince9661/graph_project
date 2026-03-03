import Queue from "../structures/Queue";
import { getNeighbors } from "../utils/getNeighbors";

export function bfs(grid,startNode,endNode){
    const queue=new Queue();
    const visitedNode=[];
    startNode.Visited=true;
    queue.enqueue(startNode);
    while(!queue.isEmpty()){
        const currentNode=queue.dequeue();
        if(currentNode.isWall)continue;
        visitedNode.push(currentNode);
        if(currentNode === endNode)return visitedNode;
        const neighbors = getNeighbors(currentNode,grid);
        for (const neighbor of neighbors) {
            if (!neighbor.Visited && !neighbor.isWall) {
                neighbor.Visited = true;
                neighbor.previousNode = currentNode;
                queue.enqueue(neighbor);
            }
        }
    }
    return visitedNode;
}
