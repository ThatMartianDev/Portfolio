function loadingFinsihed() {
    return new Promise(resolve => {
        if ($(document).ready()){
            if (!sessionStorage.isVisited) {
                setTimeout(() => {
                    $("#loading-page").addClass("done")
                }, 2000);
                setTimeout(() => {
                    resolve('loading done');
                    sessionStorage.isVisited = 'true'
                }, 4800);
            }
            if (sessionStorage.isVisited){
                $("#loading-page").css({"transform" : "translateY(-200%)", "transition" : "all 3s ease"});
                $("#loading-page > .loading-container").children("p").hide()
                setTimeout(() => {
                    resolve('loading done');
                }, 300);
            } 
        }
    });
}

async function asyncSiteFunctions() {
    const result = await loadingFinsihed();
    if (result == 'loading done'){
        $(document).ready(function(){
            function randomStars(n) {
                let value = `${Math.floor((Math.random() * 3000) + 2)}px ${Math.floor((Math.random() * 3000) + 2)}px #FFF`;
                for (let i = 0; i < n; i = i + 2) {
                    value = `${value} , ${Math.floor((Math.random() * 3000) + 2)}px ${Math.floor((Math.random() * 3000) + 2)}px #FFF`;
                }
                return value;
            }
        
            let stars2 = document.getElementById("stars2");
            stars2.style.boxShadow = randomStars(2000);
        
            const faders = document.querySelectorAll(".fader");
            const fadersOptions = {
                threshold: 0.3,
            };

            const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
                entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(function() {
                        entry.target.classList.add("fade-in");
                    }, 400);
                }
            });
            }, fadersOptions);
            faders.forEach(fader => {
                appearOnScroll.observe(fader);
            });
                
            $(window).scroll(function(){
                var scrollPos = $(window).scrollTop();
                if (scrollPos > ($("#home").height() * 2)) {
                    $("#home").css({"opacity": "0", "zIndex" : "-1"});
                } else {
                    $("#home").css({"opacity": "1", "zIndex" : "5"});
                }
            });
                
            $(window).scroll(function(){
                let contactBgHeight = $("#contact").height() * 2.5;
                let windowHeight4Contact = $("body").height() - contactBgHeight;
                if ($(window).scrollTop() > windowHeight4Contact) {
                    $("#contact-bg").css("opacity", "1");
                    $("#contact").css("opacity", "1");
                } else {
                    $("#contact-bg").css("opacity", "0");
                    $("#contact").css("opacity", "0");
                }
            });

            // FAQ items Slide Up and down function
        
            $(".q-item").on("click", function(){
                var currentFaq = $(this);
                $(this).children(".answer").slideToggle("600");
        
                // add active class to change the item border radius
                $(this).toggleClass("active");
                $(".q-item").not(currentFaq).removeClass("active");
        
                // SLide Up the rest of FAQ items
                $(".q-item").not(currentFaq).children(".answer").slideUp();
        
                // add a class to rotate the FAQ button arrow
                var currentArrow = $(this).children(".question").children("button");
                $(".question button").not(currentArrow).removeClass("active");
                currentArrow.toggleClass("active"); 
            });
            
            let starsGroup = document.querySelectorAll(".stars-group");
            starsGroup.forEach(group => {
                group.style.boxShadow = randomStars(2000);
            });
                
            const talkSlider = document.getElementById("slider-container");
            const sliderChild = Array.from(talkSlider.children);
            const sliderChildWidth = sliderChild[0].getBoundingClientRect().width;
            let sliderChildOneWidth = sliderChild[1].getBoundingClientRect().width;
            let width =  sliderChildOneWidth ;
            document.documentElement.style.setProperty('--slideWidth', `${width}px`);
            sliderChild.forEach(function(child){
                child.style.position = 'absolute';
            });
        });
    } 
}

asyncSiteFunctions();