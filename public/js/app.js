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

app.directive("pages", function () {
    return {
        replace: true,
        templateUrl: "template/pages/pages.html",
        controller: function () {



        }
    }
});




app.directive("header", function () {
    return {
        replace: true,
        templateUrl: "template/menu.html",
        controller: function ($scope) {
            $scope.home = true;
            $scope.blog = false;
            $scope.contact = false;

            $scope.menuButtons = [{
                    name: "Home",
                    action: function () {
                        $scope.home = true;
                        $scope.blog = false;
                        $scope.contact = false;
                    }
                },
                {
                    name: "Blog",
                    action: function () {
                        $scope.home = false;
                        $scope.blog = true;
                        $scope.contact = false;
                    }
                },
                {
                    name: "Contact",
                    action: function () {
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
        templateUrl: "template/slider.html",
        controller: function () {
            $(function () {
                var slideDelay = 4500;
                var animDuration = 1800;

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
                    }, 700);
                }

                //-----return slidet to first slide
                function toFirstSlide() {
                    if (currentSlide === lastSlide + 1) {
                        currentSlide = 1;
                        $("#sliderContainer").animate({
                            scrollLeft: 0
                        }, 1000);
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
                    }, animDuration);

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
                    console.log(currentSlide);

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
                $(".btn").click(function () {
                    if ($(this).attr("id") == "next") {
                        nextSlide();
                    } else {
                        prevSlide();
                    }
                });

                //----key work;
                $("body").keydown(function (e) {
                    if (e.keyCode == 37) { // left
                        prevSlide();
                    } else if (e.keyCode == 39) { // right
                        nextSlide();
                    }
                });

                //    $("#slider").mouseenter(function () {
                //            stop();
                //            console.log("enter");
                //        })
                //        .mouseleave(function () {
                //            console.log("leave");
                //            play();
                //        });

                //-----activate autoplay
                play();

            });

        }
    }
});