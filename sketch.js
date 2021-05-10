var play,close,bgImg,bgMusic,storyPanel,storyImg,story,MissionMusic,playButton,SoldierbgImg,buttonImg,SoldierINV,mobSoldierImg,
arrow,arrowImg,soldierImgLeft,edges;

var wall1,wall2,wall3,wall4,wall5,wall6,wall7,wall8,wall9,wall10,wall11,wall12;
var hallway1,hallway2,hall1Img,hall2Img;

var enemy1,enemy2,enemy3,enemy4,enemyImg,enemyGroup,enemyImgRight;
var gun,mobile;
var lab,secRoom,weapons,labImg,secImg,weaponsImg
var gameState = 0;


function preload(){
    storyImg = loadImage("images/mission.PNG");
    soldierImg = loadImage("images/gunSoldier.png");
    bgImg = loadImage("images/soldier bg img.PNG");
    buttonImg = loadImage("images/playButton.png");
    MissionMusic = loadSound("Mission Sound.mp3");
    mobSoldierImg = loadImage("images/mobile soldier.png");
    arrowImg = loadImage("images/player pointer.png");
    soldierImgLeft = loadImage("images/gunSoldierLeft.png");
    enemyImg = loadImage("images/enemySoldier.png");
    enemyImgRight = loadImage("images/enemySoldierRight.png")
    labImg = loadImage("images/researchLab.png");
    secImg = loadImage("images/securityRoom.jpg");
    weaponsImg = loadImage("images/weapon room.jpg");
    hall1Img = loadImage("hallway.jpg");
    hall2Img = loadImage("hallway.jpg");
}

function setup(){
  createCanvas(displayWidth-30,displayHeight-30);
  edges = createEdgeSprites();
  storyPanel = createSprite(displayWidth/2,displayHeight-20,displayWidth/2+200,displayHeight/2-20);
  storyPanel.shapeColor = "white";
  storyPanel.velocityY = -5;

  playButton = createSprite(displayWidth/2,displayHeight/2-20,50,30);
  playButton.addImage(buttonImg);
  playButton.scale = 0.25;
  playButton.visible = false;

  //hallway1 = createSprite((displayWidth-30)/2,(displayHeight-30)/2);
  //hallway1.addImage(hall1Img)

  secRoom = createSprite(displayWidth-275,displayHeight/2-275);
  secRoom.addImage(secImg);
  secRoom.scale = 0.75;
  secRoom.visible = false;

  weapons = createSprite(185,displayHeight/2-300);
  weapons.addImage(weaponsImg);
  weapons.scale = 0.35;
  weapons.visible = false;

  lab = createSprite(240,displayHeight-210);
  lab.addImage(labImg);
  lab.scale = 1.1;
  lab.visible = false;

  Soldier = createSprite(displayWidth-250,height/2+250,50,75);
  Soldier.addImage(soldierImg);
  Soldier.scale = 0.20;
  Soldier.setCollider("circle",0,0,250)
  Soldier.visible = false;
  Soldier.debug = true;

  arrow = createSprite(Soldier.x-20,Soldier.y-75);
  arrow.addImage(arrowImg);
  arrow.scale = 0.05;
  arrow.visible = false;


  walls();
  createEnemies();
    
  //gun = createSprite(Soldier.x+5,Soldier.y);
  //gun.shapeColor = "red";
  //gun.visible = false;


  //mobile = createSprite(Soldier.x+5,Soldier.y);
  //mobile.shapeColor = "green";
  //mobile.visible = false;
}

function draw(){
  if (gameState===0){
    //MissionMusic.play();
    //MissionMusic.amp(0.2);
    background(bgImg);
    storyPanel.addImage(storyImg);
    if(storyPanel.y<0){
      playButton.visible = true;
      if(mousePressedOver(playButton)){
        gameState=1;
      }
    }
  }

  if(gameState===1){
    background(0);
    storyPanel.visible = false;
    playButton.visible = false;
    Soldier.visible = true;
    arrow.visible = true;
    secRoom.visible = true;
    weapons.visible = true;
    lab.visible = true;
    wallVis(); 
    enemyVis();

    arrow.x = Soldier.x-20;
    arrow.y = Soldier.y-75;

    soldCollide();
    enemyAttack();
    //gun.x = Soldier.x+5;
    //gun.y = Soldier.y;
    //gun.visible = true;

    //mobile.x = Soldier.x+5;
    //mobile.y = Soldier.y;gun.x = Soldier.x+5;

    //camera.position.x = Soldier.x;
    //camera.position.y = Soldier.y;
  
   
    KEYDOWN();
    keyUP(); 
  }

drawSprites();
}

