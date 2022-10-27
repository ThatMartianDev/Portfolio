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

        /// FORM STUFF

        const mustFill = document.querySelectorAll("[data-must-fill]")
        mustFill.forEach( ele => {
            ele.classList.add("must")
        })

        const formBtn = document.getElementById("form-button");
        const formCloseBtn = document.getElementById("form-close");
        const formWindow = document.getElementById("form-window");
        formBtn.onclick = function(){
            formWindow.classList.add("active");
            setTimeout(function() {
                $("#header").addClass("hide");
                $(".footer").addClass("hide");
            }, 700)
        }
        formCloseBtn.onclick = function(){
            formWindow.classList.remove("active");
            setTimeout(function() {
                $("#header").removeClass("hide");
                $(".footer").removeClass("hide");
            }, 500)    }

        /// FORM STEPS NAVIGATION

        const form = document.querySelector("[data-multistep-form]");
        const formSteps = [...form.querySelectorAll("[data-step]")];
        const formDescr = document.querySelector("[data-form-descr]");
        const formDescrCard = [...formDescr.querySelectorAll("[data-descr-card]")];

        let currentStep = formSteps.findIndex( step => {
            return step.classList.contains("active");
        });

        let currentDescrCard = formDescrCard.findIndex(card => {
            return card.classList.contains("active");
        });

        if (currentStep < 0) {
            currentStep = 0;
            showStep();
        };

        if (currentDescrCard < 0) {
            currentDescrCard = 0;
            showCard();
        };

        formDescrCard.forEach(card => {
            card.addEventListener("animationend", e => {
                formDescrCard[currentDescrCard].classList.remove("hide");
                e.target.classList.toggle("hide", !e.target.classList.contains("active"));
            });
        });

        formSteps.forEach(step => {
            step.addEventListener("animationend", e => {
                formSteps[currentStep].classList.remove("hide");
                e.target.classList.toggle("hide", !e.target.classList.contains("active"));
            });
        });

        // FORM BTNS EVEN LISTENER

        form.addEventListener("click", debounce( function (e) {
            let incrementor;

            if (e.target.matches("[data-next]")) {
                incrementor = 1;
            } else if (e.target.matches("[data-prev]")) {
                incrementor = -1;
            }
            if (incrementor == null)
                return;

            const inputs = [...formSteps[currentStep].querySelectorAll("input")];
            const allValid = inputs.every(input => input.reportValidity());
            if (allValid) {
                console.log(allValid);
                currentStep += incrementor;
                currentDescrCard += incrementor;
                showStep();
                showCard();
            }
        }), 600);

        function showStep(){
            formSteps.forEach((step, index)=>{
                step.classList.toggle("active", index === currentStep);
            });
        };

        function showCard(){
            formDescrCard.forEach((card, index)=>{
                card.classList.toggle("active", index === currentDescrCard);
            });
        };

        /// Form Submit

        const submitBtn = document.getElementById("submit-btn");
        submitBtn.onclick = debounce(function(){
            const inputs = [...formSteps[currentStep].querySelectorAll("input")];
            const allValid = inputs.every(input => input.reportValidity());
            if (allValid){
                form.submit()
                submitBtn.innerText = "Processing..."
            }
        }, 2000);

        /// Dbounce

        function debounce(func, timeout = 600) {
            let timer;
            return (...args) => {
                if (!timer) {
                    func.apply(this, args);
                }
                clearTimeout(timer);
                timer = setTimeout(() => {
                    timer = undefined;
                }, timeout);
            };
        };
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
                }, 4800);
                sessionStorage.isVisited = 'true'
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

            const setHeight = ()=>{
                const sections = document.querySelectorAll("body, #form-window");
                sections.forEach(section => {
                    section.style.height = window.innerHeight + "px";
                })
            }

            setHeight();

            window.addEventListener("resize", function(){
                setHeight();
            })

            function randomStars(n) {
                let value = `${Math.floor((Math.random() * 3000) + 2)}px ${Math.floor((Math.random() * 3000) + 2)}px #FFF`;
                for (let i = 0; i < n; i = i + 2) {
                    value = `${value} , ${Math.floor((Math.random() * 3000) + 2)}px ${Math.floor((Math.random() * 3000) + 2)}px #FFF`
                }
                return value;
            }
            $("#stars").css("boxShadow", randomStars(3000))
            $("#stars2").css("boxShadow", randomStars(2000))
            $("#stars3").css("boxShadow", randomStars(600))

            /// Faders

            const faders = document.querySelectorAll(".fader");
            const fadersOptions = {
                threshold: 0.3,
            };
            const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(function() {
                            entry.target.classList.add("fade-in");
                        }, 400)
                    }
                });
            }, fadersOptions);
            faders.forEach(fader => {
                appearOnScroll.observe(fader);
            });
        })
    }
}

asyncSiteFunctions();