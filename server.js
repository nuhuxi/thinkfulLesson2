/**
 * Created by mark07 on 5/26/15.
 */
var express = require('express');
var bodyParser = require('body-parser');

var Storage = function() {
  this.items = [];
  this.id = 0;
};

/* The next few lines add the method 'add' to the Prototype Storage */

Storage.prototype.add = function(name) {
  var item = {name: name, id: this.id};
  this.items.push(item);
  this.id += 1;
  return item;
};

var storage = new Storage();

/* We can use the method 'add' because we created it in the prior code */

storage.add('Broad beans');

storage.add('Tomatoes');

storage.add('Peppers');


var app = express();
var jsonParser = bodyParser.json();

app.use(express.static('public'));

app.get('/items', function(req, res) {
  res.json(storage.items);
});

/* ***************************************************** */
/*             ADD AN ITEM WITH POST                   * */
/* ***************************************************** */

app.post('/items', jsonParser, function(req, res) {

  if (!req.body) {
    return res.sendStatus(400);
  }

  var item = storage.add(req.body.name);
  console.log("Added this item: " + req.body.name);
  res.status(201).json(item);

});

/* ***************************************************** */
/*                    DELETE                           * */
/* ***************************************************** */

app.delete('/items/:item', jsonParser, function(req, res) {
  if (!req.body) {
    return res.sendStatus(400);
  }
  var findTheItem = function(findThisItem){
    var thisIndexFound = '';

    for(var i = 0; i < storage.items.length; i++){
      if(storage.items[i].id == findThisItem){
        thisIndexFound = storage.items[i];
        return thisIndexFound;
      };
    };
  };
  var itemToDelete = req.params.item;
  console.log("You are trying to delete: " + req.body);
  console.log()
  var deleteThisIndex = 999999,
      deleteThisObject;
  deleteThisIndex = findTheItem(itemToDelete);
  console.log("You have asked to delete " + storage.items[deleteThisIndex].name);
  if(deleteThisIndex < 999999){
    deleteThisObject = storage.items[deleteThisIndex];
    storage.items.splice(deleteThisIndex, 1);

  } else {
    deleteThisObject.name = "Sorry the item you have asked to delete isn't on the list";
    deleteThisObject.id = itemToDelete;

  };

  res.status(201).json(deleteThisObject);
});

/* ***************************************************** */
/*                    PUT                              * */
/* ***************************************************** */

app.put('/items/:item', jsonParser, function(req, res) {

  if (!req.body) {
    return res.sendStatus(400);
  };

  var findTheItem = function(findThisItem){
    var thisIndexFound;

    for(var i = 0; i < storage.items.length; i++){
      if(storage.items[i].id == findThisItem.id){
        thisIndexFound = i;
        return thisIndexFound;
      };
    };

    thisIndexFound = 999999;
    return thisIndexFound;
  };

  var thisItemSent = req.body;

  var editThisIndex = 999999;

  editThisIndex = findTheItem(thisItemSent);

  console.log("Change the name of this item: " + storage.items[editThisIndex].name);

  if(editThisIndex < 999998){
    storage.items[editThisIndex].name = req.body.name;
    res.status(201).json(storage.items[editThisIndex]);

  } else {
    numberOfItemsInTheList = storage.items.length;
    storage.items[numberOfItemsInTheList + 1] = req.body;
    res.status(201).json(req.body);
  };

});

/* The following code allows us to use the process.env object and the PORT property of that object */

app.listen(process.env.PORT || 3000);
console.log("Server listening on port 3000");