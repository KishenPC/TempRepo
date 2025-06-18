import { gsap } from "gsap";
    
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);


// To store array and DOM elements
let arr = [];
let boxContainer;
let visualization;


var boxCount = 1;
let lastContainer;

window.addEventListener("DOMContentLoaded", () => {

  const input = document.getElementById("input");
  const setButton = document.getElementById("set");
  const playButton = document.getElementById("play");
  visualization = document.getElementById("visualization");

  setButton.addEventListener("click", () => {
    const inputVal = input.value.trim();
    if (!inputVal) return;

    arr = inputVal.split(",")
    renderBoxes(arr);
  });

  playButton.addEventListener("click", () => {
    if (arr.length > 1) {
      mergeSort(arr);
    }
  });
  
});

function renderBoxes(array) {
  visualization.innerHTML = `<div class = "box-container" id = "c0"></div>`; // clear previous boxes
  lastContainer = document.getElementById("c0");

  array.forEach((val, index) => {
    const div = document.createElement("div");
    div.className = `box${index}`;
    div.textContent = val;
    document.getElementById("c0").appendChild(div);
  });

  gsap.from("#c0 *", {
    opacity:0,
    duration:2,
    stagger:0.05,
    delay:0.05
  })
  
}

async function renderNextRecurRight(part) {
    return new Promise((resolve) => {
        visualization.innerHTML += `<div class="box-container" id="c${boxCount}"></div>`;
        const container = document.getElementById(`c${boxCount}`);
        
        part.forEach((val, index) => {
            const div = document.createElement("div");
            div.className = `box${index}`;
            div.textContent = val;
            container.appendChild(div);
        });

        const x_off = lastContainer.offsetLeft;
        
        gsap.from(`#c${boxCount} div`, {
            opacity: 0,
            x: x_off + 50*(part.length),
            duration: 0.5,
            stagger: 0.1,
            onComplete: resolve
        });

        lastContainer = container;
        boxCount++;
    });
}

async function renderNextRecurLeft(part) {
    return new Promise((resolve) => {
        visualization.innerHTML += `<div class="box-container" id="c${boxCount}"></div>`;
        const container = document.getElementById(`c${boxCount}`);
        
        part.forEach((val, index) => {
            const div = document.createElement("div");
            div.className = `box${index}`;
            div.textContent = val;
            container.appendChild(div);
        });

        const x_off = lastContainer.offsetLeft;
        
        gsap.from(`#c${boxCount} div`, {
            opacity: 0,
            x: x_off - 50*(part.length),
            duration: 0.5,
            stagger: 0.1,
            onComplete: resolve
        });

        lastContainer = container;
        boxCount++;
    });
}

async function mergeSort(arr) {
  if (arr.length <= 1) {
    return arr;
  }

  const mid = Math.floor(arr.length / 2);

  const leftHalf = arr.slice(0, mid);
  const rightHalf = arr.slice(mid);

  await Promise.all([
    renderNextRecurLeft(leftHalf),
    renderNextRecurRight(rightHalf)
  ]);

  const sortedLeft = mergeSort(leftHalf);
  const sortedRight = mergeSort(rightHalf);

  return merge(sortedLeft, sortedRight);
}

function merge(left, right) {
  let result = [];
  let leftIndex = 0;
  let rightIndex = 0;

  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] < right[rightIndex]) {
      result.push(left[leftIndex]);
      leftIndex++;
    } else {
      result.push(right[rightIndex]);
      rightIndex++;
    }
  }

  while (leftIndex < left.length) {
    result.push(left[leftIndex]);
    leftIndex++;
  }

  while (rightIndex < right.length) {
    result.push(right[rightIndex]);
    rightIndex++;
  }

  return result;
}