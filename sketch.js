//MONKEY GO HAPPY

//..............................................................
//Global Variables
var banana, bananaImage, bananaGrp;
var obstacleImage, ObstacleGroup; 
var groundImage, ground; 
var score;
var monkey, monkeyImg;
var invisibleGround;
var PLAY = 0;
var END = 1;
var gameState = PLAY;
var restartImg, restart;
var gameOvrImg, gameOvr;

//..............................................................
//preload function
function preload(){ 
  
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
  groundImage = loadImage("jungle.jpg");
  monkeyImg = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  restartImg = loadImage("restart.png");
  gameOvrImg = loadImage("gameOver.png");
}

//..............................................................
//setup function
function setup() {

createCanvas(400,300);
  
  ground = createSprite(0, -120);
  ground.addImage("ground", groundImage);
  ground.x = ground.width /2;

  monkey = createSprite(100, 250, 10, 10);
  monkey.addAnimation("monkey", monkeyImg);
  monkey.scale = 0.12;

  invisibleGround = createSprite(200, 275, 400, 50);
  invisibleGround.visible = false;

  score = 0;

  bananaGrp = createGroup();

  ObstacleGroup = createGroup();
}

//..............................................................
//draw function
function draw(){

  //background color
  background("black");

  //monkey.debug = true;
  //ObstacleGroup.debug = true;

  //when gamestate is play
  if (gameState === PLAY) {

    //for score
    stroke("white");
    textSize(20);
    fill("white");
    text(score, 325, 290);
    text("score:", 265, 290);

    //creating bananas and obstacles in the game
    bananas(); 
    obstacles();

    //not letting monkey go down
    monkey.collide(invisibleGround);

    //to make monkey jump
    if (keyDown ("space")) {
      monkey.velocityY = -12 ;  
    }

    //to move ground
    ground.velocityX = -6;

    //creating an infinite ground
    if (ground.x < 0) {

      ground.x = ground.width /2;  
    }

    //adding gravity for monkey
    monkey.velocityY = monkey.velocityY + 0.8;

    //when monkey eats bananas
    if (monkey.isTouching(bananaGrp)) {

      bananaGrp.destroyEach();
      score = score + 1;
    }

    //when monkey toches stone
    if (ObstacleGroup.isTouching(monkey)) {

      gameState = END;
    }
  
  //when gamestate is end
  }else if(gameState === END) {

    //for bananas
    bananaGrp.setVelocityXEach = 0;
    bananaGrp.setLifetimeEach(-1);

    //for obstacles
    ObstacleGroup.setVelocityXEach = 0;
    ObstacleGroup.setLifetimeEach(-1);

    //for ground
    ground.velocityX = 0;

    //for monkey
    monkey.velocityY = 0;

    //for groups
    ObstacleGroup.setLifetimeEach(-1);
    bananaGrp.setLifetimeEach(-1);

    //for restart button
    restart = createSprite(200, 200, 10, 10);
    restart.addImage("restart", restartImg);
    restart.scale = 0.5;

    //for gameover
    gameOver = createSprite(200, 150, 10, 10); 
    gameOver.addImage("gameOvr", gameOvrImg);
    gameOver.scale = 0.5;
  }

  //when restart button is pressed
  if (mousePressedOver(restart) && gameState === END) {

    gameState = PLAY;
  }

  //to draw sprites
  drawSprites();
}

//..............................................................
//banana funtion
function bananas() {

  //creating bananas
  if (frameCount %50 === 0) {  
    
    //creating bananas
    banana = createSprite(600, 200, 10, 10);
    
    //adding animation for bananas 
    banana.addImage("banana", bananaImage);
    
    //scale bananas
    banana.scale = 0.05;
    
    //velocity for bananas
    banana.velocityX = -6;
    
    //creating bananas at random positions
    banana.y = random(20, 150);
    
    //adding banana to banana group
    bananaGrp.add(banana);
    
    //lifetime for bananas
    banana.lifetime = 100;
  }
}

//..............................................................
//obstacles funtion
function obstacles() {

  //creating obstacles
  if (frameCount %150 === 0) {
    
    //creating obstacles
    obstacle = createSprite(400, 220, 10, 10);
    
    //adding animation for obstacles
    obstacle.addImage("obstacle", obstacleImage);
    
    //scaling obstacles
    obstacle.scale = 0.25;
    
    //velocity for obstacles
    obstacle.velocityX = -6;
    
    //adding obstacle to obstacle group
    ObstacleGroup.add(obstacle);
    
    //lifetime for obstacles
    obstacle.lifetime = 75;
  }
}

//..............................................................
//______________________________________________________________

//END END END END END END END END END ENC END END END END END 

//______________________________________________________________