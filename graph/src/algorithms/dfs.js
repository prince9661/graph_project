import Stack from "../structures/Stack";
import { getNeighbors } from "../utils/getNeighbors";

export function dfs(grid,startNode,endNode){
    const stack= new Stack();
    const visitedNode=[];
    startNode.Visited = true;
    stack.push(startNode);
    while(!stack.isEmpty()){
        const currentNode=stack.peek();
        stack.pop();
        if(currentNode.isWall)continue;
        visitedNode.push(currentNode);
        if(currentNode === endNode)return visitedNode;
        const neighbors=getNeighbors(currentNode,grid);
        for(const neighbor of neighbors){
            if(!neighbor.Visited && !neighbor.isWall){
                neighbor.Visited=true;
                neighbor.previousNode=currentNode;
                stack.push(neighbor);
            }
        }
    }
    return visitedNode;
}