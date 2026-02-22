const lenis = typeof Lenis !== "undefined" ? new Lenis() : null;
if (typeof window !== "undefined") {
    window.__lenis = lenis;
    window.__lenisRafActive = false;
}
if (lenis) {
    function raf(time) {
        lenis.raf(time);
        if (typeof window !== "undefined") {
            window.__lenisRafActive = true;
        }
        requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);
}

const box = document.querySelector(".card-container");

function updateContent(e) {
    if (e.matches) {
        box.innerHTML = `<img src="./assets/Cards (6).svg" alt="cards">`;
    } else {
        box.innerHTML = `<img src="./assets/Cards (5).svg" alt="cards">`;
    }
}

const media = window.matchMedia("(max-width: 600px)");
if (box) {
    updateContent(media);
    media.addListener(updateContent);
}




const menu = document.querySelector(".header .menu");
const overlay = document.querySelector(".menu-overlay");
const lines = document.querySelectorAll(".header .menu hr");
const closeBtn = document.querySelector(".menu-close");

let isOpen = false;

function openMenu() {
    gsap.to(lines[0], { rotate: 45, y: 6, duration: 0.25 });
    gsap.to(lines[1], { rotate: -45, y: -6, duration: 0.25 });
    gsap.to(overlay, { left: 0, duration: 0.7, ease: "power3.inOut" });
    isOpen = true;
}

function closeMenu() {
    gsap.to(lines[0], { rotate: 0, y: 0, duration: 0.25 });
    gsap.to(lines[1], { rotate: 0, y: 0, duration: 0.25 });
    gsap.to(overlay, { left: "100%", duration: 0.7, ease: "power3.inOut" });
    isOpen = false;
}

if (menu && overlay && closeBtn && lines.length >= 2 && typeof gsap !== "undefined") {
    menu.addEventListener("click", () => {
        isOpen ? closeMenu() : openMenu();
    });

    closeBtn.addEventListener("click", closeMenu);
}
