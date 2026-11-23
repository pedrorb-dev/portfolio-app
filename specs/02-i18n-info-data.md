# SPEC 02 — Idiomas español e inglés en los bloques `info-data`

> **Status:** Implementado
> **Depends on:** SPEC 01
> **Date:** 2026-11-22
> **Objective:** Alternar entre español e inglés los textos de los bloques `.info-data` de Hero y About, leyéndolos desde `src/utils/content.json` y persistiendo la elección en `localStorage`.

## Why this spec exists

Los textos de `Hero.jsx` y `About.jsx` están escritos como literales dentro de JSX. Este cambio centraliza únicamente esos textos en un JSON con dos bloques de idioma, sin tocar el resto del portfolio.

## Scope

**In:**

- `src/utils/content.json` con dos bloques de primer nivel: `es` y `en`, cada uno con `hero` y `about`.
- `src/context/LanguageContext.jsx` con `createContext`, `LanguageProvider` y el hook `useLanguage()`, siguiendo el patrón de `ThemeContext`.
- Persistencia en `localStorage` bajo la clave `language`, con valores `es` o `en` y valor inicial `es`.
- `document.documentElement.lang` actualizado por el provider; `index.html` arranca con `<html lang="es">`.
- Fallback por campo al texto en `es` cuando falta una clave en `en`.
- `src/components/LanguageSwitch.jsx`: botón que alterna `ES`/`EN` en el Header, junto a `ThemeSwitch`.
- Estilos `.language-switch` en `src/components/styles/Header.css` con las variables CSS de SPEC 01.
- Sustitución de los 7 textos de `.info-data`: subtitle, título y párrafo de `Hero.jsx`; título y tres párrafos de `About.jsx`.

**Out of scope (for future specs):**

- Traducir la navegación, `Contáctame`, los títulos de `Proyectos` y `Habilidades`, el Footer, los `aria-label` existentes ni los nombres de redes sociales.
- Traducir los textos de `src/utils/projects.json` (descripciones, etiqueta `Código`) ni de `src/utils/skills.json`.
- Rutas `/es` y `/en`, parámetros `?lang=` ni detección automática con `navigator.language`.
- `i18next`, `react-i18next` u otra librería de internacionalización.
- Carga de `content.json` mediante `fetch` en tiempo de ejecución.
- Script inline anti-parpadeo para el idioma: el texto se renderiza al montar React y el idioma inicial es siempre `es`.
- Tercer idioma, animaciones de transición entre idiomas ni cambios en `ThemeSwitch`.

## Data model

```js
// src/context/LanguageContext.jsx
const STORAGE_KEY = 'language' // valores: 'es' | 'en'

// Valor expuesto por useLanguage():
{
  language: 'es' | 'en',
  toggleLanguage: () => void,
  text: content[language], // { hero: {...}, about: {...} }
}

// Merge de fallback aplicado por el provider:
text = {
  hero: { ...content.es.hero, ...(content[language]?.hero ?? {}) },
  about: { ...content.es.about, ...(content[language]?.about ?? {}) },
}
```

`about.paragraphs` es un array: si `en` lo define, reemplaza al completo al de `es`. No se fusiona índice por índice.

`src/utils/content.json` (texto en inglés propuesto en este spec, revisable en el Draft):

