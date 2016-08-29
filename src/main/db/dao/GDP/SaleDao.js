'use strict'

var deferred = require('deferred');
var db = require('../../config/db.js');
var BaseDao = require('../BaseDao.js');

function SaleDao(){};
SaleDao.prototype = Object.create(BaseDao.prototype);
SaleDao.prototype.constructor = SaleDao;

SaleDao.prototype.dbConn = db.createMongoConnection("GDP", "sale", {
    customer: String,
    productIds: Array,
    price: Number
});

SaleDao.prototype.object = {
    customer: "",
    productIds: [],
    price: 0
}

SaleDao.prototype.list = function(){
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

SaleDao.prototype.save = function(obj){
    var df = deferred();
    this.object.customer = obj.customer;
    this.object.productIds = obj.productIds;
    this.object.price = obj.price;

    this.saveDb(this.object).then(function(){
        df.resolve();
    }, function(){
        df.reject();
    });
    
    return df.promise;
}

SaleDao.prototype.remove = function(id){
    var df = deferred();

    this.removeDb(id).then(function(){
        df.resolve();
    });

    return df.promise;
}

module.exports = SaleDao;