$("h1").addClass("big-title");

$(document).keydown(function(event){
    var i = event.key;
    $("h1").text(i);
})