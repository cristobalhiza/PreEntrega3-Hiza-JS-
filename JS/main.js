  const preciosActividades = {};

  async function fetchData() {
    try {
      const response = await fetch('../data.json');
      const data = await response.json();
      for (const actividad of data) {
        preciosActividades[actividad.nombre] = actividad.precio;
      }
      return preciosActividades;
    } catch (error) {
      console.error(error);
    }
  }

  fetchData()

  let actividadesSeleccionadas = [];

  function actualizarSeleccion() {
    actividadesSeleccionadas = [];
    document
      .querySelectorAll('input[type="checkbox"]:checked')
      .forEach((checkbox) => {
        const cantidad = parseInt(
          document.getElementById(checkbox.value + "Cantidad").value
        );
        if (isNaN(cantidad) || cantidad <= 0) {
          alert(
            "Por favor, ingresa una cantidad válida para la actividad " +
              checkbox.value +
              "."
          );
        } else {
          actividadesSeleccionadas.push({
            actividad: checkbox.value,
            cantidad: cantidad,
          });
        }
      });
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

  // FORMULARIO RESERVA

  function guardarReserva(evento) {
    evento.preventDefault();

    // Obetener información de contacto
    const nombre = document.querySelector("#nombreInput").value;
    const correo = document.querySelector("#correoInput").value;
    const fechaLlegada = document.querySelector("#fechaInput").value;

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

    alert("Reserva guardada exitosamente!");
    window.location.assign("/pages/info.html");
  }

  document
    .querySelector("#formReserva")
    .addEventListener("submit", guardarReserva);
