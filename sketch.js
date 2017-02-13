
var dots = [];
var energy = 0; //starting value of energy
var singleShake = 0;
var maxEnergy= 1000; //max energy for eathquake
var button1;
var button2;
var cover;

var myImage1;
var myImage2;

var fontTitle;

function preload() {
    cover = loadImage("Tavola disegno 18-100.jpg");
    myImage1 = loadImage("prova1.png");
    myImage2 = loadImage("prova2.jpg");
      fontTitle = loadFont("OCRBStd.otf");
}
    
function setup(){
    createCanvas(windowWidth, windowHeight);
}

function draw(){
     background(204);
     angleMode(DEGREES);  
     var magnitude = int(map(energy, 0, 1000, 0, 10)); 
    
     if (energy < 0.5) {
     image(cover,0,0,windowWidth,windowHeight); 
     } 
    else if (energy > 0.5 && energy < maxEnergy){
        
     textFont(fontTitle);
     textSize(height/30);
     textAlign(CENTER);
     textStyle(BOLD);
     fill(0);
     noStroke();
     text("EARTHQUAKE INTENSITY", width/2,height - height/1.1);
        
     //CREATE THE ELLIPSE AREA
    var x = width/2;
    var y = height/2;
    var r = energy * 2; 
    
    noFill();
    stroke(0);
    strokeWeight(1);
    ellipse (x, y, r, r);

    //magnitude indication
    fill(0);
    noStroke();    
    
    textSize(height/15);
    textAlign(CENTER);
    textStyle(NORMAL);
    text("Magnitude", width/2, height - height/5);
        
    textSize(height/20);
    textAlign(CENTER);
    textStyle(BOLD);
    text(magnitude,width/2, height - height/6.7);
           
    button1 = createButton("See results");
    button1.position(width/7,(height/15)*14);
    button1.touchStarted(results);
        
    button2 = createButton("Try again");
    button2.position((width/7)*5, (height/15)*14);
    button2.touchStarted(clearEverything);   
        
    } else if(energy >= maxEnergy) {
    textSize(height/20);
    textAlign(CENTER);
    textStyle(BOLD);
    text("10",width/2, height - height/6.7)
    energy = maxEnergy;
    background(204,0,0);
   }
    
    //draw dots and given methods (actions)
      noStroke();
      fill(0);
      for (var i = 0; i < energy * 100; i++){
        dots[i].move();
        dots[i]. display();  
      }
}

function deviceShaken(){
    
   singleShake = abs(accelerationX) + abs(accelerationY) + abs(accelerationZ);
   energy += singleShake; 
   
    //create objects
    for (var i = 0; i < energy*100; i++){
        dots.push(new QuakeDots());
    } 
    
}
    
function QuakeDots(){ 
    var a = random(0,360);
    var b = random(0,energy * 1.6);
    var x = sin(a) * b; // mi dà un numero che va da -b a b
    var y = cos(a) * b; // mi dà un numero che va da -b a b
    var d = dist(width/2,height/2, width/2, height/2 + x/2);
    
    this.xdot = random(width/2 - d, width/2 + d); //according to ellipse area
    this.ydot = random(height/2 - d, height/2 + d); //according to ellipse area
    this.diameter = 6;
    this.speed = 4; //according to magnitude

    this.move = function(){
    this.xdot += random(-this.speed,this.speed);
    this.ydot += random(-this.speed,this.speed);
 
    }

    this.display = function(){
    if(this.xdot > width/2 + d || this.xdot < width/2 - d || this.ydot > height/2 + d || this.ydot < height/2 - d){
       this.xdot = random(width/2 - d, width/2 + d);
       this.ydot = random(height/2 - d, height/2 + d); 
       }
    ellipse(this.xdot, this.ydot, this.diameter, this.diameter);
    };
 
}

    // result buttons
 function results() {
     if (magnitude <= 6){
         image(myImage1,0,0,windowWidth,windowHeight);
     } else {
         image(myImage2,0,0,windowWidth,windowHeight);
     }
  
 }

 function clearEverything() {
    background(204);
    energy = 0;
 }

function windowResized(){
    resizeCanvas(windowWidth,windowHeight);
  }


