const inputTitulo = document.querySelector('#titulo');
const selectGenero = document.querySelector('#genero');
const inputDuracion = document.querySelector('#duracion');
const inputFecha = document.querySelector('#fecha');
const inputDisponible = document.querySelector('#disponible');
const btnGuardar = document.querySelector('#btnGuardar');

const modal = document.querySelector('#modal');
const modalCuerpo = document.querySelector('#modalCuerpo');
const btnCerrarModal = document.querySelector('#btnCerrarModal');

const camposValidables = [inputTitulo, selectGenero, inputDuracion, inputFecha];

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

  if (!datos.duracion || datos.duracion <= 0) {
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

btnGuardar.addEventListener('click', () => {
  const datos = leerFormulario();
  const errores = validar(datos);

  if (errores.length > 0) {
    const listaErrores = errores.map(error => `<li>${error}</li>`).join('');
    mostrarModal(`<h3>Corrige lo siguiente:</h3><ul>${listaErrores}</ul>`);
    return;
  }

  mostrarModal(`
    <h3>Registro capturado</h3>
    <p><strong>Título:</strong> ${datos.titulo}</p>
    <p><strong>Género:</strong> ${datos.genero}</p>
    <p><strong>Duración:</strong> ${datos.duracion} min</p>
    <p><strong>Fecha:</strong> ${datos.fecha}</p>
    <p><strong>Disponible:</strong> ${datos.disponible ? 'Sí' : 'No'}</p>
  `);
});
