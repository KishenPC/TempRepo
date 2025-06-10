import gsap from "gsap";

window.addEventListener("DOMContentLoaded", () => {
  const boxes = Array.from(document.querySelectorAll(".div1 div"));
  async function bubbleSort() {
    for (let i = 0; i < boxes.length - 1; i++) {
      for (let j = 0; j < boxes.length - i - 1; j++) {
        const box1 = boxes[j];
        const box2 = boxes[j + 1];
        const val1 = parseInt(box1.textContent);
        const val2 = parseInt(box2.textContent);
        document.getElementById("i_count").innerHTML = "i = "+i;
        if (val1 > val2) {

        await animateSwap(box1, box2);

        // apparently this is needed to swap dom elements
        box1.parentNode.insertBefore(box2, box1);
        
        [boxes[j], boxes[j + 1]] = [boxes[j + 1], boxes[j]];
        
        } else {await animateNoSwap(box1, box2);}
      }

    }
  }

  function animateSwap(el1, el2) {
    return new Promise((resolve) => {
      const x1 = el1.offsetLeft;
      const x2 = el2.offsetLeft;
      const delta = x2 - x1;

      gsap.set([el1,el2], {
        backgroundColor:"pink"
      })

      gsap.to(el2, {
        y: -delta,
        duration: 0.5,
        delay:0.5
      });

      gsap.to(el1, { x: delta, duration: 1, delay:1 });
      gsap.to(el2, {
        x: -delta,
        duration: 0.5,
        delay:1,
      });

      gsap.to(el2, {
        y: 0,
        duration: 1,
        delay:1.5,
        onComplete: () => {
          gsap.set([el1, el2], { x: 0 });
          resolve();
        }
      });

      gsap.set([el1,el2], {
        backgroundColor:"lightblue",
        delay:2.5
      })

    });
  }

  function animateNoSwap(el1, el2) {
    return new Promise((resolve) => {
      gsap.set([el1,el2], {
        backgroundColor:"lightgreen"
      })
      gsap.set([el1,el2], {
        backgroundColor:"lightblue",
        delay:2,
        onComplete: () => {
          gsap.set([el1, el2], { x: 0 });
          resolve();
        }
      })

    });
  }

  bubbleSort();
});
