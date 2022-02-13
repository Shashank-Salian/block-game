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
		this.preventJump = false;

		this.travelled = 0;

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
		if (this.position.y < window.innerHeight * 0.2 && this.velocity.y < 0) {
			this.velocity.y = 30;
			this.preventJump = true;
		}

		if (this.velocity.y === 0) {
			this.preventJump = false;
		}

		this.position.y += this.velocity.y;
		this.position.x += this.velocity.x;
		this.travelled += this.velocity.x;

		if (
			this.position.y + this.height + this.velocity.y <=
			this.ground.position.y
		)
			this.velocity.y += this.gravity;
		else {
			this.velocity.y = 0;
		}
		this.draw();
	}
}

export default Player;
