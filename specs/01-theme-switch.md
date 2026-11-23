# SPEC 01 — Switch de tema claro y obscuro

> **Status:** Aprobado
> **Depends on:** Ninguna
> **Date:** 2026-11-22
> **Objective:** Agregar un switch en el Header, basado en `createContext` y `useContext`, que alterne entre un tema claro lavanda con acentos morado oscuro (`#4c005a`) y un tema obscuro morado con acentos lila, persistiendo la elección en `localStorage`.

## Scope

**In:**

- `ThemeContext` con `createContext`, `ThemeProvider` y el hook `useTheme()`.
- Switch accesible con iconos sol/luna en el `Header`.
- Paleta clara: fondo gris perla casi neutro `#f4f3f5` (no blanco puro, sin tinte lavanda evidente), superficies `#ebe8ee`, texto `#1e293b` y acentos `#4c005a` con hover `#66007a`.
- Paleta obscura: fondo `#16101d`, superficies `#261a33`, texto `#f1e9f6`, acentos lila `#c084fc` (el `#4c005a` no es legible sobre fondo obscuro).
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

| Variable              | Claro (`light`)                  | Obscuro (`dark`)                 |
| --------------------- | -------------------------------- | -------------------------------- |
| `--bg`                | `#f4f3f5`                        | `#16101d`                        |
| `--surface`           | `#ebe8ee`                        | `#261a33`                        |
| `--text`              | `#1e293b`                        | `#f1e9f6`                        |
| `--text-muted`        | `#5f5866`                        | `#b7a6c4`                        |
| `--accent`            | `#4c005a`                        | `#c084fc`                        |
| `--accent-hover`      | `#66007a`                        | `#d8b4fe`                        |
| `--accent-text`       | `#ffffff`                        | `#1a1024`                        |
| `--border`            | `#d9d3de`                        | `#4c3a5c`                        |
| `--header-bg`         | `rgba(244,243,245,0.85)`         | `rgba(38,26,51,0.9)`             |
| `--menu-bg`           | `rgba(244,243,245,0.96)`         | `rgba(38,26,51,0.95)`            |
| `--shadow`            | `rgba(76,0,90,0.16)`             | `rgba(0,0,0,0.55)`               |
| `--shadow-menu`       | `rgba(76,0,90,0.12)`             | `rgba(0,0,0,0.45)`               |
| `--shadow-card`       | `rgba(76,0,90,0.18)` + blanco    | negro + `rgba(192,132,252,0.12)` |
| `--shadow-card-hover` | `rgba(76,0,90,0.14)` + blanco    | negro + `rgba(192,132,252,0.1)`  |

`--accent-text` sigue siendo blanco en claro porque es texto sobre `#4c005a`, no un fondo. Las variables `--accent-hover`, `--menu-bg` y `--shadow*` se agregaron durante la implementación para migrar los hover, el menú móvil y las sombras sin dejar colores literales en los componentes.

Convención: ningún componente escribe colores directamente; todos consumen estas variables.

## Implementation plan

1. Crear `src/context/ThemeContext.jsx` con `createContext(null)`, `ThemeProvider` y `useTheme()`. El provider lee `localStorage` dentro de `try/catch`, usa `matchMedia('(prefers-color-scheme: dark)')` como fallback, aplica `document.documentElement.dataset.theme` en un `useEffect` y expone `toggleTheme`. Sin consumidores aún; la app sigue funcionando.
2. Definir las variables de la tabla anterior en `src/index.css` con `:root` y `[data-theme='dark']`. Sustituir el gradiente fijo de `src/App.css` por `var(--bg)`. La app adopta la paleta morada en ambos temas.
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
- [ ] En claro el fondo es `#f4f3f5` (gris perla, nunca blanco puro ni lavanda), las superficies `#ebe8ee` y los acentos `#4c005a` con hover `#66007a`; no aparece `#dca500` ni `#4f46e5`.
- [ ] En obscuro el fondo es `#16101d`, las superficies `#261a33`, el texto `#f1e9f6` y los acentos `#c084fc`.
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
- **Sí:** paleta morada en ambos temas. Decisión del usuario: `#4c005a` como acento claro sobre fondo gris perla `#f4f3f5` (no blanco puro; se descartó `#f5f0f7` por resultar demasiado morado) y lila `#c084fc` en obscuro, donde `#4c005a` tendría un contraste de ~1.5:1.
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
