const express = require('express');
const router = express.Router();
const mysql = require ('mysql');
const cors = require ('cors');

process.env.NODE_ENV = 'production';
const config = require('../config');

router.use(express.json());
router.use(cors());

process.env.RDS_HOSTNAME = config.RDS_HOSTNAME;
process.env.RDS_USERNAME = config.RDS_USERNAME;
process.env.RDS_PASSWORD = config.RDS_PASSWORD;
process.env.RDS_DATABASE = config.RDS_DATABASE;
process.env.RDS_PORT = config.RDS_PORT;

var connection = mysql.createConnection({
    host: process.env.RDS_HOSTNAME,
    user: process.env.RDS_USERNAME,
    password: process.env.RDS_PASSWORD,
    port: process.env.RDS_PORT,
    database: process.env.RDS_DATABASE
});

connection.connect(function(err){
    if(err){
        console.log('Database connection failed'+err);
        return;
    }
    console.log('Database connection success');
});

//GET: /api/recipes
//Returns all ItemRecipes
router.get('/',(req,res)=>{
    connection.query('SELECT * FROM ItemRecipes',
        function(error,results,fields){
            if(error){
                res.send(error);
                return;
            }
            res.send(results);
        }//function close
    )//connection.query close 
});

//PUT: /api/recipes/id
//Updates a recipe by their item name
router.put('/:reckey',(req,res)=>{
    const Recipe = {
        Item1:req.body.Item1,
        Item2:req.body.Item2,
        Item3:req.body.Item3
    }
    connection.query(`UPDATE ItemRecipes 
                        SET Item1 ="${Recipe.Item1}",
                            Item2 ="${Recipe.Item2}",
                            Item3 ="${Recipe.Item3}",
                        WHERE RecipeKey = "${parseInt(req.params.reckey)}"`,

                        function(err,result){//error handling
                            if(err){
                                res.send(err);
                                return;
                            }
                            res.send(`Successfully added Info for ${req.params.reckey}`);
                        })
});//router put closing

//POST: api/recipes
router.post('/',(req,res)=>{
    const Recipe = {
        Item1:req.body.Item1,
        Item2:req.body.Item2,
        Item3:req.body.Item3
    }

    var query = `INSERT INTO ItemRecipes(Item1,Item2,Item3) 
                 VALUES('${Recipe.Item1}','${Recipe.Item2}','${Recipe.Item3})`;

    connection.query(query, function(err,result){//error handling
                                if(err){
                                    res.send(err);
                                    return;
                                }
                                res.send(`Successfully added Info for ${Recipe.Item1}`);
                            })
});

//DELETE api/recipes
router.delete('/:id',(req,res)=>{
    var query = `DELETE FROM ItemRecipes WHERE RecipeKey = ${parseInt(req.params.id)}`;
    connection.query(query,function(err,result){
        if(err){
            message=err;
        }
        else{
            message=`Successfully deleted Recipe with key ${req.params.id}`
        }
        res.send(message);
    })
});

module.exports=router;