function KEYDOWN(){
  if(keyDown("d")){
    Soldier.setVelocity(5,0);
    Soldier.addImage(soldierImg);
  }
  if(keyDown("a")){
    Soldier.setVelocity(-5,0);
    Soldier.addImage(soldierImgLeft);
  }
  if(keyDown("w")){
    Soldier.setVelocity(0,-5);
  }
  if(keyDown("s")){
    Soldier.setVelocity(0,5);
  }

  if(keyDown("1")){
    Soldier.addImage(soldierImg);
  }
  if(keyDown("2")){
    Soldier.addImage(mobSoldierImg);
  }
}

function keyUP(){
  if(keyWentUp("d")){
    Soldier.setVelocity(0,0);
  }
  if(keyWentUp("a")){
    Soldier.setVelocity(0,0);
  }
  if(keyWentUp("w")){
    Soldier.setVelocity(0,0);
  }
  if(keyWentUp("s")){
    Soldier.setVelocity(0,0);
  }
}

function walls(){
  
  wall1 = createSprite(displayWidth-250,height/2+100,450,20)
  wall2 = createSprite(displayWidth-250-450/2-5,displayHeight/2+150,20,150)

  wall3 = createSprite(displayWidth-250,height/2-100,540,20);
  wall4 = createSprite(displayWidth-250-450/2-5-50,displayHeight/2-180,20,150);

  wall5 = createSprite(250,height/2+50,500,20);
  wall6 = createSprite(490,height/2+150,20,200);

  wall7 = createSprite(200,height/2-150,400,20);
  wall8 = createSprite(400,height/2-360,20,125);

  wall1.visible = false;
  wall2.visible = false;
  wall3.visible = false;
  wall4.visible = false;
  wall5.visible = false;
  wall6.visible = false;
  wall7.visible = false;
  wall8.visible = false;
}
function soldCollide(){
  Soldier.collide(wall1);
  Soldier.collide(wall2);
  Soldier.collide(wall3);
  Soldier.collide(wall4);
  Soldier.collide(wall5);
  Soldier.collide(wall6);
  Soldier.collide(wall7);
  Soldier.collide(wall8);
  Soldier.collide(edges);
}

function wallVis(){

  wall1.visible=true;
  wall2.visible=true;
  wall3.visible=true;
  wall4.visible=true;
  wall5.visible=true;
  wall6.visible=true;
  wall7.visible=true;
  wall8.visible=true;
}

function createEnemies(){

  enemyGroup = createGroup();

  enemy1 = createSprite(width/2,100);
  enemy1.addImage(enemyImg);
  enemy1.scale = 0.25;
  enemy1.visible = false;
  enemy1.debug = true;
  enemy1.setCollider("rectangle",0,0,2000,2000);

  enemy2 = createSprite(width-100,height/2);
  enemy2.addImage(enemyImg);
  enemy2.scale = 0.25;
  enemy2.visible = false;
  enemy2.debug = true;
  enemy2.setCollider("rectangle",0,0,2000,2000);

  enemy3 = createSprite(width/2,height-100);
  enemy3.addImage(enemyImg);
  enemy3.scale = 0.25;
  enemy3.visible = false;
  enemy3.setCollider("rectangle",0,0,2000,2000);

  enemy4 = createSprite(100,height/2-50);
  enemy4.addImage(enemyImg);
  enemy4.scale = 0.25;
  enemy4.visible = false;
  enemy4.setCollider("rectangle",0,0,2000,2000);

  //enemyGroup.bounceOff(wall4);
  enemyGroup.add(enemy1);
  enemyGroup.add(enemy2);
  enemyGroup.add(enemy3);
  enemyGroup.add(enemy4);

  //enemyGroup.setVelocityEach(5,2);
}

function enemyAttack(){

  background(0);
  
  enemyGroup.bounceOff(wall1);
  enemyGroup.bounceOff(wall2);
  enemyGroup.bounceOff(wall3);
  enemyGroup.bounceOff(wall4);
  enemyGroup.bounceOff(wall5);
  enemyGroup.bounceOff(wall6);
  enemyGroup.bounceOff(wall7);
  enemyGroup.bounceOff(wall8);

  enemyGroup.bounceOff(edges);
  //enemyGroup.x

  // Adjusting the enemy's position according to the soldier's position
  for(var i = 0;i<enemyGroup.length;i++){

    if(enemyGroup.get(i).x<Soldier.x){
      enemyGroup.get(i).addImage(enemyImgRight);
    }else{
      enemyGroup.get(i).addImage(enemyImg);
    }
  }

  //Condition to attack the soldier
  for(var i = 0;i<enemyGroup.length;i++){

  if(enemyGroup.get(i).isTouching(Soldier)){
    var  bullet = createSprite(enemyGroup.get(i).x,enemyGroup.get(i).y,50,20);
    bullet.shapeColor = "red";
    bullet.velocityX = 5;

    console.log("attack");
  }
}

}

function enemyVis(){
  enemy1.visible = true;
  enemy2.visible = true;
  enemy3.visible = true;
  enemy4.visible = true;

  //enemyGroup.setVelocityEach(5,2);
}