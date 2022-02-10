import Eye from "../Eye";
import Player from "../Player";
import Gun from "./Gun";
import Torch from "./Torch";

class Enemy {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Player} player
	 * @param {number} x
	 */
	constructor(ctx, player, x = 500) {
		/**
		 * @readonly
		 * @type {"Enemy"}
		 */
		this.type = "Enemy";
		this.ctx = ctx;
		this.player = player;
		this.position = {
			x: x,
			y: 100,
		};

		this.parallelSideT = 75;
		this.parallelSideB = 130;
		this.diagonalSide = 75;

		this.width = this.parallelSideB + (this.parallelSideB - this.parallelSideT);
		this.height = this.diagonalSide;
		this.torch = new Torch(this.ctx, this);
		this.gun = new Gun(ctx, this, player);
	}

	draw() {
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.moveTo(this.position.x, this.position.y);

		this.ctx.lineTo(this.position.x + this.parallelSideT, this.position.y);
		this.ctx.lineTo(
			this.position.x + this.parallelSideB,
			this.position.y + this.diagonalSide
		);
		this.ctx.lineTo(
			this.position.x - (this.parallelSideB - this.parallelSideT),
			this.position.y + this.diagonalSide
		);

		this.ctx.fill();
		this.ctx.closePath();

		const eye = new Eye(this.ctx, this);
		eye.draw();

		this.torch.update();
		this.findPlayer();
	}

	shoot() {
		this.gun.update();
	}

	findPlayer() {
		if (
			this.player.position.x >= this.torch.position.x &&
			this.player.position.x <= this.torch.position.x + this.torch.width &&
			!this.player.colliding
		) {
			this.shoot();
		} else {
			this.gun.revoke();
		}
	}

	update() {
		this.draw();
	}
}

export default Enemy;
