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
    const cantidad = parseInt(document.getElementById(checkbox.value + "Cantidad").value);
    if (isNaN(cantidad) || cantidad <= 0) {
      alert("Por favor, ingresa una cantidad válida para la actividad " + checkbox.value + ".");
    } else {
    actividadesSeleccionadas.push({
      actividad: checkbox.value,
      cantidad: cantidad
    });
  }
  });
}

// Añadir un evento de escucha para el cambio en los checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", function() {
    const campoCantidad = document.getElementById(checkbox.value + "Cantidad");
    const textoCantidad = document.getElementById(checkbox.value + "Texto");
    if (checkbox.checked) {
      textoCantidad.classList.remove('d-none');
      campoCantidad.classList.remove('d-none'); // Mostrar el campo de cantidad si el checkbox está marcado
    } else {
      textoCantidad.classList.add('d-none');
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
function calcularPrecioTotal() {
  let precioTotal = 0;
  for (const actividadSeleccionada of actividadesSeleccionadas) {
    precioTotal += preciosActividades[actividadSeleccionada.actividad] * actividadSeleccionada.cantidad;
  }
  return precioTotal;
}

// Función para mostrar el precio total de la actividad seleccionada
function mostrarPrecioTotal() {
  const precioTotal = calcularPrecioTotal();
  const precioTotalElement = document.getElementById("precioTotal");

  if (precioTotal > 0) {
    precioTotalElement.textContent = precioTotal;
  } else {
    precioTotalElement.textContent = "0";
  }
}

// FORMULARIO RESERVA

function guardarReserva(evento) {
  evento.preventDefault();

  // Obetener información de contacto
  const nombre = document.querySelector('#nombreInput').value;
  const correo = document.querySelector('#correoInput').value;
  const fechaLlegada = document.querySelector('#fechaInput').value;

  // Obtener precio total
  const precioTotal = document.getElementById("precioTotal").textContent;

  // Crear objeto reserva

  const reserva = {
    nombre: nombre,
    correo: correo,
    fechaLlegada: fechaLlegada,
    precioTotal: precioTotal,
  };

  // Convertir objeto reserva a string 
  const reservaJSON = JSON.stringify(reserva);

  // Guardar reserva en localStorage
  localStorage.setItem('reserva', reservaJSON);

  alert('Reserva guardada exitosamente!');
  window.location.assign("/index.html")
}

document.querySelector('#formReserva').addEventListener("submit", guardarReserva);


