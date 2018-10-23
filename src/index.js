const canvas = document.getElementById("myCanvas"); // storing a reference to the canvas element;
const ctx = canvas.getContext("2d"); // create a ctx variable to store the 2d 'rendering context',
// the actual tool we use to paint the canvas;

let x = canvas.width / 2; // define a starting point for the ball to be drawn at - the bottom centre of canvas;
let y = canvas.height - 30;
const ballRadius = 10;
// the important part! we want to add a small value to x and y after each frame has been drawn to
// make it look like the ball is moving. Let's define these small values as dx and dy and set
// their values to 2 and -2 respectively
let dx = 2;
let dy = -2;
let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2; // starting position on the x-axis;
let rightPressed = false;
let leftPressed = false;
const brickRowCount = 5;
const brickColumnCount = 3;
const brickWidth = 75;
const brickHeight = 20;
const brickPadding = 10;
const brickOffsetTop = 30;
const brickOffsetLeft = 30;
let score = 0;
let lives = 3;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
    bricks[c] = [];
    for (let r = 0; r < brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
        //[c] is an array, but also an element index, [r] is an object, but also an element index
    }
}

document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

// CLEANING UP OUR CODE: to do this, we've moved the ball-drawing portion out of draw()
// and moved it into its own function drawBall()

function keyDownHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = true;
    } else if (e.keyCode === 37) {
        leftPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.keyCode === 39) {
        rightPressed = false;
    } else if (e.keyCode === 37) {
        leftPressed = false;
    }
}

function collisionDetection() {
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            let b = bricks[c][r];
            if (b.status == 1) {
                // if there is a collision:
                if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                    dy = -dy; // bounce/reverse direction
                    b.status = 0; // update status to '0'
                    score++;
                    if (score == brickRowCount * brickColumnCount) {
                        alert("YOU WIN, CONGRATULATIONS");
                        document.location.reload();
                    }
                }
            }
        }
    }
}

function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Score: " + score, 8, 20);
}

function drawLives() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "#0095DD";
    ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
}

function drawBall() {
    // draw the ball;
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, 2 * Math.PI);
    ctx.fillStyle = "#0095dd";
    ctx.fill();
    ctx.closePath();
}
function drawPaddle() {
    ctx.beginPath();
    ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
    ctx.fillStyle = "#0095dd";
    //"#0095dd";
    ctx.fill();
    ctx.closePath();
}

function drawBricks() {
    // understand this: the reasoning behind each equation brickX, brickY
    for (let c = 0; c < brickColumnCount; c++) {
        for (let r = 0; r < brickRowCount; r++) {
            if (bricks[c][r].status == 1) {
                // first part: update x & y coordinate
                let brickX = r * (brickWidth + brickPadding) + brickOffsetLeft;
                let brickY = c * (brickHeight + brickPadding) + brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                // draws each blue brick on the canvas per frame
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "#0095DD";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

function draw() {
    // drawPaddle();
    // clear the previous frame to make the ball appear to be moving;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBricks();
    drawBall(); // moved the original ball-drawing code out from here;);
    drawPaddle();
    drawScore();
    drawLives();
    collisionDetection();

    if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
    if (y + dy < ballRadius) {
        dy = -dy;
        // a janky fix to the ball-to-paddle bounce
    } else if (y + dy > canvas.height - (ballRadius + 2)) {
        // if the ball finds iteself bw these dimensions
        if (x > paddleX && x < paddleX + paddleWidth) {
            dy = -dy;
        } else {
            lives--;
            if (!lives) {
                alert("GAME OVER!");
                document.location.reload();
            } else {
                x = canvas.width / 2;
                y = canvas.height - 30;
                dx = 2;
                dy = -2;
                paddleX = (canvas.width - paddleWidth) / 2;
                console.log(lives);
            }
        }
    }

    if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
    } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
    }

    x += dx;
    y += dy;
    requestAnimationFrame(draw); // syncs the framerate and renders shapes only when needed. smoother animation loop than setInterval
}

// setInterval(draw, 10); // due to the infinite nature of setInterval(), the draw function will be called
// every 10 milliseconds forecer, or until we stop it;
draw();
console.log(bricks);
