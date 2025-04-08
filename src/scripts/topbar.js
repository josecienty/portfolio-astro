const styleActive = 'bg-white/15';
const topbar = document.querySelector("#topbar");
const sections = document.querySelectorAll("section");

document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const index = Array.from(sections).indexOf(entry.target);
                topbar.children[index].classList.toggle(styleActive, entry.isIntersecting);
            });
        },
        {
            threshold: 0.8,
        }
    );

    sections.forEach((section) => observer.observe(section));
});