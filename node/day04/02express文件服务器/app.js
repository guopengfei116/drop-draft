'use strict';
const express = require('express');
let app = express();
app.use(express.static('./public'));
app.listen(8888, () => console.log('雄起!'));
