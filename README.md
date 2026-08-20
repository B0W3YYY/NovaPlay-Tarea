# 📺 NovaPlay - Panel de Administración de Catálogo

## ¿Qué es NovaPlay?

**NovaPlay** es un panel de administración web para gestionar un catálogo de películas y series. Permite a un equipo de administración **crear, editar, buscar y eliminar** títulos audiovisuales de forma intuitiva, sin necesidad de conectarse a un servidor externo.

Toda la información se guarda localmente en el navegador usando `localStorage`, por lo que los datos persisten entre sesiones.

---

## 🏗️ Estructura del Proyecto

```
Tarea Dos/
├── index.html                 # Página raíz con navegación centralizada
├── index.js                   # Lógica de navegación y animaciones
├── css/
│   └── styles.css             # Hoja de estilos ÚNICA de todo el sitio
├── imgs/                      # Logo, íconos y pósters del hero
│
├── Laboratorio1/               # Sección 1: Formulario de registro
│   └── formulario.html
│
├── Laboratorio2/               # Sección 2: Gestión de catálogo
│   └── gestion-catalogo.html
│
├── Laboratorio3/                # Sección 3: Tabla dinámica
│   └── tabla-catalogo.html
│
└── Laboratorio4/
    ├── Parte1/                 # Versión vanilla JS (2 páginas)
    │   ├── catalogo.html        # Catálogo + ficha de detalle (modal)
    │   ├── admin.html            # Crear, editar, eliminar
    │   ├── datos.js
    │   ├── catalogo.js
    │   └── admin.js
    │
    └── Parte2_Bootstrap/       # Versión con Bootstrap 5 (2 páginas)
        ├── catalogo.html         # Catálogo + ficha de detalle (modal)
        ├── admin.html             # Crear, editar, eliminar
        ├── datos.js
        ├── catalogo.js
        └── admin.js
```

> Todo el sitio (hub raíz, Laboratorio1/2/3 y las dos versiones de
> Laboratorio4) carga el mismo `css/styles.css` — no hay un CSS por
> página. La versión Bootstrap además carga Bootstrap 5 vía CDN antes que
> `styles.css`, que sobreescribe sus componentes con la paleta de NovaPlay.

---

## 📋 Las 4 Secciones Principales

### **Sección 1: Laboratorio 1 - Formulario de Registro**
**Archivo:** `Laboratorio1/formulario.html`

Página simple con un formulario para agregar nuevos títulos al catálogo. Los datos se guardan en localStorage.

**Campos:**
- Título
- Género (selector)
- Duración (en minutos)
- Fecha de estreno
- Disponible (checkbox)

**Validación:** El formulario valida que todos los campos estén completos.

---

### **Sección 2: Laboratorio 2 - Gestión de Catálogo**
**Archivo:** `Laboratorio2/gestion-catalogo.html`

Muestra todos los títulos guardados en una tabla con opciones para **editar** y **eliminar** registros.

**Funcionalidades:**
- Búsqueda por título
- Filtro por género en tiempo real
- Editar un registro existente
- Eliminar registros con confirmación

---

### **Sección 3: Laboratorio 3 - Tabla Dinámica**
**Archivo:** `Laboratorio3/tabla-catalogo.html`

Panel de control completo con todas las funciones en una sola página:

**Características:**
- Formulario para agregar títulos (columna izquierda)
- Tabla de registros (columna derecha)
- Búsqueda y filtro por género
- Editar/eliminar títulos
- Modal de validación para errores
- Modal de confirmación antes de eliminar

---

### **Sección 4: Laboratorio 4 - Aplicación Completa**

Dos páginas (no cuatro): **Catálogo** y **Administración**. Antes existía además
una "Inicio" y una "Detalle" por separado; se fusionaron para evitar
navegación redundante — la ficha de cada título ahora se abre en un **modal**
sin salir del catálogo, y la bienvenida vive arriba del catálogo mismo, no en
una página aparte.

#### **Versión Vanilla JS (Parte1)**
Implementación sin dependencias externas, solo vanilla JavaScript y CSS personalizado.

