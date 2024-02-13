var buttons = ['red','blue','green','yellow'];
var gamePattern=[];
var userChosenPattern = [];

var started = false;
var level = 0;

$(document).keypress(function(){
    if(!started){
     $("#level-title").text("Level "+level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function(){
   
    var userChosenColor = $("this").attr("id");
     userChosenPattern.push(userChosenColor);

     playSound(userChosenColor);
     animatePress(userChosenColor);
     checkAnswer(userChosenPattern.length-1);
});



function checkAnswer(currentLevel){
    if(gamePattern[currentLevel] === userChosenPattern[currentLevel]){
    
    if(userChosenPattern.length === gamePattern.length){

        setTimeout(function(){
            nextSequence();
        },1000);
    }
        }else{
        

      //1. In the sounds folder, there is a sound called wrong.mp3, play this sound if the user got one of the answers wrong.
      playSound("wrong");

      //2. In the styles.css file, there is a class called "game-over", apply this class to the body of the website when the user gets one of the answers wrong and then remove it after 200 milliseconds.
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");
      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      //3. Change the h1 title to say "Game Over, Press Any Key to Restart" if the user got the answer wrong.
     

      startOver();
        }
}

function nextSequence(){
  userChosenPattern=[];  
level++;
$("#level-title").text("Level " + level);

var randomNumber = Math.round(Math.radom() * 4);
var randomChosenColour = buttons[randomNumber];
gamePattern.push(randomChosenColour);

$("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

playSound(randomChosenColour);
}




function playSound(name){
    var sound = new Audio ("sounds/"+ name +".mp3");
sound.play();
}

function animatePress(currentColor){
    $("#"+currentColor).addClass("pressed");
    
   setTimeout(function(){
    $("#"+currentColor).removeClass("pressed");

   },100);
}

function startOver() {

    
    level = 0;
    gamePattern = [];
    started = false;
  }
