# SPEC 03 — Formulario de contacto con envío real mediante Formspree

> **Status:** Aprobado
> **Depends on:** SPEC 01, SPEC 02
> **Date:** 2026-11-27
> **Objective:** Reemplazar el enlace `mailto:` del Hero por un formulario bilingüe que envíe mensajes reales al Gmail de Pedro mediante Formspree, sin backend y compatible con el despliegue estático en Vercel.

## Why this spec exists

La única vía de contacto actual es un `mailto:` en `src/components/Hero.jsx` que abre el cliente de correo del visitante. El portfolio es una SPA estática sin servidor, así que el envío real debe apoyarse en un servicio externo. SPEC 02 dejó fuera la navegación y el botón de contacto; este spec los reintegra con los textos ya existentes en `content.json`.

## Scope

**In:**

- `src/components/Contact.jsx` con tres campos requeridos: nombre, correo electrónico y mensaje.
- Campo honeypot `_gotcha` oculto y campo `_replyto` con el correo del remitente.
- Envío con `fetch` POST a `VITE_FORMSPREE_ENDPOINT`, usando `FormData`, sin salir de la SPA ni recargar.
- Estados `idle`, `sending`, `success` y `error` con feedback accesible y botón deshabilitado durante el envío.
- Bloque `contact` nuevo en `src/utils/content.json` para `es` y `en`, con fallback al español.
- Línea de merge de `contact` en `src/context/LanguageContext.jsx`, siguiendo el patrón de `hero`, `about`, `nav`, `projects` y `skills`.
- Sección `id="Contact"` montada en `src/App.jsx` entre `<About />` y `<Footer />`.
- Enlace de navegación `href="#Contact"` usando `text.nav.contacto`, con `Contact` añadido al `IntersectionObserver` de `Header.jsx`.
- `href="#Contact"` en el botón del Hero, conservando `text.hero.contact` y `MdOutlineMail`.
- `.env.example` con el formato de la variable y `.env` añadido a `.gitignore`.
- `src/components/styles/Contact.css` con las variables CSS de SPEC 01, breakpoint móvil y foco visible.

**Out of scope (for future specs):**

- Configuración de Vercel, `vercel.json`, rewrites ni carga de variables en el panel de Vercel. Decisión del usuario: fuera de este spec.
- Backend propio, Vercel Functions, Resend, Brevo ni SMTP.
- reCAPTCHA, Turnstile u otro captcha.
- Adjuntos, campo «asunto» ni plantillas de correo personalizadas en Formspree.
- Página o ruta de «gracias»; el feedback se muestra en la misma sección.
- Persistencia de mensajes en `localStorage`, base de datos ni panel de administración propio.
- Auto-respuesta al remitente ni notificaciones adicionales.
- Traducir `projects.json`, `skills.json`, el Footer ni otros textos fuera de la sección de contacto.
- Cambios en `ThemeSwitch`, en otras secciones del portfolio ni en las dependencias de `package.json`.

## Data model

```js
// .env.example (plantilla versionada)
// .env.local (valor real, no versionado)
VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/<FORM_ID>

// src/components/Contact.jsx
const status = 'idle' | 'sending' | 'success' | 'error'

// Payload enviado como FormData:
{
  name: string,
  email: string,
  message: string,
  _replyto: email, // Formspree usa este valor como Reply-To
  _gotcha: ''      // honeypot: siempre vacío, oculto al usuario
}

// src/utils/content.json: bloque nuevo por idioma
contact: {
  title, description,
  name, email, message,
  namePlaceholder, emailPlaceholder, messagePlaceholder,
  submit, sending, success, error,
  required, invalidEmail
}
```

Convenciones:

