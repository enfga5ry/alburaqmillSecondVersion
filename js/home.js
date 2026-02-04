// Always start from top on reload
window.onbeforeunload = function () {
  window.scrollTo(0, 0);
};

// ===== Preloader
window.addEventListener("load", () => {
  const preloader = document.getElementById("preloader");

  // Fade out
  preloader.classList.add("opacity-0");

  // Remove loader + enable scroll
  setTimeout(() => {
    preloader.style.display = "none";
    document.body.style.overflow = "auto";
  }, 700);
});

// Sticky Navbar optional
const heroHeight = document.getElementById("hero").offsetHeight;
let mainPage = document.querySelectorAll("#lg-menu a")[0];
window.addEventListener("scroll", () => {
  if (window.scrollY > heroHeight + 96) {
    navbar.classList.add("sticky", "top-0", "bg-white", "shadow-2xl");
    document.querySelectorAll("#lg-menu a").forEach((link) => {
      link.classList.remove("hover:text-white");
      link.classList.add("hover:text-primary");
    });
    mainPage.classList.remove("text-white");
    mainPage.classList.add("text-primary");
  } else {
    navbar.classList.remove("sticky", "top-0", "bg-white", "shadow-2xl");
    document.querySelectorAll("#lg-menu a").forEach((link) => {
      link.classList.add("hover:text-white");
      link.classList.remove("hover:text-primary");
    });
    mainPage.classList.remove("text-primary");
    mainPage.classList.add("text-white");
  }
});

//hero background change
// Hero background images
const bgArr = [
  "../assets/mainsec.webp",
  "../assets/wheat.webp",
  "../assets/clyinders.webp",
  "../assets/All-about-grain-flours-resized.webp",
];

// preload images
bgArr.forEach((src) => {
  const img = new Image();
  img.src = src;
});

// slides
const slides = document.querySelectorAll(".hero-slide");

// set background images
slides.forEach((slide, index) => {
  slide.style.backgroundImage = `url(${bgArr[index]})`;
});

// show first slide
let current = 0;
slides[current].classList.add("opacity-100");

// fade change every 3s
setInterval(() => {
  slides[current].classList.remove("opacity-100");
  current = (current + 1) % slides.length;
  slides[current].classList.add("opacity-100");
}, 3000);

// our numbers count up animation

let countersStarted = false;
const counters = document.querySelectorAll(".number-box p span");
function isInViewport() {
  const countersSection = document.getElementById("numSection");
  const sectionTop = countersSection.getBoundingClientRect().top;
  const windowHeight = window.innerHeight;

  if (sectionTop < windowHeight && !countersStarted) {
    counters.forEach((counter) => {
      for (let i = 0; i <= +counter.getAttribute("data-target"); i++) {
        if (counter.getAttribute("data-target") >= 9000) {
          setTimeout(() => {
            counter.textContent = `${i}`;
            counter.classList.add("text-accent");
          }, i * 0.2);
        } else if (counter.getAttribute("data-target") >= 300) {
          setTimeout(() => {
            counter.textContent = `${i}`;
            counter.classList.add("text-accent");
          }, i * 6);
        } else {
          setTimeout(() => {
            counter.textContent = `${i}`;
            counter.classList.add("text-accent");
          }, i * 13.5);
        }
      }
    });
    countersStarted = true;
  }
}
window.addEventListener("scroll", isInViewport);

// milling section animation

const cards = document.querySelectorAll(".process-card");
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  },
  { threshold: 0.2 },
);
cards.forEach((card) => observer.observe(card));
