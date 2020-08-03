//Create variables here
var dog, happyDog;
var database;
var foodS, foodStock;

function preload()
{
  //load images here
  dogImg = loadImage("images/dogImg.png");
  happyDogImg = loadImage("images/dogImg1.png")
}

function setup() {
  canvas = createCanvas(500, 500);
  dog = createSprite(200,400);
  //happyDog = createSprite();
  dog.addImage(dogImg);
  //happyDog.addImage(happyDogImg);
  dog.scale = 0.3;
  database = firebase.database();
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

}


function draw() { 
  background(46, 139, 87);
  
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    dog.addImage(happyDogImg);
  }
  

  drawSprites();
  //add styles here
  textSize(20);
  text("Note: Press the up arrow key to feed Drago!",50,50);
  text("Food Remaining:"+foodS,200,100);


}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x<=0){
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}



