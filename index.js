function dividirTextoEnPalabras(elemento) {
  const texto = elemento.textContent;
  const palabras = texto.split(' ');

  elemento.innerHTML = palabras
    .map(palabra => `<span class="palabra-dividida">${palabra}&nbsp;</span>`)
    .join('');

  return elemento.querySelectorAll('.palabra-dividida');
}

const tituloHero = document.querySelector('#tituloHero');
const spansPalabras = dividirTextoEnPalabras(tituloHero);

if (window.Motion) {
  Motion.animate(
    spansPalabras,
    { opacity: [0, 1], y: [24, 0] },
    { duration: 0.5, delay: Motion.stagger(0.08) }
  );

  Motion.animate(
    '.hero-descripcion',
    { opacity: [0, 1], y: [20, 0] },
    { duration: 0.5, delay: 0.3 }
  );

  Motion.animate(
    '.poster',
    { opacity: [0, 1] },
    { duration: 0.5, delay: Motion.stagger(0.12, { startDelay: 0.3 }) }
  );
} else {

  document.querySelectorAll('.poster').forEach(carta => { carta.style.opacity = '1'; });
}

const btnMenu = document.querySelector('#btnMenu');
const navbarEnlaces = document.querySelector('#navbarEnlaces');

btnMenu.addEventListener('click', () => {
  const abierto = navbarEnlaces.classList.toggle('abierto');
  btnMenu.setAttribute('aria-expanded', abierto ? 'true' : 'false');
});

function mostrarPagina() {
  if (window.Motion) {
    Motion.animate(document.body, { opacity: [0, 1] }, { duration: 0.35 });
  } else {
    document.body.style.opacity = '1';
  }
}
mostrarPagina();

navbarEnlaces.querySelectorAll('a').forEach(enlace => {
  enlace.addEventListener('click', (evento) => {
    navbarEnlaces.classList.remove('abierto');
    btnMenu.setAttribute('aria-expanded', 'false');

    const destino = enlace.getAttribute('href');
    if (!destino || evento.metaKey || evento.ctrlKey) {
      return;
    }

    evento.preventDefault();

    if (window.Motion) {
      Motion.animate(document.body, { opacity: [1, 0] }, { duration: 0.25 })
        .finished.then(() => { window.location.href = destino; });
    } else {
      window.location.href = destino;
    }
  });
});
