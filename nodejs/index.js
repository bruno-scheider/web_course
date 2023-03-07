
const heroes = require("superheroes");
const villains = require("supervillains")

if(Math.random() > 0.5){
  console.log(villains.random() + " wins over " + heroes.random());
}
else{
  console.log(heroes.random() + "wins over " + villains.random());
}
