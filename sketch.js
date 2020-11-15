var ironman,ironmanImage;
var sky,skyImage;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score=0;
var enemy,enemyImage;
var enemyGroup;
var missile,missileImage;
var missileGroup;


function preload(){
  skyImage=loadImage("sky.jpg");
   ironmanImage=loadImage("Mr Stark.jpg");
   enemyImage=loadImage("Enemy.JPG"); 
  missileImage=loadImage("missile.JPG");
}


function setup() {
  createCanvas(550, 550);
  
  sky = createSprite(275,275,10,10)
  sky.addImage(skyImage);
  sky.scale=2;
  
  ironman = createSprite(75,270,10,10)
  ironman.addImage(ironmanImage);
  ironman.scale=0.4;
  
  
  enemyGroup= createGroup();
  missileGroup= createGroup();
}

function draw() {
  background("white");
  
  
  if (gameState===PLAY)
{
  sky.velocityX = -(4 + 5* score/100)
    
    score = score + Math.round(getFrameRate()/60);
    if (sky.x < 100){
      sky.x = sky.width;
    }
  ironman.y=World.mouseY;
  
  spawnEnemy();
  
  if(enemyGroup.isTouching(ironman)){
    enemyGroup.destroyEach();
    gameState = END;
       
    }
  if(keyDown("space")){
   spawnMissile();
    }
  
  if(enemyGroup.isTouching(missileGroup)){
    enemyGroup.destroyEach();
    missileGroup.destroyEach();
    }
}  
  if (gameState===END){
    ironman.visible=false;
    missileGroup.destroyEach();
    textSize(44);
    fill("black")
    text("GAME OVER",160,250);
    
  }
  
  
  
  
  
  
  drawSprites();
  textSize(15);
  fill("black");
  text("Survival Time:"+score,400,50);
  text("Press Space to Shoot Or Dodge from Planes",25,25);
}
function spawnEnemy(){
  if (frameCount % 120 === 0) {
    enemy = createSprite(600,120,40,10);
    enemy.y = Math.round(random(120,440));
    enemy.addImage(enemyImage);
    enemy.scale = 0.4;
    enemy.velocityX = -(4 + 5* score/100);
    enemy.lifetime = 600;
    enemy.depth = ironman.depth;
    ironman.depth = ironman.depth + 1;
    enemyGroup.add(enemy);
  }
  }
  function spawnMissile(){
   missile=createSprite(ironman.x,ironman.y,10,10);
    missile.addImage(missileImage);
    missile.velocityX=5;
    missile.scale=0.15;
    missile.depth=ironman.depth;
    ironman.depth+=1;
    missileGroup.add(missile);

}




