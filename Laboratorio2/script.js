const inputTitulo = document.querySelector('#titulo');
const selectGenero = document.querySelector('#genero');
const inputDuracion = document.querySelector('#duracion');
const inputFecha = document.querySelector('#fecha');
const inputDisponible = document.querySelector('#disponible');
const btnGuardar = document.querySelector('#btnGuardar');
const btnCancelar = document.querySelector('#btnCancelar');
const tituloFormulario = document.querySelector('#tituloFormulario');

const cuerpoTabla = document.querySelector('#cuerpoTabla');
const inputBuscarTitulo = document.querySelector('#buscarTitulo');
const selectFiltroGenero = document.querySelector('#filtroGenero');
const contadorResultados = document.querySelector('#contadorResultados');

const modal = document.querySelector('#modal');
const modalCuerpo = document.querySelector('#modalCuerpo');
const btnCerrarModal = document.querySelector('#btnCerrarModal');

const camposValidables = [inputTitulo, selectGenero, inputDuracion, inputFecha];

let idEnEdicion = null;

function leerFormulario() {
  return {
    titulo: inputTitulo.value.trim(),
    genero: selectGenero.value,
    duracion: Number(inputDuracion.value),
    fecha: inputFecha.value,
    disponible: inputDisponible.checked
  };
}

function validar(datos) {
  const errores = [];

  limpiarErrores();

  if (!datos.titulo || datos.titulo.length < 3) {
    errores.push('El título debe tener al menos 3 caracteres.');
    marcarError(inputTitulo);
  }

  if (!datos.genero) {
    errores.push('Debes seleccionar un género.');
    marcarError(selectGenero);
  }

  const registroEnEdicion = idEnEdicion ? obtenerCatalogo().find(r => r._id === idEnEdicion) : null;
  const esSerie = registroEnEdicion && registroEnEdicion.tipo === 'Serie';

  if (!esSerie && (!datos.duracion || datos.duracion <= 0)) {
    errores.push('La duración debe ser un número mayor que 0.');
    marcarError(inputDuracion);
  }

  if (!datos.fecha) {
    errores.push('Debes indicar una fecha de estreno.');
    marcarError(inputFecha);
  }

  return errores;
}

function marcarError(campo) {
  campo.classList.add('campo-error');
}

function limpiarErrores() {
  camposValidables.forEach(campo => campo.classList.remove('campo-error'));
}

camposValidables.forEach(campo => {
  campo.addEventListener('input', () => campo.classList.remove('campo-error'));
  campo.addEventListener('change', () => campo.classList.remove('campo-error'));
});

function limpiarFormulario() {
  inputTitulo.value = '';
  selectGenero.value = '';
  inputDuracion.value = '';
  inputFecha.value = '';
  inputDisponible.checked = false;
  limpiarErrores();
  idEnEdicion = null;
  tituloFormulario.textContent = 'Nuevo título';
}

function mostrarModal(html) {
  modalCuerpo.innerHTML = html;
  modal.classList.remove('oculto');

  if (window.Motion) {
    Motion.animate('.modal-contenido', { opacity: [0, 1], scale: [0.92, 1] }, { duration: 0.25 });
  }
}

function cerrarModal() {
  if (window.Motion) {
    Motion.animate('.modal-contenido', { opacity: [1, 0], scale: [1, 0.92] }, { duration: 0.18 })
      .finished.then(() => modal.classList.add('oculto'));
  } else {
    modal.classList.add('oculto');
  }
}

btnCerrarModal.addEventListener('click', cerrarModal);
modal.addEventListener('click', (evento) => {
  if (evento.target === modal) {
    cerrarModal();
  }
});

btnCancelar.addEventListener('click', limpiarFormulario);

