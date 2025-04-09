"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// server/index.ts (v3: try direct usage with namespace import)
var express = require("express");
var cors = require("cors");
// keep assessmentroutes import as is for now
var assessment_1 = require("./src/routes/assessment");
var app = express(); // <--- use express directly, instead of express.default()
app.use(cors({ origin: '*' })); // <--- use cors directly, instead of cors.default()
app.use(express.json()); // <--- use express.json directly (this is usually correct)
// mount routes
app.use('/api/assessment', assessment_1.default);
var port = process.env.port || 3001; // make sure env var name matches case used in greengeeks
app.listen(port, function () {
    console.log("server running on port ".concat(port));
});
exports.default = app;
