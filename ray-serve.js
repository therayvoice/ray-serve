"use strict"
const express = require('express');
const app = express();
const fs = require('ray-fs');
const taken = require('ray-taken');
const core = require('ray-core');
const rayserveAuthors = "Ray Voice and Anna Voice";

module.exports = {
  app: express(),
  port: 4040,
  latency: 0,
  hostname: "localhost",
  showPort: (hostname, port)=>{
     console.log(`Server is listening at ${hostname}:${port}`);
   },
  serveJSON: function () {
    const node = taken.take(arguments).getNodeNames().value[0]; 
    const json = taken.take(arguments).getObjArgs().value[0]; 

    if (node === undefined) {core.lastWords("NodeName invalid! (/home, /about)")}

    this.app.get(node, (req, res) => {core.sendJSON(res, json, this.latency)});
    return this;
  },
  serveFile: function(node, file, fileDirArg) {
    const fileDir = core.argAssign(fileDirArg, __dirname);
    const fileURL = `${fileDir}/${file}`;
    this.app.get(node, (req, res) => {core.sendFile(res, fileURL, this.latency)});
    return this;
  },
  showRoot: function(serverName, versionName) {
    this.serveJSON("/", {Server:serverName, Version: versionName});
    return this;
  },
  listen: function(callback) {
   let methodUsed = core.argAssign(callback, ()=>{this.showPort(this.hostname, this.port)});
   this.app.listen(this.port, methodUsed);
  }
}

