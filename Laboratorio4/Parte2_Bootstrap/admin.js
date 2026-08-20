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

const elementoModalErrores = document.querySelector('#modalErrores');
const modalErroresTitulo = document.querySelector('#modalErroresTitulo');
const modalErroresCuerpo = document.querySelector('#modalErroresCuerpo');
const modalErrores = new bootstrap.Modal(elementoModalErrores);

const elementoModalConfirmar = document.querySelector('#modalConfirmar');
const modalConfirmar = new bootstrap.Modal(elementoModalConfirmar);
const btnConfirmarEliminar = document.querySelector('#btnConfirmarEliminar');

function animarAperturaModal(elementoModal) {
  elementoModal.addEventListener('show.bs.modal', () => {
    if (window.Motion) {
      const dialogo = elementoModal.querySelector('.modal-dialog');
      Motion.animate(dialogo, { opacity: [0, 1], scale: [0.92, 1] }, { duration: 0.25 });
    }
  });
}

animarAperturaModal(elementoModalErrores);
animarAperturaModal(elementoModalConfirmar);

const camposValidables = [inputTitulo, selectGenero, inputDuracion, inputFecha];

let idEnEdicion = null;

let idPendienteEliminar = null;

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

btnCancelar.addEventListener('click', limpiarFormulario);

btnGuardar.addEventListener('click', () => {
  const datos = leerFormulario();
  const errores = validar(datos);

  if (errores.length > 0) {
    const listaErrores = errores.map(error => `<li>${error}</li>`).join('');
    modalErroresTitulo.textContent = 'Corrige lo siguiente';
    modalErroresCuerpo.innerHTML = `<ul class="mb-0">${listaErrores}</ul>`;
    modalErrores.show();
    return;
  }

  if (idEnEdicion === null) {
    agregarRegistro(datos);
  } else {
    actualizarRegistro(idEnEdicion, datos);
  }

  limpiarFormulario();
  aplicarFiltros();
});

function renderizarTabla(lista) {
  cuerpoTabla.innerHTML = '';

  if (lista.length === 0) {
    cuerpoTabla.innerHTML = `
      <tr>
        <td colspan="6" class="text-center texto-tenue py-4">Sin resultados para los filtros aplicados.</td>
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
        <button type="button" class="btn btn-sm btn-primario me-1 btn-editar" data-id="${registro._id}">Editar</button>
        <button type="button" class="btn btn-sm btn-outline-danger btn-eliminar" data-id="${registro._id}">Eliminar</button>
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
    idPendienteEliminar = id;
    modalConfirmar.show();
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

btnConfirmarEliminar.addEventListener('click', () => {
  if (!idPendienteEliminar) {
    return;
  }

  eliminarRegistro(idPendienteEliminar);

  if (idEnEdicion === idPendienteEliminar) {
    limpiarFormulario();
  }

  idPendienteEliminar = null;
  modalConfirmar.hide();
  aplicarFiltros();
});

aplicarFiltros();
