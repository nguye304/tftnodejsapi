const express = require ('express')
const app = express()
var http = require('http')
var https = require('https')
var ChampsRouter = require('./routes/Champs')
var ItemsRouter = require('./routes/Items')
var RecipesRouter = require('./routes/Recipes')



app.use('/api/champs',ChampsRouter)
app.use('/api/items',ItemsRouter)
app.use('/api/recipes',RecipesRouter)

var httpServer = http.createServer(app);
var httpsServer= https.createServer(app);

httpServer.listen(8080);
httpsServer.listen(8443);
module.exports = app;