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

$(document).ready(function(){
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
                    form.addEventListener('submit', function(event) {
                        event.preventDefault();    // prevent page from refreshing
                        const formData = new FormData(form);  // grab the data inside the form fields
                        fetch('/contact', {   // assuming the backend is hosted on the same server
                            method: 'POST',
                            body: formData,
                        }).then(function(response) {
                            window.alert("done")
                            // If you want the table to be built only after the backend handles the request and replies, call buildTable() here.
                        });
                    });
                    
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