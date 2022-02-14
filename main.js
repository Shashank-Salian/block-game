import Enemy from "./src/Enemy/Enemy";
import Ground from "./src/Ground";
import Cloud from "./src/Platform/Cloud";
import Platform from "./src/Platform/Platform";
import Player from "./src/Player";
import {
	randomInRange,
	isTouchDevice,
	valuesAccordingScreen,
} from "./src/utils";

import "./assets/ArcadeFont.ttf";
import "./style.css";

const canvas = document.getElementById("canvas");

/**
 * @type {HTMLDivElement}
 */
const controls = document.querySelector(".btnContainer");
/**
 * @type {HTMLButtonElement}
 */
const leftBtn = document.querySelector(".leftBtn");
/**
 * @type {HTMLButtonElement}
 */
const rightBtn = document.querySelector(".rightBtn");
/**
 * @type {HTMLButtonElement}
 */
const upBtn = document.querySelector(".upBtn");

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

let distanceTravelled = 0;

/**
 * @type {Ground[]}
 */
let ground = new Ground(ctx);

/**
 * @type {Player[]}
 */
let player = new Player(ctx, ground);

let randomPlatformXs = [
	randomInRange(window.innerWidth * 0.5 - 40, window.innerWidth),
	randomInRange(window.innerWidth * 0.5 - 40, window.innerWidth),
	randomInRange(window.innerWidth * 0.5 - 40, window.innerWidth),
];

/**
 * @type {Platform[]}
 */
let platforms = [];
/**
 * @type {Enemy[]}
 */
let enemies = [];

/**
 * @type {Cloud[]}
 */
let clouds;

const init = () => {
	player.position.y = ground.position.y - player.height;
	if (!isTouchDevice()) {
		controls.classList.add("hide");
	}
};

const resetValues = () => {
	distanceTravelled = 0;

	ground = new Ground(ctx);
	player = new Player(ctx, ground);
	randomPlatformXs = [
		randomInRange(window.innerWidth * 0.5 - 40, window.innerWidth),
		randomInRange(window.innerWidth * 0.5 - 40, window.innerWidth),
		randomInRange(window.innerWidth * 0.5 - 40, window.innerWidth),
	];
	platforms = [
		new Platform(ctx, ground, randomPlatformXs[0] - (randomPlatformXs[0] % 10)),
		new Platform(ctx, ground, randomPlatformXs[1] - (randomPlatformXs[1] % 10)),
		new Platform(ctx, ground, randomPlatformXs[2] - (randomPlatformXs[2] % 10)),
		new Platform(ctx, ground, randomPlatformXs[2] - (randomPlatformXs[2] % 10)),
	];
	enemies = [
		new Enemy(ctx, player, window.innerWidth * 0.6),
		new Enemy(ctx, player, window.innerWidth),
	];

	/**
	 * @type {Cloud[]}
	 */
	clouds = [
		new Cloud(ctx, platforms[0]),
		new Cloud(ctx, platforms[1]),
		new Cloud(ctx, platforms[3]),
	];
};

const setScore = () => {
	let strScore = Math.floor(distanceTravelled / 1000).toString();
	let zeroCount = 4 - strScore.length;
	let score = "";
	if (zeroCount > 0) {
		for (let i = 0; i < zeroCount; i++) {
			score += "0";
		}
	}
	score += strScore;
	ctx.fillStyle = "black";
	ctx.textAlign = "left";
	ctx.font = "12px Arcade";
	ctx.fillText("score", window.innerWidth * 0.88, window.innerHeight * 0.25);
	ctx.font = "18px Arcade";
	ctx.fillText(
		score,
		window.innerWidth * 0.88 - 10,
		window.innerHeight * 0.25 + 25
	);
};

