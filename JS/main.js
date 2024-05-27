const preciosActividades = {};

async function fetchData() {
  try {
    const response = await fetch('../data.json');
    const data = await response.json();
    data.forEach(actividad => {
      preciosActividades[actividad.nombre] = actividad.precio;
      const precioSpan = document.querySelector(`#${actividad.nombre}Precio`);
      if (precioSpan) {
        precioSpan.textContent = "$" + actividad.precio + " c/u";
      }
    });
    return preciosActividades;
  } catch (error) {
    console.error(error);
  }
}
fetchData()

let actividadesSeleccionadas = [];

function actualizarSeleccion() {
  actividadesSeleccionadas = Array.from(document.querySelectorAll('input[type="checkbox"]:checked'))
    .map(checkbox => {
      const cantidad = parseInt(document.getElementById(`${checkbox.value}Cantidad`).value);
      return !isNaN(cantidad) && cantidad > 0 ? { actividad: checkbox.value, cantidad } : null;
    })
    .filter(actividad => actividad !== null);
  mostrarPrecioTotal();
}

// Añadir un evento de escucha para el cambio en los checkboxes
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const campoCantidad = document.getElementById(checkbox.value + "Cantidad");
    const textoCantidad = document.getElementById(checkbox.value + "Texto");
    if (checkbox.checked) {
      textoCantidad.classList.remove("d-none");
      campoCantidad.classList.remove("d-none"); // Mostrar el campo de cantidad si el checkbox está marcado
    } else {
      textoCantidad.classList.add("d-none");
      campoCantidad.classList.add("d-none"); // Ocultar el campo de cantidad si el checkbox no está marcado
    }
    fetchData()
    actualizarSeleccion();
    mostrarPrecioTotal(); // Actualizar el precio total cuando se cambia el estado del checkbox
  });
});

document.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener("input", function () {
    actualizarSeleccion();
    mostrarPrecioTotal();
  });
});

document.querySelectorAll('input[type="number"]').forEach((input) => {
  input.addEventListener("input", function () {
    const cantidad = parseInt(input.value);
    if (isNaN(cantidad) || cantidad < 0) {
      input.value = "";
      Swal.fire({
        text: "Por favor, ingresa un número mayor a 0",
        animation: false,
        timer: 2000,
        confirmButtonColor: "green"
      });
    }
    actualizarSeleccion();
    mostrarPrecioTotal();
  });
});

function agregarActividad(actividad) {
  actividadesSeleccionadas.push(actividad);
  if (actividadesSeleccionadas.includes(actividad)) {
    // Si la actividad ya está seleccionada, la eliminamos
    actividadesSeleccionadas = actividadesSeleccionadas.filter(
      (act) => act !== actividad
    );
  } else {
    actividadesSeleccionadas.push(actividad);
  }
  mostrarPrecioTotal();
}

// Función para calcular el precio total de la actividad
function calcularPrecioTotal() {
  let precioTotal = 0;
  for (const actividadSeleccionada of actividadesSeleccionadas) {
    precioTotal +=
      preciosActividades[actividadSeleccionada.actividad] *
      actividadSeleccionada.cantidad;
  }
  return precioTotal;
}

// Función para mostrar el precio total de la actividad seleccionada
function mostrarPrecioTotal() {
  if (Object.keys(preciosActividades).length > 0) {
    const precioTotal = calcularPrecioTotal();
    const precioTotalElement = document.getElementById("precioTotal");

    if (precioTotal > 0) {
      precioTotalElement.textContent = precioTotal;
    } else {
      precioTotalElement.textContent = "0";
    }
  }
}

// Validar la fecha de llegada
function validarFechaLlegada(fecha) {
  const fechaActual = new Date();
  const fechaSeleccionada = new Date(fecha);
  const unAnioDespues = new Date();
  unAnioDespues.setFullYear(unAnioDespues.getFullYear() + 1);

  return fechaSeleccionada > fechaActual && fechaSeleccionada <= unAnioDespues;
}

// FORMULARIO RESERVA

function guardarReserva(evento) {
  evento.preventDefault();

  // Obetener información de contacto
  const nombre = document.querySelector("#nombreInput").value;
  const correo = document.querySelector("#correoInput").value;
  const fechaLlegada = document.querySelector("#fechaInput").value;

  if (!validarFechaLlegada(fechaLlegada)) {
    Swal.fire({
      text: "La fecha de llegada debe ser mayor a la actual y no mayor a un año.",
      animation: false,
      timer: 3000,
      confirmButtonColor: "green"
    });
    return;
  }

  // Validar si se ha seleccionado alguna actividad
  if (actividadesSeleccionadas.length === 0) {
    Swal.fire({
      text: "Debe seleccionar al menos un alojamiento o actividad para realizar la reserva.",
      animation: false,
      timer: 3000,
      confirmButtonColor: "green"
    });
    return;
  }

  // Validar si ya existe una reserva con el mismo nombre
  const reservaExistente = localStorage.getItem("reserva_" + nombre);
  if (reservaExistente !== null) {
    Swal.fire({
      text: "Ya existe una reserva con el nombre proporcionado. ¿Deseas eliminar la reserva existente antes de realizar una nueva?",
      animation: false,
      showCancelButton: true,
      confirmButtonColor: "green",
      cancelButtonColor: "red",
      confirmButtonText: "Sí",
      cancelButtonText: "No, modificar la reserva actual"
    }).then((result) => {
      if (result.isConfirmed) {
        // Redirigir a la página para eliminar la reserva existente
        window.location.assign("/pages/info.html");
      }
    });
    return;
  }

  // Validar las actividades seleccionadas
  for (const actividadSeleccionada of actividadesSeleccionadas) {
    if (actividadSeleccionada.cantidad < 0) {
      Swal.fire({
        text: "La cantidad de " + actividadSeleccionada.actividad + " no puede ser negativa.",
        animation: false,
        timer: 3000,
        confirmButtonColor: "green"
      });
      return;
    }

    if (actividadSeleccionada.actividad === 'camping' || actividadSeleccionada.actividad === 'lodge') {
      if (actividadSeleccionada.cantidad > 90) {
        Swal.fire({
          text: "Solo se permite reservar hasta 90 días para cada alojamiento.",
          animation: false,
          timer: 3000,
          confirmButtonColor: "green"
        });
        return;
      }
    } else {
      if (actividadSeleccionada.cantidad > 6) {
        Swal.fire({
          text: "Solo se permite reservar hasta 6 horas para cada actividad.",
          animation: false,
          timer: 3000,
          confirmButtonColor: "green"
        });
        return;
      }
    }
  }
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
  localStorage.setItem("reserva_" + nombre, reservaJSON);

  Swal.fire({
    icon: 'success',
    text: 'Reserva guardada exitosamente, nos vemos!',
    timer: 2000,
    confirmButtonColor: "green"
  }).then(() => {
    window.location.assign("/pages/info.html");
  });
}

document
  .querySelector("#formReserva")
  .addEventListener("submit", guardarReserva);
