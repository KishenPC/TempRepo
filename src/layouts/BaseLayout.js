import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


// To store array and DOM elements

window.addEventListener("DOMContentLoaded", () => {
  
  gsap.to(".bg-layer-1", {
    y: -300,
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true
    }
  });

  gsap.to(".bg-layer-2", {
    y: -300, 
    scrollTrigger: {
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      scrub: true
    }
  });
})