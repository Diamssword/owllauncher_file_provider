const express = require('express')
require('dotenv').config();

const app = express()
const chalk = require('chalk');
const manager = require('./manager');
const path = require("path");
const fs = require("fs");
const fileWatcher = require("./filesWatcher").files;
//require("./inputs");
app.get('/*', function (req, res) {
  var url = new URL(req.url, `http://${req.headers.host}`).pathname;
  url = url.substring(1);
  var packId = url;
  let idne = url.indexOf("/");
  if (idne > -1)
    packId = url.substring(0, idne);
  var pack = manager.getPack(packId, req);
  if (idne > -1) {
    if (url.substring(idne + 1).startsWith("sync")) {
      var syncdir = url.substring(idne + 1);
      if (syncdir.endsWith("sync") || syncdir.endsWith("sync/")) {
        res.json(fileWatcher(pack.profile.id));
      }
      else {
        let ind = syncdir.indexOf("/");
        let file = syncdir.substring(ind + 1);
        let ff = path.resolve(path.join(".", pack.profile.id, file));

        if (fs.existsSync(ff))
          res.sendFile(ff);
        else {
          res.status(404);
          res.sendStatus(404);
        }


      }
      return;
    }
  }
  res.json(pack);


})

  var server;
  if (process.env.secure == true)
  {
    server=require("https").createServer(
      {
        key: fs.readFileSync('ssl.key'),
        cert: fs.readFileSync('ssl.cert')
      },app)
  }
  else
  {
    server=require("http").createServer(app)
  }
  
  server.listen(process.env.port, () => {
  console.log("Server launched on port " + process.env.port)
  console.log(chalk.greenBright("Type 'help' or 'h' for a list of commands and help"))

})

manager.update();
