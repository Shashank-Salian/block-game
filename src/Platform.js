import { randomInRange } from "./utils";

class Platform {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {number} x
	 */
	constructor(ctx, x = null) {
		this.ctx = ctx;
		this.width = 200;
		this.height = 75;
		/**
		 * @private
		 */
		this.initialX = x;
		const randomX = randomInRange(
			window.innerWidth / 2,
			window.innerWidth - this.width,
			true
		);
		this.position = {
			x: x === null ? randomX - (randomX % 10) : x,
			y: window.innerHeight - this.height,
		};
	}

	draw() {
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
		// console.log(this.position.x, this.position.y, this.width, this.height);
	}

	update() {
		this.position.y = window.innerHeight - this.height;
		this.draw();
	}
}

export default Platform;
