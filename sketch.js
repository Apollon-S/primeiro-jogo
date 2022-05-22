//Valores bolinha
let xBolinha = 300;
let yBolinha = 200;
let dBolinha = 20;
let rBolinha = dBolinha / 2;

//Modo de jogo
let mode = window.prompt("Quer jogar Multiplayer ('m') ou Singleplayer(<qualquer tecla>)? ")


//Pontuação
let Points = 0;
let PointsAdv = 0;

//Margem de erro
let ME = 0

//Valores raquete1
let xRect = 5;
let yRect = 150;
let wRect = 10;
let hRect = 90;

//Paramêtros raquete2
let xRect2 = 585;
let yRect2 = 150;
let wRect2 = 10;
let hRect2 = 90;
let vYrect2;

//Velocidade
let vXbolinha = 9;
let vYbolinha = 9; 

//var biblioteca
let c = false;

//Sons do jogo
let raq;
let win;
let lose;
let trilha;

//Função de sons
function preload(){
  trilha = loadSound("trilha.mp3")
  win = loadSound("Win.mp3")
  lose = loadSound("Lose.mp3")
  raq = loadSound("raq.mp3")
}

//Cenário
function setup() {
  createCanvas(600, 400);
  trilha.loop()
}

//Main game
function draw() {
  background(0);
  Bolinha();
  Movimento();
  Colisao();
  Raquete1();
  mRect1();
  //cRect1();
  Rect2();
  cRect2(xRect, yRect);
  cRect2(xRect2, yRect2);
  mRect2();
  points();
  graphpoints();
  //multiplayer();
  reset();
  bug1();
  
}

//Cria a bolinha
function Bolinha(){
  bolinha = circle(xBolinha, yBolinha, dBolinha);  
}

//Movimento da bolinha
function Movimento(){
  xBolinha += vXbolinha
  yBolinha += vYbolinha;
}

//Colisão com a borda
function Colisao(){
  if (xBolinha + rBolinha > width ||
      xBolinha - rBolinha < 0){vXbolinha *= -1;}
  if (yBolinha + rBolinha > height ||
      yBolinha - rBolinha < 0){vYbolinha *= -1;}
}

//Cria a raquete1
function Raquete1(){
  rect(xRect, yRect, wRect, hRect)
}

//Movimento da raquete1
function mRect1(){
  if(keyIsDown(83)) {
    yRect += 5}
  if(keyIsDown(87)) {
    yRect -= 5}
}

//Colisão padrão
function cRect1(){
  if (xBolinha - rBolinha < xRect + wRect &&
      yBolinha - rBolinha < yRect + hRect &&
      yBolinha + rBolinha > yRect)
  {vXbolinha *= -1;}
}

//Colisão biblioteca
function cRect2(x, y){
  if (collideRectCircle(x, y, wRect, hRect,
                    xBolinha, yBolinha, rBolinha)){
    vXbolinha *= -1
    raq.play()
  }
}

//Cria a raquete2
function Rect2(){
  rect(xRect2, yRect2, wRect2, hRect2)
}

//Movimento da raquete2
function mRect2(){
  if (mode != "m"){
  vYrect2 = yBolinha - yRect2 - wRect2 / 2 - 30
  yRect2 += vYrect2 + ME
  margem()}
  if (mode == "m"){
     if(keyIsDown(DOWN_ARROW)) {
    yRect2 += 5}
     if(keyIsDown(UP_ARROW)) {
    yRect2 -= 5}
  
  }
}

//Movimento da raquete2 (multiplayer)
function multiplayer(){
  if(keyIsDown(DOWN_ARROW)) {
    yRect2 += 5}
  if(keyIsDown(UP_ARROW)) {
    yRect2 -= 5}
}

//Pontuação
function points(){
  if (xBolinha + rBolinha > width){Points += 1
                                  win.play()}
  if (xBolinha - rBolinha < 0){PointsAdv += 1
                              lose.play()}
}

//Placar gráfico
function graphpoints(){
  stroke(255)
  textAlign(CENTER)
  fill(138, 43, 226)
  rect(180, 30, 40, 30)
  rect(380, 30, 40, 30)
  fill(255, 255, 0)
  text(Points, 200, 50)
  text(PointsAdv, 400, 50)
  fill(255)
  textSize(18)
}

//Reset
function reset(){
  if (keyIsDown(82)){
    Points = 0
    PointsAdv = 0
    xBolinha = 300
    yBolinha = 200
    yRect = 150
    mode = window.prompt("Como você reiniciou. Escolha o modo de jogo com 'm' para Multiplayer e 's' para Singleplayer.")
  }
}

//Função da margem de erro
function margem() {
  if (PointsAdv >= Points) {
    ME += 1
    if (ME >= 39){
      ME = 40}
  } else {
    ME -= 1
    if (ME <= 30){
    ME = 30
    }
  }
}

//Bug da bola presa
function bug1(){
    if (xBolinha - rBolinha < 0){
    xBolinha = 23}
    if(xBolinha + rBolinha > width){
      xBolinha = 577
    }
}
