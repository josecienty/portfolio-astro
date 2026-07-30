# 🚀 Portfolio Astro

![Imagen](./public/projects/portfolio.webp)
Portfolio personal desarrollado con **Astro** y **Tailwind CSS**, enfocado en rendimiento, accesibilidad y una experiencia de usuario moderna.

🌐 **Demo:** https://portfolio-astro-two-gold.vercel.app/

---

## ✨ Características

- ⚡ **Astro** para generación estática ultrarrápida
- 🎨 **Tailwind CSS** para estilos modernos y mantenibles
- 📱 Diseño **responsive** (mobile-first)
- 🌙 Soporte para modo claro/oscuro *(si está habilitado)*
- 🔍 Optimizado para **SEO**
- ♿ Buenas prácticas de **accesibilidad**
- 🚀 Despliegue automático en **Vercel**

---

## 🛠️ Tecnologías utilizadas
Requiere **Node >= 18.14**

| Tecnología | Descripción |
|------------|-------------|
| **Astro** | Framework web orientado a contenido |
| **Tailwind CSS** | Framework CSS utility-first |
| **TypeScript** | Tipado estático para mayor robustez |
| **Vercel** | Hosting y despliegue continuo |

Astro destaca por generar sitios estáticos extremadamente rápidos y con excelente rendimiento SEO, ideal para portfolios y landing pages.

---

## 📂 Estructura del proyecto

```text
/
├── public/              # Archivos estáticos
├── src/
│   ├── components/      # UI reutilizables y modulares
│   ├── layouts/         # Plantillas estructurales
│   ├── pages/           # Páginas de la aplicación
│   ├── styles/          # Hojas de estilo globales
│   ├── sections/        # Bloques completos de la interfaz
│   └── scripts/         # Lógica JavaScript/TypeScript
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
└── package.json
```

---

## 🚀 Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/josecienty/portfolio-astro.git
cd portfolio-astro
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Iniciar entorno de desarrollo

```bash
npm run dev
```

Abrir en el navegador:

```text
http://localhost:4321
```

El puerto `4321` es el predeterminado de Astro.

---

## 📜 Scripts disponibles

| Comando           | Descripción                        |
| ----------------- | ---------------------------------- |
| `npm run dev`     | Inicia el servidor de desarrollo   |
| `npm run build`   | Genera la versión de producción    |
| `npm run preview` | Previsualiza el build localmente   |
| `npm run astro`   | Ejecuta comandos de Astro CLI      |

---

## 🧩 Personalización

### Cambiar información personal

Editar los archivos dentro de:

```text
src/content/
```

o los componentes correspondientes en:

```text
src/components/
```

### Cambiar colores y tipografía

Modificar:

```text
tailwind.config.mjs
src/styles/global.css
```

---

## 🚀 Despliegue en Vercel

Este proyecto está preparado para desplegarse directamente en **Vercel**.

### Opción rápida

1. Subir el repositorio a GitHub.
2. Importarlo en **Vercel**.
3. Detectará automáticamente **Astro**.
4. Ejecutará:

```bash
npm run build
```

---

## 📈 Rendimiento

Objetivos del proyecto:

- ⚡ **LCP bajo**
- 🧠 **JavaScript mínimo**
- 📱 Excelente experiencia móvil
- 🔍 SEO técnico optimizado
- ♿ Accesibilidad AA

---

## 🖼️ Secciones del portfolio

- **Hero / Presentación**
- **Sobre mí**
- **Proyectos destacados**
- **Tecnologías**
- **Experiencia**
- **Contacto**

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas.

```bash
# Crear rama
git checkout -b feature/nueva-funcionalidad

# Commit
git commit -m "feat: nueva funcionalidad"

# Push
git push origin feature/nueva-funcionalidad
```

---

## 📄 Licencia

Este proyecto está bajo la licencia **MIT**.