**Páginas:**
1. **catalogo.html** → Bienvenida + catálogo de solo lectura con búsqueda y filtro; cada tarjeta abre su ficha completa (género, duración, fecha, disponibilidad, póster) en un modal
2. **admin.html** → Panel de administración completo (crear, editar, eliminar)

**Tecnologías:**
- HTML5 semántico
- CSS3 con soft-UI design (sombras suaves, bordes finos, profundidad)
- Vanilla JavaScript
- Motion.dev para animaciones
- localStorage para persistencia de datos

---

#### **Versión Bootstrap 5 (Parte2_Bootstrap)**
Misma funcionalidad y misma reducción a 2 páginas que Parte1, pero usando
Bootstrap 5 para componentes y grid (la ficha de detalle usa el componente
`.modal` nativo de Bootstrap en vez de uno hecho a mano).

**Ventajas de esta versión:**
- Componentes Bootstrap listos para usar (modales, navbars, cards)
- Grid de Bootstrap (`row-cols-*`) para responsividad
- Theming más rápido
- Navbars y toggles nativos de Bootstrap

**Tecnologías:**
- Bootstrap 5.3.3 (CDN)
- `css/styles.css` compartido con el resto del sitio, reskineando los
  componentes de Bootstrap con la paleta de NovaPlay
- Motion.dev para animaciones
- localStorage

---

## 🎨 Diseño Visual

### **Soft-UI / Skeuomorphism Moderno**

El diseño utiliza principios de **skeuomorphism moderno** (no el estilo antiguo):

- **Sombras duales:** 
  - `--sombra-elevada`: Efecto de elevación sobre la página
  - `--sombra-suave`: Efecto sutil para botones
  - `--sombra-hundida`: Efecto de presión (inputs, clicked)
  
- **Bordes finos y translúcidos:**
  - `--borde-fino`: Separación visual delicada (1px)
  
- **Colores:**
  - Fondo oscuro/claro según preferencia
  - Texto con suficiente contraste
  - Acentos sutiles en botones primarios/secundarios

- **Redondeado:** Bordes redondeados (18-22px) en tarjetas y elementos principales

---

## ⚡ Funcionalidades Principales

### **1. Gestión de Datos**
- ✅ **Crear:** Formulario para agregar nuevos títulos
- ✅ **Leer:** Catálogo con búsqueda y filtro en tiempo real
- ✅ **Actualizar:** Editar títulos existentes
- ✅ **Eliminar:** Borrar registros con confirmación

### **2. Persistencia de Datos**
- Todos los datos se guardan en `localStorage`
- Los datos persisten entre sesiones (recargas de página, cierres de navegador)
- No requiere servidor backend

### **3. Animaciones (Motion.dev)**
- Fade-in/fade-out en transiciones de página
- Stagger animation en tarjetas del catálogo
- Animación de entrada en modales
- Split-text hero animation en página de inicio
- Hamburger → X transformation en móvil

### **4. Responsividad**
- Diseño mobile-first
- Hamburger menu en dispositivos pequeños (<768px)
- Navbar adaptable
- Grid flexible (Bootstrap o CSS Grid)

### **5. Búsqueda y Filtro**
- Búsqueda por título (en tiempo real)
- Filtro por género
- Contador de resultados
- Datos filtrados sin recargar página

---

## 📊 Modelo de Datos

Cada película/serie tiene la siguiente estructura:

```javascript
{
  _id: "unique-string-id",      // ID único (string)
  titulo: "Stranger Things",     // Título de la película/serie
  genero: "Drama",               // Género
  duracion: 60,                  // Duración en minutos (number)
  fecha: "2016-07-15",           // Fecha de estreno (ISO 8601)
  disponible: true,              // Si está disponible (boolean)
  poster: "Stranger-Things.webp" // Nombre de archivo en imgs/posters/, o "" si no tiene
}
```

**Géneros disponibles:** Acción, Comedia, Drama, Documental, Anime, Terror

### Datos de ejemplo (semilla)

