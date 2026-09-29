# Contexto del proyecto

- Este proyecto se trabaja para Telecrom Solutions, cuyo propietario es Alejandro Taborda.
- El alcance principal es corregir páginas existentes y crear páginas o prototipos para el portafolio de Telecrom Solutions.
- Mantén el contenido, la identidad visual y las decisiones de producto coherentes con Telecrom Solutions. No inventes datos de contacto, servicios, precios ni afirmaciones comerciales.

# Guía de trabajo

- Antes de cambiar una página, revisa sus recursos relacionados y conserva los patrones que ya utiliza el sitio.
- Prioriza la estructura existente de HTML, CSS, JavaScript y PHP. Reutiliza los recursos locales y Bootstrap ya incluidos cuando encajen; no añadas dependencias sin necesidad.
- Respeta la marca y el contenido de la página que estés modificando. Algunas páginas existentes muestran Gamembers; no las conviertas a Telecrom ni cambies su identidad salvo que la tarea lo pida expresamente.
- Mantén cada cambio enfocado en lo solicitado y evita alterar páginas o comportamientos ajenos a la tarea.
- Comprueba los cambios con la validación más cercana disponible y comunica con claridad cualquier limitación de verificación.

# Estructura y comprobaciones

- Las páginas principales son `index.html`, `product.html`, `contact.html`, `login.html`, `registro.html` y `ruleta.html`. Revisa los CSS y scripts vinculados a la página antes de editarla; hay estilos compartidos y otros específicos para login/registro y la ruleta.
- No se encontró configuración de build ni suite de pruebas. Para cambios de interfaz, valida la página afectada en navegador; para `contact.php`, ten en cuenta que la prueba real requiere PHP y una configuración funcional de `mail()`.
- Antes de cambiar formularios, compara los nombres de campos y el método HTTP entre el HTML/JavaScript y el PHP receptor. En el estado actual no coinciden, y el registro envía datos sensibles mediante GET; no des por funcional ese flujo sin verificarlo.
- Comprueba que los recursos referenciados existan. Se han observado referencias a `js/index.js` y `images/ruleta.png` que no coinciden con archivos presentes en el proyecto.
- Usa recursos de internet solo cuando sean necesarios y con los permisos adecuados. No expongas datos del usuario o del proyecto ni incorpores dependencias o recursos externos sin una necesidad concreta.