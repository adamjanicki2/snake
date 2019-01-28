window.onload = initAll;
var canvas;
var ctx;
var interval;
var yellow=false;
var r = Math.floor(Math.random()*255);
var g = Math.floor(Math.random()*255);
var b = Math.floor(Math.random()*255);
var x1;
var y1;
var x;
var y;
var snakeX = [];
var snakeY = [];
var xSpeed = 0;
var ySpeed=0;
var xTemp;
var yTemp;
var up = false;
var down=false;
var left=false;
var right=false;
var xpos = (20*Math.floor(Math.random()*25))+20;
var ypos = (20*Math.floor(Math.random()*20))+20;
var score=0;
var highscore;
highscore=localStorage.getItem('snake');
var enter=false;
if(highscore==null)
    highscore=0;
var yellow3=false;
var win=false;
function initAll()
{
    canvas = document.getElementById("myCanvas");
   ctx = canvas.getContext("2d");
   document.addEventListener("keyup", keyUpHandler,false);
   document.addEventListener("mouseup", mouseUpHandler,false);
   document.addEventListener("mousemove",mouseMoveHandler,false);
   snakeX.push(100);
   snakeY.push(100);
   interval = setInterval(setTitle,5);
   setTitle();
}
function setTitle()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    makeRect();
    makeBorder();
    print();
    if(enter==true)
  {
      ctx.clearRect(0,0,canvas.width,canvas.height);
      clearInterval(interval);
      interval = setInterval(play,70);
      play();
  }
    ctx.font = "100px Impact";
   ctx.fillStyle = "#ffffff";
   ctx.fillText("Snake",170,230);
   ctx.font = "20px Comic Sans MS";
   ctx.fillText("Adam Janicki", 235, 278)
   makeStart();
   ctx.closePath();
   ctx.fillStyle = "#000000";
  ctx.font = "58px Impact";
  ctx.fillText("Start", 242, 428);
    
}
function makeStart()
{
    ctx.beginPath();
    if(yellow==true)
       ctx.fillStyle="rgb(0,250,250)";
   else if(yellow==false)
       ctx.fillStyle="rgb(255,255,255)";
  
   ctx.rect(225,380,150,50);
   ctx.fill();
   ctx.closePath();
}
function makeRect()
{
    ctx.beginPath();
    ctx.fillStyle = "rgb("+r+","+g+","+b+")";
    ctx.rect(0,0,canvas.width,canvas.height);
    ctx.fill();
    ctx.closePath();
}
function makeBorder()
{
    ctx.beginPath();
    ctx.fillStyle = "#000000";
    ctx.rect(0,0,20,canvas.height);
    ctx.rect(0,0,canvas.width,20);
    ctx.rect(0,canvas.height-20,canvas.width,20);
    ctx.rect(canvas.width-20,0,20,canvas.height);
    ctx.fill();
    ctx.closePath();
}
function drawSnake()
{
    ctx.beginPath();
    ctx.fillStyle = "#ffffff";
    for(var i =0; i< snakeX.length; i++)
        ctx.rect(snakeX[i],snakeY[i],20,20);
    ctx.fill();
    ctx.closePath();
    var tempx = snakeX[0];
    var tempy = snakeY[0];
    var tempx2=0;
    var tempy2=0;
    for(var i = 1; i<snakeX.length; i++)
    {
       tempx2=snakeX[i];
        tempy2=snakeY[i];
        snakeX[i]=tempx;
        snakeY[i]=tempy;
        tempx=tempx2;
        tempy=tempy2;
    }
}
function drawBox()
{
    ctx.beginPath();
    ctx.fillStyle = "#ff0000";
    ctx.rect(xpos,ypos,20,20);
    ctx.fill();
}
function collisionDetection()
{
    if(snakeX[0]<=0 || snakeX[0]>=canvas.width-20 || snakeY[0]<=0 || snakeY[0]>=canvas.height-20)
    {
        win=true;
        clearInterval(interval);
        //chrome storage
        if(highscore==null)
        {
            localStorage.setItem('snake',score);
        }
        else if(score>highscore)
        {
            localStorage.setItem('snake',score);
        }
        interval = setInterval(setWin,20);
        setWin();
    }
    if(snakeX[0]==xpos && snakeY[0]==ypos)
    {
         xpos = (20*Math.floor(Math.random()*25))+20;
         ypos = (20*Math.floor(Math.random()*20))+20;
         score+=5;
         snakeX.push(xTemp);
         snakeY.push(yTemp);
    }
    for(var i=5; i<snakeX.length; i++)
    {
        if(snakeX[i]==snakeX[0] && snakeY[i]==snakeY[0])
        {
            win=true;
            clearInterval(interval);
            //chrome storage
            if(highscore==null)
            {
                localStorage.setItem('snake',score);
            }
            else if(score>highscore)
            {
                localStorage.setItem('snake',score);
            }
            interval = setInterval(setWin,20);
            setWin();
        }
    }
}
function play()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    makeRect();
    makeBorder();
    print();
    drawBox();
    drawSnake();
    collisionDetection();
    if(up==true && ySpeed!=20)
    {
        ySpeed=-20;
        xSpeed=0;
        up=false;
    }
    if(down==true && ySpeed!=-20)
    {
        ySpeed=20;
        xSpeed=0;
        down=false;
    }
    if(right==true && xSpeed!=-20)
    {
        xSpeed=20;
        ySpeed=0;
        right=false;
    }
    if(left==true && xSpeed!=20)
    {
        xSpeed=-20;
        ySpeed=0;
        left=false;
    }
    xTemp=snakeX[snakeX.length-1];
    yTemp=snakeY[snakeY.length-1];
    snakeX[0]+=xSpeed;
    snakeY[0]+=ySpeed;
}
function print()
{
   ctx.beginPath();
   ctx.fillStyle = "#ffffff";
   ctx.font = "18px Impact";
   ctx.fillText(""+score, 20, 18);
   if(highscore!=null)
       ctx.fillText("HI: "+highscore,540,18);
   else{
       highscore=0;
       ctx.fillText("HI: "+highscore,540,18);
   }
}
function keyUpHandler(e)
{
    if(e.keyCode==82)
        document.location.reload();
    if(e.keyCode==37 && xSpeed!=20)
        left=true;
    else if(e.keyCode==38 && ySpeed!=20)
        up=true;
    else if(e.keyCode==39 && xSpeed!=-20)
        right=true;
    else if(e.keyCode==40 && ySpeed!=-20)
        down=true;
}
function mouseUpHandler(e)
{
    x = e.clientX-canvas.offsetLeft;
    y=e.clientY-canvas.offsetTop;
    if(x>=225 && x<=375 && y>=380 && y<=430)
       enter=true;
    if(x>=255 && x<=355 && y>=450 && y<475 && win==true)
       {
           document.location.reload();
       }
}
function mouseMoveHandler(e)
{
    x1 = e.clientX-canvas.offsetLeft;
    y1 = e.clientY-canvas.offsetTop;
    if(x1>=225 && x1<=375 && y1>=380 && y1<=430)
    {
        yellow=true;
    }
    if((x1<=225 || x1>=375) || (y1<=380 || y1>=430) && yellow == true)
   {
       yellow=false;
   }
   if(x1>=255 && x1<=355 && y1>=450 && y1<475 && win==true)
 {
     yellow3 = true;
 }
 if((x1<=255 || x1>=355 || y1<=450 || y1>475) && win==true)
 {
     yellow3 = false;
 }
}
function makeButton()
{
    ctx.beginPath();
    if(yellow3==true)
         ctx.fillStyle = "#dbff4d";
     else if(yellow3==false)
         ctx.fillStyle = "#ffffff";
    ctx.rect(255,450, 100,25);
    ctx.fill();
}
function setWin()
{
    ctx.clearRect(0,0,canvas.width,canvas.height);
    ctx.beginPath();
    makeRect();
    makeBorder();
    ctx.font = "100px Impact";
    ctx.fillStyle = "#ffffff";
    ctx.fillText("Game Over",90,130);
    ctx.font = "50px Impact";
    ctx.fillText("Score: "+score,230,236);
    ctx.fillText("High: "+highscore,234,300);
    if(score>highscore)
       ctx.fillText("New Highscore!",160,400)
    ctx.font = "20px Courier New";
    makeButton();
    ctx.fillStyle = "#000000";
    ctx.fillText("Restart",260,470);
    ctx.closePath();
}
