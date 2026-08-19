---
name: uxui
description: Use when designing, auditing, or implementing UI components, visual aesthetics, layout structures, micro-interactions, responsive interfaces, accessibility standards, color palettes, and user experience (UX) workflows.
---

# Guía de Diseño de Interfaz y Experiencia de Usuario (UI/UX)

Esta habilidad proporciona una guía integral para diseñar, desarrollar y auditar interfaces de usuario atractivas, funcionales, accesibles y con una experiencia de usuario (UX) fluida y memorable.

---

## 1. Principios Fundamentales de UI/UX

- **Jerarquía Visual Clara**:
  - Utilizar contraste de tamaño, peso tipográfico y color para guiar la atención del usuario hacia el contenido o acción principal (Call to Action - CTA).
  - Los elementos más importantes deben destacar sin saturar la pantalla.
- **Claridad y Simplicidad**:
  - Evitar el desorden visual. Mantener suficiente espacio en blanco (whitespace/padding) para dar respiro a los componentes.
- **Feedback Inmediato**:
  - Toda interacción (clic, hover, foco, envío de formulario) debe ofrecer respuesta visual o táctil inmediata.
- **Consistencia Visual**:
  - Mantener los mismos patrones de diseño, esquemas de color, bordes y tipografías a lo largo de toda la aplicación.

---

## 2. Sistema de Diseño y Tokens CSS

Definir un sistema de diseño estructurado mediante variables CSS (`:root`) para mantener consistencia:

```css
:root {
  /* Paleta de Colores (Modo Oscuro / Premium) */
  --bg-primary: #0b0d17;
  --bg-secondary: #16192b;
  --bg-card: rgba(255, 255, 255, 0.05);
  
  --text-primary: #f8fafc;
  --text-secondary: #94a3b8;
  --text-muted: #64748b;
  
  --accent-primary: #d97706; /* Dorado / Ámbar Samurai */
  --accent-hover: #b45309;
  --accent-glow: rgba(217, 119, 6, 0.25);
  
  /* Tipografía y Escala */
  --font-family: 'Cinzel', 'Inter', system-ui, -apple-system, sans-serif;
  --font-size-sm: 0.875rem;
  --font-size-base: 1rem;
  --font-size-lg: 1.25rem;
  --font-size-xl: 1.75rem;
  --font-size-2xl: 2.5rem;
  
  /* Elevación y Bordes */
  --border-radius-sm: 6px;
  --border-radius-md: 12px;
  --border-radius-lg: 20px;
  --border-color: rgba(255, 255, 255, 0.1);
  --shadow-subtle: 0 4px 20px rgba(0, 0, 0, 0.3);
  --shadow-glow: 0 0 25px var(--accent-glow);
  
  /* Transiciones */
  --transition-fast: 0.15s ease;
  --transition-normal: 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## 3. Micro-interacciones y Animaciones

- **Transiciones Suaves**:
  - Utilizar `transition` en estados `:hover`, `:focus` y `:active`.
  ```css
  .btn-primary {
    background: var(--accent-primary);
    color: var(--text-primary);
    transition: transform var(--transition-fast), box-shadow var(--transition-fast), background-color var(--transition-fast);
  }

  .btn-primary:hover {
    background: var(--accent-hover);
    transform: translateY(-2px);
    box-shadow: var(--shadow-glow);
  }
  ```

- **Efectos de Cristales y Profundidad (Glassmorphism)**:
  ```css
  .glass-card {
    background: rgba(22, 25, 43, 0.7);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border: 1px solid var(--border-color);
    border-radius: var(--border-radius-md);
  }
  ```

- **Animaciones sutiles de entrada**:
  - Usar `@keyframes` para revelar elementos gradualmente al cargar o deslizar.

---

## 4. Accesibilidad (A11Y) y Usabilidad

- **Contraste de Color (WCAG 2.1 AA/AAA)**:
  - Garantizar una relación de contraste mínima de **4.5:1** para texto normal y **3:1** para texto grande.
- **Navegación por Teclado**:
  - Asegurar que todos los elementos interactivos sean accesibles mediante la tecla `Tab`.
  - Incluir estilos visibles de foco (`:focus-visible`):
    ```css
    :focus-visible {
      outline: 2px solid var(--accent-primary);
      outline-offset: 3px;
    }
    ```
- **Etiquetas Semánticas y ARIA**:
  - Utilizar botones `<button>` para acciones y enlaces `<a>` para navegación.
  - Agregar `aria-label`, `aria-expanded` y `aria-hidden` cuando sea necesario para lectores de pantalla.
- **Objetivos Táctiles (Touch Targets)**:
  - En dispositivos móviles, los elementos interactivos deben tener un tamaño mínimo de **44x44px**.

---

## 5. Diseño Responsivo (Mobile-First)

- **Layouts Flexibles**: Usar CSS Grid y Flexbox en lugar de posiciones absolutas o anchos fijos.
- **Puntos de Interrupción (Breakpoints)**:
  - Móvil: `< 768px`
  - Tablet: `768px - 1024px`
  - Escritorio: `> 1024px`
- **Imágenes y Contenedores Fluidos**:
  ```css
  img, video {
    max-width: 100%;
    height: auto;
  }
  ```

---

## 6. Manejo de Estados de Usuario (UX States)

1. **Estado Vacío (Empty State)**: Mostrar mensajes informativos e ilustrativos cuando no haya datos.
2. **Estado de Carga (Loading State)**: Usar placeholders estilo *Skeleton Screen* o indicadores de carga para reducir la percepción de espera.
3. **Estado de Error**: Explicar claramente qué falló y cómo el usuario puede solucionarlo (mensajes en línea o toasts).
4. **Estado Deshabilitado (Disabled)**: Indicar visualmente con opacidad reducida (`opacity: 0.5`) y `cursor: not-allowed`.

---

## 7. Lista de Chequeo para Auditoría UI/UX

- [ ] ¿El esquema de colores y la tipografía reflejan la personalidad de la marca?
- [ ] ¿El contraste entre el texto y el fondo cumple con los estándares WCAG AA?
- [ ] ¿Los botones e inputs poseen estados hover, focus, active y disabled claros?
- [ ] ¿La interfaz se adapta sin desbordamientos horizontales en dispositivos móviles?
- [ ] ¿Los elementos interactivos tienen un área de clic adecuada (mínimo 44x44px en móviles)?
- [ ] ¿Se incluyen micro-animaciones o transiciones suaves que hagan sentir fluida la app?
- [ ] ¿Los estados de carga, vacío y error están contemplados visualmente?
- [ ] ¿Toda la navegación puede realizarse completamente mediante teclado?
