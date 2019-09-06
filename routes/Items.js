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

//GET: /api/Items
//Returns all Items
router.get('/',(req,res)=>{
    connection.query('SELECT * FROM Items',
        function(error,results,fields){
            if(error){
                res.send(error);
                return;
            }
            res.send(results);
        }//function close
    )//connection.query close 
});
//Returns all Items by id
router.get('/:id',(req,res)=>{
    connection.query(`SELECT * FROM Items WHERE ItemKey=${parseInt(req.params.id)}`,
        function(error,results,fields){
            if(error){
                res.send(error);
                return;
            }
            res.send(results);
        }//function close
    )//connection.query close 
});
//PUT: /api/Items/id
//Updates a item by their item id
router.put('/:id',(req,res)=>{
    const Item = {
        ItemName:req.body.ItemName,
        ItemStat1:req.body.ItemStat1,
        ItemStat2:req.body.ItemStat2,
        ItemStat3:req.body.ItemStat3,
        Recipe:req.body.Recipe,
        Stat1Type:req.body.Stat1Type,
        Stat2Type:req.body.Stat2Type,
        Stat3Type:req.body.Stat3Type,
        ItemEffect:req.body.ItemEffect
    }
    connection.query(`UPDATE Items 
                        SET ItemName ="${Item.ItemName}",
                            ItemStat1 ="${Item.ItemStat1}",
                            ItemStat2 ="${Item.ItemStat2}",
                            ItemStat3 ="${Item.ItemStat3}",
                            Recipe ="${Item.Recipe}",
                            Stat1Type ="${Item.Stat1Type}",
                            Stat2Type ="${Item.Stat2Type}",
                            Stat3Type ="${Item.Stat3Type}",
                            ItemEffect ="${Item.ItemEffect}"

                        WHERE ItemKey = "${parseInt(req.params.id)}"`,

                        function(err,result){//error handling
                            if(err){
                                res.send(err);
                                return;
                            }
                            res.send(`Successfully added Info for ${req.params.id}`);
                        })
});//router put closing

//POST: api/Items
//adds information for a new item
router.post('/',(req,res)=>{
    const Item = {
        ItemName:req.body.ItemName,
        ItemStat1:req.body.ItemStat1,
        ItemStat2:req.body.ItemStat2,
        ItemStat3:req.body.ItemStat3,
        Recipe:req.body.Recipe,
        Stat1Type:req.body.Stat1Type,
        Stat2Type:req.body.Stat2Type,
        Stat3Type:req.body.Stat3Type,
        ItemEffect:req.body.ItemEffect
    }

    var query = `INSERT INTO Items(Item1,Item2,Item3) 
                 VALUES('${Item.ItemName}','${Item.ItemStat1}','${Item.ItemStat2},'${Item.ItemStat3}','${Item.Recipe}','${Item.Stat1Type},'${Item.Stat2Type}','${Item.Stat3Type}','${Item.ItemEffect})`;

    connection.query(query, function(err,result){//error handling
                                if(err){
                                    res.send(err);
                                    return;
                                }
                                res.send(`Successfully added Info for ${Item.ItemName}`);
                            })
});

//DELETE api/Items
router.delete('/:id',(req,res)=>{
    var query = `DELETE FROM Items WHERE ItemKey = ${parseInt(req.params.id)}`;
    connection.query(query,function(err,result){
        if(err){
            message=err;
        }
        else{
            message=`Successfully deleted Item with key ${req.params.id}`
        }
        res.send(message);
    })
});

module.exports=router;