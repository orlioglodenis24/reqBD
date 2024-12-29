const mysql = require('mysql2');
const http = require('http');
const fs = require('fs');
const express = require('express');
const path = require('path');
const bodyParser = require("body-parser");
const app = express();

var con = mysql.createPool({
  host: "sql7.freemysqlhosting.net",
  user: "sql7751433",
  password: "yyp9LLwS7y",
  database: "sql7751433",
  port: "3306",
  connectionLimit: 10
});

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index2.html'));
});
fs.readFile('tableSign.sql','utf8',(err,sql)=>{
    app.post('/', async (req, res) => {
        try {
          const { login, password } = req.body;
          if (!login || !password) {
            return res.status(400).send("заполните!");
          }
    //   fs.readFile('tableSign.sql','utf-8',(sql)=>{})
          const sql = 'INSERT INTO sign (login, password) VALUES (?, ?)';
          const [result] = await con.promise().execute(sql, [login, password]);
      
          res.status(200).send('Зарегистрированы успешно!');
        } catch (err) {
          console.log("Ошибка: " + err);
        }
      }); 
})


app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});


///////////////////////
 // const request=function(){
//     fs.readFile('table.sql','utf-8',(err,sql)=>{
//         if(err){console.log('error in read file')}

//         con.query(sql,function(err,result){
//             if(err){console.log('error in sql req')}
//             else console.log('succes'+result)
//         })
//     })
   
// };
// http.createServer(function(req,res){
//     if(req.method==='GET' && req.url==='/'){
//         request();
//         res.writeHead(200, { 'Content-Type': 'text/plain' });
//         res.end('suces');
//     }else{
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('error')
//     }
// }).listen(3000)
// const sql='ALTER TABLE big ADD COLUMN password VARCHAR(255) NOT NULL;'
