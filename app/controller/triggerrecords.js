var mongoose = require('mongoose');
var global = require('./socket/global');

TriggerRecord = mongoose.model('TriggerRecord');

TriggerRecordService = {

  findAll : function(req, res){
    TriggerRecord.find({},function(err, results) {
      return res.send(results);
    });
  },

  findById : function(req, res){
    var id = req.params.id;
    TriggerRecord.findOne({'_id':id},function(err, result) {
      return res.send(result);
    });
  },
  
   findByFilePath : function(req, res){
    var path = req.params.centralpath;
    TriggerRecord.find({'centralPath':path},function(err, result) {
      return res.send(result);
    });
  },
  
    findByUpdaterId : function(req, res){
    var id = req.params.updaterid;
    TriggerRecord.find({'updaterId':id},function(err, result) {
      return res.send(result);
    });
  },
 
  findByUniqueId : function(req, res){
    var id = req.params.uniqueid;
    TriggerRecord.find({'elementUniqueId':id},function(err, result) {
      return res.send(result);
    });
  },

  add : function(req, res) {
    TriggerRecord.create(req.body, function (err, result) {
      if (err) return console.log(err);
	  global.io.sockets.emit('add_record', req.body);
      return res.send(result);
    });
  },


  update : function(req, res) {
    var id = req.params.id;
    //console.log(req.body);
    console.log('Updating ' + id);
    TriggerRecord.update({"_id":id}, req.body, {upsert:true},
      function (err, numberAffected) {
        if (err) return console.log(err);
        console.log('Updated %s instances', numberAffected.toString());
		global.io.sockets.emit('update_record', req.body);
        return res.sendStatus(202);
    });
  },

  delete : function(req, res){
    var id = req.params.id;
    TriggerRecord.remove({'_id':id},function(result) {
      return res.send(result);
    });
  },
  
   deleteAllForConfig : function(req, res){
    var id = req.params.configid;
    TriggerRecord.remove({'configId':id},function(err, results) {
      return res.send(results);
    });
  },
  
  deleteAllForFile : function(req, res){
    var path = req.params.centralpath;
    TriggerRecord.remove({'centralpath':path},function(err, results) {
      return res.send(results);
    });
  }
  
  };

module.exports = TriggerRecordService;