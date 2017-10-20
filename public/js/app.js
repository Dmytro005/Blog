var app = angular.module("app", ["ngAnimate"]);

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
                        $scope.home = true;
                        $scope.blog = false;
                        $scope.contact = false;
                        $scope.postPage = false;

                    },
                    type: "nav-link"
                },
                {
                    name: "Blog",
                    action: function () {
                        $scope.home = false;
                        $scope.blog = true;
                        $scope.contact = false;
                        $scope.postPage = false;
                    },
                    type: "nav-link"
                },
                {
                    name: "Contact",
                    action: function () {
                        $scope.home = false;
                        $scope.blog = false;
                        $scope.contact = true;
                        $scope.postPage = false;
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

                }


            ];

            //--header visuals

            var height = $("#nav-menu").height();
            $("body").css("padding-top", height * 1.4);



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

                        $scope.postPage = true;
                        $scope.blog = false;

                        //                        console.log(response.data);

                        $scope.postTitle = response.data[0].title;

                        $scope.postPhoto = response.data[0].title_photo;

                        $scope.postFullText = response.data[0].full_text;
                        
                        $("body").scrollTop(0);
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

            var SingInModal = $('[data-remodal-id=singIn]').remodal();

            var SingInStyles = $('[data-remodal-id=singIn]');

            $scope.UserName = "Guest"
            $scope.heartIcon = false;

            $scope.singInUser = function () {
                let Obj = {
                    login: $scope.SingInLogin,
                    password: $scope.SingInPass
                }

                $scope.singInForm = false;
                $scope.singInAlert = true;
                $scope.singInAlertMessage = "Bye";

                $http.post("http://localhost:8000/singIn", Obj).then(function successfullCallBack(response) {
                    SingInStyles.addClass("alert alert-primary")

                    $scope.singInAlertMessage = response.data.message;

                    //                    console.log(response.data.userLogin)

                    setTimeout(function () {
                        SingInStyles.removeClass("alert alert-primary")

                        SingInModal.close();

                        $scope.singInForm = true;
                        $scope.singInAlert = false;
                        
                        $scope.heartIcon = true;
                
                    }, 2000);
                    
                    $scope.UserName = response.data.userLogin || "Guest" ;
                    
                });


            }
            
            $scope.logOut = function(){
                $scope.UserName = "Guest";
                $scope.heartIcon = false;
            }

            //Disable remodal initialization on page load becuse of using directive
            $('.remodal').remodal({
                hashTracking: false
            });


        }
    }
});

//Slider html doc connect
app.directive("slider", function () {
    return {
        replace: true,
        templateUrl: "template/slider.html",
        controller: function () {
            $(function () {
                var slideDelay = 4500;
                var animDuration = 2000;

                var currentSlide = 1;
                var width = $("#slider").width();

                var $slider = $("#slider");
                var $sliderContainer = $slider.find("#sliderContainer");
                var $slides = $sliderContainer.find(".slide");
                var lastSlide = $slides.length;

                var circleHTML = "";
                var currentCircle;
                var previousCircle;

                var interval; // contains our interval playing

                //---------------create circles    
                for (var i = currentSlide; i <= lastSlide; i++) {
                    circleHTML += '<div class="circle" slide-id="' + i + '"></div>';
                }
                //---------------paste circles    
                $slider.append("<div class='bar'>" + circleHTML + "</div>");

                //---------------check and activate circles
                function circleActivate() {
                    if (previousCircle !== undefined) {
                        previousCircle.removeClass("active");
                    }
                    currentCircle = $(".circle[slide-id='" + currentSlide + "']");
                    currentCircle.addClass("active");
                    previousCircle = currentCircle;
                }

                //---------Upload Photo when it's need
                function photoUpload() {
                    let count = currentSlide + 1;
                    $(".slide:nth-child(" + count + ")").css("background", "url(img/slides/" + count + ".jpg)");
                }
                //uppload first photo
                $(".slide:nth-child(" + (currentSlide) + ")").css("background", "url(img/slides/" + (currentSlide) + ".jpg)");

                //-----scroll to the current slide
                function scrollToCurrent() {
                    $("#sliderContainer").animate({ //scroll previous
                        scrollLeft: width * currentSlide
                    }, animDuration / 2);
                }

                //-----return slidet to first slide
                function toFirstSlide() {
                    if (currentSlide === lastSlide + 1) {
                        currentSlide = 1;
                        $("#sliderContainer").animate({
                            scrollLeft: 0
                        }, animDuration / 2);
                    }
                }

                //------play slider
                function play() {

                    circleActivate();

                    interval = setInterval(function () {
                        nextSlide();
                        //            console.log(currentSlide);
                    }, slideDelay)
                }

                //------stop slider
                function stop() {
                    clearInterval(interval);
                }

                function nextSlide() {
                    stop();

                    photoUpload();

                    ++currentSlide;

                    circleActivate();

                    $("#sliderContainer").animate({ //scroll previous
                        scrollLeft: "+=" + width
                    }, animDuration, "swing");

                    if (currentSlide > lastSlide) {
                        toFirstSlide();
                    }
                    play();
                    // console.log(currentSlide);
                }

                function prevSlide() {
                    stop();

                    --currentSlide;

                    circleActivate();

                    $("#sliderContainer").animate({ //scroll to next
                        scrollLeft: "-=" + width
                    }, animDuration);

                    if (currentSlide < 1) {
                        currentSlide = 1;
                        circleActivate();
                    }
                    play();
                    //                    console.log(currentSlide);

                }

                //----circle click event handler
                $(".circle").click(function () {

                    stop(); //stop slider

                    $("#sliderContainer").animate({ //scroll to certain block
                        scrollLeft: width * ($(this).attr("slide-id") - 1)
                    }, animDuration, "swing");

                    currentSlide = $(this).attr("slide-id"); //change current slide

                    photoUpload();

                    circleActivate(); //activate properly circle

                    play(); //play slider again
                })

                //----buttons previous and next event handler
                $(".slider-btn").click(function () {
                    if ($(this).attr("id") == "next") {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                });

                //-----activate autoplay
                play();

            });

        }
    }
});