Los formularios de captura (Lab1/2/3/4) no piden un póster — solo lo traen
los 4 títulos con los que arranca el catálogo (Stranger Things, The
Godfather, Spenser Confidencial, Naruto Shippuden), usando las imágenes
reales en `imgs/posters/`. `datos.js` los siembra automáticamente en
`localStorage` la primera vez que el catálogo está vacío (en cualquier
página del sitio, ya que todas comparten la misma llave), así el catálogo
nunca se ve vacío al abrirlo por primera vez. Los títulos creados a mano
desde el formulario quedan sin `poster`; en el catálogo de Laboratorio4
caen a una foto de relleno de picsum.photos en su lugar.

---

## 🔄 Flujo de Usuario

### **Agregar una película:**
1. Ir a **Administración** (Laboratorio 4)
2. Llenar formulario (título, género, duración, fecha)
3. Marcar disponible si aplica
4. Hacer clic en **Guardar**
5. Aparece en la tabla inmediatamente

### **Ver catálogo:**
1. Ir a **Catálogo**
2. Ver todas las películas/series
3. Opcionalmente: buscar por título o filtrar por género
4. Hacer clic en una película para ver detalles completos

### **Editar una película:**
1. Ir a **Administración**
2. Hacer clic en **Editar** en la tabla
3. Se llena el formulario con los datos actuales
4. Modificar y hacer clic en **Guardar**
5. Cambios se aplican inmediatamente

### **Eliminar una película:**
1. Ir a **Administración**
2. Hacer clic en **Eliminar** en la tabla
3. Confirmar la eliminación en modal
4. Película se elimina del catálogo

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Uso |
|-----------|-----|
| **HTML5** | Estructura semántica |
| **CSS3** | Estilos, animaciones, diseño responsivo |
| **JavaScript** | Lógica, manipulación del DOM, localStorage |
| **Bootstrap 5** | (Parte2) Componentes y grid |
| **Motion.dev** | Animaciones fluidas |
| **localStorage** | Persistencia de datos |

---

## 📱 Responsividad

### **Breakpoints:**
- **Móvil:** < 768px (Hamburger menu, stack único)
- **Tablet:** 768px - 1024px (2-3 columnas)
- **Desktop:** > 1024px (Layout completo, navegación visible)

### **Navbar en móvil:**
- Hamburger menu (3 líneas)
- Se transforma en **X** con animación al abrir
- Se pliega el menú
- Vuelve a hamburger al cerrar

---

## 🎯 Puntos Clave del Proyecto

✅ **Sin referencias académicas** — Lenguaje profesional, sin "Laboratorio X" o "Tarea 2"

✅ **Navegación centralizada** — Un único `index.html` raíz con 4 links a las secciones

✅ **Animaciones funcionales** — Motion.dev con fade-in/out, stagger, split-text

✅ **Diseño minimalista** — Soft-UI moderno, sombras suaves, bordes finos

✅ **localStorage completamente funcional** — CRUD operations que persisten

✅ **Hamburger animation en móvil** — Menú se transforma suavemente a X

✅ **Búsqueda y filtro en tiempo real** — Sin recargas

✅ **Modal de confirmación** — Antes de eliminar registros

---

## 🚀 Cómo Usar

1. Abre `index.html` en el navegador
2. Haz clic en cualquiera de los 4 links (Catálogo, Persistencia, Tabla dinámica, Bootstrap)
3. Navega entre secciones
4. Agrega películas/series en **Administración**
5. Visualiza el catálogo en **Catálogo**
6. Ver detalles haciendo clic en cualquier película
7. Cierra el navegador y reabre → los datos siguen ahí (localStorage)

---

## 📝 Notas

- **Sin backend:** Todo funciona localmente en el navegador
- **Datos no se sincronizan:** Cada navegador/dispositivo tiene su propia copia de localStorage
- **No hay autenticación:** Es un panel abierto (para uso interno)
- **Compatible:** Chrome, Firefox, Safari, Edge modernos

---

**Última actualización:** 2026-08-19  
**Versión:** Completa con soft-UI, animaciones, y responsividad móvil ✨
