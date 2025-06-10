import { gsap } from "gsap";
// import {gsap, Flip, ScrollTrigger, Observer, Draggable } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//gsap.registerPlugin(Flip,ScrollTrigger,Observer,Draggable);
gsap.registerPlugin(ScrollTrigger);

gsap.to(".box", {
  x:1200,
  duration:2,
  delay:1
})


