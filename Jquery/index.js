// document.querySelector("h1").style.backgroundColor="#fff";
// $("document").ready(function(){

// });
// $("h1").css("color","blue");


// $("h1").addClass("big-title");

//manipulating text using jquery

$("button").text("dont click");

//manipulating attributes using jquery
$("a").attr("href","https://www.yahoo.com");

//Adding Event Listeners in js
$("h1").click(function(){
    $("h1").text("Bye");
}


);

// $("h1").hover(function(){
//     $("h1").text("hover");
//     $("h1").css("color","purple");
// }


$("h1").on("mouseover",function(){
    $("h1").text("hover");
    $("h1").css("color","purple");
}



);
$(document).keypress(function(event){
    $("h1").text(event.key);
}
);


// adding and removing Elements with jQuery
$("h1").before("<button> click </button>");
$("h1").append("<button> click </button>");

//  removing 
// 
// $("button").remove();

// Animations

// $("button").on("click",function(){
// $("button.btn").toggle();
// });

// $("button").on("click",function(){
//     $("button.btn").slideToggle();
//     });

$("button").on("click",function(){
    $("button.btn").animate({opacity:0.5});
    });

