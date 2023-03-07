// const {MongoClient} = require("mongodb");
// const uri = "mongodb://localhost:27017";
// const client = new MongoClient(uri);
//
//
//
// client.connect(function(err) {
//   assert.equal(null, err);
//   console.log("connected successfully to mongodb!");
//   const db = client.db("fruitsDB");
//   insertDoc(db, function() {
//     client.close();
//   });
//
// });
//
// const insertDoc = function(db, callback) {
//   const collection = db.collection("fruits");
//   collection.insertMany([{
//     name: "apple",
//     score: 7
//   },{
//     name: "banana",
//     score: 9
//   },{
//     name: "mango",
//     score: 8
//   },{
//     name: "lemon",
//     score: 5
//   }], function(err, result) {
//     assert.equal(null, err);
//     //assert.equal(4, result.result.n);
//     console.log("Inserted 4 docs!");
//     callback(result);
//   });
// }
const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/fruitsDB");

// CREATE DOCS


//create schema
const fruitSchema = new mongoose.Schema ({
  name: {
    type: String,
    required: true
  },
  rating: {
    type: Number,
    min: 1,
    max: 10
  },
  review: String
});

//create model
const Fruit = mongoose.model("Fruit", fruitSchema);

//create Fruit document
const fruit = new Fruit({
  name: "Peach",
  rating: 10,
  review: "peaches nice"
});

const personSchema = new mongoose.Schema({
  name: String,
  age: Number,
  //RELATIONSHIPS
  favouriteFruit: fruitSchema
});
const Person = mongoose.model("Person", personSchema);
const person = new Person({
  name: "John",
  age: 44
});

//person.save();
//fruit.save();//.then(console.log("success"), console.log("something went wrong!"));


// READ
// Fruit.find(function(err, fruits) {
//   if (err) {
//     console.log(err);
//   } else {
//     mongoose.connection.close();
//     fruits.forEach(function(fruit) {
//       console.log(fruit.name);
//     });
//   }
// });


//UPDATE
// Fruit.updateOne({name: "Apple"}, {rating: 7}, function(err){
//   if (err){
//     console.log(err);
//   } else {
//     //success#
//     console.log("successfully updated");
//   }
// });

//DELETE
Fruit.deleteOne({name: "Peach"}, function(err) {
  if (err) {
    console.log(err);
  } else {
    mongoose.connection.close();
    console.log("deleted");
  }
});


//RELATIONSHIPS
const pineapple = new Fruit({
  name: "Pineapple",
  rating: 7,
  review: "nice for two"
});
//pineapple.save();
const amy = new Person({
  name: "Amy",
  age: 12,
  favouriteFruit: pineapple
});
//amy.save();
