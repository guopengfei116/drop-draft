'use strict';
const http = require('http');
let server = http.createServer((req, resp) => {
	resp.write('Hello Word!');
	resp.end();
});
server.listen(8888, () => console.log('node is running'));