- Los textos se leen desde `text.contact.*` con `useLanguage()`. Ningún componente importa `content.json` directamente.
- `hero.contact` (`Contáctame` / `Contact me`) y `nav.contacto` (`Contacto` / `Contact`) ya existen en `content.json` y se reutilizan; no se crean claves nuevas para ellos.
- El identificador de sección es `Contact`, en PascalCase como `Hero`, `Projects`, `Skills` y `About`.
- `VITE_FORMSPREE_ENDPOINT` no es un secreto: se incluye en el bundle por el prefijo `VITE_`. No hay URL literal de Formspree en los archivos fuente.

## Implementation plan

1. Crear el formulario en Formspree, verificar `pedrulex.ramirez@gmail.com` y copiar el endpoint. Crear `.env.local` con `VITE_FORMSPREE_ENDPOINT` y `.env.example` con el marcador `<FORM_ID>`. Agregar `.env` a `.gitignore`. La app sigue funcionando sin cambios visibles.
2. Agregar el bloque `contact` a `src/utils/content.json` en `es` y `en`, y la línea `contact: { ...content.es.contact, ...(content[language]?.contact ?? {}) }` en el `useMemo` de `src/context/LanguageContext.jsx`. Los textos quedan disponibles, sin consumidores aún.
3. Crear `src/components/Contact.jsx` con la estructura del formulario: `<section id="Contact">`, título, descripción, tres `<label>` con sus controles, el input honeypot y el botón de envío. Inicializar `status` en `idle`. Sin lógica de red ni importación en `App.jsx`.
4. Implementar el handler de envío en `Contact.jsx`: `preventDefault()`, construcción de `FormData` con `_replyto` y `_gotcha`, `fetch` al endpoint con `{ method: 'POST', body, headers: { Accept: 'application/json' } }`, y transición `idle → sending → success | error`. Si la variable de entorno está vacía, mostrar `error` sin llamar a `fetch`.
5. Agregar el bloque de feedback con `aria-live="polite"`: texto de `sending` con el botón deshabilitado, texto de `success` con los campos limpios, y texto de `error` con el botón habilitado para reintentar. Los mensajes `required` e `invalidEmail` se usan en la validación nativa de los campos.
6. Crear `src/components/styles/Contact.css` con `--bg`, `--surface`, `--text`, `--text-muted`, `--accent`, `--accent-hover`, `--accent-text`, `--border` y `--shadow`. Incluir `:focus-visible`, estados deshabilitado y un breakpoint para 375 px.
7. Importar `<Contact />` en `src/App.jsx` y montarlo entre `<About />` y `<Footer />`. La sección ya es visible y cambia de idioma con el switch del Header.
8. En `src/components/Header.jsx`, agregar `'Contact'` al array `sectionIds` del `IntersectionObserver` y un `<a href="#Contact">` con `text.nav.contacto`, reutilizando las clases `menu-item` y `activeSection`. El resaltado activo funciona al hacer scroll.
9. En `src/components/Hero.jsx`, cambiar `href="mailto:pedrulex.ramirez@gmail.com"` por `href="#Contact"`, conservando `text.hero.contact`, `MdOutlineMail`, `btn btn-outline` y las props de `motion`. El recorrido completo de contacto queda funcional.

## Acceptance criteria

