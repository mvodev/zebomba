import ratingData from './ratingData';

class Rating {
  constructor(game) {
    this.game = game;
    this.canvas = this.game.getCanvas();
    this.width = 66;
    this.height = 61;
    this.widthCloseRating = 25;
    this.heightCloseRating = 25;
    this.closeRatingX = 720;
    this.closeRatingY = 95;
    this.ratingX = 895;
    this.ratingY = 550;
    this.ratingStartScrollAreaX = 300;
    this.ratingStartScrollAreaY = 245;
    this.ratingEndScrollAreaY = 465;
    this.barsOnScreen = 7;
    this.barHeight = 25;
    this.textFont = '14px sans-serif';
    this.textColor = 'white';
    this.fiendTextColor = 'red';
    this.textOffset = 20;
    this.barWidth = 400;
    this.gapBetwenBars = 10;
    this.timerToShowRating = null;
    this.initialYPositionOfRatingWindow = 0;
    this.ratingWindow = document.getElementById('rating-window');
    this.bar = document.getElementById('bar');
    this.periodOfRedraw = 10;
    this.alreadyDrawn = false;
    this.ratingDataIndex = 0;
    this.ratingSortedArray = ratingData.rating.sort((a, b) => Number(b.points) - Number(a.points));
    this.offsetRatingNumber = 33;
    this.offsetRatingText = 100;
    this.ratingTextWidth = 200;
    this.offsetRatingScore = 325;
  }

  isClickedInsideRatingButton(x, y) {
    return x >= this.ratingX
    && x <= (this.ratingX + this.width)
    && y >= this.ratingY
    && y <= (this.ratingY + this.height);
  }

  isClickedInsideCloseRatingButton(x, y) {
    return x >= this.closeRatingX
    && x <= (this.closeRatingX + this.widthCloseRating)
    && y >= this.closeRatingY && y <= (this.closeRatingY + this.heightCloseRating);
  }

  showRating() {
    if (this.alreadyDrawn) return;
    const drawRatingWindow = () => {
      this.alreadyDrawn = true;
      if (this.initialYPositionOfRatingWindow <= this.game.getCanvasHeight()) {
        const speed = 5;
        this.game.getContext().clearRect(
          0,
          0,
          this.game.getCanvasWidth(),
          this.game.getCanvasHeight(),
        );
        this.game.getContext().drawImage(
          this.ratingWindow,
          0,
          -this.game.getCanvasHeight() + this.initialYPositionOfRatingWindow,
          this.game.getCanvasWidth(),
          this.game.getCanvasHeight(),
        );
        this.initialYPositionOfRatingWindow += speed;
      }
      if (this.initialYPositionOfRatingWindow > this.game.getCanvasHeight()) {
        clearInterval(this.timerToShowRating);
        this.timerToShowRating = null;
        this.initialYPositionOfRatingWindow = 0;
        this.drawRaitingBars();
      }
    };
    this.timerToShowRating = setInterval(() => drawRatingWindow(), this.periodOfRedraw);
  }

  scroll(direction) {
    if (direction === 'scrolldown') {
      if (ratingData.rating.length - this.barsOnScreen > 0) {
        this.ratingDataIndex = (ratingData.rating.length - this.barsOnScreen - 1)
        >= this.ratingDataIndex ? this.ratingDataIndex + 1
          : this.ratingDataIndex;
      }
    } else {
      this.ratingDataIndex = this.ratingDataIndex - 1 > 0 ? this.ratingDataIndex - 1 : 0;
    }
    this.drawRaitingBars();
  }

  hideRating() {
    this.game.getContext().clearRect(0, 0, this.game.getCanvasWidth(), this.game.getCanvasHeight());
    this.game.draw();
    this.alreadyDrawn = false;
  }

  drawRaitingBars() {
    let offset = 0;
    for (let barIndex = this.ratingDataIndex;
      barIndex < this.barsOnScreen + this.ratingDataIndex; barIndex += 1) {
      this.game.getContext().fillStyle = 'transparent';
      this.game.getContext().clearRect(
        this.ratingStartScrollAreaX,
        this.ratingStartScrollAreaY + offset,
        this.barWidth,
        this.barHeight,
      );
      this.game.getContext().drawImage(
        this.bar,
        this.ratingStartScrollAreaX,
        this.ratingStartScrollAreaY + offset,
        this.barWidth,
        this.barHeight,
      );
      this.game.getContext().font = this.textFont;
      this.game.getContext().fillStyle = this.textColor;
      if (ratingData.friends.findIndex((elem) => elem.id === this.ratingSortedArray[barIndex].id)
        >= 0) {
        this.game.getContext().fillStyle = this.fiendTextColor;
      }
      this.game.getContext().fillText(
        barIndex + 1,
        this.ratingStartScrollAreaX + this.offsetRatingNumber,
        this.ratingStartScrollAreaY + offset + this.textOffset,
      );
      this.game.getContext().fillText(
        `${this.ratingSortedArray[barIndex].name} ${this.ratingSortedArray[barIndex].lastName}`,
        this.ratingStartScrollAreaX + this.offsetRatingText,
        this.ratingStartScrollAreaY + offset + this.textOffset,
      );
      this.game.getContext().fillText(
        this.ratingSortedArray[barIndex].points,
        this.ratingStartScrollAreaX + this.offsetRatingScore,
        this.ratingStartScrollAreaY + offset + this.textOffset,
      );
      offset += this.gapBetwenBars + this.barHeight;
    }
  }
}

export default Rating;
