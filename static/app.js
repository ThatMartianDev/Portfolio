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
                $("#loading-page > .loading-container").children("p").hide();
                $("#loading-page").css({"transform" : "translateY(-200%)", "transition" : "all 3s ease"});
                setTimeout(() => {
                    resolve('loading done');
                }, 300);
            } 
        }
    });
}

async function asyncSiteFunctions(){
    const result = await loadingFinsihed();
    if (result == 'loading done'){
        $(document).ready(function() {
            document.onkeydown = function(e) {
                if (e.key === 'Tab') {
                    e.preventDefault();
                }
            };

            /// fix 100vh Window Height Problem For The Sections
            
            const setHeight = ()=>{
                document.querySelector("body").style.height = window.innerHeight + 'px';
                const sections = document.querySelectorAll("#home,#about,#services,#contact");
                sections.forEach(section => {
                    section.style.height = window.innerHeight + "px";
                })
            }
        
            setHeight();
        
            window.addEventListener('resize', () => {
                setHeight();
            });
        
            let winWidth = $(window).width()
            document.documentElement.style.setProperty("--window-width", winWidth + 'px')
        
            /// Stary Background
        
            // Function To Randomly Generate The Stars Position For Maximum 4000px
        
            function randomStars(n) {
                let value = `${Math.floor((Math.random() * 3000) + 2)}px ${Math.floor((Math.random() * 3000) + 2)}px #FFF`;
                for (let i = 0; i < n; i = i + 2) {
                    value = `${value} , ${Math.floor((Math.random() * 3000) + 2)}px ${Math.floor((Math.random() * 3000) + 2)}px #FFF`
                }
                return value;
            }
        
            // Declaring The Stars Divs and assign the function as a boxShadow value
        
            $("#stars").css("boxShadow", randomStars(3000))
            $("#stars2").css("boxShadow", randomStars(2000))
            $("#stars3").css("boxShadow", randomStars(600))
        
        
            //// Fade In Elements Observer
        
            const faders = document.querySelectorAll(".fader");
            const fadersOptions = {
                threshold: 0.6,
            };
            const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(function() {
                            entry.target.classList.add("fade-in");
                        }, 400)
                    } else {
                        setTimeout(function() {
                            entry.target.classList.remove("fade-in");
                        }, 400)
                    }
                });
            }, fadersOptions);
            faders.forEach(fader => {
                appearOnScroll.observe(fader);
            });
        
            // Debounce Function
        
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
            }
        
            //// Declarations For Intersection Observers
        
            const header = document.getElementById("header");
            const contactSection = document.getElementById("contact");
            const sections = document.querySelectorAll("section");
            const home = {
                homeSection: document.getElementById("home"),
                isActive: false,
            }
            let about = {
                aboutSection: document.getElementById("about"),
                isActive: false,
            }
            let solutions = {
                solutionsSection: document.getElementById("services"),
                isActive: false,
            }
        
            //// Navigation Opservers
        
            /// Observers Options
        
            const O1O2Options = {
                threshold: 0.5,
            };
        
            const O3option = {
                threshold: 0.5,
            };
            const O4option = {
                threshold: 0.5,
            }
        
        
            /// 01 Home Observer
        
            const homeOpserver = new IntersectionObserver(function(entries, homeOpserver) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        home.isActive = true;
                        $("#sec01").css("transform", "scaleX(1.5)");
                        home.homeSection.addEventListener('touchstart', debounce(handleHomeTouchStart, 500), false);        
                        home.homeSection.addEventListener('touchmove', debounce(handleHomeTransitions, 500), false);
                        var xDown = null;                                                        
                        var yDown = null;
        
                        function getHomeTouches(evt) {
                        return evt.touches ||
                                evt.originalEvent.touches; 
                        }                                                     
        
                        function handleHomeTouchStart(evt) {
                            const firstTouch = getHomeTouches(evt)[0];                                      
                            xDown = firstTouch.clientX;                                      
                            yDown = firstTouch.clientY;                                      
                        }; 
        
                        function handleHomeTransitions(evt) {
                            if ( ! xDown || ! yDown ) {
                                return;
                            }
                    
                            var xUp = evt.touches[0].clientX;                                    
                            var yUp = evt.touches[0].clientY;
                    
                            var xDiff = xDown - xUp;
                            var yDiff = yDown - yUp;
                    
                            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                                if ( xDiff > 0 ) {
                                     /* left swipe */ 
                                    } else {
                                        /* right swipe */
                                    }                       
                             } else {
                                if ( yDiff > 0 ) {
                                    setTimeout(function() {
                                        homeIdle();
                                    }, 200)
                                    setTimeout(function() {
                                        $("#stars").addClass("slide");
                                        $("#stars2").addClass("slide");
                                        $("#stars3").addClass("slide");
                                    }, 230)
                                    setTimeout(function() {
                                        $("body").addClass("bg-changed");
                                    }, 2050);
                                }                                                              
                            }
                            /* reset values */
                            xDown = null;
                            yDown = null;                                             
                        };
        
                        // Home Wheel Event Listener for Home transition Functions
        
                        home.homeSection.addEventListener("wheel", debounce(function(e) {
                            if (e.deltaY > 0) {
                                setTimeout(function() {
                                    homeIdle();
                                }, 200)
                                setTimeout(function() {
                                    $("#stars").addClass("slide");
                                    $("#stars2").addClass("slide");
                                    $("#stars3").addClass("slide");
                                }, 230)
                                setTimeout(function() {
                                    $("body").addClass("bg-changed");
                                }, 2050);
                            }
                        }));
                    } else {
                        home.isActive = false;
                        $("#sec01").css("transform", "scaleX(1)");
                    }
                })
            }, O1O2Options);
            homeOpserver.observe(home.homeSection)
        
            /// 02 ABOUT OBSERVER
        
            const aboutOpserver = new IntersectionObserver(function(entries, aboutNavOpserver) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        about.isActive = true;
                        $("#sec02").css("transform", "scaleX(1.5)");
                        aboutActive();       
        
                        about.aboutSection.addEventListener('touchstart', debounce(handleAboutTouchStart, 500), false);        
                        about.aboutSection.addEventListener('touchmove', debounce(handleAboutTransitions, 500), false);
        
                        var xDown = null;                                                        
                        var yDown = null;
        
                        function getAboutTouches(evt) {
                        return evt.touches ||
                                evt.originalEvent.touches; 
                        }                                                     
        
                        function handleAboutTouchStart(evt) {
                            const firstTouch = getAboutTouches(evt)[0];                                      
                            xDown = firstTouch.clientX;                                      
                            yDown = firstTouch.clientY;                                      
                        }; 
                        
                        function handleAboutTransitions(evt) {
                            if ( ! xDown || ! yDown ) {
                                return;
                            }
                    
                            var xUp = evt.touches[0].clientX;                                    
                            var yUp = evt.touches[0].clientY;
                    
                            var xDiff = xDown - xUp;
                            var yDiff = yDown - yUp;
                    
                            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                                if ( xDiff > 0 ) {
                                     /* left swipe */ 
                                    } else {
                                        /* right swipe */
                                    }                       
                             } else {
                                if ( yDiff > 0 ) {
                                    aboutIdle();
                                    solutionsActive();
                                } else {
                                    setTimeout(function() {
                                        homeActive();
                                    }, 200);
                                    setTimeout(function() {
                                        $("body").removeClass("bg-changed");
                                    }, 950);
                                    aboutIdle();
                                    setTimeout(function() {
                                        $("#stars").removeClass("slide");
                                        $("#stars2").removeClass("slide");
                                        $("#stars3").removeClass("slide");
                                    }, 500)
                                }                                                         
                            }
                            /* reset values */
        
                            xDown = null;
                            yDown = null;                                             
                        };
                        /// About Wheel Event listener For About Transition Functions
        
                        about.aboutSection.addEventListener("wheel", debounce(function(e) {
                            if (e.deltaY > 0) {
                                aboutIdle();
                                solutionsActive();
                            } else {
                                setTimeout(function() {
                                    homeActive();
                                }, 200);
                                setTimeout(function() {
                                    $("body").removeClass("bg-changed");
                                }, 950);
                                aboutIdle();
                                setTimeout(function() {
                                    $("#stars").removeClass("slide");
                                    $("#stars2").removeClass("slide");
                                    $("#stars3").removeClass("slide");
                                }, 800)
                            }
                        }));
        
                    } else {
                        about.isActive = false;
                        $("#sec02").css("transform", "scaleX(1)");
                        aboutActive();
                    }
        
                })
            }, O1O2Options);
            aboutOpserver.observe(about.aboutSection)
        
            // 02/01 about special faders
        
            const aboutFaders = document.querySelectorAll(".about-fader");
            const aboutFadersArray = Array.from(aboutFaders);
            const aboutFadersOpserver = new IntersectionObserver(function(entries, aboutFadersOpserver) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(function() {
                            entry.target.classList.add("fade-in");
                        }, 1000)
                    } else {
                        entry.target.classList.remove("fade-in");
                    }
                })
            });
        
            aboutFadersArray.forEach(fader => {
                aboutFadersOpserver.observe(fader);
            });
            
            // 02/02 Bio animation delay loop
        
            function bioAnimDelay(){
                const bio = document.getElementById("short-bio");
                let bioDelay = 20;
                const bioLength = bio.children.length;
                
                let userAgent = navigator.userAgent;
        
                if (userAgent.match(/chrome|chromium|crios/i)){
                    for (let i = 0; i < bioLength; i++) {
                        bio.children[i].style['transition-delay'] = bioDelay * i + 'ms';
                    }
                } else if (userAgent.match(/firefox|fxios/i)){
                    for (let i = 0; i < bioLength; i++) {
                        bio.children[i].style['-moz-transition-delay'] = bioDelay * i + 'ms';
                    }
                }  else if (userAgent.match(/safari/i)) {
                    for (let i = 0; i < bioLength; i++) {
                        bio.children[i].style['-webkit-transition-delay'] = bioDelay * i + 'ms';
                    }
                } else if (userAgent.match(/opr\//i)) {
                    for (let i = 0; i < bioLength; i++) {
                        bio.children[i].style['-o-transition-delay'] = bioDelay * i + 'ms';
                    }
                } else {
                    for (let i = 0; i < bioLength; i++) {
                        bio.children[i].style['transition-delay'] = bioDelay * i + 'ms';
                    }
                }
            }
        
            bioAnimDelay()
        
            /// 03 Services section Observer
        
            const servicesOpserver = new IntersectionObserver(function(entries, servicesOpserver) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        solutions.isActive = true;
                        $("#sec03").css("transform", "scaleX(1.5)");
        
                        solutions.solutionsSection.addEventListener('touchstart', debounce(handleServicesTouchStart, 500), false);        
                        solutions.solutionsSection.addEventListener('touchmove', debounce(handleServicesTransitions, 500), false);
        
                        var xDown = null;                                                        
                        var yDown = null;
        
                        function getServicesTouches(evt) {
                        return evt.touches ||
                                evt.originalEvent.touches; 
                        }                                                     
        
                        function handleServicesTouchStart(evt) {
                            const firstTouch = getServicesTouches(evt)[0];                                      
                            xDown = firstTouch.clientX;                                      
                            yDown = firstTouch.clientY;                                      
                        }; 
        
                        function handleServicesTransitions(evt) {
                            if ( ! xDown || ! yDown ) {
                                return;
                            }
                    
                            var xUp = evt.touches[0].clientX;                                    
                            var yUp = evt.touches[0].clientY;
                    
                            var xDiff = xDown - xUp;
                            var yDiff = yDown - yUp;
                    
                            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                                if ( xDiff > 0 ) {
                                     /* left swipe */ 
                                    } else {
                                        /* right swipe */
                                    }                       
                             } else {
                                if ( yDiff > 0 ) {
                                    solutionsIdle();
                                    contactActive();
                                }else {
                                    solutionsIdle();
                                }                                                         
                            }
                            /* reset values */
                            xDown = null;
                            yDown = null;                                             
                        };
                        
                        // Solutions Wheel Event listener For Solutions Transition Functions
                        solutions.solutionsSection.addEventListener("wheel", debounce(function(e) {
                            if (e.deltaY > 0) {
                                solutionsIdle();
                                contactActive();
                            } else {
                                solutionsIdle();
                            }
                        }));
        
                    } else {
                        solutions.isActive = false;
                        $("#sec03").css("transform", "scaleX(1)");
                    }
                })
            }, O3option);
            servicesOpserver.observe(solutions.solutionsSection)
        
            // 03/01 Services Items Fade-in observer
        
            const servicesFader = document.querySelector(".services-fader");
            const sFadersObserver = new IntersectionObserver(function(entries, sFadersObserver){
                entries.forEach(entry => {
                    if (entry.isIntersecting){
                        setTimeout(function(){
                            entry.target.classList.add("fade-in");
                        }, 200)
                    }
                })
            })
            sFadersObserver.observe(servicesFader);
        
            /// 04 Contact Observer
        
            const contactNavOpserver = new IntersectionObserver(function(entries, contactNavOpserver) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        $("#sec04").css("transform", "scaleX(1.5)");
        
                        contactSection.addEventListener('touchstart', debounce(handleContactTouchStart, 500), false);        
                        contactSection.addEventListener('touchmove', debounce(handleContactTransitions, 500), false);
        
                        var xDown = null;                                                        
                        var yDown = null;
        
                        function getContactTouches(evt) {
                        return evt.touches ||
                                evt.originalEvent.touches; 
                        }                                                     
        
                        function handleContactTouchStart(evt) {
                            const firstTouch = getContactTouches(evt)[0];                                      
                            xDown = firstTouch.clientX;                                      
                            yDown = firstTouch.clientY;                                      
                        }; 
        
                        function handleContactTransitions(evt) {
                            if ( ! xDown || ! yDown ) {
                                return;
                            }
                    
                            var xUp = evt.touches[0].clientX;                                    
                            var yUp = evt.touches[0].clientY;
                    
                            var xDiff = xDown - xUp;
                            var yDiff = yDown - yUp;
                    
                            if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                                if ( xDiff > 0 ) {
                                     /* left swipe */ 
                                    } else {
                                        /* right swipe */
                                    }                       
                             } else {
                                if ( yDiff < 0 ) {
                                    setTimeout(function() {
                                        contactIdle();
                                    }, 600)
                                    solutionsActive();
                                }                                                      
                            }
                            /* reset values */
                            xDown = null;
                            yDown = null;                                             
                        };
        
                        // Contact Wheel Event listener For Contact Transition Functions
        
                        contactSection.addEventListener("wheel", debounce((e) => {
                            if (e.deltaY < 0) {
                                setTimeout(function() {
                                    contactIdle();
                                }, 600)
                                solutionsActive();
                            }
                        }))
                    } else {
                        $("#sec04").css("transform", "scaleX(1)");
        
                    }
                })
            }, O4option);
            contactNavOpserver.observe(contactSection)
        
        
            //// Main Sections Slider
        
            const slider = document.getElementById("slider");
            const slides = Array.from(slider.children);
            const sectionHeight = slides[0].getBoundingClientRect().height;
        
            /// align sections on top of each other
        
            slides.forEach(function(slide, index) {
                slide.style.position = 'absolute';
                slide.style.top = sectionHeight * index + 'px';
            })
        
            // adjust the sections whenever the Window resizes
        
            window.addEventListener('resize', function(){
                sliderChild.forEach(function(child, index){
                    child.style.position = 'absolute';
                    child.style.left = ( sliderChildWidth * index ) * 1.1 + 'px';
                })
                slides.forEach(function(slide, index) {
                    slide.style.position = 'absolute';
                    slide.style.top = sectionHeight * index + 'px';
                })
            })
        
            /// Slider Navigation Functions
        
            // Main Function
        
            function moveToSection(slider, currentSection, targetSection) {
                slider.style.transform = `translateY(-${targetSection.style.top})`;
                currentSection.classList.remove('current-section');
                targetSection.classList.add('current-section');
            }
        
            // Next Section Function
        
            function nextSection() {
                const currentSection = slider.querySelector(".current-section");
                const nextSection = currentSection.nextElementSibling;
                moveToSection(slider, currentSection, nextSection);
            }
        
            // Previous Section Function
        
            function prevSection() {
                const currentSection = slider.querySelector(".current-section");
                const prevSection = currentSection.previousElementSibling;
                moveToSection(slider, currentSection, prevSection);
            }
        
            /// sections slider wheel event listener for mouse users
        
            // The Wheel Event Listener
        
            slider.addEventListener("wheel", debounce((e) => {
                var scrollYpos = e.deltaY;;
                if (scrollYpos > 0) {
                    setTimeout(() => {
                        nextSection();
                    }, 200);
                } else {
                    setTimeout(() => {
                        prevSection();
                    }, 200);
                }
            }, 1000));
        
            // The Touch Event Listener
        
            slider.addEventListener('touchstart', debounce(handleTouchStart, 500), false);
            slider.addEventListener('touchmove', debounce(handleTouchMove, 500), false);
        
            var xDown = null;
            var yDown = null;
        
            function getTouches(evt) {
            return evt.touches ||
                    evt.originalEvent.touches;
            }
        
            function handleTouchStart(evt) {
                const firstTouch = getTouches(evt)[0];
                xDown = firstTouch.clientX;
                yDown = firstTouch.clientY;
            };
        
            function handleTouchMove(evt) {
                if ( ! xDown || ! yDown ) {
                    return;
                }
        
                var xUp = evt.touches[0].clientX;
                var yUp = evt.touches[0].clientY;
        
                var xDiff = xDown - xUp;
                var yDiff = yDown - yUp;
        
                if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
                    if ( xDiff > 0 ) {
                         /* left swipe */
                        } else {
                            /* right swipe */
                        }
                 } else {
                    if ( yDiff > 0 ) {
                        setTimeout(() => {
                            nextSection();
                        }, 200);
                    } else {
                        setTimeout(() => {
                            prevSection();
                        }, 200);
                    }
                }
                /* reset values */
                xDown = null;
                yDown = null;
            };
        
            /// Discover Button Actions
        
            $("#scroll-down").on("click", function() {
                setTimeout(() => {
                    nextSection();
                }, 200);
                setTimeout(function() {
                    homeIdle();
                }, 210)
                setTimeout(function() {
                    $("#stars").addClass("slide");
                    $("#stars2").addClass("slide");
                    $("#stars3").addClass("slide");
                }, 200)
                setTimeout(function() {
                    $("body").addClass("bg-changed");
                }, 2050);
            });
            
            //// Sections Transition Functions
        
            function homeIdle() {
                $(".planet").addClass("move-to-about");
                $(".planet").removeClass("back-to-home");
                $(".intro-container").addClass("idle");
                $(".intro-container").removeClass("active");
                $("#scroll-down").addClass("idle");    
            };
        
            function homeActive() {
                $(".planet").addClass("back-to-home");
                $(".planet").removeClass("move-to-about");
                $(".intro-container").addClass("active");
                $(".intro-container").removeClass("idle");
                $("#scroll-down").removeClass("idle"); 
            };
        
            function aboutIdle() {
                $("#short-bio").addClass("idle");
                $("#short-bio").removeClass("active");
                $("#hala").addClass("idle");
                $("#about-btn").addClass("idle");
            };
        
            function aboutActive() {
                $("#short-bio").addClass("active");
                $("#short-bio").removeClass("idle");
                $("#hala").removeClass("idle");
                $("#about-btn").removeClass("idle");
                $(".planet").removeClass("active-again");
            };
        
            function solutionsActive() {
                // $(".planet").addClass("idle");
                $("#services").addClass("active");
                $("#services").removeClass("idle");
            };
        
            function solutionsIdle() {
                // $(".planet").removeClass("idle");
                $("#services").addClass("idle");
                $("#services").removeClass("active");
            };
        
            function contactActive() {
                $(".planet").removeClass("move-to-about");
                $(".planet").addClass("move-to-contact");
            }
        
            function contactIdle() {
                $(".planet").addClass("move-to-about");
                $(".planet").removeClass("move-to-contact");
            } 
        })
    }
    
}

asyncSiteFunctions();