import Player from "../Player";
import Enemy from "./Enemy";

class Bullet {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Gun} gun
	 * @param {Player} player
	 */
	constructor(ctx, gun, player) {
		this.ctx = ctx;
		this.gun = gun;
		this.player = player;
		this.position = {
			x: gun.position.x,
			y: gun.position.y,
		};
		this.length = 8;
		this.velocity = { x: 5, y: 20 };
		this.shot = false;
	}

	shotThePlayer() {
		if (
			this.position.x + this.length >= this.player.position.x &&
			this.position.x <= this.player.position.x + this.player.width &&
			this.position.y + this.length >= this.player.position.y
		) {
			console.log("Game over man");
			this.player.gameOver = true;
		}
	}

	draw() {
		this.ctx.fillStyle = "black";
		this.ctx.fillRect(
			this.position.x,
			this.position.y,
			this.length,
			this.length
		);
	}

	update() {
		this.position.y += this.velocity.y;
		const percY =
			((this.position.y - this.gun.position.y) * 100) /
			(this.player.ground.position.y - this.gun.position.y);

		const a = this.player.position.x;
		const b = this.gun.position.x;
		this.position.x = ((a - b) * percY) / 100 + b;
		this.draw();
		this.shotThePlayer();
	}
}

class Gun {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Enemy} enemy
	 * @param {Player} player
	 */
	constructor(ctx, enemy, player) {
		this.ctx = ctx;
		this.enemy = enemy;
		this.player = player;
		this.position = {
			x:
				enemy.position.x -
				(this.enemy.parallelSideB - this.enemy.parallelSideT) +
				this.enemy.width / 2,
			y: this.enemy.position.y + this.enemy.height - 1,
		};
	}

	static id = null;
	/**
	 * @type {Bullet[]}
	 */
	static bullets = [];

	shoot() {}

	revoke() {
		if (Gun.id) {
			window.clearInterval(Gun.id);
			Gun.id = null;
		}
		Gun.bullets = [];
	}

	draw() {
		this.ctx.beginPath();
		this.ctx.moveTo(
			this.enemy.position.x -
				(this.enemy.parallelSideB - this.enemy.parallelSideT) +
				this.enemy.width / 2,
			this.enemy.position.y + this.enemy.height - 1
		);

		this.ctx.lineTo(this.position.x, this.position.y);
		this.ctx.lineWidth = 10;
		this.ctx.stroke();
		this.ctx.closePath();

		Gun.bullets.forEach((bullet) => {
			bullet.update();
		});

		if (!Gun.id) {
			Gun.id = window.setInterval(() => {
				if (this.player.gameOver) {
					window.clearInterval(Gun.id);
				}
				Gun.bullets.push(new Bullet(this.ctx, this, this.player));
				console.log(Gun.bullets);
			}, 600);
		}
	}

	update() {
		let gunX = this.player.position.x + this.player.width;
		if (
			gunX <
			this.enemy.position.x -
				(this.enemy.parallelSideB - this.enemy.parallelSideT)
		) {
			gunX = this.enemy.position.x - 20;
		} else if (
			gunX >
			this.enemy.position.x +
				this.enemy.width -
				(this.enemy.parallelSideB - this.enemy.parallelSideT)
		) {
			gunX = this.enemy.position.x + this.enemy.parallelSideB - 20;
		}

		this.position = {
			x: gunX,
			y: this.enemy.position.y + this.enemy.height + 50,
		};

		this.draw();
	}
}

export default Gun;
