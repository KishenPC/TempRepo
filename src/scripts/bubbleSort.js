import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


// To store array and DOM elements
let arr = [];
let boxContainer;

window.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("input");
  const setButton = document.getElementById("set");
  const playButton = document.getElementById("play");
  boxContainer = document.getElementById("box-container");

  setButton.addEventListener("click", () => {
    const inputVal = input.value.trim();
    if (!inputVal) return;

    // Parse input into number array
    arr = inputVal.split(",")
    renderBoxes(arr);
  });

  playButton.addEventListener("click", () => {
    if (arr.length > 1) {
      bubbleSort(arr);
    }
  });
});

function renderBoxes(array) {
  boxContainer.innerHTML = ""; // clear previous boxes

  document.getElementById("details").innerHTML = "";

  document.getElementById("i_count").innerHTML = "i = 0";
  document.getElementById("j_count").innerHTML = "j = 0"; // reset j = 0
  document.getElementById("j_count").style.color = "white"; // reset j color

  array.forEach((val, index) => {
    const div = document.createElement("div");
    div.className = `box${index}`;
    div.textContent = val;
    boxContainer.appendChild(div);
  });

  gsap.from(".div1 *", {
    opacity:0,
    duration:2,
    stagger:0.05,
    delay:0.05
  })
  
}

async function bubbleSort(array) {
  const boxes = Array.from(boxContainer.children);
  for (let i = 0; i < boxes.length - 1; i++) {
    document.getElementById("i_count").textContent = `i = ${i}`;
    gsap.set("#j_count", {color: "white"});
    for (let j = 0; j < boxes.length - i - 1; j++) {
      document.getElementById("j_count").textContent = `j = ${j}`;
      const box1 = boxes[j];
      const box2 = boxes[j + 1];
      const val1 = parseInt(box1.textContent);
      const val2 = parseInt(box2.textContent);

      if (val1 > val2) {
        let string = "Swap As "+arr[j]+" > "+arr[j+1];
        document.getElementById("details").innerHTML = string;

        var temp = arr[j];
        arr[j] = arr[j+1];
        arr[j+1] = temp;

        await animateSwap(box1, box2);

        // Very Important!!!
        boxContainer.insertBefore(box2, box1); // DOM swap
        // Update box references

        boxes[j] = box2;
        boxes[j + 1] = box1;

      } else {
        let string = "No Swap As "+arr[j]+" <= "+arr[j+1];
        document.getElementById("details").innerHTML = string;
        await animateNoSwap(box1, box2);
      }
    }
    document.getElementById("details").innerHTML = "";
    gsap.set("#j_count", {color: "white"});
  }
  console.log(arr);
}

function animateSwap(el1, el2) {
  return new Promise((resolve) => {

    const currentWidth1 = parseFloat(getComputedStyle(el1).width);
    const currentWidth2 = parseFloat(getComputedStyle(el2).width);

    const x1 = el1.offsetLeft+currentWidth1/2;
    const x2 = el2.offsetLeft+currentWidth2/2;
    const delta = x2 - x1;

    var tl = gsap.timeline()

    tl.to("#j_count", {
     color: "pink",
     duration:0
    });

    tl.set([el1, el2], {
    backgroundColor: "pink",
    });

    tl.to(el2, {
    y: -delta,
    delay:0.75
    });

    tl.to(el1, {
    x: delta,
    duration: 0.75,
    });

    tl.to(el2, {
    x: -delta,
    duration: 0.75,
    }, "<" );

    tl.to(el2, {
    y: 0,
    duration: 1,
    onComplete: () => {
      gsap.set([el1, el2], { x: 0 });
      resolve();
      }
    });

    tl.set([el1,el2], {
    backgroundColor:"rgb(155, 165, 250)",
    })
  });
}

function animateNoSwap(el1, el2) {
  return new Promise((resolve) => {
    var tl = gsap.timeline();
    
    const currentWidth1 = parseFloat(getComputedStyle(el1).width);
    const currentWidth2 = parseFloat(getComputedStyle(el2).width);

    tl.set("#j_count", {
      color: "lightgreen",
    }, 0);

    tl.set([el1, el2], {
      backgroundColor: "lightgreen",
    }, 0);

    tl.to({}, { duration: 2.5 })
      .set([el1, el2], {
        backgroundColor: "rgb(155, 165, 250)",
      })
      .call(resolve);
  });
}