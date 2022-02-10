import Ground from "./Ground";
import { randomInRange } from "./utils";

class Platform {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Ground} ground
	 * @param {number} x
	 */
	constructor(ctx, ground, x = null) {
		this.ctx = ctx;
		this.width = 200;
		this.height = 75;
		/**
		 * @private
		 */
		this.initialX = x;
		/**
		 * @private
		 */
		this.ground = ground;
		const randomX = randomInRange(
			window.innerWidth / 2,
			window.innerWidth - this.width,
			true
		);
		this.position = {
			x: x === null ? randomX - (randomX % 10) : x,
			y: ground.position.y - this.height,
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
	}

	update() {
		this.position.y = this.ground.position.y - this.height + 0.5;
		this.draw();
	}
}

export default Platform;
