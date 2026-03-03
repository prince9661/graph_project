class Queue{
        constructor(){
        this.items={}
        this.front=0
        this.rear=0;
    }
    enqueue(value) {
        this.items[this.rear]=value
        this.rear++
    }

    dequeue() {
        if(this.isEmpty())return null;
        const value=this.items[this.front]
        delete this.items[this.front];
        this.front++;
        return value;
    }

    peek() {
        if(this.isEmpty())return null;
        return this.items[this.front]

    }

    isEmpty() {
        return this.rear==this.front
    }

    size() {
        return this.rear-this.front;
    }
    

}
export default Queue;