  // Renderizar tarjetas
  class Tarjeta {
    constructor(titulo, contenido, enlace, precio) {
      this.titulo = titulo;
      this.contenido = contenido;
      this.enlace = enlace;
      this.precio = precio;
    }}

    function renderizar(tarjeta, clon) {
      clon.querySelector('.card-title').innerText = tarjeta.titulo;
      clon.querySelector('.card-text').innerText = tarjeta.contenido;
      clon.querySelector('.btn').href = tarjeta.enlace;
      clon.querySelector('.card-precio').innerText = tarjeta.precio;
    }

const tarjetas = [];

tarjetas.push(
  new Tarjeta(
    'Zona de camping',
    'Contamos con una zona de camping inserta en un encantador bosque de árboles nativos e introducidos. Sitio de carpa apta para cuatro personas. Acceso a baños con ducha.',
    'pages/form.html',
    '$15/día'
  ),
  new Tarjeta(
    'Suites Premium Lodge',
    'El Lodge está compuesto por 12 Suites Premium. Todas tienen una cama matrimonial de dos plazas y media que puede transformarse en dos camas individuales si los visitantes así lo desean.',
    'pages/form.html',
    '$80/día'
  ),
  new Tarjeta(
    'Zona de Picnic',
    'Disponemos de una amplia y sombreada zona de picnic, ubicada dentro de un hermoso bosque de pinos y árboles nativos.',
    'pages/form.html',
    '$10/hora'
  ),
  new Tarjeta(
    'Caminata al lago',
    'Como en todas nuestras actividades, irás acompañado de un guía que te hablará sobre la diversidad de flora y fauna presente y el cuidado de la naturaleza. Dificultad básica, 6 km (ida y vuelta).',
    'pages/form.html',
    '$8/hora'
  ),
  new Tarjeta(
    'Cabalgata Kalfú',
    'Nuestra cabalgata de menor grado de dificultad con un entretenido recorrido y hermosos paisajes.',
    'pages/form.html',
    '$40/hora'
  ),
  new Tarjeta(
    'Rafting',
    'No se necesita saber de rafting para participar en nuestros viajes. Estamos confiados en que nuestros descensos por el río serán un desafío para usted, sin importar su nivel de experiencia.',
    'pages/form.html',
    '$30/hora'
  )
);

const contenedorTarjetas = document.querySelector('#tarjetas-container');
const template = document.querySelector('#tarjeta-template');

tarjetas.forEach(tarjeta => {
  const clon = document.importNode(template.content, true);
  renderizar(tarjeta, clon);
  contenedorTarjetas.appendChild(clon);
});
