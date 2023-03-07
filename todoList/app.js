const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require ("lodash")
const date = require(__dirname + "/date.js");

const app = express();



app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));
app.set("view engine", "ejs");


mongoose.connect("mongodb://localhost:27017/todolistDB");

const itemSchema = {
  name: String
};

const Item = mongoose.model("Item", itemSchema);

const wakeUp = new Item({
  name: "Wake up!"
});
const breakfast = new Item({
  name: "Make breakfast!"
});
const eat = new Item({
  name: "Eat breakfast!"
});

const defaultItems = [wakeUp, breakfast, eat];

const listSchema = {
  name: String,
  items: [itemSchema]
};

const List = mongoose.model("List", listSchema);


// Item.find(function(err, items) {
//   if (items.indexOf(wakeUp)) {
//     defaultInDB = false;
//     console.log("set on true index :", items.indexOf(wakeUp));
//   }
// });

// if (defaultInDB === true) {
//   console.log(defaultInDB);
//   Item.insertMany(defaultItems, function(err) {
//     err ? console.log(err) : console.log("successfully inserted defaultItems!");
//   });
// }


app.get("/", function(req, res) {
  Item.find(function(err, items) {
    //console.log(items.length);
    if (items.length === 0) {
      console.log("in if");
      Item.insertMany(defaultItems, function(err) {
        err ? console.log(err) : console.log("successfully inserted defaultItems!");
      });
      res.redirect("/");
    } else {
      let today = date.getDate();
      //console.log("asdfasdf   "+today);
      //console.log(date.getDate());
      res.render("list", {
        listTitle: "Today",
        newListItems: items
      });
    }
  });



});

// const items = ["wake up"];
// const workItems = [];


//
// app.get("/about", function(req, res) {
//   res.render("about");
// });

app.post("/", function(req, res) {
  const itemName = req.body.newItem;
  const listName = req.body.list;
  //console.log(req.body);
  const newItem = new Item({
    name: itemName
  });
  console.log("listName: " + listName + ", date.getDate: " + date.getDate());
  if (listName == "Today") {
    newItem.save(function(err) {
      err ? console.log(err) : console.log("Successfully inserted new Item!");
    });
    res.redirect("/");
  } else {
    List.findOne({
      name: listName
    }, function(err, foundList) {
      foundList.items.push(newItem);
      foundList.save();
      res.redirect("/" + listName);
    });
  }


});

app.post("/delete", function(req, res) {
  const checkedItemId = req.body.checkbox;
  const listTitle = req.body.listName;

  if (listTitle == "Today") {
    Item.findByIdAndDelete(checkedItemId, function(err) {
      err ? console.log(err) : console.log("deleted item");
    });
    res.redirect("/");
  } else {
    List.findOneAndUpdate({name: listTitle}, {$pull: {items: {_id: checkedItemId}}}, function(err, foundList) {
      if (!err) {
        res.redirect("/"+listTitle);
      }
    });
  }
});

app.get("/:listName", function(req, res) {

  const listName = _.capitalize(req.params.listName);
  List.findOne({
    name: listName
  }, function(err, foundList) {
    if (!err) {
      if (!foundList) {
        const list = new List({
          name: listName,
          items: defaultItems
        });
        list.save();
        res.redirect("/" + listName);
      } else {
        res.render("list", {
          listTitle: foundList.name,
          newListItems: foundList.items
        });
      }
      //console.log(err);
    }
  });

});
// app.post("/", function(req, res) {
//   console.log(req.body);
//   let item = req.body.newItem;
//   if (req.body.list === "Work") {
//     workItems.push(item);
//     res.redirect("/work")
//   } else {
//     items.push(item);
//     res.redirect("/");
//
//   }
// });
app.post("/work", function(req, res) {
  workItems.push(req.body.newItem);
  res.redirect("/work");

});

let port = 3000;
app.listen(port, function() {
  console.log("Server is running on port 3000");
});
