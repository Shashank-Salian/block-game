import { randomInRange } from "../utils";

class Cloud {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	constructor(ctx) {
		this.ctx = ctx;
		this.position = {
			x: randomInRange(window.innerWidth, window.innerWidth * 2),
			y: randomInRange(window.innerHeight * 0.1, window.innerHeight * 0.2),
		};
		this.width = randomInRange(10, 30);
		this.height = randomInRange(30, 60);
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.arc(
			this.position.x,
			this.position.y,
			60,
			Math.PI * 0.5,
			Math.PI * 1.5
		);
		this.ctx.arc(
			this.position.x + 70,
			this.position.y - 60,
			70,
			Math.PI * 1,
			Math.PI * 1.85
		);
		this.ctx.arc(
			this.position.x + 152,
			this.position.y - 45,
			50,
			Math.PI * 1.37,
			Math.PI * 1.91
		);
		this.ctx.arc(
			this.position.x + 200,
			this.position.y,
			60,
			Math.PI * 1.5,
			Math.PI * 0.5
		);
		this.ctx.moveTo(this.position.x + 200, this.position.y + 60);
		this.ctx.lineTo(this.position.x, this.position.y + 60);
		this.ctx.strokeStyle = "#797874";
		this.ctx.stroke();
		this.ctx.fillStyle = "#8ED6FF";
		this.ctx.fill();
		this.ctx.closePath();
	}
}

export default Cloud;
