class Friends {
  constructor(game) {
    this.game = game;
    this.canvas = this.game.getCanvas();
    this.userBoxWidth = 50;
    this.userBoxHeight = 50;
    this.startUserBoxX = 35;
    this.startUserBoxY = 555;
    this.unitsOnBar = 8;
    this.gapBetweenBoxes = 10;
    this.userDataIndex = 0;
    this.friends = ['egor', 'oleg', 'irina', 'marina', 'ivan', 'diana', 'sasha', 'grisha', undefined, undefined];
    this.emptyBox = document.getElementById('empty-box');
    this.userBox = document.getElementById('user-box');
    this.arrowLeftX = 10;
    this.arrowWidth = 20;
    this.arrowLeftY = 565;
    this.arrowHeight = 30;
    this.arrowRightX = 515;
    this.arrowRightY = 565;
  }

  draw() {
    let offset = 0;
    for (let boxIndex = this.userDataIndex;
      boxIndex < this.unitsOnBar + this.userDataIndex; boxIndex += 1) {
      this.game.getContext().fillStyle = 'transparent';
      this.game.getContext().clearRect(
        this.startUserBoxX + offset,
        this.startUserBoxY,
        this.userBoxWidth,
        this.userBoxHeight,
      );
      if (this.friends[boxIndex]) {
        this.game.getContext().drawImage(
          this.userBox,
          this.startUserBoxX + offset,
          this.startUserBoxY,
          this.userBoxWidth,
          this.userBoxHeight,
        );
      } else {
        this.game.getContext().drawImage(
          this.emptyBox,
          this.startUserBoxX + offset,
          this.startUserBoxY,
          this.userBoxWidth,
          this.userBoxHeight,
        );
      }
      offset += this.gapBetweenBoxes + this.userBoxWidth;
    }
  }

  redraw(x, y) {
    const leftArrowClicked = !!(x >= this.arrowLeftX
      && x <= this.arrowLeftX + this.arrowWidth
      && y >= this.arrowLeftY
      && y <= this.arrowLeftY + this.arrowHeight);
    if (leftArrowClicked) {
      this.userDataIndex = this.userDataIndex - 1 > 0 ? this.userDataIndex - 1 : 0;
    } else if (this.friends.length - this.unitsOnBar > 0) {
      this.userDataIndex = (this.friends.length - this.unitsOnBar - 1) >= this.userDataIndex
        ? this.userDataIndex + 1
        : this.userDataIndex;
    }
    this.draw();
  }

  isClickedOnArrowButtons(x, y) {
    return (x >= this.arrowLeftX
      && x <= this.arrowLeftX + this.arrowWidth
      && y >= this.arrowLeftY && y <= this.arrowLeftY + this.arrowHeight)
      || (x > this.arrowRightX
        && x < this.arrowRightX + this.arrowWidth
        && y >= this.arrowRightY && y <= this.arrowRightY + this.arrowHeight);
  }
}

export default Friends;
