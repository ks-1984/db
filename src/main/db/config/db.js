'use strict';

var mongoose = require('mongoose');

function getDbConfigByEnvironment(){
	return "mongodb://localhost:27017/";
}

function createMongoConnection(dbName, collectionName, customSchema){
    mongoose.Promise = global.Promise;
	var mongoURL = getDbConfigByEnvironment() + dbName;
	var conn = mongoose.createConnection(mongoURL);
	console.log('Db state for ' + collectionName + ': ' + mongoURL + ' - ' + conn.readyState);
	var schema = new mongoose.Schema(customSchema,{strict: false, versionKey: false});
	return conn.model(collectionName, schema, collectionName);
}

function isString(type){
    return type instanceof mongoose.Schema.Types.String;
}

function isNumber(type){
    return type instanceof mongoose.Schema.Types.Number;
}

function isDate(type){
    return type instanceof mongoose.Schema.Types.Date;
}

module.exports = {
	createMongoConnection : createMongoConnection,
    isString: isString,
    isNumber: isNumber,
    isDate: isDate
};