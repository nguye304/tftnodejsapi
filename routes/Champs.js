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

console.log(process.env.RDS_HOSTNAME);
        console.log(process.env.RDS_USERNAME);
        console.log(process.env.RDS_PASSWORD);
        console.log(process.env.RDS_DATABASE);
        console.log(process.env.RDS_PORT);
        console.log(process.env.PORT);

connection.connect(function(err){
    if(err){
        console.log('Database connection failed! '+err);
        console.log(process.env.RDS_HOSTNAME);
        console.log(process.env.RDS_USERNAME);
        console.log(process.env.RDS_PASSWORD);
        console.log(process.env.RDS_DATABASE);
        console.log(process.env.RDS_PORT);
        console.log(process.env.PORT);
        return;
    }
        console.log('Database connection success');
        console.log(process.env.RDS_HOSTNAME);
        console.log(process.env.RDS_USERNAME);
        console.log(process.env.RDS_PASSWORD);
        console.log(process.env.RDS_DATABASE);
        console.log(process.env.RDS_PORT);
        console.log(process.env.PORT);
});

//GET: /api/champs
//Returns all champions
router.get('/api/champs',(req,res)=>{
    connection.query('SELECT * FROM Champions',
        function(error,results,fields){
            if(error){
                res.send(error);
                return;
            }
            res.send(results);
        }//function close
    )//connection.query close 
});

//PUT: /api/champs/id
//Updates a champion by their id
router.put('/api/champs/id',(req,res)=>{
    const Champion = {
        ChampKey:req.body.ChampKey,
        ChampName:req.body.ChampName,
        ChampHP:req.body.ChampHP,
        ChampAD:req.body.ChampAD,
        ChampAP:req.body.ChampAP,
        ChampDEF:req.body.ChampDEF,
        ChampRES:req.body.ChampRES,
        ChampClass1:req.body.ChampClass1,
        ChampClass2:req.body.ChampClass2,
        ChampClass3:req.body.ChampClass3,
        cost:req.body.cost
    };
    connection.query(`UPDATE Champions 
                        SET ChampName ="${Champion.ChampName}",
                            ChampHP ="${Champion.ChampHP}",
                            ChampAD ="${Champion.ChampAD}",
                            ChampAP ="${Champion.ChampAP}",
                            ChampDEF ="${Champion.ChampDEF}",
                            ChampRES ="${Champion.ChampRES}",
                            ChampClass1 ="${Champion.ChampClass1}",
                            ChampClass2 ="${Champion.ChampClass2}",
                            ChampClass3 ="${Champion.ChampClass3}",
                            cost ="${Champion.cost}"
                        WHERE ChampKey = "${parseInt(req.params.id)}"`,

                        function(err,result){//error handling
                            if(err){
                                res.send(err);
                                return;
                            }
                            res.send(`Successfully added Info for ${Champion.ChampName}`);
                        })
});//router put closing

//POST: api/champs
router.post('/api/champs',(req,res)=>{
    const Champion = {
        ChampKey:req.body.ChampKey,
        ChampName:req.body.ChampName,
        ChampHP:req.body.ChampHP,
        ChampAD:req.body.ChampAD,
        ChampAP:req.body.ChampAP,
        ChampDEF:req.body.ChampDEF,
        ChampRES:req.body.ChampRES,
        ChampClass1:req.body.ChampClass1,
        ChampClass2:req.body.ChampClass2,
        ChampClass3:req.body.ChampClass3,
        cost:req.body.cost
    };

    var query = `INSERT INTO Champions(ChampName,ChampHP,ChampAD,ChampAP,ChampDEF,ChampRES,ChampClass1,ChampClass2,ChampClass3,cost) 
                 VALUES('${Champion.ChampName}','${Champion.ChampHP}','${Champion.ChampAD}','${Champion.ChampAP}','${Champion.ChampDEF}','${Champion.ChampRES}','${Champion.ChampClass1}','${Champion.ChampClass2}','${Champion.ChampClass3}','${Champion.cost}')`;

    connection.query(query, function(err,result){//error handling
                                if(err){
                                    res.send(err);
                                    return;
                                }
                                res.send(`Successfully added Info for ${Champion.ChampName}`);
                            })
});

//DELETE api/champs
router.delete('/api/champs/:id',(req,res)=>{
    var query = `DELETE FROM Champions WHERE ChampKey = ${parseInt(req.params.id)}`;
    connection.query(query,function(err,result){
        if(err){
            message=err;
        }
        else{
            message=`Successfully deleted Champion with id ${req.params.id}`
        }
        res.send(message);
    })
});

module.exports=router;