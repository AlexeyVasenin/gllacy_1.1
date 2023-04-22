const jsonServer = require('json-server')
const demodata = require('./db.json')
const routes = require('./routes.json')

// const routes = require('./routes.json')

const server = jsonServer.create()       // Express server
const router = jsonServer.router(demodata) // Express router

server.use(jsonServer.defaults(['./public']))

// Avoid CORS issue
// server.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   next();
// });

server.use(jsonServer.rewriter(routes))
server.use(router)

server.listen(3005)