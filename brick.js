class Brick {
    constructor(game) {
        this.game = game;
        this.row = 0;
        this.col = 0;
        this.data = [];
        this.dots = [];

        this.createData();
        this.createDots();
    }

    createData() {
        let baseData = [
            [
                [x, x, x, x]
            ],
            [
                [x, x],
                [x, x]
            ],
            [
                [x, x, x],
                [_, x, _]
            ],
            [
                [x, x, _],
                [_, x, x]
            ],
            [
                [_, x, x],
                [x, x, _]
            ],
            [
                [x, x, x],
                [x, _, _]
            ],
            [
                [x, x, x],
                [_, _, x]
            ],
        ];
        let r = Math.floor(Math.random() * 6);
        this.data = baseData[r];
    }

    createDots() {
        this.dots = [];
        for (let row = 0; row < this.data.length; row++) {
            for (let col = 0; col < this.data[0].length; col++) {
                if(this.data[row][col] == x) {
                    let newDot = new Dot(this.game, this.row + row, this.col + col);
                    this.dots.push(newDot);
                } 
            }
        }
    }

    draw() {
        this.dots.forEach(dot => dot.draw());
    }

    fall() {
        if (this.canFall()) {
            this.row++;
            this.dots.forEach(dot => {
                dot.fall()
            });
        } else {
            this.game.createNewBrick();
            this.game.board.appendToBoard(this.dots);
            this.game.board.checkFullRows();
        }
    }

    canFall() {
        return this.dots.every(dot => dot.canFall());
    }

    moveLeft() {
        if (this.canMoveLeft()) {
            this.col--;
            this.dots.forEach(dot => dot.moveLeft());
        }
    }

    canMoveLeft() {
        return this.dots.every(dot => dot.canMoveLeft());
    }

    moveRight() {
        if (this.canMoveRight()) {
            this.col++;
            this.dots.forEach(dot => dot.moveRight());
        }
    }

    canMoveRight() {
        return this.dots.every(dot => dot.canMoveRight());
    }

    moveDown() {
        while(this.canFall()) {
            this.fall();
        }
    }
    
    rotate() {
        let newData = [];
        for (let col = 0; col < this.data[0].length; col++) {
            let newRow = [];
            for (let row = this.data.length - 1; row >= 0; row--) {
                newRow.push(this.data[row][col]);
            }
            newData.push(newRow);
        }

        if (this.canRotate(newData)) {
            this.data = newData;
            this.createDots();
        }
    }

    canRotate(brickData) {
        for (let row = 0; row < brickData.length; row++) {
            for (let col = 0; col < brickData[0].length; col++) {
                if(!this.game.board.isEmptyCell(this.row + row, this.col + col)) {
                    return false;
                }
                if ((this.row + row > NUM_ROWS - 1) || (this.col + col > NUM_COLS - 1)) {
                    return false;
                }
            }
        }
        return true;
    }

    update() {

    }
}