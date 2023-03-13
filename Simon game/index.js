// alert("hello");
 var buttonColours=[ "red", "blue", "green", "yellow"];
 var  gamePattern=[];
var userClickedPattern=[];
var level =0;
var started = false;


function checkAnswer(currentLevel){

    if(userClickedPattern[currentLevel]==gamePattern[currentLevel]){
        console.log("success");
        if (userClickedPattern.length === gamePattern.length){

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
              nextSequence();
            }, 1000);
    
          }
    }
    else{
        console.log("wrong");
    }

  }


$(document).keypress(function() {
    if (!started) {
      $("h1").text("Level " + level);
      nextSequence();
      started = true;
    }
  });

function nextSequence(){
level++;
$("h1").text("Level" +level);
var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);



}

$(".btn").click(function() {

    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);
    console.log(userClickedPattern);
    playSound(userChosenColour);
    animatePress(userChosenColour);

    // checkAnswer(userClickedPattern.length-1);
  });




//  function randomChosenColour()
//  {
//     var ran=Math.floor(Math.random() * 4);
//     var randomChosenColour=buttonColours[ran];
//     gamePattern.push(randomChosenColour);
//  }


function animatePress(userChosenColour){
    $("#"+userChosenColour).fadeOut(100).fadeIn(100);
}



function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}




// var audio = new Audio('Sounds/'+ $(element).css("color") +'.mp3');
// audio.play();

// nextSequence(){
//     var ran=Math.floor(Math.random() * 4) + 1;
// };
