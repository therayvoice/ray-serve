"use strict"
"use strict"
const express = require('express');
const dns = require('dns');
const os = require('os');
//const path = require('path');
const fs = require('ray-fs');
const taken = require('ray-taken');
const core = require('ray-core');
const rayserveAuthors = "Ray Voice and Anna Voice";
const rayserveVersion = "v2.0.0";

module.exports = {
  value: 0,
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
  serveFile: function() {
    const file = taken.take(arguments).getAbsPaths().value[0]; 
    const node = taken.take(arguments).getNodeNames().value[1]; 
    this.app.get(node, (req, res) => {core.sendFile(res, file, this.latency)});
    return this;
  },
  showRoot: function(serverName, versionName) {
    this.serveJSON("/", {Server:serverName, Version: versionName});
    return this;
  },
  listen: function(callback) {
   let methodUsed = core.argAssign(callback, ()=>{this.showPort(this.hostname, this.port)});
   this.app.listen(this.port, methodUsed);
  },
  getIPV4: function(callback) {
    dns.lookup(os.hostname(), (err, add, fam) => {callback(err,add,fam)});
    return this;
  }
}

