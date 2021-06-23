"use strict"
const express = require('express');
const app = express();
const fs = require('ray-fs');
const taken = require('ray-taken');
const rayserveAuthors = "Ray Voice and Anna Voice";

module.exports = {
  app: express(),
  port: 4040,
  latency: 0,
  hostname: "localhost",
  serveJSON: function (myNode, myJSON) {
    const node = taken.take(arguments).getStrArgs().value[0]; 
    const json = taken.take(arguments).getObjArgs().value[0]; 
    this.app.get(node, (req, res) => {
      setTimeout(()=>{
        res.send(json);
      }, this.latency);
    });
    return this;
  },
  serveFile: function(node, fileURL, fileDirArg) {
    const fileDir = __dirname;
    if (fileDirArg !== undefined) fileDir = fileDirArg;
    this.app.get(node, (req, res) => {
      setTimeout(()=>{
        res.sendFile(`${fileDir}/${fileURL}`);
      }, this.latency);
    });
    return this;
  },
  showRoot: function(serverName, versionName) {
    this.serveJSON("/", {Server:serverName, Version: versionName});
    return this;
  },
  listen: function(callback) {
   let methodUsed = callback;
   if (methodUsed === undefined) methodUsed = () => {
     console.log(`Server is listening at ${this.hostname}:${this.port}`);
   }
   this.app.listen(this.port, methodUsed);
  }
}

