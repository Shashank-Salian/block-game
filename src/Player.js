import Eye from "./Eye";

class Player {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	constructor(ctx) {
		/**
		 * @readonly
		 * @type {"Player"}
		 */
		this.type = "Player";

		this.ctx = ctx;
		this.width = 50;
		this.height = 50;
		this.position = {
			x: 100,
			y: window.innerHeight - this.height,
		};
		this.velocity = {
			x: 0,
			y: 1,
		};
		this.gravity = 0.5;
		this.colliding = false;
	}

	draw() {
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(
			this.position.x,
			this.position.y,
			this.width,
			this.height
		);
		const eye = new Eye(this.ctx, this);
		if (!this.colliding) eye.draw();
	}

	/**
	 * @private
	 * @param {'r' | 'l'} edge
	 * @returns {boolean}
	 */
	reachedBorder(edge) {
		if (this.position.x <= 0 && edge === "l") return true;

		if (this.position.x + this.width >= window.innerWidth && edge === "r")
			return true;

		return false;
	}

	update() {
		if (this.position.y < window.innerHeight / 2 && this.velocity.y < 0)
			this.velocity.y = 30;

		if (this.position.y + this.height < window.innerHeight)
			this.colliding = false;

		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;
		this.draw();

		if (
			this.position.y + this.height + this.velocity.y <=
			this.ctx.canvas.height
		)
			this.velocity.y += this.gravity;
		else this.velocity.y = 0;
	}
}

export default Player;