- [ ] `npm run dev`, `npm run build` y `npm run lint` terminan sin errores nuevos.
- [ ] Existe `.env.example` con `VITE_FORMSPREE_ENDPOINT=https://formspree.io/f/<FORM_ID>` y `.env` figura en `.gitignore`; `.env.local` no se versiona.
- [ ] Existe `src/components/Contact.jsx` con los campos `name`, `email` y `message`, todos marcados como requeridos, y `email` con `type="email"`.
- [ ] El honeypot `_gotcha` está oculto con `aria-hidden="true"` y `tabIndex={-1}`, y su valor siempre es cadena vacía.
- [ ] El payload incluye `_replyto` con el valor exacto del campo `email`.
- [ ] Al enviar con el endpoint real, llega un correo a `pedrulex.ramirez@gmail.com` con nombre, correo y mensaje, y el Reply-To corresponde al correo del remitente.
- [ ] Durante la petición el botón está deshabilitado y muestra `text.contact.sending`.
- [ ] Tras una respuesta correcta se muestra `text.contact.success` con `aria-live="polite"` y los tres campos quedan vacíos.
- [ ] Tras una respuesta fallida se muestra `text.contact.error`, los campos conservan su contenido y el botón permite reintentar.
- [ ] Sin `VITE_FORMSPREE_ENDPOINT`, el envío muestra `text.contact.error` y no se realiza ninguna petición `fetch`.
- [ ] Al pulsar el switch ES/EN del Header, los textos de la sección `#Contact` cambian de idioma sin recargar; la navegación muestra `Contacto` / `Contact` y el Hero `Contáctame` / `Contact me`.
- [ ] No queda ningún `mailto:` en `src/components/Hero.jsx`; el botón del Hero y el enlace de la nav apuntan a `#Contact`.
- [ ] Al hacer scroll hasta la sección, el enlace `Contact` se marca como activo en la navegación.
- [ ] El formulario conserva contraste y no desborda a 375 px en los temas claro y obscuro de SPEC 01, y todos los controles alcanzables con Tab muestran foco visible.

## Decisions

- **Sí:** Formspree como proveedor de envío. Decisión del usuario: funciona en una SPA estática y en Vercel sin servidor propio.
- **Sí:** endpoint en `VITE_FORMSPREE_ENDPOINT`. Decisión del usuario: un único punto de configuración, sin URL literal en el código. El valor se expone al navegador por diseño y no es un secreto.
- **Sí:** `fetch` con `FormData` en lugar de `<form action>` con redirección. Evita sacar al visitante de la SPA y permite controlar los estados.
- **Sí:** honeypot `_gotcha` y `_replyto`. Decisión del usuario: protección anti-bots mínima y posibilidad de responder directamente al remitente.
- **No:** captcha. Decisión del usuario: añade configuración externa sin beneficio claro para un portafolio de bajo volumen.
- **Sí:** reutilizar `hero.contact` y `nav.contacto`, que ya están traducidos en `content.json` aunque SPEC 02 los excluyera de su alcance.
- **Sí:** `id="Contact"` en PascalCase. Coherente con los IDs existentes y con el `IntersectionObserver` del Header.
- **No:** despliegue en Vercel dentro de este spec. Decisión del usuario; Vite ya es detectado por la plataforma.
- **No:** backend, funciones serverless ni SMTP propio. Formspree cubre el caso actual; la migración futura no cambiaría `Contact.jsx`.
- **No:** asunto, adjuntos, página de gracias ni persistencia de mensajes. Fuera del alcance acordado.

## Risks

| Riesgo                                                              | Mitigación                                                                                                                |
| ------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| El plan gratis de Formspree limita los envíos mensuales             | Honeypot y filtro de spam del proveedor; si se agota, migrar a una función serverless con Resend sin tocar el componente. |
| Falta la variable de entorno en local o en el entorno de despliegue | `.env.example` documenta el formato y el handler muestra el mensaje de error sin llamar a `fetch`.                        |
| El correo llega a la carpeta de spam                                | El criterio de aceptación pide revisar Gmail y spam después del envío real.                                               |
| Bots automatizados que abusan del endpoint                          | `_gotcha` oculto con `aria-hidden` y `tabIndex={-1}`, más el filtro de Formspree.                                         |

## What is **not** in this spec

- Configuración de Vercel, `vercel.json` ni variables en el panel de la plataforma.
- Backend propio, Vercel Functions, Resend, Brevo ni SMTP.
- Captcha, adjuntos, asunto ni auto-respuesta.
- Página de gracias ni persistencia de mensajes.
- Traducción de proyectos, skills, Footer ni otros textos fuera de la sección de contacto.
- Cambios en el switch de tema, en otras secciones ni en dependencias.

Cada uno de esos puntos, si se implementa, va en su propia spec.
