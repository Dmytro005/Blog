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
                    action: function ($anchorScroll) {
                        $scope.home = true;
                        $scope.blog = false;
                        $scope.contact = false;

                    },
                    type: "nav-link"
                },
                {
                    name: "Blog",
                    action: function () {
                        $scope.home = false;
                        $scope.blog = true;
                        $scope.contact = false;
                    },
                    type: "nav-link"
                },
                {
                    name: "Contact",
                    action: function () {
                        $scope.home = false;
                        $scope.blog = false;
                        $scope.contact = true;
                    },
                    type: "nav-link"
                },
                {
                    name: "Log in",
                    type: "btn btn-outline-success",
                    modal: "login"
                }


            ];

            //--header visuals

            var height = $("#nav-menu").height();
            $("body").css("padding-top", height);



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
                    $scope.news = response.data;
                });

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

app.directive("loginCard", function () {
    return {
        replace: true,
        templateUrl: "template/pages/login.html",
        controller: function ($scope) {
            $scope.singUpForm = true;
            
            $scope.singUpUser = function () {
                let Obj = {
                    name: $scope.nick,
                    email: $scope.email,
                    pass: $scope.pass
                }
                console.log($scope.NickName);
                
                $scope.singUpForm = false;
                $scope.singUpAlert = true;
                $scope.singUpAlertMessage = "Bye";
                
                setTimeout(function(){
                   var inst = $('[data-remodal-id=login]').remodal();
                    inst.close();
                },2000)
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
