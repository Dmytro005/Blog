var app = angular.module("app", []);

app.controller("myCtrl", function ($scope) {

    // Our news we paste to blog
    $scope.news = [{
            title: "First message",
            mainText: "Lorem ipsum dolor sit amet consectetur  adipisicing elit. Quam sint quia recusandae nobis reiciendis repellat. Iure a perspiciatis qui perferendis."
        },
        {
            title: "Second message",
            mainText: "Lorem ipsum dolor sit amet consectetur  adipisicing elit. Quam sint quia recusandae nobis reiciendis repellat. Iure a perspiciatis qui perferendis."
        },
        {
            title: "Third message",
            mainText: "Lorem ipsum dolor sit amet consectetur  adipisicing elit. Quam sint quia recusandae nobis reiciendis repellat. Iure a perspiciatis qui perferendis."
        },
        {
            title: "Third message",
            mainText: "Lorem ipsum dolor sit amet consectetur  adipisicing elit. Quam sint quia recusandae nobis reiciendis repellat. Iure a perspiciatis qui perferendis."
        },
        {
            title: "Third message",
            mainText: "Lorem ipsum dolor sit amet consectetur  adipisicing elit. Quam sint quia recusandae nobis reiciendis repellat. Iure a perspiciatis qui perferendis."
        },
        {
            title: "Third message",
            mainText: "Lorem ipsum dolor sit amet consectetur  adipisicing elit. Quam sint quia recusandae nobis reiciendis repellat. Iure a perspiciatis qui perferendis."
        },
        {
            title: "Third message",
            mainText: "Lorem ipsum dolor sit amet consectetur  adipisicing elit. Quam sint quia recusandae nobis reiciendis repellat. Iure a perspiciatis qui perferendis."
        },
    ];
});

//Connect directive

//Menu html doc connect
app.directive("header", function () {
    return {
        replace: true,
        templateUrl: "template/menu.html",
        controller: function($scope){
            $scope.home = true;
            $scope.blog = false;
            $scope.contact = false;

            $scope.menuButtons =[
                {
                    name: "Home",
                    action: function(){
                        $scope.home = true;
                        $scope.blog = false;
                        $scope.contact = false;
                    }
                },
                {
                    name: "Blog",
                    action: function(){
                        $scope.home = false;
                        $scope.blog = true;
                        $scope.contact = false;
                    }
                },
                {
                    name: "Contact",
                    action: function(){
                        $scope.home = false;
                        $scope.blog = false;
                        $scope.contact = true;
                    }
                },

            ]

        }
    }
});

//Main html doc connect
app.directive("mainPage", function () {
    return {
        replace: true,
        templateUrl: "template/pages/main.html",
    }
});

//Blog html doc connect
app.directive("blogPage", function () {
    return {
        replace: true,
        templateUrl: "template/pages/blog.html"
    }
});

//Contact html doc connect
app.directive("contactPage", function () {
    return {
        replace: true,
        templateUrl: "template/pages/contact.html"
    }
});

//Slider html doc connect
app.directive("slider", function () {
    return {
        replace: true,
        templateUrl: "template/slider/slider.html"
    }
});