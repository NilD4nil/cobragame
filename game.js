"use strict";

const canvas = document.querySelector("#game");
const ctx = canvas.getContext("2d");
const headscore = document.querySelector(".score");
const foodimg = new Image();
foodimg.src = "./apple (1).png";

let box = 32;
let score = 0;

let food = {
    x: Math.floor(Math.random() * 19) * box,
    y: Math.floor(Math.random() * 19) * box
};
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 9 * box
}
document.addEventListener("keydown", direction);

let dir;

let isBan = null;
function direction(event){
    if (isBan) {
        if (event.keyCode === 39 && dir !== "left") {
            dir = "right";
        } else if (event.keyCode === 37 && dir !== "right") {
            dir = "left";
        } else if (event.keyCode === 38 && dir !== "down") {
            dir = "up";
        } else if (event.keyCode === 40 && dir !== "up") {
            dir = "down";
        }
        isBan = false;
    }
}

function aetTail(head, arr){
    for(let i = 0; i < arr.length; i++){
        if(head.x === arr[i].x && head.y === arr[i].y){
            clearInterval(game);
            confirm(`Вы проиграли! \nВаш счёт: ${score}`) ? location.reload() : "";
        }
    }
}

function drawGame() {
    ctx.fillStyle = "#212837";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(foodimg, food.x, food.y);
    isBan = true;

    for (let i = 0; i < snake.length; i++) {
        ctx.fillStyle = "#1c8303";
        ctx.fillRect(snake[i].x, snake[i].y, box, box);
        ctx.fillStyle = "Black";
        ctx.fillRect(snake[0].x, snake[0].y, box, box)
    }

    let snakeX = snake[0].x
    let snakeY = snake[0].y

    if(snakeX === food.x && snakeY === food.y){
        food = {
            x: Math.floor(Math.random() * 19) * box,
            y: Math.floor(Math.random() * 19) * box
        };
        score++
    }
    else{
        snake.pop()
    }
    if(snakeX < -box || snakeX > box * 19 || snakeY < -box || snakeY > box * 19){
        clearInterval(game);
        confirm(`Вы проиграли! \nВаш счёт: ${score}`) ? location.reload() : "";
    }

    if (dir === "left")
        snakeX -= box;
    if (dir === "right")
        snakeX += box;
    if (dir === "down")
        snakeY += box;
    if (dir === "up")
        snakeY -= box;

    let newHead = {
        x: snakeX,
        y: snakeY
    };

    aetTail(newHead, snake);
    snake.unshift(newHead);
    headscore.innerText = score;
}

let game = setInterval(drawGame, 100);