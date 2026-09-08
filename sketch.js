let currentModule = 0;
let seedValue = 6656;
let palette = [
  [255, 0, 0],
  [0, 0, 255],
  [0, 255, 0],
  [255, 255, 0]
];
let shapes =[]
let fractalDepth = (seedValue % 4) + 3;
let triangleCount = 0;
let corners;
let p;
let useChaos = false;
let transformAngle;
let usePerspective = true;
let view3D;
let shapesPerFrame = 0;
let transformsApplied = 6;
let testDepth = 1;
let testTime = 0;
let testTriangles = 0
let runTimes = [];
let averageTime = 0;
let sceneSize = 2;

function setup() {
  createCanvas(400, 400);
  view3D = createGraphics(400, 300, WEBGL);
  
  transformAngle = radians(seedValue % 45);
  
  randomSeed (seedValue);
  corners = [
    createVector(200, 100),
    createVector(100, 300),
    createVector(300, 300),
  ];
  p = createVector(200, 200);
  for (let i =0; i<10; i++){
    let typeIndex = i%3;
    let x = random(50, 350);
    let y = random(100, 300);
    let size = random(30, 70);
    let colorIndex = floor(random(palette.length));
    shapes.push({
      type: typeIndex,
      x: x,
      y: y,
      size: size,
      colorIndex: colorIndex
    });
  }
}

function draw() {

  background(255);
  if (currentModule === 0)
  {
    textSize (20);
  text ("Sceneforge", 120 ,60);
  textSize (16);
  text ("Press 1 _ Shapes & colours" , 80 , 120);
  textSize (16);
  text ("Press 2 _ Sierpinski" ,80 ,160);
  textSize (16);
  text ("Press 3 _ Transformations " ,80 ,200);
  textSize (16);
  text ("Press 4 _ 3D View", 80 ,240);
  textSize (16);
  text("Press 5 _ Measurements" ,80 ,280); }
  
 
if (currentModule === 1){
  textSize (20);
  text ("Module 1 _ Shapes & Colours" , 70 , 60);
  textSize(12);
  text ("Seed:" + seedValue, 20, 20);
  text("Shapes:" + sceneSize, 20, 35);
  text("Palette:" +palette.length, 20, 50);
  shapesPerFrame = 0;
  for (let i = 0; i < sceneSize; i++) {
  let s = shapes[i];
     
    shapesPerFrame = 0;
    let c = palette[s.colorIndex];
    fill (c[0], c[1], c[2], 150);
     if(s.type === 0){
       rect(s.x, s.y, s.size, s.size);
     }
  if(s.type === 1){
    circle(s.x, s.y, s.size);
  }
    if(s.type === 2){
      triangle(
        s.x, s.y - s.size / 2,
        s.x - s.size / 2, s.y + s.size / 2,
        s.x + s.size / 2, s.y + s.size / 2,
      );
    }
  }

  textSize (14);
  text ("Press M to return to menu " , 100 , 350);
  
} 

if (currentModule === 2){
  noStroke();
  fill(0);
  
  textSize (20);
  text ("Module 2 _ Sierpinski", 70 , 60);
  triangleCount = 0;
     if (useChaos === false){
  drawSierpinski(200, 190, 220, fractalDepth, 0);
    noStroke();
    fill(0);
       
  textSize(12);
  text("Method: Recursive", 20, 20);
  text ("Depth: " + fractalDepth, 20, 35);
  text("Triangles:" + triangleCount, 20, 50);

} else{
   drawChaosGame();
       textSize(12);
       text("Method: Chaos Game", 20, 20);
       text("Points per frame:5000", 20, 35);
}
  textSize(12);
   text ("press 6 = Chaos Game, 7 =Recursive ", 90, 325);
  
  textSize (14);
  text ("Press M to return to menu " , 100 , 350);
  
}

if (currentModule === 3){
  transformsApplied = 6;
  textSize (20);
  textAlign(CENTER);
  text ("Module 3 _ Transformations " , 200 , 60);
  push();

translate(250, 200);
  rotate(transformAngle + frameCount * 0.01);
  scale(1.5);
  
  rectMode(CENTER);
  fill (0,150, 255);
  rect(0, 0, 80, 80);

  pop(); 
  fill(0);
  noStroke();
  textSize(12);
  text("Translate -> Rotate", 290, 300);

  push();
  
  rotate(transformAngle);
  translate(205, 85);
  scale(1.5);
    
  rectMode(CENTER);
  fill (255,100, 100);
  rect(0, 0, 80, 80);

  pop();
    fill(0);
  noStroke();
  text(" Rotate -> Translate", 110 , 300);

  
  textSize (14);
  text ("Press M to return to menu " , 200 , 355);
}
if (currentModule === 4) {
  textAlign(LEFT);
  fill(0);
  noStroke();

  textSize(11);
  text("Projection: Perspective (WEBGL default)", 10, 18);
  text("Perspective: distant objects appear smaller", 10, 33);
  text("Orthographic: size stays more constant with depth", 10, 48);

  textSize(20);
  text("Module 4 - 3D View", 100, 75);

  view3D.background(240);

  view3D.push();
  view3D.rotateY(frameCount * 0.01);
  view3D.rotateX(frameCount * 0.005);
  view3D.normalMaterial();
  view3D.box(100);
  view3D.pop();

  image(view3D, 0, 90, 400, 250);

  fill(0);
  noStroke();
  textSize(14);
  text("Press M to return to menu", 100, 365);
}

if (currentModule === 5){
  textAlign(LEFT);
  fill(0);
  noStroke();

  textSize(20);
  text("Module 5 _ Measurements", 70, 60);

  textSize(14);
  text("Shapes drawn per frame: " + shapes.length, 40, 120);
  text("Fractal triangles: " + pow(3, fractalDepth), 40, 155);
  text("Transforms applied: " + transformsApplied, 40, 190);
 text("Recursion depth: " + fractalDepth, 40, 225);

text("Scene size: " + sceneSize, 40, 250);
text("Shapes drawn: " + shapesPerFrame, 40, 275);

text("Test depth: " + testDepth, 40, 300);
text("Expected triangles: " + pow(3, testDepth), 40, 325);
text("Measured triangles: " + testTriangles, 40, 345);
text("Run time: " + testTime + " ms", 40, 365);
  if (runTimes.length === 3) {
  text("Average time: " + averageTime + " ms", 40, 375);
}


} 
}
function drawSierpinski(x, y, size, depth, level)
{
   if (depth === 0){
     let colorIndex = level % palette.length;
let c = palette[colorIndex];

stroke(c[0], c[1], c[2]);
strokeWeight(2);
    fill(c[0], c[1], c[2], 180);
    triangle(
      x, y - size / 2,
      x - size / 2, y + size / 2,
      x + size / 2, y + size / 2,
    ); 
     
    triangleCount++;
    return;
  }
  let newSize = size / 2;
  drawSierpinski(x, y - newSize /2, newSize, depth - 1, level+1);
  drawSierpinski(x - newSize / 2, y + newSize / 2,  newSize, depth - 1, level+1);
  drawSierpinski(x + newSize / 2, y + newSize / 2,  newSize, depth - 1, level+1);
  let colorIndex = level % palette.length;
let c = palette[colorIndex];

stroke(c[0], c[1], c[2]);
strokeWeight(2);
noFill();

triangle(
  x, y - size / 2,
  x - size / 2, y + size / 2,
  x + size / 2, y + size / 2
);
}
function drawChaosGame(){
  for(let i = 0; i < 5000; i++){
    let c = random(corners);
    p = p5.Vector.lerp(p, c, 0.5);
    
    stroke(0);
    strokeWeight(1);
    point (p.x, p.y);
  }
}

