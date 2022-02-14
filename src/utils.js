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

const isTouchDevice = () => {
	return (
		"ontouchstart" in window ||
		navigator.maxTouchPoints > 0 ||
		navigator.msMaxTouchPoints > 0
	);
};

const valuesAccordingScreen = (largeScreen, smallScreen) => {
	return window.innerWidth > 1020 ? largeScreen : smallScreen;
};

export { randomInRange, isTouchDevice, valuesAccordingScreen };
