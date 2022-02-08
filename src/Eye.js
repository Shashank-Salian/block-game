import Enemy from "./Enemy";
import Player from "./Player";

class Eye {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Player | Enemy} container
	 */
	constructor(ctx, container) {
		this.ctx = ctx;
		this.container = container;
		this.radius = container.type === "Enemy" ? 10 : 5;
		this.position = {
			x:
				container.type === "Enemy"
					? container.position.x + container.width / 2 - this.radius * 2
					: container.velocity.x >= 0
					? container.position.x + (container.width * 75) / 100
					: container.position.x + (container.width * 25) / 100,
			y:
				container.type === "Enemy"
					? container.height + (container.height * 98) / 100
					: container.position.y + (container.height * 25) / 100,
		};
		// this.constructor.counter = 0;
		// console.log(Eye.counter);
	}
	/**
	 * @private
	 */
	static counter = 0;

	draw() {
		Eye.counter += 0.01;
		this.ctx.fillStyle = "white";
		this.ctx.beginPath();
		this.ctx.arc(this.position.x, this.position.y, this.radius, 0, 360);
		this.ctx.fill();
		this.ctx.closePath();

		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.container.type === "Enemy"
			? this.ctx.arc(
					this.position.x + Math.cos(Eye.counter) * 4.5,
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
