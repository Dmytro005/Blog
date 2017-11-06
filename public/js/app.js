var app = angular.module("app", ["ngAnimate", "ngRoute"]);

//Забираєм %2F та # з url сайту
app.config(['$locationProvider', function ($locationProvider) {
    $locationProvider.hashPrefix('');
    $locationProvider.html5Mode(true);
}]);

//Створюєм адреси
app.config(function ($routeProvider) {
    $routeProvider
        .otherwise({
            redirectTo: '/'
        });

});

app.controller("myCtrl", function ($scope) {});

//Connect directive

//Header
app.directive("header", function () {
    return {
        replace: true,
        templateUrl: "template/menu.html",
        controller: function ($scope, $location) {
            $scope.home = true;
            $scope.blog = false;
            $scope.contact = false;

            $scope.menuButtons = [
                {
                    name: "Home",
                    action: function () {
                        $scope.pageSwitch(this.name);
                    },
                    type: "nav-link"
                },
                {
                    name: "Blog",
                    action: function () {
                        $scope.pageSwitch(this.name);
                    },
                    type: "nav-link"
                },
                {
                    name: "Contact",
                    action: function () {
                        $scope.pageSwitch(this.name);
                    },
                    type: "nav-link"
                },
                {
                    name: "Sing Up",
                    type: "btn btn-outline-success",
                    modal: "singUp"
                },
                {
                    name: "Sing In",
                    type: "btn btn-outline-primary",
                    modal: "singIn",

                },
                {
                    /*For triggering hide and show with other pages*/
                    name: "PostPage",
                    type: "d-none",
                },
                {
                    name: "Profile",
                    type: "d-none"
                }


            ];


            //Switch page throught pocesing the massive and enable current page
            $scope.pageSwitch = function (page) {

                var buttons = $scope.menuButtons;

                let switchPage = page;

                //              console.log(switchPage);

                for (var i = 0; i < buttons.length; i++) {
                    if (switchPage === buttons[i].name) {
                        let scopePage = buttons[i].name.toLowerCase();
                        $scope[scopePage] = true;
                    } else {
                        let scopePage = buttons[i].name.toLowerCase();
                        $scope[scopePage] = false;
                    }
                }
            }


            //--header visuals add padding because header is fixed

            var height = $("#nav-menu").height();
            $("body").css("padding-top", height * 1.25);



        }
    }
});

//All out pages
app.directive("pages", function () {
    return {
        replace: true,
        templateUrl: "template/pages/pages.html",
        controller: function () {}
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
        templateUrl: "template/pages/blog.html",
        controller: function ($scope, $http) {
            //            Gey array of blog posts
            $http.get("http://localhost:8000/posts")
                .then(function successCallBack(response) {
                    $scope.posts = response.data;
                });

            $scope.upload = function () {

                var fd = new FormData();
                fd.append("1", $scope.myFile);
                $http.post("http://localhost:8000/images", fd, {
                        transformRequest: angular.identity,
                        headers: {
                            'Content-Type': undefined
                        }
                    })
                    .then(function successCallBack() {
                        console.log("Uploaded");
                    }, function errorCallBack(response) {
                        console.log("Error!!!" + response.err);
                    })
            }

        }
    }
});

app.directive("postPage", function () {
    return {
        replace: true,
        templateUrl: "template/pages/post.html",
        controller: function ($scope, $http) {

            $scope.postPage = false;

            $scope.readMore = function (id) {

                let postId = {
                    id: id
                };

                //                console.log(postId);

                $http.post("http://localhost:8000/post", postId)
                    .then(function successCallBack(response) {

                        $scope.pageSwitch("PostPage");

                        //                        console.log(response.data);

                        $scope.postTitle = response.data[0].title;

                        $scope.postPhoto = response.data[0].title_photo;

                        $scope.postFullText = response.data[0].full_text;

                        $(window).scrollTop(0);
                        $scope.blogScroll
                        console.log($(window).scrollTop());
                    });
            }
        }
    }
});

//Contact html doc connect
app.directive("contactPage", function () {
    return {
        replace: true,
        templateUrl: "template/pages/contact.html",
        controller: function ($scope, $http) {
            $scope.contactForm = true;
            $scope.sendEmail = function () {

                let obj = {
                    nameSurname: $scope.nameSurname,
                    email: $scope.email,
                    message: $scope.message
                }

                $http.post("http://localhost:8000/sendMessage", obj)

                    .then(function successCallBack(response) {
                        $scope.alert = true;
                        $scope.contactForm = false;
                        $scope.alert = response.data;
                    });
            }
        }
    }
});

