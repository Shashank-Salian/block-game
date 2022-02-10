class Ground {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	constructor(ctx) {
		this.ctx = ctx;
		this.width = window.innerWidth;
		this.height = (window.innerHeight * 20) / 100;
		this.position = {
			x: 0,
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
	}

	update() {
		this.width = window.innerWidth;
		this.height = (window.innerHeight * 20) / 100;
		this.position.y = window.innerHeight - this.height;

		this.draw();
	}
}

export default Ground;
