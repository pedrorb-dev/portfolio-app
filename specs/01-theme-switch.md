# SPEC 01 — Switch de tema claro y obscuro

> **Status:** Aprobado
> **Depends on:** Ninguna
> **Date:** 2026-11-22
> **Objective:** Agregar un switch en el Header, basado en `createContext` y `useContext`, que alterne entre un tema claro con acentos índigo y un tema obscuro slate, persistiendo la elección en `localStorage`.

## Scope

**In:**

- `ThemeContext` con `createContext`, `ThemeProvider` y el hook `useTheme()`.
- Switch accesible con iconos sol/luna en el `Header`.
- Paleta clara: fondo claro con acentos índigo `#4f46e5`.
- Paleta obscura: fondo `#0f172a`, superficies `#1e293b`, texto `#e2e8f0`, acentos `#818cf8`.
- Variables CSS aplicadas en `src/index.css` y migración de los colores fijos de los CSS existentes.
- Persistencia en `localStorage` bajo la clave `theme`, con `prefers-color-scheme` como valor inicial.
- Script inline en `index.html` que aplica el tema antes de que monte React.

**Out of scope (for future specs):**

- Switch en el Footer o controles duplicados.
- Tercer estado persistido de «seguir al sistema».
- Tailwind, `next-themes` u otra librería de temas.
- Transiciones animadas entre temas.
- Cambios de contenido, imágenes o textos del portfolio.

## Data model

```js
// src/context/ThemeContext.jsx
const STORAGE_KEY = 'theme'        // valores: 'light' | 'dark'

// Valor expuesto por useTheme():
{
  theme: 'light' | 'dark',
  toggleTheme: () => void,
}

// Atributo aplicado en <html> por el provider y por el script de index.html:
// data-theme="light" | data-theme="dark"
```

Variables CSS en `src/index.css`:

| Variable        | Claro (`light`)         | Obscuro (`dark`)     |
| --------------- | ----------------------- | -------------------- |
| `--bg`          | `#ffffff`               | `#0f172a`            |
| `--surface`     | `#eef2ff`               | `#1e293b`            |
| `--text`        | `#1e293b`               | `#e2e8f0`            |
| `--text-muted`  | `#5E5D5D`               | `#94a3b8`            |
| `--accent`      | `#4f46e5`               | `#818cf8`            |
| `--accent-text` | `#ffffff`               | `#0f172a`            |
| `--border`      | `#c7d2fe`               | `#334155`            |
| `--header-bg`   | `rgba(255,255,255,0.8)` | `rgba(30,41,59,0.9)` |

Convención: ningún componente escribe colores directamente; todos consumen estas variables.

## Implementation plan

1. Crear `src/context/ThemeContext.jsx` con `createContext(null)`, `ThemeProvider` y `useTheme()`. El provider lee `localStorage` dentro de `try/catch`, usa `matchMedia('(prefers-color-scheme: dark)')` como fallback, aplica `document.documentElement.dataset.theme` en un `useEffect` y expone `toggleTheme`. Sin consumidores aún; la app sigue funcionando.
2. Definir las variables de la tabla anterior en `src/index.css` con `:root` y `[data-theme='dark']`. Sustituir el gradiente fijo de `src/App.css` por `var(--bg)`. La app se ve igual en claro.
3. Agregar en `index.html`, antes del script de Vite, un script inline que lea `theme` de `localStorage` (con `try/catch`) y fije `data-theme` en `<html>`, usando la preferencia del sistema como fallback. Sin parpadeo al recargar.
4. Envolver `<App />` con `ThemeProvider` dentro de `StrictMode` en `src/main.jsx`. El tema ya se aplica globalmente, aunque todavía no haya control visible.
5. Crear `src/components/ThemeSwitch.jsx`: botón con `role="switch"`, `aria-checked`, `aria-label`, iconos `FaSun`/`FaMoon` de `react-icons`, que llama a `toggleTheme()` desde `useTheme()`. Agregar estilos `.theme-switch` en `src/components/styles/Header.css`.
6. Integrar `<ThemeSwitch />` en `src/components/Header.jsx` y migrar los colores fijos de `Header.css` a variables. El switch ya es funcional y el Header cambia de tema.
7. Migrar los colores restantes en `src/components/styles/Hero.css`, `ProjectItem.css`, `SkillItem.css`, `Skills.css`, `About.css` y `Footer.css` (incluidas las sombras con `rgba(65, 51, 0, ...)`) a las variables. Verificar con búsqueda que no queden hexádecimos fijos en esos archivos.

## Acceptance criteria

- [ ] `npm run dev` y `npm run build` terminan sin errores ni warnings nuevos.
- [ ] El switch aparece en el Header con iconos sol/luna y `role="switch"`.
- [ ] `aria-checked` refleja el tema activo (`true` en obscuro).
- [ ] Un clic cambia `document.documentElement.dataset.theme` entre `light` y `dark` sin recargar la página.
- [ ] En claro el fondo es `#ffffff`/`#eef2ff` y los acentos son `#4f46e5`; no aparece `#dca500`.
- [ ] En obscuro el fondo es `#0f172a`, las superficies `#1e293b`, el texto `#e2e8f0` y los acentos `#818cf8`.
- [ ] `localStorage.theme` pasa a ser exactamente `light` u `dark` después de cada cambio.
- [ ] Al recargar con `dark` guardado no se muestra ningún frame claro inicial.
- [ ] Sin valor guardado y con el sistema en modo obscuro, la carga inicial usa `dark`.
- [ ] El switch se maneja con Tab y Espacio/Enter y mantiene foco visible.
- [ ] No quedan colores literales en los siete CSS migrados; todos usan variables.

## Decisions

- **Sí:** `createContext` + `useContext` y un hook `useTheme()` propio. Decisión del usuario, sin dependencias nuevas.
- **Sí:** `data-theme` en `<html>` y variables CSS. Un solo punto de cambio para toda la app.
- **Sí:** `localStorage` con clave `theme` y valores `light`/`dark`. Persistencia mínima y legible.
- **Sí:** script inline anti-parpadeo en `index.html`. El usuario eligió evitar el frame claro.
- **Sí:** iconos de `react-icons`, ya presentes en `package.json`.
- **No:** `next-themes`, Tailwind ni librerías de temas. Innecesarias para dos temas.
- **No:** switch en el Footer ni duplicado. Un único punto de control.
- **No:** tercer modo «sistema» persistido. El sistema solo se usa como valor inicial.

## Risks

| Riesgo                                   | Mitigación                                                                                             |
| ---------------------------------------- | ------------------------------------------------------------------------------------------------------ |
| `localStorage` bloqueado en modo privado | Lectura y escritura dentro de `try/catch`; el tema sigue funcionando durante la sesión.                |
| Colores fijos olvidados en componentes   | La lista de siete CSS del plan es exhaustiva y el último paso la verifica con búsqueda de hexádecimos. |
| Parpadeo si el script inline falla       | `try/catch` en el script con fallback a `light`; el provider corrige el valor al montar.               |

## What is **not** in this spec

- Switch en el Footer o controles duplicados.
- Modo «sistema» como tercera opción persistida.
- Transiciones animadas entre paletas.
- Migración a Tailwind o a una librería de temas.
- Cambios en textos, imágenes o estructura del portfolio.

Cada uno de esos puntos, si se implementa, va en su propia spec.
