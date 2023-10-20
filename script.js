function locomotive(){
    gsap.registerPlugin(ScrollTrigger);

// Using Locomotive Scroll from Locomotive https://github.com/locomotivemtl/locomotive-scroll

const locoScroll = new LocomotiveScroll({
  el: document.querySelector("#main"),
  smooth: true
});
// each time Locomotive Scroll updates, tell ScrollTrigger to update too (sync positioning)
locoScroll.on("scroll", ScrollTrigger.update);

// tell ScrollTrigger to use these proxy methods for the "#main" element since Locomotive Scroll is hijacking things
ScrollTrigger.scrollerProxy("#main", {
  scrollTop(value) {
    return arguments.length ? locoScroll.scrollTo(value, 0, 0) : locoScroll.scroll.instance.scroll.y;
  }, // we don't have to define a scrollLeft because we're only scrolling vertically.
  getBoundingClientRect() {
    return {top: 0, left: 0, width: window.innerWidth, height: window.innerHeight};
  },
  // LocomotiveScroll handles things completely differently on mobile devices - it doesn't even transform the container at all! So to get the correct behavior and avoid jitters, we should pin things with position: fixed on mobile. We sense it by checking to see if there's a transform applied to the container (the LocomotiveScroll-controlled element).
  pinType: document.querySelector("#main").style.transform ? "transform" : "fixed"
});

// each time the window updates, we should refresh ScrollTrigger and then update LocomotiveScroll. 
ScrollTrigger.addEventListener("refresh", () => locoScroll.update());

// after everything is set up, refresh() ScrollTrigger and update LocomotiveScroll because padding may have been added for pinning, etc.
ScrollTrigger.refresh();

}

locomotive()

function navbaranimation(){
    gsap.to("#nav-svg svg",{
        transform:"translatey(-100%)",
        scrollTrigger:{
            trigger:"page-1",
            scroller:"#main",
            // markers:true,
            start:"top 0",
            ens:"top -5%",
            scrub:true
        }
    })
    
    gsap.to("#nav-part #links",{
        transform:"translatey(-100%)",
        opacity: 0,
        scrollTrigger:{
            trigger:"page-1",
            scroller:"#main",
            // markers:true,
            start:"top 0",
            ens:"top -5%",
            scrub:true,
        }
    })
    
    
}

navbaranimation()

function videoconanimation(){
    var videocon=document.querySelector("#video-container")
var playbtn=document.querySelector("#play")

videocon.addEventListener("mouseenter",function(){
    gsap.to(playbtn,{
        scale: 1,
        opacity: 1
    })
})

videocon.addEventListener("mouseleave",function(){
    gsap.to(playbtn,{
        scale: 0,
        opacity: 0
    })
})

videocon.addEventListener("mousemove",function(dets){
    gsap.to(playbtn,{
        top:dets.y-100,
        left:dets.x-100
    })
})
}

videoconanimation()

function loadinganimation(){
    gsap.from("#page-1 h1",{
        y:30,
        opacity:0,
        delay:.5,
        duration:.9,
        stagger:.2
    })
    
    gsap.from("#page-1 #video-container",{
        scale:.9,
        opacity:0,
        delay:1.3,
        duration:.3,
    })
}

loadinganimation()

function cursor(){
    document.addEventListener("mousemove",function(dets){
        gsap.to("#cursor",{
            top:dets.y-100,
            left:dets.x-100
        })
    })
    
    
    document.querySelectorAll(".child").forEach(function(elem){
        elem.addEventListener("mouseenter",function(){
            gsap.to("#cursor",{
                transform: 'translate(50px,50px) scale(1)'
            });
        });
        elem.addEventListener("mouseleave",function(){
            gsap.to("#cursor",{
                transform: 'translate(50px,50px) scale(0)'
            });
        });
    })
}

cursor()