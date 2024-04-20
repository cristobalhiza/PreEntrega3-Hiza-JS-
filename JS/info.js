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
    Swal.fire({
      text: "No se encontró una reserva para el nombre de usuario ingresado.",
        animation: false,
        icon: "error",
        timer: 4000,
        width: "26em",
        confirmButtonColor: "green"
      })
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

function cancelarReserva() {
  // Obtener el nombre del usuario
  const nombreUsuario = document
    .querySelector("#nombreUsuario")
    .value.toLowerCase(); // Convertir a minúsculas

  // Iterar sobre las claves de localStorage y buscar la reserva
  let reservaEncontrada = false;
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    if (key && key.startsWith("reserva_")) {
      // Convertir la clave a minúsculas para comparar
      const keyLowerCase = key.toLowerCase();
      if (keyLowerCase === "reserva_" + nombreUsuario) {
        // Comparar claves en minúsculas
        // Eliminar la reserva del localStorage
        localStorage.removeItem(key);
        alert("Reserva cancelada correctamente.");
        location.reload();
        reservaEncontrada = true;
        break;
      }
    }
  }
}
// Agregar evento al botón de "Cancelar reserva"
document
  .getElementById("cancelarReservaBtn")
  .addEventListener("click", cancelarReserva);
