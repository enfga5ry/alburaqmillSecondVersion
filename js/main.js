// Language Switcher (Placeholder)

// كل أزرار اللغة
const langButtons = document.querySelectorAll(".langBtn");

// اللغة الحالية
let currentLang = "ar";

// دالة لتحديد مسار JSON حسب الصفحة
function getJsonPath(lang) {
  const basePath = window.location.pathname.includes("/pages/")
    ? "../js/"
    : "js/";
  return basePath + (lang === "ar" ? "ar.json" : "en.json");
}

// تحميل اللغة وتحديث كل العناصر
async function loadLanguage(lang) {
  const path = getJsonPath(lang);
  try {
    const res = await fetch(path);
    const data = await res.json();

    document.querySelectorAll("[data-key]").forEach((el) => {
      const key = el.getAttribute("data-key");
      if (data[key]) el.innerHTML = data[key];
    });

    document.documentElement.lang = lang;
    document.body.dir = lang === "ar" ? "rtl" : "ltr";

    // تحديث نص زر اللغة
    langButtons.forEach((btn) => {
      btn.textContent = lang === "ar" ? "EN" : "AR";
    });

    // حفظ اللغة في localStorage
    localStorage.setItem("siteLang", lang);
    currentLang = lang;
  } catch (err) {
    console.error("Error loading language file:", err);
  }
}

// تبديل اللغة عند الضغط
function toggleLanguage() {
  const newLang = currentLang === "ar" ? "en" : "ar";
  loadLanguage(newLang);
}

// ربط كل الأزرار
langButtons.forEach((btn) => {
  btn.addEventListener("click", toggleLanguage);
});

// عند فتح الصفحة، نقرا اللغة المختارة من localStorage
document.addEventListener("DOMContentLoaded", () => {
  const savedLang = localStorage.getItem("siteLang");
  if (savedLang) {
    currentLang = savedLang;
  }
  loadLanguage(currentLang);
});
// Mobile Menu Functionality

const menuBtn = document.getElementById("menu-btn");
const mobileMenu = document.getElementById("mobile-menu");
const overlay = document.getElementById("menu-overlay");
const closeBtn = document.getElementById("close-btn");
const navbar = document.getElementById("navbar");
// ===== Open / Close Menu =====
function openMenu() {
  mobileMenu.classList.remove("translate-y-full", "opacity-0");
  mobileMenu.classList.add("opacity-100");
  overlay.classList.remove("opacity-0", "pointer-events-none");
  overlay.classList.add("opacity-100", "pointer-events-auto");
  menuBtn.classList.add("menu-open");
  document.body.style.overflow = "hidden";
}

function closeMenu() {
  mobileMenu.classList.add("translate-y-full", "opacity-0");
  mobileMenu.classList.remove("opacity-100");
  overlay.classList.add("opacity-0", "pointer-events-none");
  overlay.classList.remove("opacity-100", "pointer-events-auto");
  menuBtn.classList.remove("menu-open");
  document.body.style.overflow = "auto";
}

// ===== Event Listeners =====
menuBtn.addEventListener("click", () => {
  if (menuBtn.classList.contains("menu-open")) closeMenu();
  else openMenu();
});

closeBtn.addEventListener("click", closeMenu);
overlay.addEventListener("click", closeMenu);

// Close menu on link click
document.querySelectorAll("#mobile-menu a").forEach((link) => {
  link.addEventListener("click", closeMenu);
});

// highlight active

function highlightActiveLinks(menuId, activeClass) {
  const links = document.querySelectorAll(`#${menuId} a`);
  const currentPath = location.pathname;

  links.forEach((link) => {
    const href = link.getAttribute("href");

    // ===== الصفحة الرئيسية =====
    if (
      (href === "index.html" || href === "/") &&
      (currentPath === "/" || currentPath.endsWith("index.html"))
    ) {
      link.classList.add(...activeClass.split(" "));
    }
    // ===== باقي الصفحات =====
    else if (href !== "index.html" && currentPath.endsWith(href)) {
      link.classList.add(...activeClass.split(" "));
    } else {
      link.classList.remove(...activeClass.split(" "));
    }
  });
}

// تطبيق على الموبايل
highlightActiveLinks("mobile-menu", "text-accent font-bold");

// تطبيق على اللارج
highlightActiveLinks("lg-menu", "text-white");

// scroll to top
const scrollBtn = document.getElementById("scrollToTop");

// إظهار الزرار بعد Scroll 300px
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.remove("hidden");
  } else {
    scrollBtn.classList.add("hidden");
  }
});

// Scroll Smooth to Top and convert font
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});
langButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (btn.textContent === "EN") {
      document.body.classList.remove("font-cairo");
      document.body.classList.add("font-nunito");
      document.getElementById("scrollToTop").classList.remove("right-8");
      document.getElementById("scrollToTop").classList.add("left-8");
    } else {
      document.getElementById("scrollToTop").classList.remove("left-8");
      document.getElementById("scrollToTop").classList.add("right-8");
      document.body.classList.add("font-cairo");
      document.body.classList.remove("font-nunito");
    }
  });
});
window.onload = () => {
  if (localStorage.getItem("siteLang") === "en") {
    document.body.classList.remove("font-cairo");
    document.body.classList.add("font-nunito");
    document.getElementById("scrollToTop").classList.remove("right-8");
    document.getElementById("scrollToTop").classList.add("left-8");
  }
  console.log(localStorage.getItem("sitelang"));
};
