module.exports = function(app){
  app.get('/api/status', function(req, res){
    res.send({status: 'ok'});
  });
}
