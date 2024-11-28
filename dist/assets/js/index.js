(() => {
  // src/js/player.js
  var Player = class {
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
        { x: 115, y: 385 }
      ];
      this.player = document.getElementById("player");
    }
    draw() {
      if (this.step !== 0 && this.step < this.transitions.length) {
        this.game.getContext().clearRect(this.transitions[this.step - 1].x, this.transitions[this.step - 1].y, this.width, this.height);
      }
      this.game.getContext().fillStyle = "transparent";
      this.game.getContext().fillRect(this.transitions[this.step].x, this.transitions[this.step].y, this.width, this.height);
      this.game.getContext().drawImage(this.player, this.transitions[this.step].x, this.transitions[this.step].y, this.width, this.height);
    }
    isClickedInsideControlButton(x, y) {
      return x >= this.controlButtonX && x <= this.controlButtonX + this.controlButtonWidth && y >= this.controlButtonY && y <= this.controlButtonY + this.controlButtonHeight;
    }
    nextStep() {
      if (this.step < this.transitions.length - 1) {
        this.step += 1;
        this.draw();
      }
    }
  };
  var player_default = Player;

  // src/js/friends.js
  var Friends = class {
    constructor(game) {
      this.game = game;
      this.canvas = this.game.getCanvas();
      this.userBoxWidth = 50;
      this.userBoxHeight = 50;
      this.startUserBoxX = 35;
      this.startUserBoxY = 565;
      this.unitsOnBar = 8;
      this.gapBetweenBoxes = 10;
      this.userDataIndex = 0;
      this.friends = ["egor", "oleg", "irina", "marina", "ivan", "diana", "sasha", "grisha", void 0, void 0];
      this.emptyBox = document.getElementById("empty-box");
      this.userBox = document.getElementById("user-box");
      this.arrowLeftX = 10;
      this.arrowWidth = 20;
      this.arrowLeftY = 565;
      this.arrowHeight = 30;
      this.arrowRightX = 515;
      this.arrowRightY = 565;
    }
    draw() {
      let offset = 0;
      for (let boxIndex = this.userDataIndex; boxIndex < this.unitsOnBar + this.userDataIndex; boxIndex += 1) {
        this.game.getContext().fillStyle = "transparent";
        this.game.getContext().clearRect(this.startUserBoxX + offset, this.startUserBoxY, this.userBoxWidth, this.userBoxHeight);
        if (this.friends[boxIndex]) {
          this.game.getContext().drawImage(this.userBox, this.startUserBoxX + offset, this.startUserBoxY, this.userBoxWidth, this.userBoxHeight);
        } else {
          this.game.getContext().drawImage(this.emptyBox, this.startUserBoxX + offset, this.startUserBoxY, this.userBoxWidth, this.userBoxHeight);
        }
        offset += this.gapBetweenBoxes + this.userBoxWidth;
      }
    }
    redraw(x, y) {
      const leftArrowClicked = !!(x >= this.arrowLeftX && x <= this.arrowLeftX + this.arrowWidth && y >= this.arrowLeftY && y <= this.arrowLeftY + this.arrowHeight);
      if (leftArrowClicked) {
        this.userDataIndex = this.userDataIndex - 1 > 0 ? this.userDataIndex - 1 : 0;
      } else if (this.friends.length - this.unitsOnBar > 0) {
        this.userDataIndex = this.friends.length - this.unitsOnBar - 1 >= this.userDataIndex ? this.userDataIndex + 1 : this.userDataIndex;
      }
      this.draw();
    }
    isClickedOnArrowButtons(x, y) {
      return x >= this.arrowLeftX && x <= this.arrowLeftX + this.arrowWidth && y >= this.arrowLeftY && y <= this.arrowLeftY + this.arrowHeight || x > this.arrowRightX && x < this.arrowRightX + this.arrowWidth && y >= this.arrowRightY && y <= this.arrowRightY + this.arrowHeight;
    }
  };
  var friends_default = Friends;

  // src/js/ratingData.js
  var ratingData = {
    rating: [
      {
        id: "123",
        name: "\u0412\u043B\u0430\u0434\u0438\u043C\u0438\u0440",
        lastName: "\u041B\u0430\u0440\u0438\u043E\u043D\u043E\u0432",
        img: "./male.png",
        points: "463"
      },
      {
        id: "9",
        name: "\u0412\u043B\u0430\u0434\u0438\u043C\u0438\u0440",
        lastName: "\u0421\u0435\u0440\u0433\u0435\u0435\u0432",
        img: "./male.png",
        points: "521"
      },
      {
        id: "231",
        name: "\u0412\u0435\u043D\u0438\u0430\u043C\u0438\u043D",
        lastName: "\u0412\u0430\u0441\u0438\u043B\u044C\u0435\u0432",
        img: "./male.png",
        points: "865"
      },
      {
        id: "321",
        name: "\u041C\u0430\u0440\u0438\u044F",
        lastName: "\u041B\u043E\u0433\u0438\u043D\u043E\u0432\u0430",
        img: "./female.png",
        points: "865"
      },
      {
        id: "492",
        name: "\u0411\u043E\u0440\u0438\u0441",
        lastName: "\u041A\u0430\u0437\u0430\u043D\u0446\u0435\u0432",
        img: "./male.png",
        points: "784"
      },
      {
        id: "452",
        name: "\u041F\u043E\u043B\u0438\u043D\u0430",
        lastName: "\u041A\u0430\u043B\u0438\u043D\u0438\u043D\u0430",
        img: "./female.png",
        points: "225"
      },
      {
        id: "796",
        name: "\u0414\u0430\u043D\u0438\u0438\u043B",
        lastName: "\u0412\u043E\u0440\u043E\u0431\u044C\u0451\u0432",
        img: "./male.png",
        points: "642"
      },
      {
        id: "4",
        name: "\u042D\u0440\u0438\u043A",
        lastName: "\u0410\u043A\u0441\u0451\u043D\u043E\u0432",
        img: "./male.png",
        points: "150"
      },
      {
        id: "1155",
        name: "\u0418\u0432\u0430\u043D",
        lastName: "\u0418\u0432\u0430\u043D\u043E\u0432",
        img: "./male.png",
        points: "100"
      },
      {
        id: "12145",
        name: "\u0410\u0440\u0442\u0435\u043C",
        lastName: "\u0410\u043B\u0435\u043A\u0441\u0435\u0435\u0432",
        img: "./male.png",
        points: "1000"
      }
    ],
    friends: [
      {
        id: "9",
        name: "\u0412\u043B\u0430\u0434\u0438\u043C\u0438\u0440",
        lastName: "\u0421\u0435\u0440\u0433\u0435\u0435\u0432",
        img: "./male.png"
      },
      {
        id: "4",
        name: "\u042D\u0440\u0438\u043A",
        lastName: "\u0410\u043A\u0441\u0451\u043D\u043E\u0432",
        img: "./male.png"
      },
      {
        id: "15411",
        name: "\u0418\u0440\u0438\u043D\u0430",
        lastName: "\u0427\u0435\u0441\u043D\u043E\u043A\u043E\u0432\u0430",
        img: "./female.png"
      },
      {
        id: "15564",
        name: "\u0414\u0430\u0440\u0438\u043D\u0430",
        lastName: "\u0411\u043E\u0431\u0440\u043E\u0432\u0430",
        img: "./female.png"
      }
    ]
  };
  var ratingData_default = ratingData;

  // src/js/rating.js
  var Rating = class {
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
      this.textFont = "14px sans-serif";
      this.textColor = "white";
      this.fiendTextColor = "red";
      this.textOffset = 20;
      this.barWidth = 400;
      this.gapBetwenBars = 10;
      this.timerToShowRating = null;
      this.initialYPositionOfRatingWindow = 0;
      this.ratingWindow = document.getElementById("rating-window");
      this.bar = document.getElementById("bar");
      this.periodOfRedraw = 10;
      this.alreadyDrawn = false;
      this.ratingDataIndex = 0;
      this.ratingSortedArray = ratingData_default.rating.sort((a, b) => Number(b.points) - Number(a.points));
      this.offsetRatingNumber = 33;
      this.offsetRatingText = 100;
      this.ratingTextWidth = 200;
      this.offsetRatingScore = 325;
    }
    isClickedInsideRatingButton(x, y) {
      return x >= this.ratingX && x <= this.ratingX + this.width && y >= this.ratingY && y <= this.ratingY + this.height;
    }
    isClickedInsideCloseRatingButton(x, y) {
      return x >= this.closeRatingX && x <= this.closeRatingX + this.widthCloseRating && y >= this.closeRatingY && y <= this.closeRatingY + this.heightCloseRating;
    }
    showRating() {
      if (this.alreadyDrawn)
        return;
      const drawRatingWindow = () => {
        this.alreadyDrawn = true;
        if (this.initialYPositionOfRatingWindow <= this.game.getCanvasHeight()) {
          const speed = 5;
          this.game.getContext().clearRect(0, 0, this.game.getCanvasWidth(), this.game.getCanvasHeight());
          this.game.getContext().drawImage(this.ratingWindow, 0, -this.game.getCanvasHeight() + this.initialYPositionOfRatingWindow, this.game.getCanvasWidth(), this.game.getCanvasHeight());
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
      if (direction === "scrolldown") {
        if (ratingData_default.rating.length - this.barsOnScreen > 0) {
          this.ratingDataIndex = ratingData_default.rating.length - this.barsOnScreen - 1 >= this.ratingDataIndex ? this.ratingDataIndex + 1 : this.ratingDataIndex;
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
      for (let barIndex = this.ratingDataIndex; barIndex < this.barsOnScreen + this.ratingDataIndex; barIndex += 1) {
        this.game.getContext().fillStyle = "transparent";
        this.game.getContext().clearRect(this.ratingStartScrollAreaX, this.ratingStartScrollAreaY + offset, this.barWidth, this.barHeight);
        this.game.getContext().drawImage(this.bar, this.ratingStartScrollAreaX, this.ratingStartScrollAreaY + offset, this.barWidth, this.barHeight);
        this.game.getContext().font = this.textFont;
        this.game.getContext().fillStyle = this.textColor;
        if (ratingData_default.friends.findIndex((elem) => elem.id === this.ratingSortedArray[barIndex].id) >= 0) {
          this.game.getContext().fillStyle = this.fiendTextColor;
        }
        this.game.getContext().fillText(barIndex + 1, this.ratingStartScrollAreaX + this.offsetRatingNumber, this.ratingStartScrollAreaY + offset + this.textOffset);
        this.game.getContext().fillText(`${this.ratingSortedArray[barIndex].name} ${this.ratingSortedArray[barIndex].lastName}`, this.ratingStartScrollAreaX + this.offsetRatingText, this.ratingStartScrollAreaY + offset + this.textOffset);
        this.game.getContext().fillText(this.ratingSortedArray[barIndex].points, this.ratingStartScrollAreaX + this.offsetRatingScore, this.ratingStartScrollAreaY + offset + this.textOffset);
        offset += this.gapBetwenBars + this.barHeight;
      }
    }
  };
  var rating_default = Rating;

  // src/js/game.js
  var Game = class {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = this.canvas.getContext("2d");
      this.canvas.width = 980;
      this.canvas.height = 630;
      this.player = new player_default(this);
      this.rating = new rating_default(this);
      this.friends = new friends_default(this);
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
      this.canvas.addEventListener("pointerdown", (e) => this.handleCanvasClick(e));
      this.canvas.addEventListener("mousemove", (e) => this.handleMouseMove(e));
      this.canvas.addEventListener("wheel", (e) => this.handleScroll(e));
      this.draw();
    }
    draw() {
      this.getContext().fillStyle = "transparent";
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
        this.canvas.style.cursor = "pointer";
      } else if (this.player.isClickedInsideControlButton(x, y)) {
        this.canvas.style.cursor = "pointer";
      } else if (this.rating.isClickedInsideCloseRatingButton(x, y)) {
        this.canvas.style.cursor = "pointer";
      } else if (this.friends.isClickedOnArrowButtons(x, y)) {
        this.canvas.style.cursor = "pointer";
      } else
        this.canvas.style.cursor = "auto";
    }
    handleScroll(e) {
      this.rating.scroll(e.deltaY > 0 ? "scrolldown" : "scrollup");
    }
  };
  window.addEventListener("load", () => {
    const canvas = document.getElementById("gamecanvas");
    const game = new Game(canvas);
    game.start();
  });
})();
//# sourceMappingURL=index.js.map
