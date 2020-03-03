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

EvilCircle.prototype.draw = function (strokeColor) {
    ctx.beginPath();
    ctx.strokeStyle = strokeColor;
    ctx.lineWidth = 6;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
    ctx.stroke();
}
EvilCircle.prototype.checkBounds = function () {
    if ((this.x + 10) >= width) {
        this.x -= width;
    }

    if ((this.x - 10) <= 0) {
        this.x += width;
    }

    if ((this.y + 10) >= height) {
        this.y -= height;
    }

    if ((this.y - 10) <= 0) {
        this.y += height;
    }
    evilRED.draw('red');
    evilGRN.draw('green');
}
/********* 
 function readControls(whoDunIt, whichWay) {
************/
document.addEventListener('keydown', logKey);
let whichWay = '';
let whoDunIt = '';

function logKey(e) {
    //log.textContent += ` ${e.code}`;
//}
    console.log('line 65 - initialized readControls');
    //window.keydown = function (e) {
        console.log('line 66 - running readControls method');
        whichWay = e.keyCode;
        whoDunIt = ""
    console.log('green match=' + greenKeys.indexOf(whichWay) + 'red match=' + redKeys.indexOf(whichWay));
        if (redKeys.indexOf(whichWay) != '-1' ) {
console.log('evilRED');
            whoDunIt = 'red';
            evilRED.setControls(whichWay, redKeys);
        } else if (greenKeys.indexOf(whichWay) != '-1') {
console.log('evilGRN');
            whoDunIt = 'green';
            evilGRN.setControls(whichWay, greenKeys);
        } else { console.log('should never be HERE, very BAD')}
        console.log('who=' + whoDunIt + ' way=' + whichWay);
}

EvilCircle.prototype.setControls = function (direction, keys) {
    let _this = this;
    console.log('direction=' + direction + ' keys=' + keys);
    if (keys.indexOf(direction) === 3) {
        _this.x -= _this.velX;
        console.log('left')
    } else if (keys.indexOf(direction) === 2) {
        _this.x += _this.velX;
    } else if (keys.indexOf(direction) === 0) {
        _this.y -= _this.velY;
    } else if (keys.indexOf(direction) === 1) {
        _this.y += _this.velY;
    }
}

EvilCircle.prototype.collisionDetect = function (numEaten) {
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
                ballsInPlay--;
                numEaten--;
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

let greenKeys = [
    38,     //up
    40,     //down
    39,     //right
    37      //left
]

let redKeys = [
    87,     //up
    83,     //down
    68,     //right
    65      //left
]

let redPoints = grnPoints = 0;
const size = 10;
let EvilX = random(0 + size, height - size);
let EvilY = random(0 + size, height - size);
//const EvilVelX = random(-7, 7);
//const EvilVelY = random(-7, 7);
let evilRED = new EvilCircle(
    EvilX,
    EvilY,
    0,
    0,
    'red',
    true,
    10
);

EvilX = random(0 + size, height - size);
EvilY = random(0 + size, height - size);
let evilGRN = new EvilCircle(
    EvilX,
    EvilY,
    0,
    0,
    'green',
    true,
    10
);

let ballsInPlay = 0;
let balls = [];

while (balls.length < 240) {
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
    ballsInPlay++;
}

//console.log({balls})


let player = '';
let move;
//readControls(player, move);
function loop() {
    /* console.log('play=' + player + ' move=' + move);
    if (player == 'red') {
        console.log("in if")
        evilRED.setControls(move, redKeys);
    } else if (player == 'green') {
        console.log("in else")
        evilGRN.setControls(move, greenKeys);
    }***************/

    //evilRED.draw('red');
    evilRED.checkBounds();
    evilRED.collisionDetect(redPoints);

    //evilGRN.draw('green');
    evilGRN.checkBounds();
    evilGRN.collisionDetect(grnPoints);

    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < balls.length; i++) {
        if (balls[i].exists === true) {
            balls[i].draw();
            balls[i].update();
            balls[i].collisionDetect();
        }
    }

    document.getElementById("ballCount").innerHTML = ballsInPlay;

    requestAnimationFrame(loop);
}

loop();