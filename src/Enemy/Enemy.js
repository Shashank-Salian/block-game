import Eye from "../Eye";
import Player from "../Player";
import { randomInRange } from "../utils";
import Gun from "./Gun";
import Torch from "./Torch";

class Enemy {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Player} player
	 * @param {number} x
	 */
	constructor(ctx, player, x) {
		/**
		 * @readonly
		 * @type {"Enemy"}
		 */
		this.type = "Enemy";
		this.ctx = ctx;
		this.player = player;
		/**
		 * @private
		 */
		this.distanceTravelled = 0;
		/**
		 * @private
		 */
		this.prevVelocity = 1;

		this.parallelSideT = window.innerWidth * 0.04;
		this.parallelSideB = window.innerWidth * 0.06;
		this.diagonalSide = window.innerWidth * 0.035;

		this.width = this.parallelSideB + (this.parallelSideB - this.parallelSideT);
		this.height = this.diagonalSide;
		this.position = {
			x: x || randomInRange(window.innerWidth, window.innerWidth * 2),
			y: randomInRange(
				window.innerHeight * 0.1 - this.height,
				window.innerHeight * 0.2 - this.height
			),
		};
		this.velocity = randomInRange(1, 3);
		this.distance = randomInRange(
			window.innerWidth * 0.5,
			window.innerWidth * 1.5,
			true
		);
		this.torch = new Torch(this.ctx, this);
		this.gun = new Gun(ctx, this, player);

		this.playerFound = false;
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
		this.velocity = 0;
	}

	findPlayer() {
		if (
			this.player.position.x >= this.torch.position.x &&
			this.player.position.x <= this.torch.position.x + this.torch.width &&
			!this.player.colliding
		) {
			this.playerFound = true;
			this.shoot();
		} else if (this.playerFound) {
			this.playerFound = false;
			this.velocity = this.prevVelocity;
			this.gun.revoke();
		}
	}

	update() {
		this.position.x += this.velocity;
		this.distanceTravelled += this.velocity;
		if (
			this.distanceTravelled > this.distance ||
			this.distanceTravelled < -this.distance
		) {
			this.velocity = -this.velocity;
			this.prevVelocity = this.velocity;
		}
		this.draw();
	}
}

export default Enemy;
