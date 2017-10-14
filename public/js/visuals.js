//--header visuals
$(window).on("scroll", function () {
            var offset = $(this).scrollTop();
            //    console.log(offset);
                if (offset > $(".header").height() ) {
                    $(".header").addClass("active-ul");
                } else {
                    $(".header").removeClass("active-ul");
                }
            })