app.directive("singUp", function () {
    return {
        replace: true,
        templateUrl: "template/modals/singUp.html",
        controller: function ($scope, $http) {
            $scope.singUpForm = true;

            //For remodal close and open
            var SingUpModal = $('[data-remodal-id=singUp]').remodal();

            //Form style adding on close
            var SingUpStyle = $('[data-remodal-id=singUp]');

            $scope.singUpUser = function () {
                let Obj = {
                    login: $scope.SingUpLogin,
                    info: $scope.SingUpEmail,
                    password: $scope.SingUpPass
                }

                //Hide form
                $scope.singUpForm = false;
                //Show allert
                $scope.singUpAlert = true;

                $http.post("http://localhost:8000/singUp", Obj).then(function successfullCallBack(response) {
                    SingUpStyle.addClass(" alert alert-success");
                    $scope.singUpAlertMessage = response.data;
                });

                setTimeout(function () {

                    SingUpModal.close();
                    SingUpStyle.removeClass("alert alert-success");

                    //Show form
                    $scope.singUpForm = true;
                    //Hide form
                    $scope.singUpAlert = false;
                }, 2500)

            }

            //Disable remodal initialization on page load becuse of using directive
            $('.remodal').remodal({
                hashTracking: false
            });


        }
    }
});

app.directive("singIn", function () {
    return {
        replace: true,
        templateUrl: "template/modals/singIn.html",
        controller: function ($scope, $http) {
            $scope.singInForm = true;

            /*Initialize the modal block*/
            var SingInModal = $('[data-remodal-id=singIn]').remodal();

            var SingInStyles = $('[data-remodal-id=singIn]');
            var AlertSytles = $("#sing-in-alert");

            /*Local storage Auth*/
            if (localStorage.userName == "undefined") {
                localStorage.userName = "Guest";
                $("#UserSettings").addClass("d-none");
            } else {
                if (localStorage.userName != "Guest") {
                    $scope.CurentUser = localStorage.userName;

                    $("[data-remodal-target= singIn]").addClass("d-none");

                    $("[data-remodal-target= singUp]").addClass("d-none");
                    $("#UserSettings").removeClass("d-none");
                }
            }

            $scope.heartIcon = false;

            $scope.singInUser = function () {

                var Obj = {
                    login: $scope.SingInLogin,
                    password: $scope.SingInPass
                }

                AlertSytles.addClass("alert-danger");

                /*Enable form and alert*/
                $scope.singInForm = true;
                $scope.singInAlert = true;

                $http.post("http://localhost:8000/singIn", Obj).then(function successfullCallBack(response) {
                    $scope.singInAlertMessage = response.data.message;

                    /*Close modal*/
                    if (response.data.signed) {

                        AlertSytles.removeClass("alert-danger");

                        AlertSytles.addClass("alert-primary");

                        SingInStyles.addClass("alert-primary");

                        $scope.singInAlertMessage += " " + response.data.userLogin;

                        $scope.heartIcon = true;

                        $scope.singInForm = false;
                        $scope.singInAlert = true;

                        $http.post('http://localhost:8000/userProfile', Obj).then(function successfullCallBack(response) {
                            console.log(response.data);
                        })

                        setTimeout(function () {


                            $("[data-remodal-target= singIn]").addClass("d-none");
                            $("[data-remodal-target= singUp]").addClass("d-none");
                            $("#UserSettings").removeClass("d-none");

                            SingInModal.close();

                        }, 2000);

                    } else {
                        $scope.singInForm = true;
                    }

                    /*Change user name*/
                    localStorage.userName = response.data.userLogin;
                    $scope.CurentUser = localStorage.userName;

                });


            }

            $scope.LogOut = function () {

                $scope.pageSwitch('Home');

                $scope.heartIcon = false;
                $("[data-remodal-target= singIn]").removeClass("d-none");

                $("[data-remodal-target= singUp]").removeClass("d-none");
                $("#UserSettings").addClass("d-none");
                localStorage.userName = "Guest";

                /*Enable form and alert*/
                $scope.singInForm = true;
                $scope.singInAlert = false;

                /*Remove classes*/
                AlertSytles.removeClass("alert-primary");

                SingInStyles.removeClass("alert-primary");

            }

            //Disable remodal initialization on page load becuse of using directive
            $('.remodal').remodal({
                hashTracking: false
            });


        }
    }
});

app.directive("userProfile", function () {
    return {
        replace: true,
        templateUrl: "template/pages/user-profile.html",
        controller: function ($scope, $http) {
            $scope.currentUser = "Dima"
            if (localStorage.userName != undefined) {
                
                let Obj = {
                    login: localStorage.userName
                }
                
                $http.post('http://localhost:8000/userProfile', Obj).then(function successfullCallBack(response) {
                            console.log(response.data);
                });

            }
        }
    }
});

//Slider html doc connect
app.directive("slider", function () {
    return {
        replace: true,
        templateUrl: "template/slider.html",
        controller: function () {
            $('.carousel').carousel({
                interval: 4000
            })
        }
    }
});

/*Директива з унікальним атрибутом для передачі файлів
 */

app.directive('fileModel', ['$parse', function ($parse) {
    return {
        restrict: "A",
        link: function (scope, element, attrs) {
            var model = $parse(attrs.fileModel);
            var modelSetter = model.assign;
            element.bind('change', function () {
                scope.$apply(function () {
                    modelSetter(scope, element[0].files);
                });
            });
        }
    };
}]);