const animate = () => {
	requestAnimationFrame(animate);
	if (window.innerHeight > window.innerWidth) {
		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);
		ctx.font = "18px Arcade";
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.fillText(
			"Rotate your device",
			window.innerWidth * 0.5,
			window.innerHeight * 0.35
		);
		ctx.fillText(
			"to landscape",
			window.innerWidth * 0.5,
			window.innerHeight * 0.4
		);
		return;
	}

	if (!player.gameOver) {
		/**
		 * @type {10 | 5 | -10 | -5 | 0 | null}
		 */
		let platformCanMoveX = null;
		/**
		 * @type {10 | 5 | -10 | -5 | 0 | null}
		 */
		let playerCanMoveX = null;

		ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

		if (distanceTravelled <= player.travelled) {
			distanceTravelled = player.travelled;
		}

		clouds.forEach((cloud) => {
			cloud.update();
		});

		enemies.forEach((enemy) => {
			enemy.update();
		});

		platforms.forEach((platform, i) => {
			platform.update();

			platform.playerColliding = {
				x: false,
				y: false,
			};

			if (
				keys.right.pressed &&
				player.position.x < (window.innerWidth * 50) / 100 // When it reaches 35% of screen stop player and move the background
			) {
				if (playerCanMoveX !== 0) {
					playerCanMoveX = valuesAccordingScreen(10, 5);
					player.colliding = false;
					platform.playerColliding.x = false;
				}
			} else if (keys.left.pressed && player.position.x > 100) {
				if (playerCanMoveX !== 0) {
					player.colliding = false;
					platform.playerColliding.x = false;

					playerCanMoveX = valuesAccordingScreen(-10, -5);
				}
			} else {
				playerCanMoveX = 0;

				if (keys.right.pressed) {
					if (
						!(
							player.position.x + player.width === platform.position.x &&
							player.position.y + player.height >= platform.position.y
						)
					) {
						if (platformCanMoveX !== 0)
							platformCanMoveX = valuesAccordingScreen(-10, -5);
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
						if (platformCanMoveX !== 0)
							platformCanMoveX = valuesAccordingScreen(10, 5);
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
				platform.playerColliding.x = true;
			}

			// Platform collision detection X axis on left side
			if (
				player.position.x + player.width === platform.position.x &&
				keys.right.pressed &&
				player.position.y + player.height >= platform.position.y
			) {
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
				playerCanMoveX = 0;
				player.colliding = true;
				platform.playerColliding.x = true;
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
			player.travelled -= platformCanMoveX;
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

			clouds.push(new Cloud(ctx, platforms[platforms.length - 2]));
			clouds.push(new Cloud(ctx, platforms[platforms.length - 1]));
		}
		if (clouds.length > 0 && clouds[0].position.x < -window.innerWidth * 1.5) {
			clouds.shift();
		}
		setScore();
	} else {
		ctx.font = "50px Arcade";
		ctx.fillStyle = "black";
		ctx.textAlign = "center";
		ctx.fillText(
			"Game Over!",
			window.innerWidth * 0.5,
			window.innerHeight * 0.35
		);
		ctx.font = "25px Arcade";
		ctx.fillText(
			"Click to restart",
			window.innerWidth * 0.5,
			window.innerHeight * 0.45
		);
	}

	if (!document.fullscreenElement) {
		ctx.font = "12px Arcade";
		ctx.textAlign = "center";
		ctx.fillStyle = "white";
		ctx.fillText(
			"Double click to enter fullscreen",
			window.innerWidth * 0.5,
			window.innerHeight * 0.9
		);
	}
};

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

window.addEventListener("orientationchange", () => {
	resetValues();
});

canvas.addEventListener("click", () => {
	if (player.gameOver) {
		resetValues();
	}
});

canvas.addEventListener("dblclick", () => {
	document.body.requestFullscreen();
});

leftBtn.addEventListener("touchstart", () => {
	keys.left.pressed = true;
});

rightBtn.addEventListener("touchstart", () => {
	keys.right.pressed = true;
});

upBtn.addEventListener("touchstart", () => {
	if (!player.preventJump) player.velocity.y = -15;
});

leftBtn.addEventListener("touchend", () => {
	keys.left.pressed = false;
});

rightBtn.addEventListener("touchend", () => {
	keys.right.pressed = false;
});

resetValues();
init();
animate();
