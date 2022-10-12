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
        $(document).ready(function() {
            /// Stary Background
        
            function randomStars(n) {
                let value = `${Math.floor((Math.random() * 3000) + 2)}px ${Math.floor((Math.random() * 3000) + 2)}px #FFF`;
                for (let i = 0; i < n; i = i + 2) {
                    value = `${value} , ${Math.floor((Math.random() * 3000) + 2)}px ${Math.floor((Math.random() * 3000) + 2)}px #FFF`
                }
                return value;
            }
            // Declaring The Stars Divs
        
            let starsGroup = document.querySelectorAll(".stars-group")
            starsGroup.forEach(group => {
                group.style["boxShadow"] = randomStars(2000);
            })
            
            $(".chars-first").addClass("active");
            $(".chars-second").addClass("active");
            $(".chars-third").addClass("active");
        
            //// To fix The Phone Height Issue When Using VH unit For Elements Height
        
            let vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            window.addEventListener('resize', () => {
                 let vh = window.innerHeight * 0.01;
                 document.documentElement.style.setProperty('--vh', `${vh}px`);
            });
            const stickyObserverOpts1 = {
                rootMargin: "0px 0px 300px 0px",
            }
            const stickyObserverOpts2 = {
                rootMargin: "300px 0px 0px 0px",
            }

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
        
            //// Fade In Elements Observer
        
            const faders = document.querySelectorAll(".fader");
            const fadersOptions = {
                threshold: 0.3,
            };
            const passion1 = document.querySelector("[data-passion-item1]");
            const passion2 = document.querySelector("[data-passion-item2]");
            const passion3 = document.querySelector("[data-passion-item3]");
        
            const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        setTimeout(function() {
                            entry.target.classList.add("fade-in");
                        }, 100)
                    }
                });
            }, fadersOptions);
            faders.forEach(fader => {
                appearOnScroll.observe(fader);
            });
        
        
            // /// Mission Animation Delay
        
            // const mission = document.getElementById("mission-dets");
            // const missionDivs = Array.from(mission.children);
            // missionDivs.forEach((div, index) => {
            //     div.firstChild.style['transition-delay'] = index * 70 + "ms";
            // })
        
        
            const sectionTitle = document.querySelectorAll(".section-title")
            sectionTitle.forEach(title => {
                const titleSpans = Array.from(title.children);
                titleSpans.forEach(span => {
                    const spanChildren = Array.from(span.children);
                    spanChildren.forEach((spanChild, index) => {
                        spanChild.style["transition-delay"] = index * 70 + "ms";
                    })
                })
            })
        
            /// Passion Items Observer
        
            const passionItems = document.querySelectorAll(".passion-item");     
            const passionObserverOptions = {
                threshold: 1,
                rootMargin: '0px',
            } 
            const passionItemsObserver = new IntersectionObserver(function(entries, passionItemsObserver){
                entries.forEach(entry => {
                    if( entry.isIntersecting ){
                        if(entry.target == passion1){
                            document.querySelector(".items-images-sticky").style.backgroundImage = "url(/static/images/tech.svg)"
            
                        } else if (entry.target == passion2){
                            document.querySelector(".items-images-sticky").style.backgroundImage = "url(/static/images/design.svg)"
                            console.log("yes2");
            
                        } else if (entry.target == passion3){
                            document.querySelector(".items-images-sticky").style.backgroundImage = "url(/static/images/cosmos.png)"
                        }
                    }
                })
            }, passionObserverOptions);
        
            passionItems.forEach(item => {
                passionItemsObserver.observe(item);
            });
        
            const talkSlider = document.getElementById("slider-container");
            const sliderChild = Array.from(talkSlider.children);
            const sliderChildWidth = sliderChild[0].getBoundingClientRect().width;
            let sliderChildOneWidth = sliderChild[1].getBoundingClientRect().width;
            let width =  sliderChildOneWidth ;
            document.documentElement.style.setProperty('--slideWidth', `${width}px`);
        
            sliderChild.forEach(function(child){
                child.style.position = 'absolute';
            })
        })
    }
}

asyncSiteFunctions();
