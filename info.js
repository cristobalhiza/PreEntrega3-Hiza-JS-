// Obtener informacion de la reserva
let numeroForm = 1;

function obtenerInfoReserva() {
  // Obtener nombre ingresado por usuario y convertirlo a minúsculas
  const nombreUsuario = document
    .querySelector("#nombreUsuario")
    .value.toLowerCase();

  // Iterar sobre el localStorage para buscar la reserva por nombre de usuario
  let reservaEncontrada = false;
  for (let i = 0; i <= localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("reserva_")) {
      const reservaJSON = localStorage.getItem(key);
      const reserva = JSON.parse(reservaJSON);
      // Convertir el nombre de la reserva a minúsculas para comparar
      const nombreReserva = reserva.nombre.toLowerCase();
      // Comparar los nombres de usuario en minúsculas
      if (reserva && nombreReserva === nombreUsuario) {
        // Mostrar la información de la reserva encontrada
        const infoReservaDiv = document.getElementById("infoReserva");
        infoReservaDiv.innerHTML = `
          <h2>Información de Reserva para ${reserva.nombre}:</h2>
          <p><strong>Correo Electrónico:</strong> ${reserva.correo}</p>
          <p><strong>Fecha de Llegada al Parque:</strong> ${reserva.fechaLlegada}</p>
          <p><strong>Precio Total Reserva:</strong> $${reserva.precioTotal}</p>
        `;
        // Cambiar la bandera a true
        reservaEncontrada = true;
        // Salir del bucle ya que se encontró la reserva
        break;
      }
    }
  }

  // Si no se encontró ninguna reserva, mostrar un mensaje de alerta
  if (!reservaEncontrada) {
    alert("No se encontró una reserva para el nombre de usuario ingresado.");
  }
}
function mostrarInfoReserva() {
  // Obtener el número de formulario de la última reserva guardada
  const ultimoNumeroForm = localStorage.length;
  // Obtener la reserva del localStorage
  const reservaJSON = localStorage.getItem("reserva_" + ultimoNumeroForm);
  if (reservaJSON) {
    const reserva = JSON.parse(reservaJSON);

    // Mostrar la información de la reserva en el div "infoReserva"
    document.getElementById("infoReserva").innerHTML = `
      <h2>Información de la Reserva:</h2>
      <p><strong>Nombre:</strong> ${reserva.nombre}</p>
      <p><strong>Correo Electrónico:</strong> ${reserva.correo}</p>
      <p><strong>Fecha de Llegada al Parque:</strong> ${reserva.fechaLlegada}</p>
      <p><strong>Precio Total:</strong> $${reserva.precioTotal}</p>
    `;
  } else {
    document.getElementById("infoReserva").innerHTML =
      "<p>No hay reserva guardada.</p>";
  }
}
// Asignar la función obtenerInformacionReserva al evento click del botón
document
  .querySelector("#obtenerInfoBtn")
  .addEventListener("click", obtenerInfoReserva);

document.addEventListener("DOMContentLoaded", function () {
  // Cargar información de reserva desde localStorage
  mostrarInfoReserva();

  function mostrarFormularioModificacion(nombre) {
    // Obtener la reserva del localStorage
    const reservaJSON = localStorage.getItem("reserva_" + nombre);
    if (reservaJSON) {
      const reserva = JSON.parse(reservaJSON);

      // Llenar el formulario con los datos de la reserva actual
      document.getElementById("nombreInput").value = reserva.nombre;
      document.getElementById("correoInput").value = reserva.correo;
      document.getElementById("fechaInput").value = reserva.fechaLlegada;

      // Mostrar el formulario de modificación
      document.getElementById("modificarReservaForm").style.display = "block";
    }
  }

  // Agregar evento al botón de "Editar Reserva"
  document.getElementById("editarBtn").addEventListener("click", function () {
    // Obtener el nombre del usuario para pasar como parámetro
    const nombreUsuario = document
      .querySelector("#nombreUsuario")
      .value.toLowerCase();

    // Llamar a la función de mostrar formulario de modificación y pasar el nombre del usuario
    mostrarFormularioModificacion(nombreUsuario);
  });

  // Agregar evento al formulario de modificación
  document
    .getElementById("modificarReservaForm")
    .addEventListener("submit", function (event) {
      // Evitar el envío del formulario
      event.preventDefault();

      // Obtener datos del formulario
      const nombre = document.getElementById("nombreInput").value;
      const correo = document.getElementById("correoInput").value;
      const fechaLlegada = document.getElementById("fechaInput").value;

      // Actualizar los datos de la reserva
      actualizarReserva(nombre, correo, fechaLlegada);

      // Mostrar la información actualizada de la reserva
      mostrarInfoReserva();

      // Ocultar el formulario de modificación
      document.getElementById("modificarReservaForm").style.display = "none";
    });
});

function actualizarReserva(nombre, correo, fechaLlegada) {
  // Obtener la reserva del localStorage utilizando el nombre como clave
  const reservaJSON = localStorage.getItem("reserva_" + nombre);
  if (reservaJSON) {
    const reserva = JSON.parse(reservaJSON);

    // Actualizar los datos de la reserva
    reserva.nombre = nombre;
    reserva.correo = correo;
    reserva.fechaLlegada = fechaLlegada;

    // Guardar la reserva actualizada en el localStorage
    localStorage.setItem("reserva_" + nombre, JSON.stringify(reserva));
  }
}

function cancelarReserva() {
  // Obtener el nombre del usuario
  const nombreUsuario = document.querySelector("#nombreUsuario").value;

  // Obtener la información de la reserva del localStorage usando el nombre como parte de la clave
  const reservaJSON = localStorage.getItem("reserva_" + nombreUsuario);

  if (reservaJSON) {
    // Eliminar la información de la reserva del localStorage
    localStorage.removeItem("reserva_" + nombreUsuario);

    // Mostrar un mensaje de confirmación al usuario
    alert("Reserva cancelada correctamente.");

    // Actualizar la página para mostrar la información actualizada
    location.reload();
  } else {
    alert("No se encontró una reserva para cancelar.");
  }
}

// Agregar evento al botón de "Cancelar reserva"
document
  .getElementById("cancelarReservaBtn")
  .addEventListener("click", cancelarReserva);
