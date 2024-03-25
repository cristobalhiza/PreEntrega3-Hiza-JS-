const preciosActividades = {
  camping: 15,
  lodge: 80,
  picnic: 10,
  caminata: 8,
  cabalgata: 40,
  rafting: 30
};

let actividadesSeleccionadas = [];

function actualizarSeleccion() {
  actividadesSeleccionadas = [];
  document.querySelectorAll('input[type="checkbox"]:checked').forEach((checkbox) => {
    actividadesSeleccionadas.push({
      actividad: checkbox.value,
      cantidad: parseInt(document.getElementById(checkbox.value + "Cantidad").value)
    });
  });
}
// Añadir un evento de escucha para el cambio en los checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", function() {
    const campoCantidad = document.getElementById(checkbox.value + "Cantidad");
    if (checkbox.checked) {
      campoCantidad.classList.remove('d-none'); // Mostrar el campo de cantidad si el checkbox está marcado
    } else {
      campoCantidad.classList.add('d-none'); // Ocultar el campo de cantidad si el checkbox no está marcado
    }
    actualizarSeleccion();
    mostrarPrecioTotal(); // Actualizar el precio total cuando se cambia el estado del checkbox
  });
});

document.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener("input", function() {
    actualizarSeleccion();
    mostrarPrecioTotal();
  });
});

function agregarActividad(actividad) {
  actividadesSeleccionadas.push(actividad);
  if (actividadesSeleccionadas.includes(actividad)) {
    // Si la actividad ya está seleccionada, la eliminamos
    actividadesSeleccionadas = actividadesSeleccionadas.filter(act => act !== actividad);} else {
      actividadesSeleccionadas.push(actividad);
    }
  mostrarPrecioTotal();
} 

// Función para calcular el precio total de la actividad
function calcularPrecioTotal(numDias) {
  let precioTotal = 0;
  for (const actividadSeleccionada of actividadesSeleccionadas) {
    precioTotal += preciosActividades[actividadSeleccionada.actividad] * actividadSeleccionada.cantidad;
  }
  return precioTotal * numDias;
}
document.querySelector("#numDias").addEventListener("change", mostrarPrecioTotal);

// Función para mostrar el precio total de la actividad seleccionada
function mostrarPrecioTotal() {
  const numDias = parseInt(document.getElementById("numDias").value);
  const precioTotal = calcularPrecioTotal(numDias);
  const precioTotalElement = document.getElementById("precioTotal");

  if (!isNaN(numDias) && numDias > 0) {
    precioTotalElement.textContent = precioTotal;
  } else {
    precioTotalElement.textContent = "";
    alert("Por favor, ingresa un número válido de días.");
  }
}

// Mostramos el precio total por defecto
mostrarPrecioTotal();
