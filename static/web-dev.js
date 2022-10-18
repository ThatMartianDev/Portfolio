$(document).ready(function(){

    /// Check Device Height And Width To Decide Which Style Mode to Apply

    function checkDeviceWindow(){
        var winWidth = window.innerWidth;
        var winHeight = window.innerHeight;
        if (winHeight > winWidth){
            $(document.body).addClass("portrait-mode")
        } else if (winWidth > winHeight) {
            $(document.body).removeClass("portrait-mode")
        }
    }

    checkDeviceWindow();

    window.addEventListener("resize", ()=>{
        checkDeviceWindow();
    })
})



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
                $("#loading-page").hide();
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
            //// header functions
            $("#menu-btn").click(function() {
                $(this).toggleClass("active");
                $("#menu").toggleClass("active");
                $(".services-list").slideUp();
                $(".menu-item > a").removeClass("idle");
                $("#service-btn").children("svg").removeClass("active");
            });

            $("#service-btn").click(function(){
                $(".services-list").slideToggle("slow");
                $(".menu-item > a").toggleClass("idle");
                $(this).children("svg").toggleClass("active");
            })

            $(window).scroll(function(){
                let scrollPos = $(window).scrollTop();
                if (scrollPos > 300){
                    $("#header").addClass("scrolled")
                } else {
                    $("#header").removeClass("scrolled")
                }
            })

            /// Fix 100vh Window Height Problem For The Faded In Menu

            const setMenuHeight = ()=>{
                document.querySelector(".menu-container").style.height = window.innerHeight + 'px';
            }

            setMenuHeight()

            window.addEventListener('resize', () => {
                setMenuHeight()
            });

            const paragraphs = document.querySelectorAll(".slide-out-text")
            paragraphs.forEach(paragraph => {

                // Split the paragraph into words and return them as a Span tag inside a div tag
                paragraph.innerHTML = paragraph.innerHTML.split(' ').map(function(word){
                    return '<div><span>'+word+'</span></div>';
                }).join(' ');

                // Add the transition delay to each span
                const paragraphDivs = Array.from(paragraph.children)
                paragraphDivs.forEach((div, index) => {
                    let userAgent = navigator.userAgent;

                    if (userAgent.match(/firefox|fxios/i)){
                        div.firstChild.style['-moz-transition-delay'] = index * 10 + "ms";
                    }  else if (userAgent.match(/safari/i)) {
                        div.firstChild.style['-webkit-transition-delay'] = index * 10 + "ms";
                    } else if (userAgent.match(/opr\//i)) {
                        div.firstChild.style['-o-transition-delay'] = index * 10 + "ms";
                    } else {
                        div.firstChild.style['transition-delay'] = index * 10 + "ms";
                    }
                    })
            })

            /// Menu Links Hover Effect Transition Delay

            const menuLinks = document.querySelectorAll(".menu-links")
            menuLinks.forEach(link => {
                let userAgent = navigator.userAgent;

                const menuLinksSpans = link.children;
                if (userAgent.match(/firefox|fxios/i)){
                    for (let i = 0; i < link.children.length; i++ ){
                        link.children[i].style['-moz-transition-delay'] = 10 + (i * 30) + 'ms';
                    }
                }  else if (userAgent.match(/safari/i)) {
                    for (let i = 0; i < link.children.length; i++ ){
                        link.children[i].style['-webkit-transition-delay'] = 10 + (i * 30) + 'ms';
                    }
                } else if (userAgent.match(/opr\//i)) {
                    for (let i = 0; i < link.children.length; i++ ){
                        link.children[i].style['-o-transition-delay'] = 10 + (i * 30) + 'ms';
                    }
                } else {
                    for (let i = 0; i < link.children.length; i++ ){
                        link.children[i].style['transition-delay'] = 10 + (i * 30) + 'ms';
                    }
                }
                console.log(menuLinksSpans.length)
            })

            /// Buttons Sticky / Magnetic Hover effict

            const magneticBtns = Array.from(document.querySelectorAll(".magnetic"));
            magneticBtns.forEach(button => {
                button.addEventListener("mousemove", function(e) {
                    const btnPos = button.getBoundingClientRect();
                    const btnX = e.clientX - btnPos.left - btnPos.width / 2;
                    const btnY = e.clientY - btnPos.top - btnPos.height / 2;

                    let userAgent = navigator.userAgent;

                    if (userAgent.match(/firefox|fxios/i)){
                        this.style['-moz-transform'] = "translate(" + btnX * 0.15 + "px, " + btnY * 0.4 + "px)";
                        this.style['-moz-transform'] += "rotate3d(" + btnX * -0.1 + ", " + btnY * -0.2 + ", 0, 12deg)";
                        this.children[0].style['-moz-transform'] = `translate(${btnX * 0.025}px, ${btnY * 0.075}px)`;
                    }  else if (userAgent.match(/safari/i)) {
                        this.style['-webkit-transform'] = "translate(" + btnX * 0.15 + "px, " + btnY * 0.4 + "px)";
                        this.style['-webkit-transform'] += "rotate3d(" + btnX * -0.1 + ", " + btnY * -0.2 + ", 0, 12deg)";
                        this.children[0].style['-webkit-transform'] = `translate(${btnX * 0.025}px, ${btnY * 0.075}px)`;
                    } else if (userAgent.match(/opr\//i)) {
                        this.style['-o-transform'] = "translate(" + btnX * 0.15 + "px, " + btnY * 0.4 + "px)";
                        this.style['-o-transform'] += "rotate3d(" + btnX * -0.1 + ", " + btnY * -0.2 + ", 0, 12deg)";
                        this.children[0].style['-o-transform'] = `translate(${btnX * 0.025}px, ${btnY * 0.075}px)`;
                    } else {
                        this.style['transform'] = "translate(" + btnX * 0.15 + "px, " + btnY * 0.4 + "px)";
                        this.style['transform'] += "rotate3d(" + btnX * -0.1 + ", " + btnY * -0.2 + ", 0, 12deg)";
                        this.children[0].style['transform'] = `translate(${btnX * 0.025}px, ${btnY * 0.075}px)`;
                    }
                });

                button.addEventListener('mouseleave', function() {
                    let userAgent = navigator.userAgent;

                    this.style.transform = 'translate3d(0px, 0px, 0px)';
                    this.style.transform += 'rotate3d(0, 0, 0, 0deg)';
                    this.children[0].style.transform = 'translate3d(0px, 0px, 0px)';

                    if (userAgent.match(/firefox|fxios/i)){
                        this.style['-moz-transform'] = "translate3d(0px, 0px, 0px)";
                        this.style['-moz-transform'] += 'rotate3d(0, 0, 0, 0deg)';
                        this.children[0].style['-moz-transform'] = 'translate3d(0px, 0px, 0px)';
                    }  else if (userAgent.match(/safari/i)) {
                        this.style['-webkit-transform'] = "translate3d(0px, 0px, 0px)";
                        this.style['-webkit-transform'] += 'rotate3d(0, 0, 0, 0deg)';
                        this.children[0].style['-webkit-transform'] = 'translate3d(0px, 0px, 0px)';
                    } else if (userAgent.match(/opr\//i)) {
                        this.style['-o-transform'] = "translate3d(0px, 0px, 0px)";
                        this.style['-o-transform'] += 'rotate3d(0, 0, 0, 0deg)';
                        this.children[0].style['-o-transform'] = 'translate3d(0px, 0px, 0px)';
                    } else {
                        this.style['transform'] = "translate3d(0px, 0px, 0px)";
                        this.style['transform'] += 'rotate3d(0, 0, 0, 0deg)';
                        this.children[0].style['transform'] = 'translate3d(0px, 0px, 0px)';
                    }
                });
            })

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
            sliderChild.forEach(function(child, index){
                child.style.position = 'absolute';
                child.style.left = ( sliderChildWidth * index ) * 1.1 + 'px';
            })

            window.addEventListener("resize", function(){
                sliderChild.forEach(function(child, index){
                    child.style.position = 'absolute';
                    child.style.left = ( sliderChildWidth * index ) * 1.1 + 'px';
                })
            })
        });
    }
}

asyncSiteFunctions();