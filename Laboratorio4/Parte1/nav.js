const btnMenu = document.querySelector('#btnMenu');
const navbarEnlaces = document.querySelector('#navbarEnlaces');

if (btnMenu && navbarEnlaces) {
  btnMenu.addEventListener('click', () => {
    const abierto = navbarEnlaces.classList.toggle('abierto');
    btnMenu.setAttribute('aria-expanded', abierto ? 'true' : 'false');
  });

  navbarEnlaces.querySelectorAll('a').forEach(enlace => {
    enlace.addEventListener('click', () => {
      navbarEnlaces.classList.remove('abierto');
      btnMenu.setAttribute('aria-expanded', 'false');
    });
  });
}
