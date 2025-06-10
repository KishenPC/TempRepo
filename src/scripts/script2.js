import { gsap } from "gsap";
// import {gsap, Flip, ScrollTrigger, Observer, Draggable } from "gsap/all";
import { ScrollTrigger } from "gsap/ScrollTrigger";

//gsap.registerPlugin(Flip,ScrollTrigger,Observer,Draggable);
gsap.registerPlugin(ScrollTrigger);

export function bubble_sort(arr) {
    var counter = 0;
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0; j < arr.length-i-1; j++) {
      if (arr[j] > arr[j+1]) {
        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j] = temp;

        gsap.to(".box" + j, {
          x: 60,
          duration: 1,
          delay: counter
        });

        gsap.to(".box" + (j + 1), {
          x: -60,
          duration: 1,
          delay: counter
        });

        gsap.delayedCall(counter + 1, () => {
          const el1 = document.querySelector(".box" + j);
          const el2 = document.querySelector(".box" + (j + 1));
          gsap.set([el1, el2], {x: 0, delay:2});

          // ✅ swap elements in DOM
          el1.after(el2);

          // ✅ swap class names
          const c1 = el1.className;
          el1.className = el2.className;
          el2.className = c1;
        });

        counter += 2;
      }
    }
  }
}
const arr = [1,3,6,3,7,3,6,9];
bubble_sort(arr);
