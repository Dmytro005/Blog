//Підключаємо бібліотеки
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const PORT = 8000;

var posts = [{
            title: "First message",
            mainText: "Lorem ipsum dolor sit amet consectetur  adipisicing elit. Quam sint quia recusandae nobis reiciendis repellat. Iure a perspiciatis qui perferendis.",
            img:"http://i2.cdn.cnn.com/cnnnext/dam/assets/161021133655-img-worlds-velociraptor-super-169.jpg"
        },
        {
            title: "Second message",
            mainText: "Lorem ipsum dolor sit amet consectetur  adipisicing elit. Quam sint quia recusandae nobis reiciendis repellat. Iure a perspiciatis qui perferendis.",
            img:"https://cdn.pixabay.com/blog/preview/2015/11/01/13-41-55-935_640x420.png"
        },
        {
            title: "Third message",
            mainText: "Комментируя трансляцию прямого эфира телеканала NewsONE, вы соглашаетесь уважать мнение оппонентов дискуссии, воздерживаться от оскорбления ведущих и гостей телеканала. Нарушители будут лишены права комментировать все материалы на сайте телеканала.",
            img:"http://www.webdesigndev.com/wp-content/uploads/2015/07/Iceberg-Polygon-Art-by-nasrul-razali-via-Behance.jpg"
        },
        {
            title: "Third message",
            mainText: "LВ понедельник, 9 октября, сборная Украины по футболу заключительном матче отборочного турнира ЧМ-2018 проиграла сборной Хорватии со счетом 0:2. В социальных сетях по…",
            img:"http://farm7.static.flickr.com/6234/6334553668_ac89bb53d8.jpg"
        },
        {
            title: "Third message",
            mainText: "Lorem ipsum dolor sit amet consectetur  adipisicing elit. Quam sint quia recusandae nobis reiciendis repellat. Iure a perspiciatis qui perferendis.",
            img:"https://i.pinimg.com/originals/fb/ea/a3/fbeaa39a5b7750e8a9eab8d0179e77e0.jpg"
        },
        {
            title: "Third message",
            mainText: "Прошло уже больше месяца с момента вступления в силу скандального постановления Национального банка Украины от 25.05.2017 № 42 «О внесении изменений в…",
            img:"https://i.pinimg.com/736x/eb/21/46/eb214681d19c8e6f25e07c377b6d6bef--wallpaper-iphone-plants-minimalism-wallpaper-iphone.jpg"
        },
        {
            title: "Third message",
            mainText: "Lorem ipsum dolor sit amet consectetur  adipisicing elit. Quam sint quia recusandae nobis reiciendis repellat. Iure a perspiciatis qui perferendis.",
            img:"https://i.pinimg.com/736x/b3/79/9e/b3799e81d7ebc2bfa975ac01f7691f12--iphone-backgrounds-wallpaper-iphone.jpg"
        },
    ];
var messages = [];
    
//Клієнстька частина сайту знаходитиметься у папці publick
app.use(express.static(__dirname + "/public"));

//Стандарт кодування
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    'extended': 'true'
}));

app.get("/posts", function (req, res) {
    res.status(200).send(posts);
});

app.post("/sendMessage", function(req,res){
    console.log(req.body);
   res.status(200).send("Form has been sent successfully");
    
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
