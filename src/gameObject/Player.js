import Phaser from "phaser";

const CELL_SIZE = 100;

class Player extends Phaser.GameObjects.Sprite {
  constructor(scene, key, x, y) {
    
    super(scene, x, y, 'player');

    //
    
    this.anims.create({
      key: "left",
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 26 }),
      frameRate: 10,
      repeat: -1,
    });
    this.anims.create({
      key: "right",
      frames: this.anims.generateFrameNumbers('player', { start: 0, end: 40 }),
      frameRate: 10,
      repeat: -1,
    });

    scene.add.existing(this);
    this.play("idle");
  }
  idle() {
    this.play("idle", true);
  }
  moveLeft() {
    console.log("moveLeftCalled");
    this.flipX = true;
    this.play("left", true);
  }
  moveRight() {
    console.log("moveRightCalled");
    this.flipX = false;
    this.play("right", true);
  }
  
  
}
export default Player;
