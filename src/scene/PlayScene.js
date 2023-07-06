import Phaser from 'phaser';
import Player from '../gameObject/Player';

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super('play-scene');
  }

  preload() {
    this.load.spritesheet('player', 'assets/player_0.png', {
      frameWidth: 58,
      frameHeight: 70
    });
    
  }

  create() {
    this.player = new Player(this, 100, 100);

    this.cursorKeys = this.input.keyboard.createCursorKeys();
  }

  update() {
    const speed = 5;

    if (this.cursorKeys.right.isDown) {
      this.player.moveRight();
      this.player.x += speed;
    } else if (this.cursorKeys.left.isDown) {
      this.player.moveLeft();
      this.player.x -= speed;
    } else {
      this.player.idle();
    }
  }
}
