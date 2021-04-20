
const express = require('express');
const { default: App } = require('./Core/App');

const app = express();
App.run(app, express);
     
