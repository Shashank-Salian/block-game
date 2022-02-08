import Eye from "./Eye";

class Enemy {
	/**
	 *
	 * @param {CanvasRenderingContext2D} ctx
	 */
	constructor(ctx) {
		/**
		 * @readonly
		 * @type {"Enemy"}
		 */
		this.type = "Enemy";
		this.ctx = ctx;
		this.position = {
			x: 400,
			y: 100,
		};

		/**
		 * @private
		 */
		this.parallelSideX = 75;
		/**
		 * @private
		 */
		this.parallelSideY = 35;
		/**
		 * @private
		 */
		this.nonParallelSide = 25;

		this.width = this.nonParallelSide * 2 + this.parallelSideX;
		this.height = this.nonParallelSide * 2 + this.parallelSideY;
	}

	draw() {
		this.ctx.fillStyle = "black";
		this.ctx.beginPath();
		this.ctx.moveTo(this.position.x, this.position.y);
		/**
		 * This will draw
		 *
		 * 		--------
		 *
		 */
		this.ctx.lineTo(this.position.x + this.parallelSideX, this.position.y);
		/**
		 * This will draw
		 *
		 * 		--------
		 * 				 \
		 *
		 */
		this.ctx.lineTo(
			this.position.x + this.parallelSideX + this.nonParallelSide,
			this.position.y + this.nonParallelSide
		);
		/**
		 * This will draw
		 *
		 * 		--------
		 * 				 \
		 * 				  |
		 *
		 */
		this.ctx.lineTo(
			this.position.x + this.parallelSideX + this.nonParallelSide,
			this.position.y + this.nonParallelSide + this.parallelSideY
		);
		/**
		 * This will draw
		 *
		 * 		--------
		 * 				 \
		 * 				  |
		 * 				 /
		 *
		 */
		this.ctx.lineTo(
			this.position.x + this.parallelSideX,
			this.position.y +
				this.nonParallelSide +
				this.parallelSideY +
				this.nonParallelSide
		);
		/**
		 * This will draw
		 *
		 * 		--------
		 * 				 \
		 * 				  |
		 * 				 /
		 * 		--------
		 *
		 */
		this.ctx.lineTo(
			this.position.x,
			this.position.y +
				this.nonParallelSide +
				this.parallelSideY +
				this.nonParallelSide
		);
		/**
		 * This will draw
		 *
		 * 		--------
		 * 				 \
		 * 				  |
		 * 	   \		 /
		 * 		--------
		 *
		 */
		this.ctx.lineTo(
			this.position.x - this.nonParallelSide,
			this.position.y + this.nonParallelSide + this.parallelSideY
		);
		/**
		 * This will draw
		 *
		 * 		--------
		 * 				 \
		 * 	  |		      |
		 * 	   \		 /
		 * 		--------
		 *
		 */
		this.ctx.lineTo(
			this.position.x - this.nonParallelSide,
			this.position.y + this.nonParallelSide
		);
		/**
		 * This will draw
		 *
		 * 		--------
		 * 	  /			 \
		 * 	  |		      |
		 * 	   \		 /
		 * 		--------
		 *
		 */
		this.ctx.fill();
		this.ctx.closePath();

		const eye = new Eye(this.ctx, this);
		eye.draw();
	}

	update() {
		this.draw();
	}
}

export default Enemy;
