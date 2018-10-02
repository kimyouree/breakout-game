const canvas = document.getElementById("myCanvas"); // storing a reference to the canvas element;
const ctx = canvas.getContext("2d"); // create a ctx variable to store the 2d 'rendering context',
// the actual tool we use to paint the canvas;

let x = canvas.width / 2; // define a starting point for the ball to be drawn at - the bottom centre of canvas;
let y = canvas.height - 30;

// the important part! we want to add a small value to x and y after each frame has been drawn to
// make it look like the ball is moving. Let's define these small values as dx and dy and set
// their values to 2 and -2 respectively
let dx = 2;
let dy = -2;

let paddleHeight = 10;
let paddleWidth = 75;
let paddleX = (canvas.width - paddleWidth) / 2; // starting position on the x-axis;

function draw() {
    // drawPaddle();
    // clear the previous frame to make the ball appear to be moving;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall(); // moved the original ball-drawing code out from here;); // moved the original ball-drawing code out from here;
    drawPaddle();
    x += dx;
    y += dy;

    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy; // makes sure the ball bounces when any of its edges touch the wall;
    } else if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
    }
}
setInterval(draw, 10); // due to the infinite nature of setInterval(), the draw function will be called
// every 10 milliseconds forecer, or until we stop it;

function random(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

// CLEANING UP OUR CODE: to do this, we've moved the ball-drawing portion out of draw()
// and moved it into its own function drawBall()

const ballRadius = 10;
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
    ctx.fill();
    ctx.closePath();
}
