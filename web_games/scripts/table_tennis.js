var canvas;
var canvasContext;
var ballX = 200;
var ballSpeedX = 10;
var ballY = 200;
var ballSpeedY = 5;
var leftY = 200;
var rightY = 180;
var leftscore = 0;
var rightscore = 0;
var showingWinScreen = false;

const PADDLE_HEIGHT = 100;
const PADDLE_THICKNESS = 10;
const WINNING_SCORE = 3;





function calculateMousePos(evt){
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;
    var mouseX = evt.clientX -rect.left - root.scrollLeft;
    var mouseY = evt.clientY- rect.top - root.scrollTop;
    return{
        x:mouseX,
        y:mouseY
    };
}

function handleMouseClick(evt){
    if(showingWinScreen){
        leftscore = 0;
        rightscore = 0;
        showingWinScreen = false;
    }
}


window.onload = function(){

    console.log("Hello world");
    canvas = document.getElementById("gameCanvas");
    canvasContext = canvas.getContext("2d");
    var framesPerSeconds = 30;
    setInterval(function(){
        moveEverything();
        
        draw_everything();
        }, 1000/framesPerSeconds)

        canvas.addEventListener('mousedown', handleMouseClick)

        canvas.addEventListener('mousemove',function(evt){
            var mousePos = calculateMousePos(evt);
            leftY = mousePos.y - PADDLE_HEIGHT/2
        })
}
function reset_ball(){

    if(leftscore == WINNING_SCORE||rightscore==WINNING_SCORE){
        showingWinScreen = true;
    }

    ballSpeedX=-ballSpeedX;
    ballX = canvas.width /2;
    ballY = canvas.height /2;
}


function computer_movement(){
    if(rightY+(PADDLE_HEIGHT/2) + 0.3*PADDLE_HEIGHT < ballY){rightY+=10;}
    else if (rightY+(PADDLE_HEIGHT/2)-0.3*PADDLE_HEIGHT > ballY){rightY-=10;}
}


function moveEverything(){
    if(showingWinScreen){
        return;
    }

    ballX+=ballSpeedX;
    if(ballX>canvas.width -5)
    {
        leftscore++;
        
        reset_ball();
        
    }
    if (ballX==canvas.width-20){
        if(ballY>rightY && (ballY<rightY + PADDLE_HEIGHT))
            {
                ballSpeedX=-ballSpeedX;
                var deltaY = ballY - (rightY+PADDLE_HEIGHT/2);
                ballSpeedY = deltaY * 0.35
            }
    }
    if(ballX<5)
    {            
        rightscore++;
        reset_ball();

        //ballSpeedX=-ballSpeedX;
    }
    if (ballX==20){
        if(ballY>leftY && (ballY<leftY + PADDLE_HEIGHT))
            {
                ballSpeedX=-ballSpeedX;
                var deltaY = ballY - (leftY+PADDLE_HEIGHT/2);
                ballSpeedY = deltaY * 0.35
            }
    }
    ballY+=ballSpeedY;
    if(ballY>canvas.height -10)
    {
        ballSpeedY=-ballSpeedY;
    }
    if(ballY<10)
    {
        ballSpeedY=-ballSpeedY;
    }
    computer_movement();
}


function drawNet(){
    for(var i = 0; i<canvas.height;i+=40){
        colorRect(canvas.width/2 -1, i, 2, 20, 'white')
    }

}

function draw_everything(){
    //console.log(ballX)
    
    colorRect(0,0,canvas.width,canvas.height,'black');

    //paddle of player
    colorRect(5,leftY,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
    colorRect(canvas.width-20,rightY,PADDLE_THICKNESS,PADDLE_HEIGHT,'white');
    if(showingWinScreen){

        if(leftscore == WINNING_SCORE){
            canvasContext.fillText('tschitsching',250, 100)
        }
        if(rightscore==WINNING_SCORE){
            canvasContext.fillText('you suck dic$',250, 100)
        }

        canvasContext.fillStyle = 'white';
        canvasContext.font = '50px serif'
        canvasContext.fillText('click to contiue',250,500)
        return;
    }
    drawNet();

    //draw  ball
    color_circle(ballX,ballY,10,'white');


    canvasContext.font = '50px serif'
    canvasContext.fillText(leftscore,50,100)
    canvasContext.fillText(rightscore,canvas.width - 50,100)
    
}
function color_circle(x, y, radius, color){
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(x, y, radius, 0, Math.PI*2,true);
    canvasContext.fill();

}

function colorRect(leftX,topY,width,height,color){
    canvasContext.fillStyle = color;
    canvasContext.fillRect(leftX,topY,width,height);
}