```json
{
  "es": {
    "hero": {
      "subtitle": "Disponible para proyectos",
      "title": "Hey, soy Pedro",
      "description": "Ingeniero en Sistemas Computacionales. Especializado en desarrollo backend con Java (Spring Boot) y Python. Diseñador de arquitecturas eficientes, APIs REST robustas y soluciones optimizadas con contenedores."
    },
    "about": {
      "title": "Sobre mí",
      "paragraphs": [
        "Soy Pedro Ramírez, estudiante del 7mo semestre de Ingeniería en Sistemas Computacionales. Con una sólida formación en lógica de programación y un enfoque autodidacta para adoptar nuevas tecnologías, busco mi primera experiencia profesional.",
        "Mi pasión es diseñar y desarrollar soluciones de software eficientes que impacten directamente en la optimización de procesos empresariales y resuelvan problemas complejos.",
        "Me motiva el aprendizaje continuo y el reto de transformar necesidades de negocio en código funcional y escalable. Mi objetivo es crecer profesionalmente mientras aporto valor real a través de la tecnología."
      ]
    }
  },
  "en": {
    "hero": {
      "subtitle": "Available for projects",
      "title": "Hey, I'm Pedro",
      "description": "Computational Systems Engineer. Specialized in backend development with Java (Spring Boot) and Python. Designer of efficient architectures, robust REST APIs and optimized solutions with containers."
    },
    "about": {
      "title": "About me",
      "paragraphs": [
        "I'm Pedro Ramírez, a 7th-semester Computational Systems Engineering student. With a solid background in programming logic and a self-taught approach to adopting new technologies, I'm looking for my first professional experience.",
        "My passion is designing and developing efficient software solutions that directly impact business process optimization and solve complex problems.",
        "I'm motivated by continuous learning and the challenge of turning business needs into functional, scalable code. My goal is to grow professionally while delivering real value through technology."
      ]
    }
  }
}
```

Convención: ningún componente consulta `content.json` directamente. Todos leen `text` desde `useLanguage()`.

## Implementation plan

1. Crear `src/utils/content.json` con los bloques `es` y `en` anteriores. Sin consumidores aún; la app sigue mostrando los textos literales.
2. Crear `src/context/LanguageContext.jsx` con `createContext(null)`, `LanguageProvider` y `useLanguage()`. El provider lee `language` de `localStorage` dentro de `try/catch`, acepta solo `es`/`en` y usa `es` como valor inicial; calcula `text` con el merge de fallback y escribe `document.documentElement.lang` en un `useEffect`.
3. Envolver `<App />` con `LanguageProvider` dentro de `ThemeProvider` en `src/main.jsx`. El atributo `lang` ya se aplica, aunque todavía no haya control visible.
4. Cambiar `<html lang="en">` por `<html lang="es">` en `index.html` para que el documento arranque coherente con el idioma inicial.
5. Crear `src/components/LanguageSwitch.jsx`: botón `type="button"` que muestra `EN` cuando el idioma es `es` y `ES` cuando es `en`, llama a `toggleLanguage()` y usa `aria-label="Cambiar idioma a inglés"` o `aria-label="Cambiar idioma a español"` según el destino.
6. Agregar `.language-switch` en `src/components/styles/Header.css` usando `--text`, `--border`, `--accent` y `--surface`, con estado activo para el idioma mostrado. Verificar contraste en claro y obscuro.
7. Integrar `<LanguageSwitch />` en `src/components/Header.jsx`, junto a `<ThemeSwitch />`. El botón ya cambia `language`, `localStorage` y `<html lang>`, pero los textos de Hero y About todavía no cambian.
8. Sustituir en `Hero.jsx` el subtitle, el `h1` y el `p` dentro de `.info-data` por `text.hero.subtitle`, `text.hero.title` y `text.hero.description`.
9. Sustituir en `About.jsx` el `h1` y los tres `p` por `text.about.title` y `text.about.paragraphs.map(...)`, eliminando todos los literales. Comprobar con búsqueda que no queden los textos originales en estos dos archivos.

## Acceptance criteria

