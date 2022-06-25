var bg, bgImage;
var player,playerAnim;
var obstacle,obstacle1, obstacle1Image, obstacle2, obstacle2Image, obstacleGroup;
var invisibleGround;
var energyDrink, energyDrinkImage, energyDrinkGroup;
var score = 0;
var PLAY = 1;
var END = 0;
var gameStates = PLAY;
var gameOvers, gameOverImage;
var reset,resetImage;

function preload() {
  bgImage = loadImage("assets/bg.png");
  playerAnim = loadAnimation("assets/gif/0001.png","assets/gif/0002.png","assets/gif/0003.png","assets/gif/0004.png","assets/gif/0005.png","assets/gif/0006.png");
  obstacle1Image = loadImage("assets/obstacle1.png")
  obstacle2Image = loadImage("assets/obstacle2.png")
  energyDrinkImage = loadImage("assets/energyDrink.jpg")
  gameOverImage = loadImage("assets/gameOver.png");
  resetImage = loadImage("assets/reset.png");
}

function setup() {
  createCanvas(600,400);
  bg = createSprite(0,-50,0,0);
  bg.velocityX = -2;
  bg.x = width/2;

  invisibleGround = createSprite(300,400,900,10);
  invisibleGround.visible = false;

  bg.addImage(bgImage);
  // bg.x = bg.width/2;
  bg.scale =3;
  player = createSprite(50, 300, 50, 50)
  player.addAnimation('playerRunning', playerAnim);
  player.scale = 0.8;
  energyDrinkGroup = createGroup();
  obstacleGroup = createGroup();
}

function draw() {
  background(255,255,255);  
  
  if(gameStates === PLAY){

    createObstacle1()
    createEnergyDrink()

    if(bg.x < 0){
      bg.x = bg.width/2;
    }

    if(energyDrinkGroup.isTouching(player)){
      score = score + 1;
      energyDrink.destroy();
    }
    if(keyDown("UP_ARROW") && player.y > 200){  
      player.y -= 3;
    }
  
    if(keyDown("Down_ARROW")){  
      player.y += 3;
    }

    if(obstacleGroup.isTouching(player)){
      gameStates = END;
    }

    for(var i = 0; i<obstacleGroup; i++){
      obstacleGroup.destroy[i];
    }
  }
  if(gameStates === END){
    player.destroy()
    bg.velocityX = 0;
    obstacleGroup.destroyEach()
    energyDrinkGroup.destroyEach()
    gameOver()
  }

  player.collide(invisibleGround);
  drawSprites();
  text("Score: " + score, 500,50)
}



function createObstacle1(){
  if(frameCount%120 === 0){
    var obstacle = createSprite(400,370,40,50);
    obstacle.y = Math.round(random(240,370))
    obstacle.scale = 0.03;
    obstacle.velocityX = -3;
    obstacleGroup.add(obstacle)
    var rand = Math.round(random(1,2));
    obstacleGroup[obstacle];
    switch(rand) {
      case 1: obstacle.addImage(obstacle1Image);
              break;
      case 2: obstacle.addImage(obstacle2Image);
              break;
    }
  }

}

function createEnergyDrink(){
  if(frameCount%200 === 0){
    energyDrink = createSprite(400,350,40,50);
    var rand = Math.round(random(1,2));
    energyDrink.scale = 0.07;
    energyDrink.y = Math.round(random(250,380));
    energyDrink.velocityX = -3;
    //var rand=roundoff(random(1,2))

    energyDrinkGroup.add(energyDrink)
    switch(rand){
      case 1: energyDrink.addImage(energyDrinkImage);
              break; 
      case 2: energyDrink.destroy();
              break;  
    }
  }
}

function gameOver(){
  gameOvers = createSprite(300,200,50,50);
  gameOvers.addImage(gameOverImage);
  reset = createSprite(300,320,50,50);
  reset.addImage(resetImage);
  reset.scale = 0.1;
}