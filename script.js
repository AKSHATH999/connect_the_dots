const svg = document.getElementById("canvas");
const message = document.getElementById("message");
const finalLove = document.getElementById("final-love");

let currentLetter = 0;
let currentDot = 0;

const letters = [
  // L
  [
    { x: 80, y: 80 },
    { x: 80, y: 320 },
    { x: 160, y: 320 }
  ],
  // O
  [
    { x: 240, y: 80 },
    { x: 320, y: 80 },
    { x: 360, y: 160 },
    { x: 320, y: 240 },
    { x: 240, y: 240 },
    { x: 200, y: 160 }
  ],
  // V
  [
    { x: 420, y: 80 },
    { x: 460, y: 320 },
    { x: 500, y: 80 }
  ],
  // E
  [
    { x: 560, y: 80 },
    { x: 640, y: 80 },
    { x: 560, y: 200 },
    { x: 620, y: 200 },
    { x: 560, y: 320 },
    { x: 640, y: 320 }
  ]
];

const dotElements = [];

/* Create dots */
letters.forEach((letter, li) => {
  dotElements[li] = [];
  letter.forEach((dot, di) => {
    const c = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    c.setAttribute("cx", dot.x);
    c.setAttribute("cy", dot.y);
    c.setAttribute("r", 6);
    c.classList.add("dot");

    // Disable all dots except first letter
    if (li !== 0) c.style.pointerEvents = "none";

    // Pulse very first dot
    if (li === 0 && di === 0) c.classList.add("start-dot");

    c.addEventListener("click", () => handleClick(li, di));
    svg.appendChild(c);

    dotElements[li].push(c);
  });
});

function handleClick(li, di) {
  if (li !== currentLetter || di !== currentDot) {
    shake(dotElements[li][di]);
    return;
  }

  // Draw line
  if (currentDot > 0) {
    drawLine(
      letters[li][currentDot - 1],
      letters[li][currentDot]
    );
  }

  currentDot++;

  // Letter finished
  if (currentDot === letters[li].length) {
    // Disable completed letter
    dotElements[li].forEach(d => d.style.pointerEvents = "none");

    currentLetter++;
    currentDot = 0;

    // Enable next letter
    if (currentLetter < letters.length) {
      dotElements[currentLetter].forEach(d => d.style.pointerEvents = "auto");
      dotElements[currentLetter][0].classList.add("start-dot");
    } else {
      finish();
    }
  }
}

function drawLine(a, b) {
  const line = document.createElementNS("http://www.w3.org/2000/svg", "line");
  line.setAttribute("x1", a.x);
  line.setAttribute("y1", a.y);
  line.setAttribute("x2", b.x);
  line.setAttribute("y2", b.y);
  line.classList.add("line", "love-line");
  svg.appendChild(line);
}

function shake(dot) {
  dot.classList.add("wrong");
  setTimeout(() => dot.classList.remove("wrong"), 350);
}

function finish() {
  message.innerHTML = "You found it 💖";
  finalLove.style.display = "block";
  document.querySelectorAll(".love-line").forEach(l =>
    l.classList.add("glow")
  );
}