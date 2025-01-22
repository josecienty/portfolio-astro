let currentSection = 0;
const sections = document.querySelectorAll("section");

document.documentElement.scrollIntoView({
    top: 0
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
    }
}

function getAction(event) {
    if (event.deltaY > 0) {
        return 'baja';
    } else if (event.deltaY < 0) {
        return 'sube';
    }
}

function calcularSeccion(){
    sections.forEach((section, index) => {
        if(section.getBoundingClientRect()) currentSection=index;
    })
}

document.addEventListener("DOMContentLoaded", () => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const index = Array.from(sections).indexOf(entry.target); // Obtén el índice de la sección
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
    if (sections.length === 0 || currentSection > sections.length - 1 ) return;

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
                currentSection++;
                scrollToSection(currentSection);
                event.preventDefault();
            }
            break;
        case 'sube':
            if (currentSection > 0 && sections[currentSection - 1].classList.contains('fullpage')) {
                currentSection--;
                scrollToSection(currentSection);
                event.preventDefault();
            }
            break;
    }
    console.log(currentSection);
   
    return;
});