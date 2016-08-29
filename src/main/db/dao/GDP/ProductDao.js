'use strict'

var deferred = require('deferred');
var db = require('../../config/db.js');
var BaseDao = require('../BaseDao.js');

function ProductDao(){};
ProductDao.prototype = Object.create(BaseDao.prototype);
ProductDao.prototype.constructor = ProductDao;

ProductDao.prototype.dbConn = db.createMongoConnection("GDP", "product", {
    id: String,
    name: String
});

ProductDao.prototype.object = {
    id: "",
    name: ""
}

ProductDao.prototype.list = function(){
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

ProductDao.prototype.save = function(obj){
    var df = deferred();
    this.object.id = obj.id;
    this.object.name = obj.name;

    this.saveDb(this.object).then(function(){
        df.resolve();
    }, function(){
        df.reject();
    });

    return df.promise;
}

ProductDao.prototype.remove = function(id){
    var df = deferred();

    this.removeDb(id).then(function(){
        df.resolve();
    });

    return df.promise;
}

module.exports = ProductDao;