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
  showMsg: (hn, p) => {console.log(`Server listening at ${hn}:${p}`)},
  serveJSON: function (node, json) {
    console.log(this.app, "hells");
    this.app.get(node, (req, res) => {
      console.log(node,json, "wells");
      setTimeout(()=>{
        res.send(json);
      }, this.latency);
    });
    return this;
  },
  serveFile: function(node, fileURL, fileDirArg) {
    const fileDir = __dirname;
    if (fileDirArg !== undefined) fileDir = fileDirArg;
    this.app.get(node, (req, res)=>{
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
  listen: function(/*port, callback*/) {
   let methodUsed = taken
                      .take(arguments)
                      .getFuncArgs()
	              .value[0] || 
	  /*
   for (let argument of arguments) {
     if (typeof(argument) === "function") methodUsed = argument;
     else if (/\d{4}/.test(argument) === true) this.port = argument;
   }*/
   if (this.port === undefined) this.port = 4040;
   if (methodUsed === undefined) methodUsed = () => {this.showMsg(this.hostname, this.port)};
   this.app.listen(this.port, methodUsed);
  },
}

