"use strict";
var ENEMYPOSITIONS = [60, 140, 220];
// Enemies our player must avoid
var win = 200;
var Enemy = function(x,y,s) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
    this.s = s;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.s*dt;
    if(this.x > 504){
        this.x = -100;
        this.y = ENEMYPOSITIONS[Math.floor(Math.random() * ENEMYPOSITIONS.length)];
        this.speed = 100 + Math.floor(Math.random() * 512);
    }
    var dx = Math.abs(this.x - player.x);
    var dy = Math.abs(this.y - player.y);
    if(dx < 30 && dy < 30){
        player.x = 200;
        player.y = 380;
        player.score = 0;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y,s){
    this.x = x;
    this.y = y;
    this.s = s;
    this.sprite = 'images/char-boy.png';
    this.score = 0;
}

Player.prototype.update = function(){
        // Prevent player from moving beyond canvas wall boundaries
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }
    // Check for player reaching top of canvas and winning the game
    if (this.y < 0) {
        this.score += 40;
        if(this.score == win){
            swal("Hoorayy !!", "You won!", "success");
            this.score = 10;
        }
        this.x = 200;
        this.y = 380;

    }

}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}
Player.prototype.handleInput = function(e){
    switch(e){
        case 'left': this.x -= this.s + 50; break;
        case 'right': this.x += this.s + 50; break;
        case 'down': this.y += this.s + 30;  break;
        case 'up': this.y -= this.s + 30; break;
    }
    console.log(this.x,this.y);
}
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = new Array();
var player = new Player(200,380,50);
var enemy;
ENEMYPOSITIONS.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});
console.log(allEnemies);
console.log(player);
var POSITION_X  = [0, 100, 200, 300, 400, 500, 600];
var POSITION_Y = [160, 230, 310, 390];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
