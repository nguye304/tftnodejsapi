const express = require ('express')
const app = express()

var ChampsRouter = require('./routes/Champs')
var ItemsRouter = require('./routes/Items')
var RecipesRouter = require('./routes/Recipes')



app.use('/api/champs',ChampsRouter)
app.use('/api/items',ItemsRouter)
app.use('/api/recipes',RecipesRouter)



module.exports = app;