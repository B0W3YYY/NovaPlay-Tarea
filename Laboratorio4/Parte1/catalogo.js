const inputBuscarTitulo = document.querySelector('#buscarTitulo');
const selectFiltroGenero = document.querySelector('#filtroGenero');
const contadorResultados = document.querySelector('#contadorResultados');
const grillaTarjetas = document.querySelector('#grillaTarjetas');

function rutaPoster(registro) {
  if (!registro.poster) {
    return `https://picsum.photos/seed/${registro._id}/400/600`;
  }
  if (registro.poster.startsWith('data:') || registro.poster.startsWith('http')) {
    return registro.poster;
  }
  return `../../imgs/posters/${registro.poster}`;
}

function insigniaTipo(registro) {
  const esSerie = registro.tipo === 'Serie';
  return `<span class="badge-tipo ${esSerie ? 'badge-tipo--serie' : 'badge-tipo--pelicula'}">${esSerie ? 'Serie' : 'Película'}</span>`;
}

function renderizarTarjetas(lista) {
  grillaTarjetas.innerHTML = '';

  if (lista.length === 0) {
    grillaTarjetas.innerHTML = '<p class="tarjeta-vacio">Sin resultados para los filtros aplicados.</p>';
    contadorResultados.textContent = 'Mostrando 0 resultados';
    return;
  }

  lista.forEach(registro => {

    const tarjeta = document.createElement('a');
    tarjeta.href = `detalle.html?id=${registro._id}`;
    tarjeta.className = 'tarjeta';

    tarjeta.innerHTML = `
      <img src="${rutaPoster(registro)}" alt="Póster de ${registro.titulo}">
      <div class="tarjeta-info">
        <h3>${registro.titulo} ${insigniaTipo(registro)}</h3>
        <p>${registro.genero}${registro.duracion ? ' · ' + registro.duracion + ' min' : ''}</p>
      </div>
    `;

    grillaTarjetas.appendChild(tarjeta);
  });

  contadorResultados.textContent = `Mostrando ${lista.length} resultado${lista.length === 1 ? '' : 's'}`;

  if (window.Motion) {
    Motion.animate('.tarjeta', { opacity: [0, 1], y: [16, 0] }, { duration: 0.35, delay: Motion.stagger(0.05) });
  }
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

  renderizarTarjetas(filtrado);
}

inputBuscarTitulo.addEventListener('input', aplicarFiltros);
selectFiltroGenero.addEventListener('change', aplicarFiltros);

aplicarFiltros();
