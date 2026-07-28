---
name: seo-optimizacion
description: Use when auditing or optimizing search engine visibility, metadata, OpenGraph tags, JSON-LD structured data, sitemaps, semantic HTML hierarchy, and web page indexability.
---

# Optimización SEO (Search Engine Optimization) y Posicionamiento Web

Esta habilidad proporciona una guía completa para implementar, auditar y optimizar el posicionamiento en buscadores (SEO) en sitios y aplicaciones web estáticas o dinámicas.

## 1. Meta Etiquetas y Títulos

- **Etiqueta `<title>` Única y Relevante**:
  - Longitud ideal: 50–60 caracteres.
  - Incluir palabra clave principal e identidad de marca.
  - Ejemplo: `El Camino del Samurai | Libro, Filosofía Bushido y Oráculo Interactivo`

- **Meta Description Atractiva**:
  - Longitud ideal: 120–155 caracteres.
  - Resumen persuasivo con llamada a la acción (CTA).
  - Ejemplo: `<meta name="description" content="Descubre El Camino del Samurai de Jorge Orpianesi. Historia feudal, las 7 virtudes del Bushido, blog de artículos y oráculo interactivo.">`

- **Meta Robots y Canonical URLs**:
  - `<meta name="robots" content="index, follow">`
  - `<link rel="canonical" href="https://elcaminodelsamurai.com/">`

---

## 2. Meta Etiquetas para Redes Sociales (Open Graph & Twitter Cards)

- **Open Graph (Facebook, LinkedIn, WhatsApp, Telegram)**:
  - `<meta property="og:type" content="website">`
  - `<meta property="og:title" content="El Camino del Samurai - Jorge Orpianesi">`
  - `<meta property="og:description" content="Explora la historia, filosofía Bushido y el blog oficial de El Camino del Samurai.">`
  - `<meta property="og:image" content="https://elcaminodelsamurai.com/photos/cueva_reigando.webp">`
  - `<meta property="og:url" content="https://elcaminodelsamurai.com/">`

- **Twitter Cards (X)**:
  - `<meta name="twitter:card" content="summary_large_image">`
  - `<meta name="twitter:title" content="El Camino del Samurai">`
  - `<meta name="twitter:description" content="Libro y Blog oficial de Jorge Orpianesi sobre cultura e historia samurai.">`
  - `<meta name="twitter:image" content="https://elcaminodelsamurai.com/photos/cueva_reigando.webp">`

---

## 3. Estructura Semántica HTML5 y Encabezados

- **Un solo `<h1>` por Página**: El título principal de la página.
- **Jerarquía Ordenada**: `<h1>` → `<h2>` → `<h3>` sin saltar niveles.
- **Etiquetas Semánticas**: Usar `<header>`, `<nav>`, `<main>`, `<article>`, `<section>`, `<aside>`, `<footer>`.
- **Atributos ALT en Imágenes**: Toda imagen debe incluir `alt="..."` descriptivo.
  - Ejemplo: `<img src="photos/cueva_reigando.webp" alt="Entrada a la cueva Reigando en Kumamoto Japón">`

---

## 4. Datos Estructurados (Schema.org / JSON-LD)

Incluir marcado Schema.org en formato JSON-LD en el `<head>` para Rich Snippets en Google:

### Ejemplo para un Libro / Sitio Web:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "Book",
  "name": "El Camino del Samurai",
  "author": {
    "@type": "Person",
    "name": "Jorge Orpianesi"
  },
  "description": "Una inmersión profunda en las virtudes, historia y cultura samurai de Japón.",
  "inLanguage": "es",
  "genre": "Historia / Filosofía"
}
</script>
```

### Ejemplo para un Artículo de Blog:
```html
<script type="application/ld+json">
{
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": "Los Secretos de Miyamoto Musashi en la Cueva Reigando",
  "image": "https://elcaminodelsamurai.com/photos/cueva_reigando.webp",
  "author": {
    "@type": "Person",
    "name": "Jorge Orpianesi"
  },
  "publisher": {
    "@type": "Organization",
    "name": "El Camino del Samurai"
  }
}
</script>
```

---

## 5. Archivos Técnicos SEO (`sitemap.xml` & `robots.txt`)

- **`robots.txt`**:
  ```txt
  User-agent: *
  Allow: /
  Disallow: /admin
  Disallow: /api/
  Sitemap: https://elcaminodelsamurai.com/sitemap.xml
  ```

- **`sitemap.xml`**:
  ```xml
  <?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://elcaminodelsamurai.com/</loc>
      <priority>1.0</priority>
    </url>
    <url>
      <loc>https://elcaminodelsamurai.com/blog.html</loc>
      <priority>0.8</priority>
    </url>
  </urlset>
  ```

---

## 6. Lista de Chequeo SEO (Audit Checklist)

- [ ] ¿Cada página tiene un `<title>` único y una `<meta name="description">`?
- [ ] ¿Están implementadas las etiquetas Open Graph y Twitter Cards?
- [ ] ¿Hay un único `<h1>` por página y la jerarquía de encabezados es correcta?
- [ ] ¿Todas las imágenes poseen atributos `alt` informativos?
- [ ] ¿Se incluyeron JSON-LD para datos estructurados de Schema.org?
- [ ] ¿Existen los archivos `sitemap.xml` y `robots.txt`?
- [ ] ¿Las imágenes están optimizadas en formato `.webp` para carga ultra-rápida (Core Web Vitals)?
