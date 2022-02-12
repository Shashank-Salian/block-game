import Enemy from "./src/Enemy/Enemy";
import Ground from "./src/Ground";
import Cloud from "./src/Platform/Cloud";
import Platform from "./src/Platform/Platform";
import Player from "./src/Player";
import { randomInRange } from "./src/utils";

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
const randomPlatformXs = [
	randomInRange(window.innerWidth * 0.5 - 40, window.innerWidth),
	randomInRange(window.innerWidth * 0.5 - 40, window.innerWidth),
	randomInRange(window.innerWidth * 0.5 - 40, window.innerWidth),
];
const platforms = [
	new Platform(ctx, ground, randomPlatformXs[0] - (randomPlatformXs[0] % 10)),
	new Platform(ctx, ground, randomPlatformXs[1] - (randomPlatformXs[1] % 10)),
	new Platform(ctx, ground, randomPlatformXs[2] - (randomPlatformXs[2] % 10)),
	new Platform(ctx, ground, randomPlatformXs[2] - (randomPlatformXs[2] % 10)),
];
const enemies = [
	new Enemy(ctx, player, window.innerWidth * 0.45),
	new Enemy(ctx, player, window.innerWidth * 0.7),
];

const cloud = new Cloud(ctx);

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

		let playerCollidingOnPlatforms = false;

		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

		cloud.draw();

		enemies.forEach((enemy) => {
			enemy.update();
		});

		console.log(platforms.length);
		platforms.forEach((platform, i) => {
			platform.update();

			if (
				keys.right.pressed &&
				player.position.x < (window.innerWidth * 50) / 100 // When it reaches 35% of screen stop player and move the background
			) {
				// player.velocity.x = 10;
				if (playerCanMoveX !== 0) {
					playerCanMoveX = 10;
					player.colliding = false;
					platform.playerColliding.x = false;
				}
			} else if (keys.left.pressed && player.position.x > 100) {
				// player.velocity.x = -10;
				if (playerCanMoveX !== 0) {
					player.colliding = false;
					platform.playerColliding.x = false;
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
						platform.playerColliding.x = true;
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
						platform.playerColliding.x = true;
					}
				}
			}

			// Platform collision detection Y axis
			if (
				player.position.y + player.height <= platform.position.y &&
				player.position.y + player.height + player.velocity.y >=
					platform.position.y &&
				player.position.x + player.width > platform.position.x &&
				player.position.x < platform.position.x + platform.width
			) {
				player.velocity.y = 0;
				platform.playerColliding.y = true;
			} else if (
				(player.position.x + player.width === platform.position.x &&
					player.position.y >= platform.position.y) ||
				(player.position.x === platform.position.x + platform.width &&
					player.position.y >= platform.position.y)
			) {
				player.colliding = true;
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
				platform.playerColliding.x = true;
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
				platform.playerColliding.x = true;
			}

			if (
				!playerCollidingOnPlatforms &&
				player.position.y + player.height < ground.position.y
			) {
				player.colliding = false;
			}
			let numberOfPlatforms = platforms.length;
			for (let j = i - 3; j < i + 3; j++) {
				if (i === j || j < 0 || j > numberOfPlatforms - 1) {
					continue;
				}
				if (
					(platforms[j].playerColliding.x && platform.playerColliding.y) ||
					(platforms[j].playerColliding.y && platform.playerColliding.x)
				) {
					playerCollidingOnPlatforms = true;
					player.colliding = true;
					break;
				}
			}
		});

		if (playerCanMoveX !== null) {
			player.velocity.x = playerCanMoveX;
		}
		if (platformCanMoveX !== null && platformCanMoveX !== 0) {
			enemies.forEach((enemy) => {
				enemy.position.x += platformCanMoveX;
			});

			platforms.forEach((platform) => {
				platform.position.x += platformCanMoveX;
			});
		}

		if (player.velocity.y !== 0) {
			player.colliding = false;
		}

		ground.update();
		player.update();

		if (platforms[0].position.x < -window.innerWidth * 1.5) {
			platforms.shift();
		}
		if (enemies[0].position.x < -window.innerWidth * 1.5) {
			enemies.shift();
		}

		if (
			keys.right.pressed &&
			platforms[platforms.length - 1].position.x < window.innerWidth * 0.5
		) {
			for (let i = 0; i < randomInRange(4, 6, true); i++)
				platforms.push(new Platform(ctx, ground));

			for (let i = 0; i < 2; i++) enemies.push(new Enemy(ctx, player));
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
			if (!player.preventJump) player.velocity.y = -15;
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
