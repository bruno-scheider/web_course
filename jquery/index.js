//alert("hi");
//$("button").styles.setAttribute("color", "red");
$(document).keydown(function(event) {
  //console.log(event.key)
  $("h1").text(event.key);
});
$("h1").on("mouseover", function() {
  $("h1").css("color", "purple");
});
