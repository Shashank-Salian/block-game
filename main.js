import Enemy from "./src/Enemy/Enemy";
import Ground from "./src/Ground";
import Platform from "./src/Platform";
import Player from "./src/Player";
import Torch from "./src/Enemy/Torch";

import "./style.css";

const canvas = document.getElementById("canvas");

/**@type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", () => {
	canvas.width = window.innerWidth;
	canvas.height = window.innerHeight;

	init();
});

const keys = {
	right: {
		pressed: false,
	},
	left: {
		pressed: false,
	},
};

const ground = new Ground(ctx);
const player = new Player(ctx, ground);
const platforms = [
	new Platform(ctx, ground, 800),
	new Platform(ctx, ground, 1300),
	new Platform(ctx, ground, 1900),
];
const enemy = new Enemy(ctx, player);

const init = () => {
	player.position.y = ground.position.y - player.height;
};

const animate = () => {
	if (!player.gameOver) {
		requestAnimationFrame(animate);

		/**
		 * @type {10 | -10 | 0 | null}
		 */
		let platformCanMoveX = null;
		/**
		 * @type {10 | -10 | 0 | null}
		 */
		let playerCanMoveX = null;

		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		ground.update();
		player.update();
		enemy.update();

		platforms.forEach((platform, i) => {
			platform.update();

			if (
				keys.right.pressed &&
				player.position.x < (window.innerWidth * 35) / 100 // When it reaches 35% of screen stop player and move the background
			) {
				// player.velocity.x = 10;
				if (playerCanMoveX !== 0) {
					playerCanMoveX = 10;
					player.colliding = false;
				}
			} else if (keys.left.pressed && player.position.x > 100) {
				// player.velocity.x = -10;
				if (playerCanMoveX !== 0) {
					player.colliding = false;
					playerCanMoveX = -10;
				}
			} else {
				// player.velocity.x = 0;
				playerCanMoveX = 0;

				if (keys.right.pressed) {
					if (
						!(
							player.position.x + player.width === platform.position.x &&
							player.position.y + player.height >= platform.position.y
						)
					) {
						// platform.position.x -= 10;
						if (platformCanMoveX !== 0) platformCanMoveX = -10;
					} else {
						platformCanMoveX = 0;
						player.colliding = true;
					}
				} else if (keys.left.pressed) {
					if (
						!(
							player.position.x <= platform.position.x + platform.width &&
							player.position.x >= platform.position.x &&
							player.position.y + player.height >= platform.position.y
						)
					) {
						// platform.position.x += 10;
						if (platformCanMoveX !== 0) platformCanMoveX = 10;
					} else {
						platformCanMoveX = 0;
						player.colliding = true;
					}
				}
			}

			// Platform collision detection Y axis
			if (
				player.position.y + player.height <= platform.position.y &&
				player.position.y + player.height + player.velocity.y >=
					platform.position.y &&
				player.position.x + player.width >= platform.position.x &&
				player.position.x <= platform.position.x + platform.width
			) {
				player.velocity.y = 0;
			}

			// Platform collision detection X axis on left side
			if (
				player.position.x + player.width === platform.position.x &&
				keys.right.pressed &&
				player.position.y + player.height >= platform.position.y
			) {
				// player.velocity.x = 0;
				playerCanMoveX = 0;
				player.colliding = true;
			}

			// Platform collision detection X axis on right side
			if (
				player.position.x <= platform.position.x + platform.width &&
				player.position.x >= platform.position.x &&
				player.position.y + player.height >= platform.position.y &&
				keys.left.pressed
			) {
				// player.velocity.x = 0;
				playerCanMoveX = 0;
				player.colliding = true;
			}
		});

		if (playerCanMoveX !== null) {
			player.velocity.x = playerCanMoveX;
		}
		for (let platform of platforms) {
			if (platformCanMoveX !== null) {
				platform.position.x += platformCanMoveX;
			} else {
				break;
			}
		}
	}
};

init();
animate();

window.addEventListener("keydown", ({ key }) => {
	key = key.toLowerCase();
	switch (key) {
		case "a":
			keys.left.pressed = true;
			break;
		case "d":
			keys.right.pressed = true;
			break;
		case "w":
			player.velocity.y = -15;
			break;
		case "s":
			break;
	}
});

window.addEventListener("keyup", ({ key }) => {
	key = key.toLowerCase();

	switch (key) {
		case "a":
			keys.left.pressed = false;
		case "d":
			keys.right.pressed = false;
			break;
	}
});
