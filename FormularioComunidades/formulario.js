let Colores = [
  {
    color: "Rojo",
    hex: "#f00",
    CodCCMM: "01",
  },
  {
    color: "Verde",
    hex: "#0f0",
    CodCCMM: "02",
  },
  {
    color: "Azul",
    hex: "#00f",
    CodCCMM: "03",
  },
  {
    color: "Amarillo",
    hex: "#ff0",
    CodCCMM: "04",
  },
  {
    color: "Cyan",
    hex: "#0ff",
    CodCCMM: "05",
  },
];

let CCAA = [
  {
    codigoCCAA: "01",
    nombre: "Andalucia",
    Provincias: [
      { codi: 1, provincia: "Malaga" },
      { codi: 2, provincia: "Sevilla" },
      { codi: 3, provincia: "Almería" },
    ],
  },
  {
    codigoCCAA: "02",
    nombre: "Galicia",
    Provincias: [
      { codi: 1, provincia: "Pontevedra" },
      { codi: 2, provincia: "Vigo" },
      { codi: 3, provincia: "Lugo" },
    ],
  },
  {
    codigoCCAA: "03",
    nombre: "Madrid",
    Provincias: [
      { codi: 1, provincia: "Madrid" },
      { codi: 2, provincia: "Toledo" },
    ],
  },
  {
    codigoCCAA: "04",
    nombre: "Pais Vasco",
    Provincias: [
      { codi: 1, provincia: "Bilbao" },
      { codi: 2, provincia: "Vitoria" },
    ],
  },
  {
    codigoCCAA: "05",
    nombre: "Islas Canarias",
    Provincias: [
      { codi: 1, provincia: "Tenerife" },
      { codi: 2, provincia: "Las Palmas" },
    ],
  },
];

let ColeccionUsuarios = [
  {
    NombreUsuario: "Jose Villanueva",
    Email: "jose@gmail.com",
    Activo: true,
    codCCAA: "02",
    codProv: 1,
    nombreUsuario: "sirneo",
  },
  {
    NombreUsuario: "Susana Chen",
    Email: "susana@gmail.com",
    Activo: true,
    codCCAA: "01",
    codProv: 1,
    nombreUsuario: "missu",
  },
  {
    NombreUsuario: "Estrella Chen",
    Email: "estrella@gmail.com",
    Activo: true,
    codCCAA: "01",
    codProv: 1,
    nombreUsuario: "estrell",
  },
  {
    NombreUsuario: "Jose Chen",
    Email: "josito@gmail.com",
    Activo: true,
    codCCAA: "05",
    codProv: 1,
    nombreUsuario: "villachen",
  },
];

// funcion para borrar los datos seleccionados
function removeOptions(selectElement) {
  var i,
    L = selectElement.options.length - 1;
  for (i = L; i >= 0; i--) {
    selectElement.remove(i);
  }
}

function cargaInicial() {
  //limpia la celda y carga las comunidades.
  removeOptions(document.getElementById("selecCCAA"));

  select = document.getElementById("selecCCAA");

  for (let i = 0; i < CCAA.length; i++) {
    var opt = document.createElement("option");
    opt.value = CCAA[i].codigoCCAA;
    opt.innerHTML = CCAA[i].nombre;
    select.appendChild(opt);
  }
  pintarFilaUsuarios(ColeccionUsuarios);
}

//funcion para que se cargue los datos dentro de la tabla, de los registros realizados
function pintarFilaUsuarios(arrayGeneral) {
  let arrayFilas = document.querySelectorAll("#tablaUsuario tbody tr"); // coleccionUsuarios = [{...},{...},{...}, ...]

  arrayFilas.forEach(function (element) {
    element.remove();
  });

  document.getElementById("tablaUsuario").insertRow(-1).innerHTML =
    "<tr>" +
    "<td>#</td>" +
    "<td>Nombre</td>" +
    "<td>Email</td>" +
    "<td>Cod.Comunidad</td>" +
    "<td>Cod.Provincia</td>" +
    "<td>Nombre de Usuario</td>" +
    "</tr>";

  for (let i = 0; i < arrayGeneral.length; i++) {
    document.getElementById("tablaUsuario").insertRow(-1).innerHTML =
      '<td id="' +
      arrayGeneral[i].nombreUsuario +
      '"><button onclick="eliminarFila(\'' +
      arrayGeneral[i].nombreUsuario +
      "')\">X</button></td>" +
      "<td>" +
      arrayGeneral[i].NombreUsuario +
      "</td>" +
      "<td>" +
      arrayGeneral[i].Email +
      "</td>" +
      "<td>" +
      arrayGeneral[i].codCCAA +
      "</td>" +
      "<td>" +
      arrayGeneral[i].codProv +
      "</td>" +
      "<td>" +
      arrayGeneral[i].nombreUsuario +
      "</td>";
  }
  console.log("datos usuarios" + pintarFilaUsuarios);
}

