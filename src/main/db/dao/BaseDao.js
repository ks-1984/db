'use strict'

var deferred = require('deferred');

function BaseDao(){};

BaseDao.prototype.count = function() {
    var df = deferred();
    
    this.dbConn.count({}, function(err, count) {
        if(err){
            df.reject();
        }
        else{
            df.resolve(count);
        }
    });
    
    return df.promise;
}

BaseDao.prototype.saveDb = function(obj) {
    var df = deferred();
    var objModel = this.dbConn(obj);
    
    objModel.save(function(err, result){
        if(err){
            df.reject();
        }
        else{
            df.resolve(result.id);
        }
    });
    
    return df.promise;
}

BaseDao.prototype.removeDb = function(id) {
    var df = deferred();
    var mainclass = this;

    mainclass.dbConn.find({_id : id}).remove(function(){
        df.resolve();
    });

    return df.promise;
}

BaseDao.prototype.find = function(id) {
    var df = deferred();
    var mainclass = this;
    
    mainclass.dbConn.find({_id : id}, function(err, result) {
        if(err){
            df.reject();
        }
        else{
            mainclass.findOne(err, result, function(d){
                df.resolve(d);
            }, function(){
                df.reject();
            });
        }
    });
    
    return df.promise;
}

BaseDao.prototype.findOne = function(err, result, resolve, reject){
    if(err){
        reject();
    }
    else{
        if(result && result.length > 0){
            resolve(JSON.parse(JSON.stringify(result[0])));
        }  
        else{
            resolve(undefined);
        }
    }
}
    
module.exports = BaseDao;