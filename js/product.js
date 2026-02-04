document.addEventListener("DOMContentLoaded", () => {
  // Main Accordion
  document.querySelectorAll(".accordion-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      const isOpen = !content.classList.contains("hidden");

      document.querySelectorAll(".accordion-content").forEach((c) => {
        c.classList.add("hidden");
        const icon = c.previousElementSibling.querySelector(".plus-icon");
        if (icon) icon.textContent = "+";
      });

      if (!isOpen) {
        content.classList.remove("hidden");
        btn.querySelector(".plus-icon").textContent = "−";
      }
    });
  });

  // Sub Accordion
  document.querySelectorAll(".sub-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      const sub = btn.nextElementSibling;
      const isOpen = sub.style.maxHeight && sub.style.maxHeight !== "0px";

      btn.parentElement.querySelectorAll(".sub-content").forEach((s) => {
        s.style.maxHeight = "0px";
        const icon = s.previousElementSibling.querySelector(".sub-plus");
        if (icon) icon.textContent = "+";
      });

      if (!isOpen) {
        sub.style.maxHeight = sub.scrollHeight + "px";
        btn.querySelector(".sub-plus").textContent = "−";
        sub.addEventListener("transitionend", function handler() {
          sub.style.maxHeight = "none";
          sub.removeEventListener("transitionend", handler);
        });
      }
    });
  });

  // Sliders Controls
  document.querySelectorAll(".slider").forEach((slider) => {
    const nextBtn = slider.parentElement.querySelector(".next-btn");
    const prevBtn = slider.parentElement.querySelector(".prev-btn");

    nextBtn.addEventListener("click", () => {
      slider.scrollBy({ left: slider.offsetWidth, behavior: "smooth" });
    });
    prevBtn.addEventListener("click", () => {
      slider.scrollBy({ left: -slider.offsetWidth, behavior: "smooth" });
    });
  });

  // Touch drag for mobile
  document.querySelectorAll(".slider").forEach((slider) => {
    let isDown = false,
      startX,
      scrollLeft;
    slider.addEventListener("mousedown", (e) => {
      isDown = true;
      startX = e.pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
      slider.classList.add("cursor-grabbing");
    });
    slider.addEventListener("mouseleave", () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    });
    slider.addEventListener("mouseup", () => {
      isDown = false;
      slider.classList.remove("cursor-grabbing");
    });
    slider.addEventListener("mousemove", (e) => {
      if (!isDown) return;
      e.preventDefault();
      const x = e.pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });

    // Touch support
    slider.addEventListener("touchstart", (e) => {
      startX = e.touches[0].pageX - slider.offsetLeft;
      scrollLeft = slider.scrollLeft;
    });
    slider.addEventListener("touchmove", (e) => {
      const x = e.touches[0].pageX - slider.offsetLeft;
      const walk = (x - startX) * 2;
      slider.scrollLeft = scrollLeft - walk;
    });
  });
});
