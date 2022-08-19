var mysql = require('mysql');
var connection = mysql.createConnection({
    host: 'ctec-project.cfzsw5fp22fy.us-east-1.rds.amazonaws.com',
    port: '3306',
    user: 'admin',
    password: 'Password',
    database: 'product_review'
});

connection.connect(err => {
    if(err) throw err;
    console.log('Connected to AWS DB');
});
module.exports = connection;