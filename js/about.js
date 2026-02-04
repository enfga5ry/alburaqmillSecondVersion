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

// Hero background images
const bgArr = [
  "../assets/equipment/سلندر2.webp",
  "../assets/equipment/grinding1.webp",
  "../assets/equipment/سرند.webp",
  "../assets/equipment/منخل2.webp",
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

// fade change every 2s
setInterval(() => {
  slides[current].classList.remove("opacity-100");
  current = (current + 1) % slides.length;
  slides[current].classList.add("opacity-100");
}, 2000);

// Title animation
const title = document.querySelector(".reveal-title");

const titleObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      title.classList.remove("opacity-0", "translate-y-8");
      title.classList.add("transition-all", "duration-700", "ease-out");
      titleObserver.unobserve(title);
    }
  },
  { threshold: 0.3 },
);

if (title) titleObserver.observe(title);

// Cards animation (stagger)
const items = document.querySelectorAll(".reveal-item");

const itemsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const delay = entry.target.dataset.delay || 0;

        setTimeout(() => {
          entry.target.classList.remove("opacity-0", "translate-y-8");
          entry.target.classList.add(
            "transition-all",
            "duration-800",
            "ease-out",
          );
        }, delay);

        itemsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 },
);

items.forEach((item) => itemsObserver.observe(item));
