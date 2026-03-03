class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.bubbleUp();
  }

  extractMin() {
    if (this.isEmpty()) return null;
    if (this.heap.length === 1) return this.heap.pop();
    let min=this.heap[0];
    this.heap[0] = this.heap.pop();
    this.bubbleDown();
    return min;
  }

  bubbleUp() {
    let index=this.heap.length -1;
    while(index>0){
        let parentindex=Math.floor((index-1)/2)
        if(this.heap[index].distance>=this.heap[parentindex].distance)break;
        let temp=this.heap[index];
        this.heap[index]=this.heap[parentindex];
        this.heap[parentindex]=temp;
        index=parentindex;
    }
  }

  bubbleDown() {
    let index=0;
    const size=this.heap.length;
    while(true){
        let left=index*2 +1;
        let right=index*2 +2;
        let smallest=index;
        if(left<size&& this.heap[left].distance<this.heap[smallest].distance){
            smallest=left;
        }
        if(right<size && this.heap[right].distance<this.heap[smallest].distance){
            smallest=right;
        }
        if(smallest===index)break;
        let temp=this.heap[index];
        this.heap[index]=this.heap[smallest];
        this.heap[smallest]=temp;
        index=smallest;
    }
  }

  isEmpty() {
    return this.heap.length ===0;
  }

  size() {
    return this.heap.length;
  }
}

export default MinHeap;
