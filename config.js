require('dotenv').config();
exports.RDS_HOSTNAME=process.env.hostname||"tftdatabase.cbb9q10r3xzj.us-east-1.rds.amazonaws.com";
exports.RDS_USERNAME=process.env.username||"nguye304";
exports.RDS_PASSWORD=process.env.password||"kip742Jeg";
exports.RDS_DATABASE=process.env.database||"tftdb";
exports.RDS_PORT=process.env.hostname||"3306";