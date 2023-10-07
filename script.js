function calculateMinCost() {
  const inputElement = document.getElementById('input');
  const resultElement = document.getElementById('result');

  // Get the input string and split it into an array of rope lengths
  const inputString = inputElement.value;
  const ropeLengths = inputString.split(',').map(Number);

  // Create a min heap (priority queue) to store the rope lengths
  const minHeap = new MinHeap();

  // Insert all the rope lengths into the min heap
  for (const length of ropeLengths) {
    minHeap.insert(length);
  }

  // Initialize the total cost to 0
  let totalCost = 0;

  // Combine ropes until there is only one rope left in the heap
  while (minHeap.size() > 1) {
    // Remove the two smallest ropes from the heap
    const min1 = minHeap.extractMin();
    const min2 = minHeap.extractMin();

    // Calculate the cost of combining these two ropes and add it to the total cost
    const cost = min1 + min2;
    totalCost += cost;

    // Insert the combined rope back into the heap
    minHeap.insert(cost);
  }

  // The remaining rope in the heap is the final connected rope
  const finalRope = minHeap.extractMin();

  // Add the final cost to the total cost
  totalCost += finalRope;

  // Display the minimum cost in the result element
  resultElement.textContent = `Minimum Cost: ${totalCost}`;
}

// MinHeap class for implementing the priority queue
class MinHeap {
  constructor() {
    this.heap = [];
  }

  insert(value) {
    this.heap.push(value);
    this.heapifyUp();
  }

  extractMin() {
    if (this.isEmpty()) {
      return null;
    }

    const min = this.heap[0];
    const last = this.heap.pop();

    if (!this.isEmpty()) {
      this.heap[0] = last;
      this.heapifyDown();
    }

    return min;
  }

  isEmpty() {
    return this.heap.length === 0;
  }

  size() {
    return this.heap.length;
  }

  heapifyUp() {
    let index = this.heap.length - 1;
    while (index > 0) {
      const parentIndex = Math.floor((index - 1) / 2);
      if (this.heap[index] < this.heap[parentIndex]) {
        // Swap the elements if the current element is smaller than its parent
        [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
        index = parentIndex;
      } else {
        break;
      }
    }
  }

  heapifyDown() {
    let index = 0;
    while (true) {
      const leftChildIndex = 2 * index + 1;
      const rightChildIndex = 2 * index + 2;
      let smallestIndex = index;

      if (leftChildIndex < this.heap.length && this.heap[leftChildIndex] < this.heap[smallestIndex]) {
        smallestIndex = leftChildIndex;
      }

      if (rightChildIndex < this.heap.length && this.heap[rightChildIndex] < this.heap[smallestIndex]) {
        smallestIndex = rightChildIndex;
      }

      if (smallestIndex !== index) {
        // Swap the elements if the current element is larger than the smallest child
        [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
        index = smallestIndex;
      } else {
        break;
      }
    }
  }
}