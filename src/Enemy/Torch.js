import Enemy from "./Enemy";

class Torch {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 * @param {Enemy} enemy
	 */
	constructor(ctx, enemy) {
		/**
		 * @readonly
		 */
		this.ctx = ctx;
		this.scatterLength = 200;
		this.position = {
			x:
				enemy.position.x -
				(enemy.parallelSideB - enemy.parallelSideT) -
				this.scatterLength,
			y: enemy.position.y + enemy.height,
		};
		this.enemy = enemy;
		this.height = window.innerHeight * 0.75;
		this.width = this.scatterLength * 2 + enemy.width;
	}

	draw() {
		const torchGradient = this.ctx.createLinearGradient(
			this.position.x + this.enemy.width / 2,
			this.position.y,
			this.position.x + this.enemy.width / 2,
			this.height
		);
		torchGradient.addColorStop(0, "#EAE22A");
		torchGradient.addColorStop(1, "#DFDFDF00");

		this.ctx.fillStyle = torchGradient;

		this.ctx.beginPath();
		this.ctx.moveTo(this.position.x, this.position.y + this.height);
		this.ctx.lineTo(
			this.position.x + this.width,
			this.position.y + this.height
		);
		this.ctx.lineTo(
			this.enemy.position.x + this.enemy.parallelSideB,
			this.position.y
		);
		this.ctx.lineTo(
			this.enemy.position.x -
				(this.enemy.parallelSideB - this.enemy.parallelSideT),
			this.position.y
		);
		this.ctx.fill();
		this.ctx.closePath();
	}

	update() {
		this.position = {
			x:
				this.enemy.position.x -
				(this.enemy.parallelSideB - this.enemy.parallelSideT) -
				this.scatterLength,
			y: this.enemy.position.y + this.enemy.height,
		};
		this.height = window.innerHeight * 0.75;
		this.width = this.scatterLength * 2 + this.enemy.width;
		this.draw();
	}
}

export default Torch;
