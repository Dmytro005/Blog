//Підключаємо бібліотеки
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8000;

//Клієнстька частина сайту знаходитиметься у папці publick
app.use(express.static(__dirname + "/public"));

//Стандарт кодування
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));

app.post("/value", function (req, res) {
    
    console.log("Result "+req.body.value);
    
    res.status(200).send("My value from server" + (req.body.value) );
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
