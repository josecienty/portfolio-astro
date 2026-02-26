import NextJS from "../icons/NextJS.astro";
import VueJS from "../icons/Vue.astro";
import Tailwind from "../icons/Tailwind.astro";
import Laravel from "../icons/Laravel.astro";
import Wordpres from "../icons/Wordpres.astro";
import AstroIcon from "../icons/AstroIcon.astro";
import Bootstrap from "../icons/Bootstrap.astro";
import Flutter from "../icons/Flutter.astro";
import MaterialUI from "../icons/MaterialUI.astro";
import Php from "../icons/Php.astro";
import React from "../icons/React.astro";
import JavaScript from "../icons/JavaScript.astro";
import { type Project, type ProjectTag } from './projects.d';

export const TAGS: Record<string, ProjectTag> = {
    NEXT: {
        name: "Next.js",
        class: "bg-black text-white",
        icon: NextJS,
    },
    LARAVEL: {
        name: "Laravel",
        class: "bg-black text-white",
        icon: Laravel,
    },
    VUE: {
        name: "Vue.js",
        class: "bg-black text-white",
        icon: VueJS,
    },
    REACT: {
        name: "Next.js",
        class: "bg-black text-white fill-white",
        icon: React,
    },
    ASTRO: {
        name: "Astro",
        class: "bg-black text-white",
        icon: AstroIcon,
    },
    TAILWIND: {
        name: "Tailwind CSS",
        class: "bg-[#003159] text-white",
        icon: Tailwind,
    },
    WORDPRESS: {
        name: "Wordpress",
        class: "bg-black text-white",
        icon: Wordpres,
    },
    BOOTSTRAP: {
        name: "Bootstrap",
        class: " text-white",
        icon: Bootstrap,
    },
    FLUTTER: {
        name: "Flutter",
        class: "",
        icon: Flutter,
    },
    MATERIALUI: {
        name: "MaterialUi",
        class: "",
        icon: MaterialUI,
    },
    PHP: {
        name: "MaterialUi",
        class: "",
        icon: Php,
    },
    JAVASCRIPT: {
        name: "Javascript",
        class: "",
        icon: JavaScript,
    },
};

export const PROJECTS: Project[] = [
    {
        title: "Aruba WEB",
        description: "Implementación de un nuevo diseño y reestructuración de datos con el objetivo de unificar varios países en un único servidor web.",
        link: "#",
        image: "/projects/aruba.webp",
        tags: [TAGS.LARAVEL, TAGS.VUE, TAGS.TAILWIND],
    },
    {
        title: "Sitio Web de Qmbia Base",
        description: "Landing page para la promoción de un grupo musical paraguayo.",
        link: "#",
        image: "/projects/qmbiabase.webp",
        tags: [TAGS.ASTRO, TAGS.TAILWIND],
    },
    {
        title: "Blog IDESA",
        description: "Sitio de noticias y blog institucional desarrollado para los clientes de Inmobiliaria del Este.",
        link: "https://idesa.com.py/blog",
        image: "/projects/idesa.webp",
        tags: [TAGS.WORDPRESS],
    },
    {
        title: "Bea Insumos",
        description: "Implementación de pasarela de pagos utilizando la plataforma de transacciones uruguaya Plexo.",
        link: "https://beainsumos.uy",
        image: "/projects/bea.webp",
        tags: [TAGS.LARAVEL, TAGS.BOOTSTRAP],
    },
    {
        title: "Acapuedo",
        description: "Participación en el diseño UI y desarrollo del frontend de la plataforma.",
        link: "#",
        image: "/projects/acapuedo.webp",
        tags: [TAGS.VUE, TAGS.FLUTTER, TAGS.MATERIALUI],
    },
    {
        title: "Tupi Marketplace",
        description: "Participación en el desarrollo y mantenimiento del e-commerce, incluyendo mejoras funcionales y ajustes evolutivos.",
        link: "https://tupi.com.py",
        image: "/projects/tupi.webp",
        tags: [TAGS.PHP, TAGS.BOOTSTRAP, TAGS.JAVASCRIPT],
    },
    {
        title: "Tobiano E-commerce",
        description: "Desarrollo de componentes frontend e implementación del sistema de facturación electrónica.",
        link: "https://tobiano.com.py",
        image: "/projects/tobiano.webp",
        tags: [TAGS.LARAVEL, TAGS.BOOTSTRAP, TAGS.VUE],
    },
    {
        title: "Lander Inmobiliaria",
        description: "Desarrollo de mejoras en frontend e implementación de backend dinámico para la gestión de contenidos.",
        link: "https://www.lander.com.py",
        image: "/projects/lander.webp",
        tags: [TAGS.NEXT, TAGS.TAILWIND],
    },
];