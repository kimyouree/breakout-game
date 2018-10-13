const brickRowCount = 3;
const brickColumnCount = 5;
const brickWidth = 20;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0 }; // bricks[c[ r{x, y}, r{x, y}, r{x, y} ], c[ r{x, y}, r{x, y} ], c[ r, ... ]]
    }
    console.log(bricks);
}
