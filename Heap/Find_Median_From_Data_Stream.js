// https://leetcode.com/problems/find-median-from-data-stream

var MedianFinder = function() {
    // finding median means we can split into min and max halves to find the middle
    this.minHeap = new MinPriorityQueue();
    this.maxHeap = new MaxPriorityQueue();
};

/** 
 * @param {number} num
 * @return {void}
 */
MedianFinder.prototype.addNum = function(num) {
    // logic - where to place num? depends on which queue it belongs to
    // belongs in minHeap
    if (num > this.minHeap.front()) {
        this.minHeap.enqueue(num);
        // check if we need to rebalance
        while (this.minHeap.size() > this.maxHeap.size() + 1) {
            this.maxHeap.enqueue(this.minHeap.dequeue());
        }
    } else {
        this.maxHeap.enqueue(num);
        while (this.maxHeap.size() > this.minHeap.size() + 1) {
            this.minHeap.enqueue(this.maxHeap.dequeue())
        }
    }
};

/**
 * @return {number}
 */
MedianFinder.prototype.findMedian = function() {
    if (this.maxHeap.size() == this.minHeap.size()) {
        return (this.maxHeap.front() + this.minHeap.front()) / 2
    } else if (this.maxHeap.size() > this.minHeap.size()) {
        return this.maxHeap.front();
    } else {
        return this.minHeap.front();
    }
};

/** 
 * Your MedianFinder object will be instantiated and called as such:
 * var obj = new MedianFinder()
 * obj.addNum(num)
 * var param_2 = obj.findMedian()
 */