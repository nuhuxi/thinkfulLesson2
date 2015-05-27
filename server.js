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

app.post('/items', jsonParser, function(req, res) {

  if (!req.body) {
    return res.sendStatus(400);
  }

  var item = storage.add(req.body.name);
  res.status(201).json(item);

});

app.delete('/items/:item', jsonParser, function(req, res) {

  if (!req.body) {
    return res.sendStatus(400);
  }
  var findTheItem = function(deleteThis){
    var itemToDelete = '';

    for(var i = 0; i < storage.items.length; i++){

      if(storage.items[i].id == deleteThis){
        itemToDelete = storage.items[i].name;
        return itemToDelete;
      };

    };
  };
  
  var itemToDelete = req.params.item;
  var nameOfItem = '';
  nameOfItem = findTheItem(itemToDelete);
  console.log("The name of the item to delete is: " + nameOfItem);



});
/* The following code allows us to use the process.env object and the PORT property of that object */

app.listen(process.env.PORT || 3000);
console.log("Server listening on port 3000");