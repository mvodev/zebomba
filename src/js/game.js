import Player from './player';
import Friends from './friends';
import Rating from './rating';

class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
    this.canvas.width = 980;
    this.canvas.height = 630;
    this.player = new Player(this);
    this.rating = new Rating(this);
    this.friends = new Friends(this);
    this.ratingIsShown = false;
  }

  getCanvas() {
    return this.canvas;
  }

  getContext() {
    return this.ctx;
  }

  getCanvasWidth() {
    return this.canvas.width;
  }

  getCanvasHeight() {
    return this.canvas.height;
  }

  start() {
    this.canvas.addEventListener('pointerdown', (e) => this.handleCanvasClick(e));
    this.canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
    this.canvas.addEventListener('wheel', (e) => this.handleScroll(e));
    this.draw();
  }

  draw() {
    this.getContext().fillStyle = 'transparent';
    this.getContext().fillRect(0, 0, this.getCanvasWidth(), this.getCanvasHeight());
    this.player.draw();
    this.friends.draw();
  }

  handleCanvasClick(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (this.rating.isClickedInsideRatingButton(x, y)) {
      this.rating.showRating();
      this.ratingIsShown = true;
    }
    if (this.rating.isClickedInsideCloseRatingButton(x, y)) {
      this.rating.hideRating();
      this.ratingIsShown = false;
    }
    if (this.player.isClickedInsideControlButton(x, y) && !this.ratingIsShown) {
      this.player.nextStep();
    }
    if (this.friends.isClickedOnArrowButtons(x, y)) {
      this.friends.redraw(x, y);
    }
  }

  handleMouseMove(e) {
    const rect = this.canvas.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    if (this.rating.isClickedInsideRatingButton(x, y)) {
      this.canvas.style.cursor = 'pointer';
    } else if (this.player.isClickedInsideControlButton(x, y)) {
      this.canvas.style.cursor = 'pointer';
    } else if (this.rating.isClickedInsideCloseRatingButton(x, y)) {
      this.canvas.style.cursor = 'pointer';
    } else if (this.friends.isClickedOnArrowButtons(x, y)) {
      this.canvas.style.cursor = 'pointer';
    } else this.canvas.style.cursor = 'auto';
  }

  handleScroll(e) {
    this.rating.scroll(e.deltaY > 0 ? 'scrolldown' : 'scrollup');
  }
}

window.addEventListener('load', () => {
  const canvas = document.getElementById('gamecanvas');
  const game = new Game(canvas);
  game.start();
});
