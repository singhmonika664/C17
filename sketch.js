//to give variables to the objects
 var banana ,monkey ,obstacle;
//to give variables to the images
 var  bananaImage, monkey_running, obstacleImage;
//to make sepeate groups 
 var bananaGroup, obstacleGroup;
//variables for score & survivalTime
 var score; 
 var survivalTime ;


//to load images ,sounds & animatuions here
function preload(){
  
//to load images here  
  monkey_running =         loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
}


//to set up all the variables
function setup() {
//to create a canvas  
  //createCanvas(600, 580);
  
//to create new groups  
  bananaGroup = createGroup();  
  obstacleGroup = createGroup();
  
//to create a sprite for monkey,add animation and scale  
  monkey=createSprite(80,315,20,20);
  monkey.addAnimation("monkey",monkey_running);
  monkey.scale=0.1;

//to create a sprite for ground, and add velocity  
  ground=createSprite(400,350,1200,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
//to set score as 0
  score = 0;
  
//to set survival time as 0
  survivalTime = 0;
}


function draw() {
//to add a background color  
  background("white");
  
//to display a text as score
  stroke("black");
  textSize(20);
  fill("black");
  text("Score:" +score,100,80);
  
//to display a text as survival time and maintain it 
  stroke("black");
  textSize(20);
  fill("black");
  survivalTime = Math.ceil(frameCount/frameRate()); 
  text("Survival Time:" +survivalTime,100,50);    
 
//to set another ground when first one finishes  
  if(ground.x < 0){
    ground.x = ground.width/2;
  }
  
//to make the monkey jump when the space key is pressed
  if(keyDown("space")&& monkey.y >= 260) {
    monkey.velocityY = -12;
  }  

//to add gravity
 monkey.velocityY = monkey.velocityY + 0.8; 
  
//to make the monkey collide with the ground  
 monkey.collide(ground); 
  
//to spawn bananas
  spawnbanana();
  
//to spawn obstacles
  spawnobstacle();
  
//to set the score  
  if(bananaGroup.isTouching(monkey)){
     bananaGroup.destroyEach();
     score = score + 1;
}
  
//to stop everything when monkey touches the obstacle
  if(obstacleGroup.isTouching(monkey)){
    ground.velocityX = 0;
    monkey.velocityX = 0;
    obstacleGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);  
  }  
  
//to draw sprites  
  drawSprites();
  
}


//seperate function for banana
function spawnbanana() {
//code to spawn bananas after every 80 frames
  if (frameCount % 80 === 0) {
//to create a sprite as banana   
    var banana = createSprite(600,250,40,10);
//to spawn banana at random y axis     
    banana.y = Math.round(random(120,200));
//to add image of banana    
    banana.addImage(bananaImage);
//to add scale to the image of banana
    banana.scale = 0.05  ;
//to give velocity to banana to make it move leftwards     
    banana.velocityX = -5;
//to assign lifetime to banana
    banana.lifetime = 200;
//to adjust the depth and make the monkey overlap the banana
    banana.depth = monkey.depth;
    monkey.depth = banana.depth + 1;
//add each banana to the group
    bananaGroup.add(banana);
}
}


//seperate function for obstacles
function spawnobstacle() {
//code to spawn obstacles after every 300 frames
  if (frameCount % 300 === 0) {
//to create a sprite as obstacles   
    var obstacle = createSprite(800,320,10,40);
//to add image of obstacles    
    obstacle.addImage(obstacleImage);
//to add scale to the image of obstacles 
    obstacle.scale = 0.15 ;
//to give velocity to obstacles to make it move leftwards     
    obstacle.velocityX = -3;
//to assign lifetime to obstacles
    obstacle.lifetime = 500;
//to adjust the dept and make the monkey overlap the obstacle
    obstacle.depth = monkey.depth;
    monkey.depth = obstacle.depth + 1;
 
    
//add each obstacles to the group
    obstacleGroup.add(obstacle);
 }    
}




