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
      { x: 440, y: 445 },
      { x: 345, y: 415 },
      { x: 270, y: 460 },
      { x: 180, y: 475 },
      { x: 105, y: 450 },
      { x: 115, y: 385 },
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
