'use strict'

var deferred = require('deferred');
var UtilDate = require('../../../helper/UtilDate.js');
var db = require('../../config/db.js');
var BaseDao = require('../BaseDao.js');

function PriceDao(){};
PriceDao.prototype = Object.create(BaseDao.prototype);
PriceDao.prototype.constructor = PriceDao;

PriceDao.prototype.TYPE_ORIGINAL = "original";
PriceDao.prototype.TYPE_PRICE = "price";
PriceDao.prototype.TYPE_QUANTITY = "quantity";

PriceDao.prototype.dbConn = db.createMongoConnection("GDP", "price", {
    customerName: String,
    productId: String,
    type: String,
    quantity: Number,
    price: Number,
    createdDate: Date
});

PriceDao.prototype.object = {
    customerName: "",
    productId: "",
    type: "",
    quantity: 0,
    price: 0,
    createdDate: ""
}

PriceDao.prototype.findByType = function(type){
    var df = deferred();
    var mainclass = this;

    mainclass.dbConn.find({"type": type}, function(err, results) {
        if(err){
            df.reject();
        }
        else{
            df.resolve(results);
        }
    });

    return df.promise;
}

PriceDao.prototype.findByCustomer = function(customer){
    var df = deferred();
    var mainclass = this;

    mainclass.dbConn.find({"customerName": customer}, function(err, results) {
        if(err){
            df.reject();
        }
        else{
            df.resolve(results);
        }
    });

    return df.promise;
}

PriceDao.prototype.list = function(){
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

PriceDao.prototype.save = function(obj){
    var df = deferred();
    this.object.customerName = obj.customerName;
    this.object.productId = obj.productId;
    this.object.type = obj.type;
    this.object.quantity = obj.quantity;
    this.object.price = obj.price;
    this.object.createdDate = UtilDate.isoDate(UtilDate.now().toDate());

    this.saveDb(this.object).then(function(){
        df.resolve();
    }, function(){
        df.reject();
    });
    
    return df.promise;
}

PriceDao.prototype.remove = function(id){
    var df = deferred();

    this.removeDb(id).then(function(){
        df.resolve();
    });

    return df.promise;
}

module.exports = PriceDao;