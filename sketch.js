var issimg, bg, ship1, ship2, ship3, ship4, iss;
var hasDocked;

function preload(){
  issimg = loadImage("./assets/iss.png");
  bg = loadImage("./assets/spacebg.jpg");
  ship1 = loadImage("./assets/spacecraft1.png");
  ship2 = loadImage("./assets/spacecraft2.png");
  ship3 = loadImage("./assets/spacecraft3.png");
  ship4 = loadImage("./assets/spacecraft4.png");
}
function setup(){
  createCanvas(windowWidth, windowHeight);
  iss = createSprite(width/2, height/2);
  iss.addAnimation("iss", issimg);
  iss.scale = 0.65;

  issDockStation = createSprite(408, 690, 40, 40);
  issDockStation.visible = false;

  spaceCraft = createSprite(Math.round(random(30, windowWidth)), Math.round(random(0, windowHeight)));
  spaceCraft.addAnimation("ship", ship1);
  spaceCraft.addAnimation("2smoke", ship2);
  spaceCraft.addAnimation("leftsmoke", ship3);
  spaceCraft.addAnimation("rightsmoke", ship4);
  spaceCraft.scale = 0.25

  hasDocked = false;
}

function draw() {
  resizeCanvas(windowWidth, windowHeight);
  iss.x = width/2;
  iss.y = height/2;
  background(bg);
  if (!hasDocked){
    console.log(spaceCraft.x);
    console.log(spaceCraft.y);
    if (keyIsDown(LEFT_ARROW)){
      spaceCraft.changeAnimation("rightsmoke");
      spaceCraft.x -= 3;
    }
    if (keyIsDown(RIGHT_ARROW)){
      spaceCraft.changeAnimation("leftsmoke");
      spaceCraft.x += 3;
    }
    if(keyIsDown(DOWN_ARROW)){
      spaceCraft.changeAnimation("2smoke");
      spaceCraft.y -= 4;
    }
    if (keyIsDown(UP_ARROW)){
      if (spaceCraft.y > issDockStation.y){
        spaceCraft.y -= 1;
      }
      else if (spaceCraft.y <issDockStation.y){
        spaceCraft.y += 1;
      }
      if (spaceCraft.x > issDockStation.x){
        spaceCraft.x -= 1;
      }
      else if (spaceCraft.x < issDockStation.x){
        spaceCraft.x += 1;
      }
    }
    if (spaceCraft.isTouching(issDockStation)){
      hasDocked = true;
    }
  }
  else{
    iss.visible = false;
    spaceCraft.visible = false;
    fill(250, 250, 250);
    textFont("Trebuchet MS");
    textAlign(CENTER);
    textSize(50);
    text("Well Done! Docking Complete!", width/2, height/2);
  }
  drawSprites();
}