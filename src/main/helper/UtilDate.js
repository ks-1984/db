'use strict';

var moment = require('moment');
var isodate = require("isodate");

var FORMATS = {
	"YYYY-MM-DD" : "YYYY-MM-DD",
}

function parse(text, format){
	return moment(text,format);
}

function now(){
	return moment();
}

function isoDateString(date){
	return date.toISOString();
}

function isoDate(date){
	return isodate(isoDateString(date));
}

module.exports = {
	now : now,
    isoDate: isoDate,
	parse : parse,
	FORMATS : FORMATS
};