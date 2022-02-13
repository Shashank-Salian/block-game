import { randomInRange } from "../utils";
import Platform from "./Platform";

class Cloud {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Platform} platform
	 */
	constructor(ctx, platform) {
		this.ctx = ctx;
		this.platform = platform;
		this.difference = randomInRange(window.innerWidth * 0.2, window.innerWidth);
		this.position = {
			x: platform.position.x + this.difference,
			y: randomInRange(window.innerHeight * 0.1, window.innerHeight * 0.2),
		};
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(
			this.position.x,
			this.position.y,
			30,
			Math.PI * 0.5,
			Math.PI * 1.5
		);
		this.ctx.arc(
			this.position.x + 40,
			this.position.y - 30,
			40,
			Math.PI * 1,
			Math.PI * 1.8
		);
		this.ctx.arc(
			this.position.x + 85,
			this.position.y - 26,
			30,
			Math.PI * 1.37,
			Math.PI * 1.91
		);
		this.ctx.arc(
			this.position.x + 120,
			this.position.y + 5,
			40,
			Math.PI * 1.5,
			Math.PI * 0.2
		);
		this.ctx.moveTo(this.position.x, this.position.y);
		this.ctx.lineTo(this.position.x, this.position.y + 60);
		this.ctx.fillStyle = "#000000bb";
		this.ctx.fill();
		this.ctx.closePath();
	}

	update() {
		this.position.x = this.platform.position.x + this.difference;
		this.draw();
	}
}

export default Cloud;