function keyPressed (){
  console.log(key)
    console.log(key);;
    if (key === '1'){
      currentModule = 1;
    }
    if (key === '2'){
       currentModule = 2;
   }
        if (key === '3')
      {
          currentModule = 3;
      }
      
      if (key === '4')
      {
       currentModule = 4;
      } 
      if (key === '5')
      {
       currentModule = 5;
      }
      if (key === 'm')
      {
        currentModule = 0;
      } 
  if (key === '6' ){
    useChaos = true;
    p = createVector(200, 200);
  }
    if (key === '7' ){
    useChaos = false;
  }
  if(key === 'p' || key === 'P'){
    usePerspective = true;
  }
    if(key === 'o' || key === 'O'){
    usePerspective = false;
  }
if (key === '8') {
  testDepth++;
  if (testDepth > 5) {
    testDepth = 1;
  }
}
  if (key === '9') {
  triangleCount = 0;

  let startTime = millis();

  drawSierpinski(200, 190, 220, testDepth, 0);

  let endTime = millis();

  testTime = endTime - startTime;
  testTriangles = triangleCount;
    runTimes.push(testTime);

if (runTimes.length === 3) {
  averageTime = (runTimes[0] + runTimes[1] + runTimes[2]) / 3;
}
}
  if (key === '8') {
  testDepth++;

  if (testDepth > 5) {
    testDepth = 1;
  }

  runTimes = [];
  averageTime = 0;
  testTriangles = 0;
  testTime = 0;
}
  if (key === '0') {
  sceneSize += 2;

  if (sceneSize > 10) {
    sceneSize = 2;
  }
}
}









