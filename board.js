class Board {
    constructor(game) {
        this.game = game;
        this.data = [
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
            [_,_,_,_,_,_,_,_,_,_],
        ];
    }

    draw() {
        let dots = [];
        for (let row = 0; row < NUM_ROWS; row++) {
            for (let col = 0; col < NUM_COLS; col++) {
                if(this.data[row][col] == x) {
                    let newDot = new Dot(this.game, row, col);
                    dots.push(newDot);
                } 
            }
        }

        dots.forEach(dot => dot.draw());
    }

    isEmptyCell(row, col) {
        if (this.data[row][col] == x) {
            return false;
        }
        return true;
    }

    appendToBoard(dots) {
        dots.forEach (dot => {
            this.data[dot.row][dot.col] = x;
        });

    }

    checkFullRows() {
        let fullRows = [];
        for (let row = NUM_ROWS - 1; row >= 0; row--) {
            if (this.isRowFull(row)) {
                fullRows.push(row);
                
            }
        }
        if (fullRows.length > 0) {
            this.removeRows(fullRows);
        }
    }

    isRowFull(row) {
        for (let col = 0; col < NUM_COLS; col++) {
            if (this.isEmptyCell(row, col)) {
                return false;
            }
        }
        return true;
    }

    removeRows(rows) {
        let fullRowCount = rows.length;
        let firstFullRow = rows[fullRowCount - 1];
        this.data.splice(firstFullRow, fullRowCount);
        for (let i = 0; i < fullRowCount; i++) {
            this.data.unshift([_,_,_,_,_,_,_,_,_,_]);
        }
    }
}