import AOS from "aos";
import "aos/dist/aos.css";

function initFullpageScroll() {
  AOS.init();

  const sections = [...document.querySelectorAll("section")];
  const topbar = document.querySelector("#topbar");

  if (!sections.length) return;

  let currentSection = 0;
  let isScrolling = false;
  let scrollTimeout = null;

  const STYLE_ACTIVE = "bg-[#10B981]/50";
  const SCROLL_LOCK_TIME = 700;

  /* =========================
    Helpers
  ========================= */

  function lockScroll() {
    isScrolling = true;
    clearTimeout(scrollTimeout);
    scrollTimeout = setTimeout(() => {
      isScrolling = false;
    }, SCROLL_LOCK_TIME);
  }

  function scrollToSection(index) {
    if (index < 0 || index >= sections.length) return;

    lockScroll();

    if (index === 0) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
      return;
    }

    sections[index].scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }

  function goToHash(hash) {
    const index = sections.findIndex(
      (s) => "#" + s.id === hash
    );

    if (index >= 0) {
      scrollToSection(index);
    }
  }

  function getAction(event) {
    if (event.deltaY > 0) return "down";
    if (event.deltaY < 0) return "up";
    return null;
  }

  /* =========================
    HASH INIT
  ========================= */

  if (!location.hash) {
    window.scrollTo({ top: 0 });
  } else {
    goToHash(location.hash);
  }

  window.addEventListener("hashchange", () => {
    const hash = location.hash;

    if (hash === "#inicio") {
      history.replaceState(null, "", "/");
      scrollToSection(0);
      return;
    }

    goToHash(hash);
  });

  /* =========================
    INTERSECTION OBSERVER
    (Fuente única de estado)
  ========================= */

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        const index = sections.indexOf(entry.target);
        currentSection = index;

        if (topbar?.children[index]) {
          [...topbar.children].forEach((item) =>
            item.classList.remove(STYLE_ACTIVE)
          );

          topbar.children[index].classList.add(STYLE_ACTIVE);
        }
      });
    },
    {
      threshold: 0.2,
    }
  );

  sections.forEach((section) => observer.observe(section));

  /* =========================
    WHEEL CONTROL
  ========================= */
  let prevSection = null;

  window.addEventListener(
    "wheel",
    (event) => {
      if (isScrolling) {
        event.preventDefault();
        return;
      }

      const section = sections[currentSection];
      const currentIsFullpage = section?.classList.contains("fullpage");

      if (prevSection && !prevSection?.classList.contains("fullpage") && currentIsFullpage) {
        prevSection = section;
        event.preventDefault();
        scrollToSection(currentSection);
        return;
      }

      // Si no es fullpage → scroll normal
      if (!currentIsFullpage) {
        prevSection = section;
        return;
      }

      prevSection = section;

      const action = getAction(event);
      if (!action) return;

      if (action === "down") {
        if (currentSection < sections.length - 1) {
          event.preventDefault();
          scrollToSection(currentSection + 1);
        }
      }

      if (action === "up") {
        if (currentSection > 0) {
          event.preventDefault();
          scrollToSection(currentSection - 1);
        }
      }
    },
    { passive: false }
  );

  /* =========================
    KEYBOARD CONTROL
  ========================= */

  window.addEventListener("keydown", (evt) => {
    if (isScrolling) {
      evt.preventDefault();
      return;
    }

    const section = sections[currentSection];
    const currentIsFullpage =
      sections[currentSection]?.classList.contains("fullpage");

    if (prevSection && !prevSection?.classList.contains("fullpage") && currentIsFullpage) {
      prevSection = section;
      evt.preventDefault();
      scrollToSection(currentSection);
      return;
    }

    // Si no es fullpage → scroll normal
    if (!currentIsFullpage) {
      prevSection = section;
      return;
    }

    prevSection = section;

    if (evt.key === "ArrowDown") {
      if (currentSection < sections.length - 1) {
        evt.preventDefault();
        scrollToSection(currentSection + 1);
      }
    }

    if (evt.key === "ArrowUp") {
      if (currentSection > 0) {
        evt.preventDefault();
        scrollToSection(currentSection - 1);
      }
    }
  });
}

/* =========================
  INIT
========================= */

document.addEventListener("DOMContentLoaded", initFullpageScroll);