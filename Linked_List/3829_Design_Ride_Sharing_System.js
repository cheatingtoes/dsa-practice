// https://leetcode.com/problems/design-ride-sharing-system/description/
// TIME COMPLEXITY: O(1) for addRider, addDriver, matchDriverWithRider, and cancelRider since we are using a Map and array for constant time operations
// SPACE COMPLEXITY: O(n) where n is the number of riders in the system due to the Map storing rider information and the array storing driver IDs

var RideSharingSystem = function() {
    this.ridersMap = new Map();
    this.driverIds = [];
    this.headRider;
    this.tailRider;
};

/** 
 * @param {number} riderId
 * @return {void}
 */
RideSharingSystem.prototype.addRider = function(riderId) {
    // adds rider to a rider queue.  if rider exists in queue, we do nothing
    if (!this.ridersMap.has(riderId)) {
        // add current rider to this.ridersMap map and set this.tailRider to rider
        const newNode = { id: riderId, prev: this.tailRider, next: null };
        // set tail + head if doesn't exist
        if (!this.tailRider) {
            this.headRider = this.tailRider = newNode;
        } else {
            // else set current tail to newNode 
            this.tailRider.next = newNode;
            newNode.prev = this.tailRider;
            this.tailRider = newNode;
        }
        this.ridersMap.set(riderId, newNode);
    }
};

/** 
 * @param {number} driverId
 * @return {void}
 */
RideSharingSystem.prototype.addDriver = function(driverId) {
    // adds driver to a driver queue
    this.driverIds.unshift(driverId);
};

/**
 * @return {number[]}
 */
RideSharingSystem.prototype.matchDriverWithRider = function() {
    // matches driver with rider. returns [driverId, riderId] if possible, [-1, -1] if not.
    if (!this.headRider || this.driverIds.length === 0) return [-1, -1];

    const riderId = this.headRider.id;
    const driverId = this.driverIds.pop();

    this.cancelRider(riderId);
    return [driverId, riderId];
};

/** 
 * @param {number} riderId
 * @return {void}
 */
RideSharingSystem.prototype.cancelRider = function(riderId) {
    // removes rider from the queue.
    if (this.ridersMap.has(riderId)) {
        // need to check if head/tail
        const rider = this.ridersMap.get(riderId);
        if (rider.prev) rider.prev.next = rider.next;
        // if no prev exist, that means this is the head. set head to rider.next
        else this.headRider = rider.next;

        if (rider.next) rider.next.prev = rider.prev;
        // if no tail exists, set to rider.prev
        else this.tailRider = rider.prev;

        this.ridersMap.delete(riderId);
    }
};

/** 
 * Your RideSharingSystem object will be instantiated and called as such:
 * var obj = new RideSharingSystem()
 * obj.addRider(riderId)
 * obj.addDriver(driverId)
 * var param_3 = obj.matchDriverWithRider()
 * obj.cancelRider(riderId)
 */