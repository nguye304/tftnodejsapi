const express = require ('express')
const app = express()

var ChampsRouter = require('./routes/Champs')
var ItemsRouter = require('./routes/Items')
var RecipesRouter = require('./routes/Recipes')
var LilLegsRouter=require('./routes/LilLegs');
var ClassysRouter=require('./routes/Classys');

app.use('/api/champs',ChampsRouter)
app.use('/api/items',ItemsRouter)
app.use('/api/recipes',RecipesRouter)
app.use('/api/lillegs',LilLegsRouter)
app.use('/api/classes',ClassysRouter)



app.get('/api/',(req,res)=>{
    res.json({ok:true});
});

module.exports = app;