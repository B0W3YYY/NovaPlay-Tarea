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
    grillaTarjetas.innerHTML = '<p class="texto-tenue text-center py-4">Sin resultados para los filtros aplicados.</p>';
    contadorResultados.textContent = 'Mostrando 0 resultados';
    return;
  }

  lista.forEach(registro => {
    const columna = document.createElement('div');
    columna.className = 'col';

    columna.innerHTML = `
      <div class="card tarjeta-catalogo h-100">
        <img src="${rutaPoster(registro)}" class="card-img-top" alt="Póster de ${registro.titulo}">
        <div class="card-body">
          <h3 class="card-title h6">${registro.titulo} ${insigniaTipo(registro)}</h3>
          <p class="card-text">${registro.genero}${registro.duracion ? ' · ' + registro.duracion + ' min' : ''}</p>
          <a href="detalle.html?id=${registro._id}" class="stretched-link"></a>
        </div>
      </div>
    `;

    grillaTarjetas.appendChild(columna);
  });

  contadorResultados.textContent = `Mostrando ${lista.length} resultado${lista.length === 1 ? '' : 's'}`;

  if (window.Motion) {
    Motion.animate('.tarjeta-catalogo', { opacity: [0, 1], y: [16, 0] }, { duration: 0.35, delay: Motion.stagger(0.04) });
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
