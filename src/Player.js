import Eye from "./Eye";
import Ground from "./Ground";

class Player {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Ground} ground
	 */
	constructor(ctx, ground) {
		/**
		 * @readonly
		 * @type {"Player"}
		 */
		this.type = "Player";

		this.ground = ground;
		this.ctx = ctx;
		this.width = 50;
		this.height = 50;
		this.position = {
			x: 100,
			y: ground.position.y - this.height,
		};
		this.velocity = {
			x: 0,
			y: 1,
		};
		this.gravity = 0.5;
		this.colliding = false;

		this.gameOver = false;
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

	update() {
		if (
			this.position.y < (window.innerHeight * 40) / 100 &&
			this.velocity.y < 0
		)
			this.velocity.y = 30;

		if (this.position.y + this.height < this.ground.position.y)
			this.colliding = false;

		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;
		this.draw();

		if (
			this.position.y + this.height + this.velocity.y <=
			this.ground.position.y
		)
			this.velocity.y += this.gravity;
		else this.velocity.y = 0;
	}
}

export default Player;
