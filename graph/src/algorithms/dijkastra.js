import MinHeap from "../structures/MinHeap";
import { getNeighbors } from "../utils/getNeighbors";

export function dijkastra(grid,startNode,endNode){
    const pq=new MinHeap();
    pq.insert(startNode)
    startNode.distance=0;
    startNode.Visited=true;
    const visitedNode=[];
    while(!pq.isEmpty()){
        const currentNode=pq.extractMin();
        if(currentNode.isWall ||currentNode.Visited)continue;
        currentNode.Visited=true;
        visitedNode.push(currentNode);
        if(currentNode===endNode)return visitedNode;
        const neighbors=getNeighbors(currentNode,grid);
        for(const neighbor of neighbors){
            if (neighbor.visited || neighbor.isWall) continue;
            const newDist = currentNode.distance + neighbor.weight;
            neighbor.distance=newDist;
            neighbor.previousNode=currentNode;
            pq.insert(neighbor);
        }
    }
    return visitedNode;
}