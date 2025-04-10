let currentSection = 0;
let isScrolling = false;

const sections = document.querySelectorAll("section");
//? Para topBar
const styleActive = 'bg-white/15';
const topbar = document.querySelector("#topbar");

//? Si no tiene hash ir siempre arriba
if (!document.location.hash?.length) {
    document.documentElement.scrollIntoView({ top: 0 });
} else {
    const index = Array.from(sections).findIndex(
        item => '#' + item.id === document.location.hash && item.classList.contains('fullpage')
    );
    // Se registra en el current index para que
    // Funcione los eventos al cambio de hash
    if (index >= 0) currentSection = index;
}

//? Para no mostrar #inicio
window.addEventListener('hashchange', function (a) {
    if (document.location.hash == '#inicio') {
        history.replaceState(null, '', '/');
        scrollToSection(0);
    }
});

function scrollToSection(index) {
    if (index >= 0 && index < sections.length) {
        if (index == 0) {
            document.documentElement.scrollIntoView({
                top: 0,
                behavior: "smooth"
            });
        } else {
            sections[index].scrollIntoView({ behavior: "smooth" });
        }
        setTimeout(() => {
            isScrolling = false;
        }, 200);
    }
}

function getAction(event) {
    if (event.deltaY > 0) {
        return 'baja';
    } else if (event.deltaY < 0) {
        return 'sube';
    }
}

function calcularSeccion() {
    sections.forEach((section, index) => {
        if (section.getBoundingClientRect()) currentSection = index;
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const index = Array.from(sections).indexOf(entry.target); // Obtén el índice de la sección

                //? Esto es para activar el topbar
                topbar.children[index].classList.toggle(styleActive, entry.isIntersecting);

                if (entry.isIntersecting && !entry.target.classList.contains('fullpage')) {
                    currentSection = index;
                }
            });
        },
        {
            threshold: 0.8,
        }
    );

    sections.forEach((section) => observer.observe(section));
});

window.addEventListener("wheel", (event) => {
    if (isScrolling) {
        event.preventDefault();
        return;
    }
    if (sections.length === 0 || currentSection > sections.length - 1) return;

    // ? Validamos que acción ejecuta el scroll
    const currentSectionElement = sections[currentSection];
    const scrollTop = window.scrollY || window.pageYOffset;
    const sectionBottom = currentSectionElement.offsetTop + currentSectionElement.clientHeight;

    // Detectar la visibilidad de la siguiente sección

    switch (getAction(event)) {
        case 'baja'://? Para ver el siguiente
            const nextSectionVisible = scrollTop + window.innerHeight > sectionBottom - 100; // Ajusta el valor de 100 según sea necesario
            const puedeSaltar = nextSectionVisible && currentSection < sections.length - 1 &&
                (sections[currentSection + 1].classList.contains('fullpage') ||
                    (!sections[currentSection + 1].classList.contains('fullpage') &&
                        sections[currentSection].classList.contains('fullpage')));

            if (puedeSaltar) {
                isScrolling = true;
                currentSection++;
                scrollToSection(currentSection);
                event.preventDefault();
            }
            break;
        case 'sube':
            if (currentSection > 0 && sections[currentSection - 1].classList.contains('fullpage')) {
                isScrolling = true;
                currentSection--;
                scrollToSection(currentSection);
                event.preventDefault();
            }
            break;
    }

    return;
}, { passive: false });
