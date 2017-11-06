//Підключаємо бібліотеки
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const mysql = require("mysql");
const PORT = 8000;

const multer = require("multer");

var storage = multer.diskStorage({
    destination: function (req, file, cd) {
        cd(null, 'public/img/')
    },
    filename: function (req, file, cd) {
        cd(null, fieldname);
    }
});

var upload = multer({
    storage: storage
});

app.post("/images", upload.any(), function (req, res, next) {
    res.sendStatus(200);
});

/*Під'єднуємся до бази даних*/
const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "1111",
    database: "my_projects"
});


//Клієнстька частина сайту знаходитиметься у папці publick
app.use(express.static(__dirname + "/public"));

//Стандарт кодування
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));

app.get("/posts", function (req, res) {
    connection.query("SELECT id, title, title_photo, preview_text FROM posts", function (err, rows) {
        if (err) throw err;
        res.status(200).send(rows);
        //        console.log(rows);
    });
});

app.post("/post", function (req, res) {

    connection.query('SELECT * FROM posts WHERE id = ?', req.body.id, function (err, rows) {
        if (err) throw err;
        res.status(200).send(rows);
        //        console.log(req.body);
    });
});

app.post("/sendMessage", function (req, res) {
    console.log(req.body);
    res.status(200).send("Form has been sent successfully");
});

app.post("/singUp", function (req, res) {
    connection.query("INSERT INTO users SET ?", req.body,
        function (err, result) {
            if (err) throw err;
            console.log("user added to database with id: " + result.insertId);
        }
    );
    res.status(200).send("You're data have been successfuly stolen. Have a nice day)");

});

app.post("/singIn", function (req, res) {
    connection.query("SELECT * FROM users WHERE login = ?", req.body.login, function (err, rows) {
        if (err) throw err;

        if (rows[0] != undefined) {

            if (rows[0].password == req.body.password) {
                res.status(200).send({
                    message: "Welcome",
                    userLogin: rows[0].login,
                    userId: rows[0].password,
                    userInfo: rows[0].info,
                    signed: true
                });
            } else {
                res.status(200).send({
                    message: "Wrong password"
                });
            }

        } else {
            res.status(200).send({
                message: "Wrong login"
            });

        }
    });
});

app.post("/userProfile", function (req, res) {
    //    console.log(req.body);
    connection.query("SELECT * FROM users WHERE login = ? ", req.body.login, function (err, rows) {
        if (err) throw err;
        
        let password = rows[0].password;

        connection.query("SELECT * FROM users_info WHERE user_id = ? ", rows[0].id, function (err, rows) {

            if (err) throw err;
            
            rows[0].password = password;
            
            res.status(200).send(rows[0]);
        });
    })
});

//Усі адреси контролюються клієнтським ангуляром
app.get("*", function (req, res) {
    res.sendFile(__dirname + "/public/index.html");
});

//Запуск серверу
app.listen(PORT, function (err) {
    if (err) throw err;
    console.log("Server start on port " + PORT);
});
