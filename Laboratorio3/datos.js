const LLAVE_CATALOGO = 'novaplay_catalogo';

function obtenerCatalogo() {
  const datosGuardados = localStorage.getItem(LLAVE_CATALOGO);
  if (!datosGuardados) {
    return [];
  }
  return JSON.parse(datosGuardados);
}

function guardarCatalogo(catalogo) {
  localStorage.setItem(LLAVE_CATALOGO, JSON.stringify(catalogo));
}

function generarId() {
  return Date.now().toString();
}

function agregarRegistro(datos) {
  const catalogo = obtenerCatalogo();
  const nuevoRegistro = {
    _id: generarId(),
    titulo: datos.titulo,
    genero: datos.genero,
    duracion: datos.duracion,
    fecha: datos.fecha,
    disponible: datos.disponible,

    tipo: datos.tipo || 'Película',

    poster: datos.poster || ''
  };
  catalogo.push(nuevoRegistro);
  guardarCatalogo(catalogo);
  return nuevoRegistro;
}

function actualizarRegistro(id, datosNuevos) {
  const catalogo = obtenerCatalogo();
  const indice = catalogo.findIndex(registro => registro._id === id);

  if (indice === -1) {
    return null;
  }

  catalogo[indice] = {
    _id: id,
    titulo: datosNuevos.titulo,
    genero: datosNuevos.genero,
    duracion: datosNuevos.duracion,
    fecha: datosNuevos.fecha,
    disponible: datosNuevos.disponible,

    tipo: datosNuevos.tipo !== undefined ? datosNuevos.tipo : (catalogo[indice].tipo || 'Película'),

    poster: datosNuevos.poster !== undefined ? datosNuevos.poster : (catalogo[indice].poster || '')
  };

  guardarCatalogo(catalogo);
  return catalogo[indice];
}

function eliminarRegistro(id) {
  const catalogo = obtenerCatalogo();
  const catalogoFiltrado = catalogo.filter(registro => registro._id !== id);
  guardarCatalogo(catalogoFiltrado);
}

function sembrarCatalogoFaltante() {
  const semilla = [
    { _id: 'seed-1', titulo: 'Stranger Things', genero: 'Terror', duracion: null, fecha: '2016-07-15', disponible: true, tipo: 'Serie', poster: 'Stranger-Things.webp' },
    { _id: 'seed-2', titulo: 'The Godfather', genero: 'Drama', duracion: 175, fecha: '1972-03-24', disponible: true, tipo: 'Película', poster: 'The-Godfather.webp' },
    { _id: 'seed-3', titulo: 'Spenser Confidencial', genero: 'Acción', duracion: 111, fecha: '2020-03-06', disponible: true, tipo: 'Película', poster: 'Spenser-Confidencial.webp' },
    { _id: 'seed-4', titulo: 'Naruto Shippuden', genero: 'Anime', duracion: null, fecha: '2007-02-15', disponible: false, tipo: 'Serie', poster: 'Naruto.webp' },
    { _id: 'seed-5', titulo: 'El Accidente', genero: 'Drama', duracion: null, fecha: '2017-05-08', disponible: true, tipo: 'Serie', poster: 'Accidente.avif' },
    { _id: 'seed-6', titulo: 'Alguien Tiene Que Morir', genero: 'Drama', duracion: null, fecha: '2020-10-16', disponible: true, tipo: 'Serie', poster: 'Alguien-tiene-que-morir.jpg' },
    { _id: 'seed-7', titulo: 'Bright', genero: 'Acción', duracion: 117, fecha: '2017-12-22', disponible: true, tipo: 'Película', poster: 'Bright.webp' },
    { _id: 'seed-8', titulo: 'Dark', genero: 'Drama', duracion: null, fecha: '2017-12-01', disponible: true, tipo: 'Serie', poster: 'Dark.jpg' },
    { _id: 'seed-9', titulo: 'Doc: Nelle Tue Mani', genero: 'Drama', duracion: null, fecha: '2020-03-26', disponible: true, tipo: 'Serie', poster: 'Doc.jpg' },
    { _id: 'seed-10', titulo: 'Él y Ella', genero: 'Drama', duracion: null, fecha: '2018-01-01', disponible: true, tipo: 'Serie', poster: 'El-y-Ella.jpg' },
    { _id: 'seed-11', titulo: 'Fake Love', genero: 'Comedia', duracion: null, fecha: '2021-01-01', disponible: true, tipo: 'Serie', poster: 'Fake-Love.jpg' },
    { _id: 'seed-12', titulo: 'Frankenstein', genero: 'Terror', duracion: 149, fecha: '2025-11-07', disponible: true, tipo: 'Película', poster: 'Frankenstein.jpg' },
    { _id: 'seed-13', titulo: 'How It Ends', genero: 'Acción', duracion: 113, fecha: '2018-07-13', disponible: true, tipo: 'Película', poster: 'How-it-ends.jpg' },
    { _id: 'seed-14', titulo: 'La Casa de Papel', genero: 'Acción', duracion: null, fecha: '2017-05-02', disponible: true, tipo: 'Serie', poster: 'La-casa-de-papel.webp' },
    { _id: 'seed-15', titulo: 'Miércoles', genero: 'Terror', duracion: null, fecha: '2022-11-23', disponible: true, tipo: 'Serie', poster: 'Miercoles.avif' },
    { _id: 'seed-16', titulo: 'The Crown', genero: 'Drama', duracion: null, fecha: '2016-11-04', disponible: true, tipo: 'Serie', poster: 'The-Crown.jpg' },
    { _id: 'seed-17', titulo: 'The Witcher', genero: 'Acción', duracion: null, fecha: '2019-12-20', disponible: true, tipo: 'Serie', poster: 'The-witcher.jpg' },
    { _id: 'seed-18', titulo: 'Thrash', genero: 'Documental', duracion: 90, fecha: '2020-06-01', disponible: true, tipo: 'Película', poster: 'Thrash.jpg' }
  ];

  let catalogo = obtenerCatalogo();
  const idsExistentes = new Set(catalogo.map(registro => registro._id));
  const faltantes = semilla.filter(item => !idsExistentes.has(item._id));

  const semillaPorId = new Map(semilla.map(item => [item._id, item]));
  let seCompletoAlgunTipo = false;
  catalogo = catalogo.map(registro => {
    if (registro.tipo === undefined) {
      seCompletoAlgunTipo = true;
      const referencia = semillaPorId.get(registro._id);
      const tipo = referencia ? referencia.tipo : 'Película';

      const duracion = tipo === 'Serie' ? null : registro.duracion;
      return { ...registro, tipo, duracion };
    }
    return registro;
  });

  if (faltantes.length > 0 || seCompletoAlgunTipo) {
    guardarCatalogo([...catalogo, ...faltantes]);
  }
}

sembrarCatalogoFaltante();
