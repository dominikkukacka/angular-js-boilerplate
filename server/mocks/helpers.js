module.exports = function(app) {

  var lastId = 100;

  /*
    Creates routes for:
      - requesting complete collection
      - requesting single entity
      - creating an entity
      - updating an entity
      - deleting an entity
  */
  app.createCRUD = function(name, collection) {
    this.get('/api/' + name, function (req, res) {
      res.send(collection);
    });

    this.get('/api/' + name + '/:id', function (req, res) {
      var entity = collection.grep('id', parseInt(req.params.id, 10));
      if(entity === null) {
        res.sendStatus(404);
      } else {
        res.send(entity);
      }
    });

    this.post('/api/' + name, function (req, res) {
      req.body.id = lastId++
      collection.push(req.body);
      res.sendStatus(201);
    });

    this.delete('/api/' + name + '/:id', function (req, res) {
      var index = collection.grep('id', parseInt(req.params.id, 10), true);
      if(index !== null) {
        collection.splice(index, 1);
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    });

    this.post('/api/' + name + '/:id', function (req, res) {
      var index = collection.grep('id', parseInt(req.params.id, 10), true);
      if(index !== null) {
        collection[index] = req.body;
        res.sendStatus(200);
      } else {
        res.sendStatus(404);
      }
    });
  }

  // This is used to filter an array of objects for an single key
  Array.prototype.grep = function (key, value, returnIndex) {
    var that = this, ret = [];
    var _index = null;
    this.forEach(function (elem, index) {
      if (elem[key] === value) {
        if(returnIndex) {
          _index = index;
        } else {
          ret.push(that[index]);
        }
      }
    });

    if(returnIndex) {
      return _index;
    } else if (ret.length === 0){
      return null;
    } else {
      return ret.length < 2 ? ret[0] : ret;
    }
  };

}
