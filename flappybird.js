let board;
let boardwidth = 360;
let boardheight = 640;
let context;

//bird
let birdW = 34;
let birdH = 24;
let birdX = boardwidth / 8;
let birdY = boardheight / 2;
let birdImg;
let running = true;
let bird = {
    x: birdX,
    y: birdY,
    w: birdW,
    h: birdH

}

let pipeWidth = 64; //width/height ratio = 384/3072 = 1/8
let pipeHeight = 512;
let pipeX = boardwidth;
let pipeY = 0;

let velocity = 0;
let gaccel = 0.4;

let piptopImg;
let pipbottomImg;
let toppipe;
let pipV = -2;

let gameover = false;

let start;



let pipeArray = [];
window.onload = function () {
    board = document.getElementById("board");
    board.height = boardheight;
    board.width = boardwidth;
    context = board.getContext("2d");//get the canvas basically 
    birdImg = new Image();
    piptopImg = new Image();
    pipbottomImg = new Image();
    start = new Image();
    birdImg.src = ("flappybird.png");//load image
    pipbottomImg.src = ("bottompipe.png");
    piptopImg.src = ("toppipe.png");
    start.src = ("playbutton.png");
    birdImg.onload = function () {
        context.drawImage(birdImg, bird.x, bird.y, bird.w, bird.h);// drawing bird when load 
    }


    requestAnimationFrame(update);
    setInterval(pipes, 1500);
    board.addEventListener('click', click);
    document.addEventListener("keydown", moveBird);//load event listener 
}


function update() {//kinda like void draw

    requestAnimationFrame(update);
    if (gameover == false) {
        context.clearRect(0, 0, boardwidth, boardheight);
        context.drawImage(birdImg, bird.x, bird.y, bird.w, bird.h);//draw bird more 
        gravity();

        for (let i = 0; i < pipeArray.length; i++) {
            let pipe = pipeArray[i];
            pipe.x += pipV;
            context.drawImage(pipe.img, pipe.x, pipe.y, pipe.width, pipe.height);//drawing the pipe
            if (collision(bird, pipe)) {
                gameover = true;

            }

        }
    } else {
        context.clearRect(0, 0, boardwidth, boardheight);
        bird.y = boardheight / 2;
        context.drawImage(birdImg, bird.x, bird.y, bird.w, bird.h);
        context.drawImage(start, (boardwidth / 2) - 200, (boardheight / 2) - 100, 400, 200);


    }


}






function pipes() {
    if (gameover) {
        return;
    }
    pipeY = Math.floor(Math.random() * (420) - 470);//random pipe placement

    let openingSpace = board.height / 4;

    let topPipe = {
        img: piptopImg,
        x: pipeX,
        y: pipeY,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(topPipe);

    let bottomPipe = {
        img: pipbottomImg,
        x: pipeX,
        y: pipeY + pipeHeight + openingSpace,
        width: pipeWidth,
        height: pipeHeight,
        passed: false
    }
    pipeArray.push(bottomPipe);

}

function gravity() {
    if (gameover) {
        return;
    }
    velocity += gaccel;

    bird.y += velocity;

}

function moveBird(e) {
    if (e.code == "Space" || e.code == "ArrowUp" || e.code == "KeyX") {//movement 

        if (gameover) {
            pipeArray = [];
            bird.y = boardheight / 2;
            gaccel = 0.4;
            velocity = 0;
            gameover = false;

        } else {
            velocity = -6;
        }
    }
}
function click(e) {


    if (gameover) {
        pipeArray = [];
        bird.y = boardheight / 2;
        gaccel = 0.4;
        velocity = 0;
        gameover = false;

    } else {
        velocity = -6;
    }

}



function collision(a, b) {
    if (a.x < b.x + b.width && a.x + a.w > b.x && a.y < b.y + b.height && a.y + a.h > b.y) {
        return true
    } else if (a.y + a.h > boardheight) {
        return true
    }


}


