



// alert("hello");

var x = Math.floor(Math.random() * 6) + 1;
var src1="images/dice"+x+".png"

document.querySelector(".img1").setAttribute("src",src1);


var y= Math.floor(Math.random() * 6) + 1;
var src2="images/dice"+y+".png"
// alert(x+" "+y);
document.querySelector(".img2").setAttribute("src",src2);
if(x>y){
    document.querySelector("h1").innerHTML="Player 1 Wins! 🚩";
}
else if (y > x) {
    document.querySelector("h1").innerHTML = "Player 2 Wins! 🚩";
  }
  else {
    document.querySelector("h1").innerHTML = "Draw!";
  }
  

