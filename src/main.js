import Phaser from 'phaser'

import HelloWorldScene from './scene/PlayScene'

const config = {
	type: Phaser.AUTO,
	parent: 'app',
	width: 400,
	height: 400,
	physics: {
		default: 'arcade',
		arcade: {
			gravity: { y: 200 },
		},
	},
	scene: [HelloWorldScene],
}

export default new Phaser.Game(config)
