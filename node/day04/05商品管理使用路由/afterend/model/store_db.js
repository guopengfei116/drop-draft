'use strict';
const MongoClient = require('mongodb').MongoClient;
const dbUrl = 'mongodb://127.0.0.1:27017/store';

let cacheDB = null;

module.exports = function(successful, failed) {
	if(cacheDB) {
		successful(cacheDB);
	}else {
		MongoClient.connect(dbUrl, (err, db) => err? 
			failed(err): successful((cacheDB = db)));
	}
};
