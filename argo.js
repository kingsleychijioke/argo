// =======================
// TYPING TEXT CAROUSEL
// =======================

const texts = [
  `Run Your Church <br>
With <span class="highlight2">Clarity, Order <br>& Excellence.</span>`,

  `Agora Is Every Tool <br>
Your Church Needs.<br>
<span class="highlight2">All In One Place</span>`,
];

const element = document.getElementById("p1");

let textIndex = 0;
let charIndex = 0;
let currentHTML = "";
let isDeleting = false;

function typeWriter() {
  const fullText = texts[textIndex];

  if (!isDeleting) {
    if (fullText.charAt(charIndex) === "<") {
      let close = fullText.indexOf(">", charIndex);

      currentHTML += fullText.substring(charIndex, close + 1);

      charIndex = close + 1;
    } else {
      currentHTML += fullText.charAt(charIndex);

      charIndex++;
    }
  } else {
    if (currentHTML.endsWith(">")) {
      let open = currentHTML.lastIndexOf("<");

      currentHTML = currentHTML.substring(0, open);
    } else {
      currentHTML = currentHTML.slice(0, -1);
    }

    charIndex--;
  }

  element.innerHTML = currentHTML;

  if (!isDeleting && charIndex >= fullText.length) {
    isDeleting = true;

    setTimeout(typeWriter, 2000);

    return;
  }

  if (isDeleting && charIndex <= 0) {
    isDeleting = false;

    textIndex++;

    if (textIndex >= texts.length) {
      textIndex = 0;
    }

    currentHTML = "";
  }

  setTimeout(typeWriter, isDeleting ? 40 : 80);
}

typeWriter();

// =======================
// REVEAL ON SCROLL
// =======================

const revealElements = document.querySelectorAll(".reveal-left, .reveal-right");

function revealOnScroll() {
  const trigger = window.innerHeight * 0.85;

  revealElements.forEach((el) => {
    const top = el.getBoundingClientRect().top;

    if (top < trigger) {
      el.classList.add("active");
    } else {
      el.classList.remove("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
window.addEventListener("load", revealOnScroll);

// =======================
// NAVBAR SHRINK + HIDE
// =======================

const navbar = document.querySelector(".navbar");

let hideTimer;

window.addEventListener("scroll", () => {
  // Shrink navbar
  if (window.scrollY > 50) {
    navbar.classList.add("shrink");
  } else {
    navbar.classList.remove("shrink");
  }

  // Always show while scrolling
  navbar.classList.remove("hide");

  // Reset timer
  clearTimeout(hideTimer);

  // Hide after 5 seconds
  hideTimer = setTimeout(() => {
    if (window.scrollY > 50) {
      navbar.classList.add("hide");
    }
  }, 5000);
});

const year = document.getElementById("year");
year.textContent = new Date().getFullYear();