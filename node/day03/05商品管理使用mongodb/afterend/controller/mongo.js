'use strict';
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://127.0.0.1:27017/store';

module.exports = function(successful, failed) {
	MongoClict.connect(dbUrl, (err, db) => {
		if(!err) {
			successful(db);
		}else {
			failed(err);
		}
	});
};
