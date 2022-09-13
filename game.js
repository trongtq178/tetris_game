class Game {
    constructor() {
        this.canvas = null;
        this.context = null;
        this.init();
    }

    init() {
        this.canvas = document.createElement('canvas');
        this.context = this.canvas.getContext('2d');
        this.canvas.width = GAME_WIDTH;
        this.canvas.height = GAME_HEIGHT;
        document.getElementById("board").appendChild(this.canvas);

        this.board = new Board(this);

        this.brick = new Brick(this);

        // start the game loop
        this.listenKeyBoard()
        this.loop();
        this.startGame();
    }

    loop() {
        this.update();
        this.draw();
        setTimeout(() => this.loop(), 30);
    }

    listenKeyBoard() {
        document.addEventListener('keydown', (event) => {
            switch (event.code) {
                case 'ArrowLeft':
                    this.brick.moveLeft();
                    break;
                case 'ArrowRight':
                    this.brick.moveRight();
                    break;
                case 'ArrowUp':
                    this.brick.rotate();
                    break;
                case 'ArrowDown':
                    this.brick.moveDown();
                    break;
            }
        });
    }

    startGame() {
        setInterval(() => this.brick.fall(), 500);
    }

    update() {

    }

    draw() {
        this.clearGame();
        this.board.draw();
        this.brick.draw();
    }

    clearGame() {
        this.context.fillStyle = "#ffffff";
        this.context.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
    }

    createNewBrick() {
        this.brick = new Brick(this);
    }
}

var g = new Game();
