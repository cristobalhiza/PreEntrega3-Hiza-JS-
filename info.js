// Obtener informacion de la reserva

function obtenerInfoReserva() {
    // Obtener nombre ingresado por usuario
    const nombreUsuario = document.querySelector('#nombreUsuario').value;
    // Obtener la reserva del localStorage
    const reservaJSON = localStorage.getItem('reserva');
    // Verificar si hay una reserva almacenada y si se ingresó un nombre de usuario
    if (reservaJSON && nombreUsuario) {
      // Convertir la reserva de JSON a objeto JavaScript
      const reserva = JSON.parse(reservaJSON);
  
      // Verificar si el nombre ingresado coincide con el nombre en la reserva
      if (reserva.nombre === nombreUsuario) {
        // Mostrar la información de la reserva
        const infoReservaDiv = document.getElementById("infoReserva");
        infoReservaDiv.innerHTML = `
          <h2>Información de Reserva para ${nombreUsuario}:</h2>
          <p><strong>Correo Electrónico:</strong> ${reserva.correo}</p>
          <p><strong>Fecha de Llegada al Parque:</strong> ${reserva.fechaLlegada}</p>
          <p><strong>Precio Total Reserva:</strong> $${reserva.precioTotal}</p>
        `;
      } else {
        alert("El nombre ingresado no coincide con el nombre en la reserva.");
      }
    } else {
      alert("No se encontró una reserva o no se ingresó un nombre de usuario.");
    }
  }
  
  // Asignar la función obtenerInformacionReserva al evento click del botón
  document.querySelector('#obtenerInfoBtn').addEventListener("click", obtenerInfoReserva);

  document.addEventListener("DOMContentLoaded", function() {
    // Cargar información de reserva desde localStorage
    mostrarInfoReserva();

    // Agregar evento al botón de "Editar Reserva"
    document.getElementById("editarBtn").addEventListener("click", function() {
      // Mostrar el formulario de modificación y cargar datos actuales
      mostrarFormularioModificacion();
    });

    // Agregar evento al formulario de modificación
    document.getElementById("modificarReservaForm").addEventListener("submit", function(event) {
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

  function mostrarInfoReserva() {
    // Obtener la reserva del localStorage
    const reservaJSON = localStorage.getItem("reserva");
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
      document.getElementById("infoReserva").innerHTML = "<p>No hay reserva guardada.</p>";
    }
  }

  function mostrarFormularioModificacion() {
    // Obtener la reserva del localStorage
    const reservaJSON = localStorage.getItem("reserva");
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

  function actualizarReserva(nombre, correo, fechaLlegada) {
    // Obtener la reserva del localStorage
    const reservaJSON = localStorage.getItem("reserva");
    if (reservaJSON) {
      const reserva = JSON.parse(reservaJSON);

      // Actualizar los datos de la reserva
      reserva.nombre = nombre;
      reserva.correo = correo;
      reserva.fechaLlegada = fechaLlegada;

      // Guardar la reserva actualizada en el localStorage
      localStorage.setItem("reserva", JSON.stringify(reserva));
    }
  }

  function cancelarReserva() {
    // Obtener la información de la reserva del localStorage
    const reservaJSON = localStorage.getItem("reserva");
    if (reservaJSON) {
      const reserva = JSON.parse(reservaJSON);
  
      // Eliminar la información de la reserva del localStorage
      localStorage.removeItem("reserva");
  
      // Mostrar un mensaje de confirmación al usuario
      alert("Reserva cancelada correctamente.");
  
      // Actualizar la página para mostrar la información actualizada
      location.reload();
    } else {
      alert("No se encontró una reserva para cancelar.");
    }
  }
  
  // Agregar evento al botón de "Cancelar reserva"
  document.getElementById("cancelarReservaBtn").addEventListener("click", cancelarReserva);