import Enemy from "./Enemy/Enemy";
import Player from "./Player";
import { valuesAccordingScreen } from "./utils";

class Eye {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Player | Enemy} container
	 */
	constructor(ctx, container) {
		this.ctx = ctx;
		this.container = container;
		this.radius = container.type === "Enemy" ? valuesAccordingScreen(10, 5) : 5;
		this.position = {
			x:
				container.type === "Enemy"
					? container.position.x -
					  (container.parallelSideB - container.parallelSideT) +
					  container.width / 2
					: container.velocity.x >= 0
					? container.position.x + container.width * 0.75
					: container.position.x + container.width * 0.25,
			y:
				container.type === "Enemy"
					? container.position.y + container.height * 0.7
					: container.position.y + container.height * 0.25,
		};
	}
	/**
	 * @private
	 */
	static counter = 0;

	draw() {
		Eye.counter += 0.001;
		this.ctx.fillStyle = "white";
		this.ctx.beginPath();
		this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 360);
		this.ctx.fill();
		this.ctx.closePath();

		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.container.type === "Enemy"
			? this.ctx.arc(
					this.position.x + Math.sin(Eye.counter) * 4.5,
					this.position.y + this.radius / 2,
					this.radius / 2,
					0,
					360
			  )
			: this.ctx.arc(
					this.position.x + (this.radius * 25) / 100,
					this.position.y - this.radius / 2,
					this.radius / 2,
					0,
					360
			  );
		this.ctx.fill();
		this.ctx.closePath();
	}
}

export default Eye;
