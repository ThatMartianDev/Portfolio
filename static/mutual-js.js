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

     // Contact Section Slider
            
     const talkSlider = document.getElementById("slider-container");
     const sliderChild = Array.from(talkSlider.children);
     const sliderChildWidth = sliderChild[0].getBoundingClientRect().width;
     
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

})