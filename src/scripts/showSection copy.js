import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

let currentSection = 0;
let isScrolling = false;

const sections = document.querySelectorAll("section");

//? Para topBar
const styleActive = "bg-[#10B981]/50";
const topbar = document.querySelector("#topbar");

//? Si no tiene hash ir siempre arriba
if (!document.location.hash?.length) {
  document.documentElement.scrollIntoView({ top: 0 });
} else {
  goToHash(document.location.hash);
}

//*===============================*/
//*    Funciones de navegación    */
//*===============================*/

/**
 * Navega a la sección que está en elíndice especificado,
 * si elíndice es 0, se va a la parte superior de la página.
 * @param {number} index El ndice de la secci n que se desea navegar
 */
function scrollToSection(index) {
  if (index >= 0 && index < sections.length) {
    if (index == 0) {
      document.documentElement.scrollIntoView({
        top: 0,
        behavior: "smooth",
      });
    } else {
      sections[index].scrollIntoView({ behavior: "smooth" });
    }
    setTimeout(() => {
      isScrolling = false;
    }, 200);
  }
}

/**
 * Navega a la sección que tenga el hash especificado y sea una secci n "fullpage"
 * @param {string} hash El hash que se desea navegar
 * @returns {Promise<void>}
 */
async function goToHash(hash) {
  const index = await Array.from(sections).findIndex(
    (item) => "#" + item.id === hash && item.classList.contains("fullpage")
  );

  if (index >= 0) {
    currentSection = index;
    scrollToSection(index);
  }
}

/**
 * Determinar la dirección de desplazamiento de la rueda del ratón.
 * 
 * @param {WheelEvent} event - The wheel event containing scroll data.
 * @returns {string} - Returns "baja" if scrolling down, "sube" if scrolling up.
 */
function getAction(event) {
  if (event.deltaY > 0) {
    return "baja";
  } else if (event.deltaY < 0) {
    return "sube";
  }
}


const scroll = {
  /**
   * Sube una sección en la navegación, si está en una sección "fullpage"
   * y se puede subir.
   * Si se puede subir, se activa la navegación rápida y se cambia el valor
   * de `currentSection` a la sección anterior.
   * @returns {boolean} - `true` si se puede subir, `false` si no.
   */
  up: () => {
    console.log('calcula arriba', [

      currentSection > 0,
      sections[currentSection - 1].classList.contains("fullpage"),
      currentSection
    ])
    if (
      currentSection > 0 &&
      sections[currentSection - 1].classList.contains("fullpage")
    ) {
      isScrolling = true;
      currentSection--;
      scrollToSection(currentSection);
      return true;
    }
    return false
  },

  /**
   * Baja una sección en la navegación, si se puede bajar.
   * Si se puede bajar, se activa la navegación rápida y se cambia el valor
   * de `currentSection` a la sección siguiente.
   * @returns {boolean} - `true` si se puede bajar, `false` si no.
   */
  down: () => {
    // const nextSectionVisible = scrollTop + window.innerHeight > sectionBottom - 100; // Ajusta el valor de 100 según sea necesario
    const puedeSaltar =
      currentSection < sections.length - 1 &&
      (sections[currentSection + 1].classList.contains("fullpage") ||
        (!sections[currentSection + 1].classList.contains("fullpage") &&
          sections[currentSection].classList.contains("fullpage")));

    if (puedeSaltar) {
      isScrolling = true;
      currentSection++;
      scrollToSection(currentSection);
      return true;
    }
    return false
  }
}

//*===============================*/
//*    Eventos de navegación      */
//*===============================*/

//? Para no mostrar #inicio y navegar entre las secciones con hash
window.addEventListener("hashchange", async function (a) {
  const hash = document.location.hash;
  if (hash == "#inicio") {
    currentSection = 0;
    history.replaceState(null, "", "/");
    scrollToSection(0);
    return;
  }

  goToHash(hash);
});

//? Observer para determinar la sección abierta
document.addEventListener("DOMContentLoaded", () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        //entry.isIntersecting => TRUE si entro, FALSE si salio
        const index = Array.from(sections).indexOf(entry.target);
        console.log(`Visible: ${entry.intersectionRatio} - index ${index}`);

        topbar.children[index].classList
          .toggle(
            styleActive,
            entry.isIntersecting
          );

        console.log(entry.isIntersecting ? 'Entra en' : 'Sale de', index);

        switch (entry.isIntersecting ? 'ENTRA' : 'SALE') {
          case 'ENTRA':
            debugger;
            if (entry.target.classList.contains('fullpage')) return;
            currentSection = index;
            break;
          case 'SALE':
            break;
        }
      });
    },
    {
      threshold: [0.3],
    }
  );

  sections.forEach((section) => observer.observe(section));
});

//? Dar funcionalidad a well
window.addEventListener("wheel",
  (event) => {
    if (isScrolling) {
      event.preventDefault();
      return;
    }
    if (sections.length === 0 || currentSection > sections.length - 1) return;

    switch (getAction(event)) {
      case "baja": //? Para ver el siguiente
        if (scroll.down())
          event.preventDefault();
        break;
      case "sube":
        if (window.scrollY === 0) return;
        if (scroll.up())
          event.preventDefault();
        break;
    }

    return;
  },
  { passive: false }
);


//? Dar la misma funcionalidad al teclado
window.addEventListener('keydown', (evt) => {
  if (isScrolling) {
    evt.preventDefault();
    return;
  }
  switch (evt.key) {
    case "ArrowDown":
      if (scroll.down())
        evt.preventDefault();
      break;
    case "ArrowUp":
      if (scroll.up())
        evt.preventDefault();
      break;
    default:
      break;
  }
});