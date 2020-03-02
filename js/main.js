// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
    const num = Math.floor(Math.random() * (max - min)) + min; // Other eg -> + 1<-
    return num;
}

function Shape(x, y, velX, velY, exists) {
    this.x = x;
    this.y = y;
    this.velX = velX;
    this.velY = velY;
    this.exists = exists;
}

function Ball(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, velX, velY, exists);
    this.color = color;
    this.size = size;
}

function EvilCircle(x, y, velX, velY, exists, color, size) {
    Shape.call(this, x, y, 20, 20, exists);  //"20,20," velX & Y breaks it!
    this.color = color;
    this.size = size;
}

EvilCircle.prototype.draw = function () {
    ctx.beginPath();
    lineWidth = 3;
    ctx.strokeStyle = 'white';
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
}
EvilCircle.prototype.checkBounds = function () {
    if ((this.x + 10) >= width) {
        this.x -= 10;
    }

    if ((this.x - 10) <= 0) {
        this.x += 10;
    }

    if ((this.y + 10) >= height) {
        this.y = height - 20;
    }

    if ((this.y - 10) <= 0) {
        this.y = 20;
    }
    evilCircle.draw();
}

EvilCircle.prototype.setControls = function () {
    let _this = this;
    window.onkeydown = function (e) {
        if (e.key === 'a') {
            _this.x -= _this.velX;
        } else if (e.key === 'd') {
            _this.x += _this.velX;
        } else if (e.key === 'w') {
            _this.y -= _this.velY;
        } else if (e.key === 's') {
            _this.y += _this.velY;
        }
    }
}

EvilCircle.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        //if (!(this === balls[j])) {
        if (balls[j].exists) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);
//console.log(distance < this.size + balls[j].size);
            if (distance < this.size + balls[j].size) {
//console.log('EAT IT:this.size=' + this.size);
                balls[j].exists = false;
            }
        }
    }
}

Ball.prototype.draw = function () {
    ctx.beginPath();
    ctx.fillStyle = this.color;
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.fill();
}



Ball.prototype.update = function () {
    if ((this.x + this.size) >= width) {
        this.velX = -(this.velX);
    }

    if ((this.x - this.size) <= 0) {
        this.velX = -(this.velX);
    }

    if ((this.y + this.size) >= height) {
        this.velY = -(this.velY);
    }

    if ((this.y - this.size) <= 0) {
        this.velY = -(this.velY);
    }

    this.x += this.velX;
    this.y += this.velY;
}



Ball.prototype.collisionDetect = function () {
    for (let j = 0; j < balls.length; j++) {
        if (!(this === balls[j])) {
            const dx = this.x - balls[j].x;
            const dy = this.y - balls[j].y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < this.size + balls[j].size) {
                balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
            }
        }
    }
};

const size = random(10, 20);
const EvilX = random(0 + size, height - size);
const EvilY = random(0 + size, height - size);
const EvilVelX = random(-7, 7);
const EvilVelY = random(-7, 7);
let evilCircle = new EvilCircle(
    EvilX,
    EvilY,
    EvilVelX,
    EvilVelY,
    'white',
    true,
    10
);

let balls = [];

while (balls.length < 2500) {
    const size = random(10, 20);
    let ball = new Ball(
        // ball position always drawn at least one ball width
        // away from the edge of the canvas, to avoid drawing errors
        random(0 + size, width - size),
        random(0 + size, height - size),
        random(-7, 7),
        random(-7, 7),
        true,
        'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')',
        size
    );
    //console.log('exists='+ball.exists);
    balls.push(ball);
}

//console.log({balls})



function loop() {
    /*****gimme an evil circle
const size = random(10, 20);
const EvilX = random(0 + size, height - size);
const EvilY = random(0 + size, height - size);
const EvilVelX = random(-7, 7);
const EvilVelY = random(-7, 7);
let evilCircle = new EvilCircle(
EvilX,
EvilY,
EvilVelX,
EvilVelY,
'white',
true,
10
); **************/
    evilCircle.draw();
    evilCircle.setControls();
    evilCircle.checkBounds();
    evilCircle.collisionDetect();
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists === true) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
    }

    requestAnimationFrame(loop);
}

loop();