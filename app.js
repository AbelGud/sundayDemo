console.log ("TEST")
//~step1. import modules
const express = require ("express");
const mysql = require ("mysql2");

//~step2. initiate express
let app = express();

//!Middleware()
app.use(express.urlencoded({extended: true}));
app.use(express.json());



//~step4. setup db connection
let myDBconnection = mysql.createConnection({
    user:"crudpracticeuser",
    password:'Abcd@123',
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
app.get('/test',(req,res)=>{
    res.send("backend is working!!");
});


//~step8. Creat table
app.get ("/createTable",(req,res) => {
    let tableSchema = `CREATE TABLE if not exists userInfo(
    user_id int auto_increment,
    user_first_name varchar(255) null,
    user_last_name varchar(255) null,
    user_email varchar(255) not null,
    user_batch varchar(255) not null,
    user_group varchar(255) not null,
    user_course varchar(255) not null,
    PRIMARY KEY(user_id))`;

    myDBconnection.query(tableSchema,(err,data,field)=>{
        //!err ; if there is any error while executing display
       if(err) {
        console.log(err);
       } else {
        res.send("Table created successfully !!");
       }
    });
    
});


//~step9. data insertion
app.post('/createUser',(req,res) => {

    const {firstName, lastName, email, batch, group, course } = req.body;

    let insertQuery = `
    INSERT INTO userInfo(
    user_first_name,
    user_last_name,
    user_email,
    user_batch,
    user_group,
    user_course
    )
    VALUES (?,?,?,?,?,?)`;

    myDBconnection.query(insertQuery,[firstName, lastName, email, batch, group, course], (err,data,field) => {
    if(err) {
        console.log(err)
    } else {
        res.send("data inserted successfully");
    }
       
    },
);
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