btnGuardar.addEventListener('click', () => {
  const datos = leerFormulario();
  const errores = validar(datos);

  if (errores.length > 0) {
    const listaErrores = errores.map(error => `<li>${error}</li>`).join('');
    mostrarModal(`<h3>Corrige lo siguiente:</h3><ul>${listaErrores}</ul>`);
    return;
  }

  let mensaje = '';

  if (idEnEdicion === null) {
    agregarRegistro(datos);
    mensaje = 'Registro agregado correctamente.';
  } else {
    actualizarRegistro(idEnEdicion, datos);
    mensaje = 'Registro actualizado correctamente.';
  }

  limpiarFormulario();
  aplicarFiltros();

  mostrarModal(`
    <h3>${mensaje}</h3>
    <p><strong>Título:</strong> ${datos.titulo}</p>
    <p><strong>Género:</strong> ${datos.genero}</p>
    <p><strong>Duración:</strong> ${datos.duracion} min</p>
    <p><strong>Fecha:</strong> ${datos.fecha}</p>
    <p><strong>Disponible:</strong> ${datos.disponible ? 'Sí' : 'No'}</p>
    <p>Recarga la página para comprobar que sigue guardado en localStorage.</p>
  `);
});

function renderizarTabla(lista) {
  cuerpoTabla.innerHTML = '';

  if (lista.length === 0) {
    cuerpoTabla.innerHTML = `
      <tr class="fila-vacia">
        <td colspan="6">Sin resultados para los filtros aplicados.</td>
      </tr>
    `;
    contadorResultados.textContent = 'Mostrando 0 resultados';
    return;
  }

  lista.forEach(registro => {
    const fila = document.createElement('tr');
    fila.setAttribute('data-id', registro._id);

    fila.innerHTML = `
      <td>${registro.titulo}</td>
      <td>${registro.genero}</td>
      <td>${registro.duracion ? registro.duracion + ' min' : '—'}</td>
      <td>${registro.fecha}</td>
      <td>${registro.disponible
        ? '<span class="badge-disponible">Sí</span>'
        : '<span class="badge-no-disponible">No</span>'}</td>
      <td>
        <button type="button" class="btn-tabla btn-editar" data-id="${registro._id}">Editar</button>
        <button type="button" class="btn-tabla btn-eliminar" data-id="${registro._id}">Eliminar</button>
      </td>
    `;

    cuerpoTabla.appendChild(fila);
  });

  contadorResultados.textContent = `Mostrando ${lista.length} resultado${lista.length === 1 ? '' : 's'}`;
}

function aplicarFiltros() {
  const catalogo = obtenerCatalogo();
  const texto = inputBuscarTitulo.value.trim().toLowerCase();
  const genero = selectFiltroGenero.value;

  const filtrado = catalogo.filter(registro => {
    const coincideTitulo = registro.titulo.toLowerCase().includes(texto);
    const coincideGenero = genero === '' || registro.genero === genero;
    return coincideTitulo && coincideGenero;
  });

  renderizarTabla(filtrado);
}

inputBuscarTitulo.addEventListener('input', aplicarFiltros);
selectFiltroGenero.addEventListener('change', aplicarFiltros);

cuerpoTabla.addEventListener('click', (evento) => {
  const boton = evento.target;
  const id = boton.getAttribute('data-id');

  if (!id) {
    return;
  }

  if (boton.classList.contains('btn-editar')) {
    entrarModoEdicion(id);
  }

  if (boton.classList.contains('btn-eliminar')) {
    eliminarConConfirmacion(id);
  }
});

function entrarModoEdicion(id) {
  const catalogo = obtenerCatalogo();
  const registro = catalogo.find(item => item._id === id);

  if (!registro) {
    return;
  }

  inputTitulo.value = registro.titulo;
  selectGenero.value = registro.genero;
  inputDuracion.value = registro.duracion || '';
  inputFecha.value = registro.fecha;
  inputDisponible.checked = registro.disponible;

  idEnEdicion = id;
  tituloFormulario.textContent = 'Editando título';
  inputTitulo.focus();
}

function eliminarConConfirmacion(id) {
  const confirmado = confirm('¿Seguro que deseas eliminar este título del catálogo?');

  if (!confirmado) {
    return;
  }

  eliminarRegistro(id);

  if (idEnEdicion === id) {
    limpiarFormulario();
  }

  aplicarFiltros();
}

aplicarFiltros();
