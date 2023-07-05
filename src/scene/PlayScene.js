import Phaser from 'phaser'
import Icon from '../gameObject/Icon'
import Slot from '../gameObject/Slot'

export default class HelloWorldScene extends Phaser.Scene {
  constructor() {
    super("play-scene");
    this.map = [[], [], [], []];
    this.dragObject = null;

  }

  preload() {
    this.load.image('icon-1', 'assets/1.png')
    this.load.image('icon-2', 'assets/2.png')
    this.load.image('icon-3', 'assets/3.png')
    this.load.image('slot', 'assets/slot.png')
  }

  create() {
    // ...

    this.slots = this.add.group();

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const slot = new Slot(this, row, col);
        this.slots.add(slot);
      }
    }

    for (let row = 0; row < 4; row++) {
      for (let col = 0; col < 4; col++) {
        const level = Phaser.Math.Between(1, 2);
        const icon = new Icon(this, level, row, col);
        this.map[row][col] = icon;
        icon.setInteractive();
        icon.on("pointerdown", () => this.startDrag(icon));
      }
    }

    // ...
  }

  startDrag(icon) {
    this.dragObject = icon;
    this.input.on("pointermove", this.doDrag, this);
    this.input.on("pointerup", this.stopDrag, this);
  }

  doDrag(pointer) {
    const { x, y } = pointer;
    this.dragObject.x = x;
    this.dragObject.y = y;
  }

  mergeIcon(objectA, objectB) {
    objectB.levelUp();
    objectA.randomLevel();
    objectA.back();

    this.dragObject = null;
  }

  stopDrag() {
    let flag = false;

    for (let i = 0; i < this.slots.getChildren().length; i++) {
      const current = this.slots.getChildren()[i];
      const boundSlot = current.getBounds();
      const boundIcon = this.dragObject.getBounds();

      const isIntersects = Phaser.Geom.Intersects.RectangleToRectangle(
        boundIcon,
        boundSlot
      );

      if (isIntersects) {
        const currentIcon = this.map[current.row][current.col];
        if (
          this.dragObject.level !== currentIcon.level ||
          this.dragObject.level === 3 ||
          currentIcon.level === 3
        ) {
          break;
        }

        flag = true;
        this.mergeIcon(this.dragObject, currentIcon);
        break;
      }
    }

    if (!flag) {
      this.dragObject.back();
    }

    this.input.off("pointermove", this.doDrag, this);
    this.input.off("pointerup", this.stopDrag, this);
  }

}
