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

var seeresults
var tryagain

var rect_widht = 60;
var rect_height = 10;
var a;
var b;
var c;

var fondo;



function preload() {
    //cover = createImg("gif.gif");
    cover = loadImage("Tavola disegno 18-100.jpg");
    myImage1 = loadImage("prova1.png");
    myImage2 = loadImage("prova2.jpg");
    fontTitle = loadFont("OCRBStd.otf");
}
    
function setup(){
    createCanvas(windowWidth, windowHeight);
    fondo = color(204);
}

function draw(){
     background(fondo);
    
    
     angleMode(DEGREES);  
     var magnitude = int(map(energy, 0, 1000, 0, 10)); 
    
     if (energy < 0.5) {
   image(cover,0,0,windowWidth,windowHeight);
        // cover.position (0,0);
        // cover.size(windowWidth,windowHeight);
  
     } 
    else if (energy > 0.5 && energy < maxEnergy){
     
        // TEXTS
        
     textFont(fontTitle);
     textSize(height/25);
     textAlign(CENTER);
     textStyle(BOLD);
     fill(0);
     noStroke();
     text("EARTHQUAKE INTENSITY", width/2,height - height/1.1);
       
           
    //magnitude indication
    fill(0);
    noStroke();    
    
    textSize(height/40);
    textAlign(CENTER);
    textStyle(NORMAL);
    text("Magnitude", width/2, height - height/5);
        
    textSize(height/230);
    textAlign(CENTER);
    textStyle(BOLD);
    text(magnitude,width/2, height - height/6.7);
     
      //buttons
         
  a = (width/8)*2
  b = ((height/15)*14)-3
  c = (width/8)*6
        
//a y b
    fill(0);
    noStroke();
    textSize(height/40);
    //textAlign(CENTER);
    textStyle(BOLD);
    text("see results",(width/8)*2, (height/15)*14);
    //rectMode(CENTER);
    noFill();
    stroke(255);
    rect(((width/8)*2), ((height/15)*14)-3, rect_widht, rect_height);
    // -((width/13)*1) / -((height/50)*1)
    
//c y b
    
    fill(0);
    noStroke();
    textSize(height/40);
    //textAlign(CENTER);
    textStyle(BOLD);
    text("try again",(width/8)*6, (height/15)*14);
    //rectMode(CENTER);
    noFill();
    stroke(255);
    rect(((width/8)*6), ((height/15)*14)-3, rect_widht, rect_height);
    //-((width/13)*1) / -((height/50)*1)   
         
        
/*
        
    button1 = createButton("See results");
    button1.position(width/7,(height/15)*14);
    button1.touchStarted(results);
        
    button2 = createButton("Try again");
    button2.position((width/7)*5, (height/15)*14);
    button2.touchStarted(clearEverything);   
        
     */ 
       
        
     //CREATE THE ELLIPSE AREA
    var x = width/2;
    var y = height/2;
    var r = energy * 2; 
    
    translate(0, -40);
    noFill();
    stroke(0);
    strokeWeight(1);
    ellipse (x, y, r, r);
          
        
        
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
    
 /* function touchStarted () {
  if (mouseX >= x && mouseX <= x + rect_widht && mouseY >= x && mouseY <= x + rect_height)
   background(204);
   energy = 0;
}
 
 

 function touchStarted () {
 //     function mouseIsPressed () {
    if (mouseX >= ((width/8)*2) && mouseX <= ((width/8)*2) + rect_widht && mouseY >= ((height/15)*14)-3 && mouseY <= ((height/15)*14)-3 + rect_height)
   background(0);
    

}
*/

function mousePressed () {
 // if (mouseX >= x && mouseX <= x + rect_widht && mouseY >= x && mouseY <= x + rect_height)
  
  if (mouseX >= a && mouseX <= a + rect_widht && mouseY >= b && mouseY <= b + rect_height){
     energy = 0;

 }else{
    // c y b = try again
  if (mouseX >= c && mouseX <= c + rect_widht && mouseY >= b && mouseY <= b + rect_height)
         fondo = color(random(0, 170), random(0, 170), random(0, 170));

// fondo = color(random(0, 170), random(0, 170), random(0, 170));
}
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







     
  
 


