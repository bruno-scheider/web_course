//alert("hello")
function rollDice(classname){
  let randomNumber1 = Math.floor(Math.random() * 6) + 1;
  let dice = document.querySelector(classname);
  dice.setAttribute("src", "./images/dice"+ randomNumber1 + ".png");
  return randomNumber1;
}

let numberPlayer1 = rollDice(".img1");
let numberPlayer2 = rollDice(".img2");

let winnerText = " wins!";
if(numberPlayer1 > numberPlayer2){;
  winnerText = "🚩Player 1" + winnerText;
}
else if (numberPlayer2 > numberPlayer1) {
  winnerText = "Player 2" + winnerText + " 🚩";
}
else{
  winnerText = "Draw!";
}
document.querySelector(".winner").textContent = winnerText;