function cargarProvincias() {
  let valorSeleccionado = document.getElementById("selecCCAA").value;

  const encontrar = CCAA.find(
    (elemento) => elemento.codigoCCAA == valorSeleccionado
  );

  // encontrar{  el que has seleccionado
  //     codigoCCAA: "01",
  //     nombre: "Andalucia",
  //     Provincias: [
  //       { codi: 1, provincia: "Malaga" },
  //       { codi: 2, provincia: "Sevilla" },
  //       { codi: 3, provincia: "Almería" },
  //     ],
  //   },

  if (encontrar != null) {
    removeOptions(document.getElementById("selecProvincia"));

    select = document.getElementById("selecProvincia");

    for (let i = 0; i < encontrar.Provincias.length; i++) {
      var opt = document.createElement("option");
      opt.value = encontrar.Provincias[i].codi;
      opt.innerHTML = encontrar.Provincias[i].provincia;
      select.appendChild(opt);
    }
  }
}

function guardarDatos() {
  let nombre = document.getElementById("nombre").value;
  let correo = document.getElementById("email").value;
  let activo = document.getElementById("activo").value;
  let comunidad = document.getElementById("selecCCAA").value;
  let provincia = document.getElementById("selecProvincia").value;
  let nombreUsu = document.getElementById("nombreUsuario").value;

  let nuevoUsuario = {
    NombreUsuario: nombre,
    Email: correo,
    codCCAA: comunidad,
    codProvi: provincia,
    nombreUsuario: nombreUsu,
  };

  if (nuevoUsuario != null) {
    ColeccionUsuarios.push(nuevoUsuario);
  }
  //borrar el contenido de los input una vez guardados
  document.getElementById("nombre").value = "";
  document.getElementById("email").value = "";
  document.getElementById("activo").value = "";
  document.getElementById("selecCCAA").value = "";
  document.getElementById("selecProvincia").value = "";
  document.getElementById("nombreUsuario").value = "";

  let arrayFilas = document.querySelectorAll("#tablaUsuario tbody tr"); // coleccionUsuarios = [{...},{...},{...}, ...]

  arrayFilas.forEach(function (element) {
    element.remove();
  });

  cargarFilaUsuarios();

  // INSERTAR UNA NUEVA LINEA CON LOS DATOS NUEVOS
  // document.getElementById('tablaUsuario').insertRow(-1).innerHTML =  '<td></td>'+
  // '<td>'+ nuevoUsuario.NombreUsuario+'</td>'+
  // '<td>'+ nuevoUsuario.Email +'</td>'+
  // '<td>'+ nuevoUsuario.codCCAA +'</td>'+
  // '<td>'+ nuevoUsuario.codProvi +'</td>'+
  // '<td>'+ nuevoUsuario.nombreUsuario +'</td>';
}

function eliminarFila(elementoId) {
  document
    .querySelectorAll('#tablaUsuario td[id="' + elementoId + '"]')
    .forEach((element) => element.parentElement.remove());
}

function filtrarPorNombre() {
  let arrayFiltrado = [];

  let buscarPor = document.getElementById("valorABuscar").value;

  ColeccionUsuarios.forEach(function (element) {
    let resultado = element.NombreUsuario.includes(buscarPor);
    if (resultado == true) {
      arrayFiltrado.push(element);
    }
  });

  pintarFilaUsuarios(arrayFiltrado);
}

function filtrarPorCCAA() {
  let nuevoArraycomunidad = [];

  for (let element of ColeccionUsuarios) {
    let resultado = element.codCCAA.includes("01");

    if (resultado == true) {
      nuevoArraycomunidad.push(element);
    }
  }
  pintarFilaUsuarios(nuevoArraycomunidad);
}
