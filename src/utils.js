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

export { randomInRange };
