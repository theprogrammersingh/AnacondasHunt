function init() {
    canvas = document.getElementById("gameCanvas");
    pen = canvas.getContext("2d");
    W = canvas.width;
    H = canvas.height;
    SCORE = 0;
    snake = {
        length : 5,
        color : "red",
        cells : [],
        direction : "right",
        createSnake : function() {
            for(var i = this.length-1; i >= 0; i--){
                this.cells.push({ x : i, y : 0 });
            }
        },
        drawSanke : function() {
            for(var i = 0; i<this.cells.length; i++) {
                pen.fillStyle = this.color;
                pen.lineWidth = 5;
                pen.strokeStyle = "green";
                pen.strokeRect(this.cells[i].x * 20, this.cells[i].y * 20, 20, 20);
                pen.fillRect(this.cells[i].x * 20, this.cells[i].y * 20, 20, 20);
            }
        },
        updateSnake : function() {
            var headX = this.cells[0].x;
            var headY = this.cells[0].y;
            if(isColliding(headX,headY)){
                gameOver();
            }
            if(headX*20 == food.x && headY*20 == food.y) {
                food = getRandomPosition();
                this.length++;
                SCORE++;
            }else{
                this.cells.pop();
            }
            
            if(this.direction == "right") {
                var nextX = headX + 1;
                var nextY = headY;
            }else if(this.direction == "left") {
                var nextX = headX - 1;
                var nextY = headY;
            }else if(this.direction == "up") {
                var nextX = headX;
                var nextY = headY - 1;
            }else if(this.direction == "down") {
                var nextX = headX;
                var nextY = headY + 1;
            }
            
            this.cells.unshift({ x : nextX, y : nextY});
        }
    };
    
    food = getRandomPosition();

    snake.createSnake();
    
    function keyPressed(e) {
        if(e.key == "ArrowRight" && snake.direction != "left") {
            snake.direction = "right";
        }else if(e.key == "ArrowLeft" && snake.direction != "right") {
            snake.direction = "left";
        }else if(e.key == "ArrowUp" && snake.direction != "down") {
            snake.direction = "up";
        }else if(e.key == "ArrowDown" && snake.direction != "up") {
            snake.direction = "down";
        }
    }
    document.addEventListener("keydown", keyPressed);
}


function draw() {
    pen.clearRect(0, 0, W, H);
    snake.drawSanke();
    pen.fillStyle = "orange";
    pen.fillRect(food.x, food.y, 20, 20);
    pen.fillStyle = "white";
    pen.font = "15px Arial"
    pen.fillText("SCORE : " + SCORE ,20 ,20);
}

function getRandomPosition() {
    var foodX = Math.round(Math.random() * (W - 20) / 20) * 20;
    var foodY = Math.round(Math.random() * (H - 20) / 20) * 20;
    var foodParticle = { 
        x : foodX,
        y : foodY
    };
    return foodParticle;
}

function isColliding(x, y) {
    var flag = false;
    if(x * 20 < 0 || x * 20 > W - 20 || y * 20 < 0 || y * 20 > H - 20){
        flag = true;
    }
    for(var i = 1; i<snake.cells.length; i++){
        if(x == snake.cells[i].x && y == snake.cells[i].y){
            flag = true;
            break;
        }
    }
    return flag;
}

function update() {
    snake.updateSnake();
}

function gameloop() {
    draw();
    update();
}
function gameOver(){
    clearInterval(interval);
    pen.clearRect(0, 0, W, H);
    pen.fillStyle = "RED";
    pen.font = "40px Arial";
    pen.fillText("GAME OVER..!", 500, 250);
    pen.fillStyle = "white";
    pen.font = "20px Arial";
    pen.fillText("PRESS F5 TO PLAY AGAIN", 510, 300);
    pen.fillStyle = "white";
    pen.font = "30px Arial";
    pen.fillText("THANKS FOR PLAYING", 475, 600);
}
function playAgain() {
    init();
    gameloop();
    interval = setInterval(gameloop,150);
    
}
playAgain();