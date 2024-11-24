class Player {
  constructor(game) {
    this.game = game;
    this.controlButtonX = 615;
    this.controlButtonY = 550;
    this.controlButtonWidth = 200;
    this.controlButtonHeight = 60;
    this.width = 21;
    this.height = 69;
    this.step = 0;
    this.transitions = [
      { x: 434, y: 440 },
      { x: 340, y: 410 },
      { x: 265, y: 450 },
      { x: 180, y: 470 },
      { x: 100, y: 440 },
      { x: 112, y: 380 },
    ];
    this.player = document.getElementById('player');
  }

  draw() {
    if (this.step !== 0 && this.step < this.transitions.length) {
      this.game.getContext().clearRect(
        this.transitions[this.step - 1].x,
        this.transitions[this.step - 1].y,
        this.width,
        this.height,
      );
    }
    this.game.getContext().fillStyle = 'transparent';
    this.game.getContext().fillRect(
      this.transitions[this.step].x,
      this.transitions[this.step].y,
      this.width,
      this.height,
    );
    this.game.getContext().drawImage(
      this.player,
      this.transitions[this.step].x,
      this.transitions[this.step].y,
      this.width,
      this.height,
    );
  }

  isClickedInsideControlButton(x, y) {
    return x >= this.controlButtonX
      && x <= (this.controlButtonX + this.controlButtonWidth)
      && y >= this.controlButtonY && y <= (this.controlButtonY + this.controlButtonHeight);
  }

  nextStep() {
    if (this.step < this.transitions.length - 1) {
      this.step += 1;
      this.draw();
    }
  }
}

export default Player;
