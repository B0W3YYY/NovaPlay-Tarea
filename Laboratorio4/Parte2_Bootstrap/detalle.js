const contenidoDetalle = document.querySelector('#contenidoDetalle');

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

const idBuscado = new URLSearchParams(window.location.search).get('id');
const catalogo = obtenerCatalogo();
const registro = catalogo.find(item => item._id === idBuscado);

if (!registro) {

  contenidoDetalle.innerHTML = `
    <h1>Título no encontrado</h1>
    <p class="texto-tenue">No existe ningún título en el catálogo con ese identificador.</p>
    <a href="catalogo.html" class="enlace-volver">&larr; Volver al catálogo</a>
  `;
} else {
  contenidoDetalle.innerHTML = `
    <div class="row g-4">
      <div class="col-md-4">
        <img src="${rutaPoster(registro)}" class="img-fluid rounded-3 detalle-poster" alt="Póster de ${registro.titulo}">
      </div>
      <div class="col-md-8">
        <h1 class="h2">${registro.titulo} ${insigniaTipo(registro)}</h1>
        <p class="texto-tenue mb-2"><strong class="text-white">Género:</strong> ${registro.genero}</p>
        ${registro.duracion ? `<p class="texto-tenue mb-2"><strong class="text-white">Duración:</strong> ${registro.duracion} minutos</p>` : ''}
        <p class="texto-tenue mb-2"><strong class="text-white">Fecha de estreno:</strong> ${registro.fecha}</p>
        <p class="texto-tenue mb-3"><strong class="text-white">Disponible:</strong> ${registro.disponible ? 'Sí' : 'No'}</p>
        <a href="catalogo.html" class="enlace-volver">&larr; Volver al catálogo</a>
      </div>
    </div>
  `;
}
