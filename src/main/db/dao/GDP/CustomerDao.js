'use strict'

var deferred = require('deferred');
var db = require('../../config/db.js');
var BaseDao = require('../BaseDao.js');

function CustomerDao(){};
CustomerDao.prototype = Object.create(BaseDao.prototype);
CustomerDao.prototype.constructor = CustomerDao;

CustomerDao.prototype.dbConn = db.createMongoConnection("GDP", "customer", {
    name: String
});

CustomerDao.prototype.object = {
    name: ""
}

CustomerDao.prototype.list = function(){
    var df = deferred();
    var mainclass = this;
    
    mainclass.dbConn.find({}, function(err, results) {
        if(err){
            df.reject();
        }
        else{
            df.resolve(results);
        }
    });
    
    return df.promise;
}

CustomerDao.prototype.save = function(obj){
    var df = deferred();
    this.object.name = obj.name;

    this.saveDb(this.object).then(function(){
        df.resolve();
    }, function(){
        df.reject();
    });
    
    return df.promise;
}

CustomerDao.prototype.remove = function(id){
    var df = deferred();

    this.removeDb(id).then(function(){
        df.resolve();
    });

    return df.promise;
}

module.exports = CustomerDao;