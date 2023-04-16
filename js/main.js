// Función para obtener los datos de la API
function obtenerDatos() {
  return new Promise((resolve, reject) => {
    $.getJSON(
      "https://plataforma.visasgomezyasociados.com/API/cityList",
      (data) => {
        if (data) {
          resolve(data);
        } else {
          reject("Error al obtener los datos");
        }
      }
    );
  });
}

// Función para ordenar los datos alfabéticamente por nombre
function ordenarAlfabeticamente(data) {
  return data.sort((a, b) => {
    return a.name.localeCompare(b.name);
  });
}

// Función para crear un card con los datos de una ciudad
function crearCard(ciudad) {
  return `
    <div class="col-md-4 mb-4">
      <div class="card">
        <div class="card-body">
          <h5 class="card-title">ID: \ ${ciudad.id}</h5>
          <p class="card-text">Nombre: \ ${ciudad.name}</p>
        </div>
      </div>
    </div>
  `;
}

// Función principal para cargar los datos y mostrarlos en cards
async function cargarDatos() {
  try {
    const datos = await obtenerDatos();
    const datosOrdenados = ordenarAlfabeticamente(datos);
    let cards = "";

    datosOrdenados.forEach((ciudad) => {
      cards += crearCard(ciudad);
    });

    $("#cardsContainer").html(cards);
    $("#mensaje").text("API consumida correctamente!");
  } catch (error) {
    console.error(error);
  }
}

// Evento click para el botón "Cargar Datos"
$("#cargarDatos").on("click", cargarDatos);

// Obtener el botón
const btnCargarDatos = document.getElementById("cargarDatos");

// Agregar el listener de eventos "click"
btnCargarDatos.addEventListener("click", function () {
  // Obtener el elemento que está animando la propiedad CSS "animation"
  const animationElement = document.querySelector(".btn-warning");

  // Agregar o quitar la clase "paused" al elemento para pausar o reanudar la animación
  animationElement.classList.toggle("paused");
});
