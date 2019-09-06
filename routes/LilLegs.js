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
        console.log('Database connection failed! '+err);
    
        return;
    }
        console.log('Database connection success');
   
});


//GET: /api/lillegs
//Returns all Lil Legends
router.get('/',(req,res)=>{
    connection.query('SELECT * FROM LilLegs',function(error,results,fields){
            if(error){
                res.send(error);
                return;
            }
            res.send(results);
        }//function close
    )//connection.query close 
});

//PUT: /api/lillegs/id
//Updates a LilLeg by their id
router.put('/:id',(req,res)=>{
    const LilLeg = {
        LegKey:req.body.LegKey,
        LegName:req.body.LegName,
        LegTier:req.body.LegTier,
        LegImage:req.body.LegImage,
        LegUrl:req.body.LegUrl,
    };
    connection.query(`UPDATE LilLegs 
                        SET LegName ="${LilLeg.LegName}",
                            LegTier ="${LilLeg.LegTier}",
                            LegImage ="${LilLeg.LegImage}",
                            LegUrl ="${LilLeg.LegUrl}"
                        WHERE LegKey = "${parseInt(req.params.id)}"`,

                        function(err,result){//error handling
                            if(err){
                                res.send(err);
                                return;
                            }
                            res.send(`Successfully added Info for ${LilLeg.LegName}`);
                        })
});//router put closing

//POST: api/lillegs
router.post('/',(req,res)=>{
    const LilLeg = {
        LegKey:req.body.LegKey,
        LegName:req.body.LegName,
        LegTier:req.body.LegTier,
        LegImage:req.body.LegImage,
        LegUrl:req.body.LegUrl,
    };

    var query = `INSERT INTO LilLegs(LegName,LegTier,LegImage,LegUrl) 
                 VALUES('${LilLeg.LegName}','${LilLeg.LegTier}','${LilLeg.LegImage}','${LilLeg.LegUrl}')`;

    connection.query(query, function(err,result){//error handling
                                if(err){
                                    res.send(err);
                                    return;
                                }
                                res.send(`Successfully added Info for ${LilLeg.LegName}`);
                            })
});

//DELETE api/lillegs
router.delete('/:id',(req,res)=>{
    var query = `DELETE FROM LilLegs WHERE LegKey = ${parseInt(req.params.id)}`;
    connection.query(query,function(err,result){
        if(err){
            message=err;
        }
        else{
            message=`Successfully deleted LilLeg with id ${req.params.id}`
        }
        res.send(message);
    })
});

module.exports=router;