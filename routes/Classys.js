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


//GET: /api/Classes
//Returns all Classes
router.get('/',(req,res)=>{
    connection.query('SELECT * FROM Classes',function(error,results,fields){
            if(error){
                res.send(error);
                return;
            }
            res.send(results);
        }//function close
    )//connection.query close 
});

//PUT: /api/classes/id
//Updates a Class by their id
router.put('/:id',(req,res)=>{
    const Classy = {
        ClassKey:req.body.ClassKey,
        ClassName:req.body.ClassName,
        ClassBonus1:req.body.ClassBonus1,
        ClassBonus2:req.body.ClassBonus2,
        ClassBonus3:req.body.ClassBonus3,
        ClassBonus4:req.body.ClassBonus4,
        ClassBonus5:req.body.ClassBonus5
    };
    connection.query(`UPDATE Classes 
                        SET ClassName ="${Classy.ClassName}",
                            ClassBonus1 ="${Classy.ClassBonus1}",
                            ClassBonus2 ="${Classy.ClassBonus2}",
                            ClassBonus3 ="${Classy.ClassBonus3}",
                            ClassBonus4 ="${Classy.ClassBonus4}",
                            ClassBonus5 ="${Classy.ClassBonus5}"
                        WHERE ClassKey = "${parseInt(req.params.id)}"`,

                        function(err,result){//error handling
                            if(err){
                                res.send(err);
                                return;
                            }
                            res.send(`Successfully added Info for ${Classy.ClassName}`);
                        })
});//router put closing

//POST: api/Classs
router.post('/',(req,res)=>{
    const Classy = {
        ClassKey:req.body.ClassKey,
        ClassName:req.body.ClassName,
        ClassBonus1:req.body.ClassBonus1,
        ClassBonus2:req.body.ClassBonus2,
        ClassBonus3:req.body.ClassBonus3,
        ClassBonus4:req.body.ClassBonus4,
        ClassBonus5:req.body.ClassBonus5
    };

    var query = `INSERT INTO Classes(ClassName,ClassBonus1,ClassBonus2,ClassBonus3,ClassBonus4,ClassBonus5) 
                 VALUES('${Classy.ClassName}','${Classy.ClassBonus1}','${Classy.ClassBonus2}','${Classy.ClassBonus3}','${Classy.ClassBonus4}','${Classy.ClassBonus5}')`;

    connection.query(query, function(err,result){//error handling
                                if(err){
                                    res.send(err);
                                    return;
                                }
                                res.send(`Successfully added Info for ${Classy.ClassName}`);
                            })
});

//DELETE api/Classess
router.delete('/:id',(req,res)=>{
    var query = `DELETE FROM Classes WHERE ClassKey = ${parseInt(req.params.id)}`;
    connection.query(query,function(err,result){
        if(err){
            message=err;
        }
        else{
            message=`Successfully deleted Classes with id ${req.params.id}`
        }
        res.send(message);
    })
});

module.exports=router;