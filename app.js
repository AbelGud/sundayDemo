console.log ("TEST")
//~step1. import modules
const express = require ("express");
const mysql = require ("mysql2");



//~step2. initiate express
let app = express();



//~step4. setup db connection
let myDBconnection = mysql.createConnection({
    user:"crudpracticeuser",
    password:'crudrracticeuser@1234',
    host:'localhost',
    database:'crudPracticeDB',
})


//~step5. setup db and user in phpMyAdmin

/*   - open phpMyAdmin 
               - create database: "crudPracticeDB"
               - create user: add user acc ->  "crudpracticeuser"
              - Host name: Local
              - Password: 'crudpracticeuser@1234'  -------> GO

              - select 'Database' -> select " crudPracticeDB" ---->GO

               - Database-specificattion privilage      Checkall ------>GO

   */


//~ step6. connect with db
myDBconnection.connect((err) => {
    if(err) {
        console.log (err)
    }else {
       console.log ('db connection successfully'); 
    }
})

//~step7. test API creation
app.get('test',(req,res)=>{
    res.send("backend is working!!");
});


//~step3. creat server
let PORT = 4678;
app.listen(PORT,(err) =>{
    if(err) {
        console.log(err)
    } else {
        console.log('server is listening to port ${PORT}')
    }
})