const camping = 15;
const lodge = 80;
const picnic = 10;
const caminata = 8;
const cabalgata = 40;
const rafting = 30;

let total = 0;

// let actividadesSeleccionadas = [];

// function agregarActividad(actividad) {
//   actividadesSeleccionadas.push(actividad);
//   mostrarPrecioTotal();
// }

const precioBtn = document.querySelector("#precioTotalBtn");
// Función para calcular el precio total de la actividad
function calcularPrecioTotal(actividad, numDias) {
  let precioActividad = 0;
  switch (actividad) {
    case "camping":
      precioActividad = camping * numDias;
      break;
    case "lodge":
      precioActividad = lodge * numDias;
      break;
    case "picnic":
      precioActividad = picnic * numDias;
      break;
    case "caminata":
      precioActividad = caminata * numDias;
      break;
    case "cabalgata":
      precioActividad = cabalgata * numDias;
      break;
    case "rafting":
      precioActividad = rafting * numDias;
      break;
  }
  return precioActividad;
}

// Función para mostrar el precio total de la actividad seleccionada
function mostrarPrecioTotal() {
  const actividadSeleccionada =
    document.querySelector("#selector-reserva").value;
  const numDias = parseInt(document.getElementById("numDias").value);
  const precioTotal = calcularPrecioTotal(actividadSeleccionada, numDias);
  document.getElementById("precioTotal").innerHTML = precioTotal;

  if (!isNaN(numDias) && numDias > 0) {
    const precioTotal = calcularPrecioTotal(actividadSeleccionada, numDias);
    document.getElementById("precioTotal").innerHTML = precioTotal;
  } else {
    document.getElementById("precioTotal").innerHTML = "";
    alert("Por favor, ingresa un número válido de días.");
  }
}

// Añadimos un evento al selector de actividad para mostrar el precio total
precioBtn.addEventListener("click", mostrarPrecioTotal);

// Mostramos el precio total por defecto
mostrarPrecioTotal();
