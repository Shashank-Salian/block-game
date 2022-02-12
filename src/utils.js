/**
 *
 * @param {number} min
 * @param {number} max
 * @param {boolean} int
 * @returns {number}
 */
const randomInRange = (min = 0, max = 1, int = false) => {
	if (int) {
		return Math.floor(Math.random() * (max - min) + min);
	}
	return Math.random() * (max - min) + min;
};

class Queue {
	/**
	 *
	 * @param {any[]} data
	 */
	constructor(data = []) {
		this.data = data;
		this.front = this.rear = -1;
	}

	push(ele) {
		if (this.front === (this.rear + 1) / this.max) {
		}
	}
}

export { randomInRange };