- [ ] `npm run dev`, `npm run build` y `npm run lint` terminan sin errores nuevos.
- [ ] Existe `src/utils/content.json` con `es` y `en`, y cada bloque tiene `hero.subtitle`, `hero.title`, `hero.description`, `about.title` y `about.paragraphs` con 3 elementos.
- [ ] Sin valor guardado, los textos de `.info-data` aparecen en español y `document.documentElement.lang` es `es`.
- [ ] Al pulsar el botón del Header, los 7 textos de `.info-data` cambian a los valores de `en` (p. ej. `Hey, I'm Pedro` y `About me`).
- [ ] Los textos fuera de `.info-data` no cambian: `Inicio`, `Proyectos`, `Habilidades`, `Sobre mí` de la nav, `Contáctame`, `Proyectos`, `Habilidades`, el footer y el `aria-label` de `ThemeSwitch`.
- [ ] `localStorage.language` es exactamente `es` o `en` después de cada clic.
- [ ] Con `language = 'en'` guardado, al recargar los textos de `.info-data` siguen en inglés y `<html lang="en">`.
- [ ] Al quitar temporalmente `hero.subtitle` de `en`, se muestra `Disponible para proyectos` y no un hueco.
- [ ] El botón ES/EN se alcanza con Tab y su `aria-label` nombra el idioma de destino.
- [ ] El botón ES/EN conserva contraste suficiente en los temas claro y obscuro de SPEC 01.
- [ ] No quedan literales `Disponible para proyectos`, `Hey, soy Pedro`, `Sobre mí` ni los párrafos originales en `Hero.jsx` ni `About.jsx`.

## Decisions

- **Sí:** un único `src/utils/content.json` importado estáticamente, con bloques `es` y `en`. Decisión del usuario; coherente con `projects.json` y `skills.json`.
- **Sí:** claves agrupadas por sección (`hero`, `about`) y `about.paragraphs` como array. Decisión del usuario.
- **Sí:** `LanguageContext` + `useLanguage()` que expone `language`, `toggleLanguage` y `text` ya resuelto. Decisión del usuario; evita pasar props por tres componentes.
- **Sí:** texto en inglés propuesto dentro del spec. Decisión del usuario; se revisa al leer el Draft y se ajusta directamente en `content.json`.
- **Sí:** `localStorage` con clave `language`, valores `es`/`en` e inicio fijo en `es`. Decisión del usuario; sin detección por navegador.
- **Sí:** `<html lang>` dinámico y `lang="es"` en `index.html`. Decisión del usuario; correcto para lectores de pantalla.
- **Sí:** fallback por campo al español. Decisión del usuario; evita textos vacíos.
- **Sí:** botón ES/EN en el Header junto al ThemeSwitch. Decisión del usuario; un solo punto de control.
- **No:** traducir nada fuera de los bloques `.info-data`. Decisión explícita del usuario y límite de este spec.
- **No:** rutas, query params, detección automática ni librerías de i18n. Innecesarias para dos idiomas en una sola página.
- **No:** `fetch` de `content.json`. Añadiría estados de carga para siete textos.
- **No:** script inline anti-parpadeo. El idioma inicial es `es` y React renderiza el texto en el mount.

## Risks

| Riesgo                                                         | Mitigación                                                                                                    |
| -------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------- |
| El texto en inglés ocupa más líneas y rompe el layout en móvil | Revisar Hero y About a 375 px tras el paso 9; los CSS actuales permiten envuelto de líneas.                   |
| Un campo nuevo en `en` sin su equivalente en `es`              | El merge por campo parte siempre de `content.es`; los criterios incluyen la prueba de quitar `hero.subtitle`. |
| `<html lang>` desincronizado durante el primer render          | `index.html` arranca en `es` y el `useEffect` del provider corrige a `en` si hay valor guardado.              |
| Quedaría un literal español en Hero o About                    | El paso 9 y los criterios de aceptación buscan los siete textos originales en ambos archivos.                 |

## What is **not** in this spec

- Traducción de la navegación, botones de contacto/redes, títulos de Proyectos y Habilidades ni del Footer.
- Traducción de `projects.json` ni de `skills.json`.
- Aria-labels existentes ni el aria-label de `ThemeSwitch`.
- Rutas por idioma, parámetros de URL ni detección automática del navegador.
- Librerías de internacionalización ni carga asíncrona del JSON.
- Tercer idioma, animaciones ni cambios en el switch de tema.

Cada uno de esos puntos, si se implementa, va en su propia spec.
