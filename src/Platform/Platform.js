import Ground from "../Ground";
import { randomInRange } from "../utils";

class Platform {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Ground} ground
	 * @param {number} x
	 */
	constructor(ctx, ground, x = null) {
		this.ctx = ctx;
		const randomWidth = randomInRange(80, 600);
		this.width = randomWidth - (randomWidth % 10);
		this.height = randomInRange(75, 170);
		/**
		 * @private
		 */
		this.initialX = x;
		/**
		 * @private
		 */
		this.ground = ground;
		const randomX = randomInRange(
			window.innerWidth,
			window.innerWidth * 1.7,
			true
		);
		this.position = {
			x: x === null ? randomX - (randomX % 10) : x,
			y: ground.position.y - this.height,
		};

		this.playerColliding = {
			x: false,
			y: false,
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
