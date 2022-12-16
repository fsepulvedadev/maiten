/*
-------------------------------------------------------------------------------------------------


                //   Desarrollado por Francisco Sepulveda para COPADE - 2022    \\
// Pueden contactarme en https://fsepulveda.vercel.app/ o por mail fsepulvedadev@gmail.com \\
radiosAreasNat

-------------------------------------------------------------------------------------------------

*/

// IMPORTACIONES
import datosNeuquen from "./capas/datos_neuquen.json" assert { type: "json" };
import verdeData from "./capas/espacios-verdes.json" assert { type: "json" };
import manchaUrbNqn from "./capas/mancha_urbana_nqncap.json" assert { type: "json" };
import radiosVerdeDisueltos from "./capas/radio_combinado_espacios_verdes_disuelto.json" assert { type: "json" };
import areasNaturalesData from "./capas/areas_naturales.json" assert { type: "json" };
import azulData from "./capas/espacios_azules_nqncap.json" assert { type: "json" };
import radiosEspVerdes from "./capas/radio_cobertura_espacios_verdes.json" assert { type: "json" };
import radiosEspAzules from "./capas/radios-esp-azules.json" assert { type: "json" };
import radiosAreasNat from "./capas/radios-areas-nat.json" assert { type: "json" };
import radiosCombinados from "./capas/radios_combinados.json" assert { type: "json" };
// END IMPORTACIONES

// DEFINICIONES
const map = L.map("map", {
  center: [-38.9410802, -68.1854411],
  zoom: "12",
});

let capaSelecionada = "tipos";
let idCapaSeleccionada = 999999999;

const infAzulLayers = L.geoJSON(azulData, {
  style: {
    weight: 2,
    opacity: 1,
    color: "#0570b0",
    dashArray: "3",
    fillOpacity: 0.25,
  },
  onEachFeature: onEachFeatureNotInfVerde,
});

const areasNatLayers = L.geoJSON(areasNaturalesData, {
  style: {
    weight: 2,
    opacity: 1,
    color: "#006d2c",
    dashArray: "3",
    fillOpacity: 0.25,
  },
  onEachFeature: onEachFeatureNotInfVerde,
});
const manchaUrbNqnLayers = L.geoJSON(manchaUrbNqn, {
  style: {
    weight: 2,
    opacity: 1,
    color: "#937D64",
    dashArray: "3",
    fillOpacity: 0.25,
  },
});
const radiosCoberturaVerdeNqnLayers = L.geoJSON(radiosVerdeDisueltos, {
  style: {
    weight: 2,
    opacity: 1,
    color: "#4D8B31",
    dashArray: "3",
    fillOpacity: 0.25,
  },
});

const filtrarRadios = (feature) => {
  if (feature.properties.id === idCapaSeleccionada) {
    return true;
  }
};
let radiosInfVerde = "";
const capasEspaciosVerdes = document.getElementById(
  "lista-capas-espacios-verdes"
);
const ModalDetalle = document.getElementById("detalle-modal");
const btnCerrarModalDetalle = document.getElementById(
  "detalle-modal-btn-cerrar"
);
const absorcionTag = document.getElementById("absorcion");
const arboladoTag = document.getElementById("arbolado");
const superficieTag = document.getElementById("superficie");
const infraVerdeBtn = document.getElementById("infra-verde");
const infraAzulBtn = document.getElementById("infra-azul");
const areasNatBtn = document.getElementById("areas-nat");
const radiosCoberturaVerdeNqnBtn = document.getElementById("radios-cobertura");
const manchaUrbanaBtn = document.getElementById("mancha-urbana");
const mapaNegro = document.getElementById("negro");
const mapaGris = document.getElementById("gris");
const mapaSatelite = document.getElementById("satelite");
const negro =
  "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/argenmap_oscuro@EPSG:3857@png/{z}/{x}/{-y}.png";
const gris =
  "https://wms.ign.gob.ar/geoserver/gwc/service/tms/1.0.0/mapabase_gris@EPSG:3857@png/{z}/{x}/{-y}.png";

/* const modalAdvertencia = document.getElementById("modal"); */
const tiposTag = document.getElementById("tipo");
var sidebar = L.control.sidebar("sidebar").addTo(map);
const listaLocalidades = document.getElementById("lista-localidades");
var info = L.control();
const BING_KEY =
  "Av3IJWsQuEeoFjlg5eoVctOE9QvC_EXejm8IlG7m80D0KDWV8bK3cDhjpF4k-mfv";
const localidades = [
  {
    nombre: "Zapala",
    loc: [-38.9040134, -70.0799899],
    id: "zapala",
    zoom: 13,
  },
  {
    nombre: "Loncopue",
    loc: [-38.0711421, -70.6204302],
    id: "loncopue",
    zoom: 15,
  },
  {
    nombre: "Piedra del aguila",
    loc: [-40.0472301, -70.0847779],
    id: "piedra",
    zoom: 15,
  },
  {
    nombre: "Picun Leufu",
    loc: [-39.5177718, -69.2969567],
    id: "picun",
    zoom: 15,
  },
  {
    nombre: "Cutral-co",
    loc: [-38.9374343, -69.2552547],
    id: "cutralco",
    zoom: 14,
  },
  {
    nombre: "Plaza Huincul",
    loc: [-38.933991, -69.2089947],
    id: "plaza",
    zoom: 14,
  },
  { nombre: "Añelo", loc: [-38.3524438, -68.7931937], id: "anelo", zoom: 15 },
  {
    nombre: "Chos malal",
    loc: [-37.3716726, -70.2891886],
    id: "chosmalal",
    zoom: 14,
  },
  {
    nombre: "Rincon de los Sauces",
    loc: [-37.3967149, -68.9470263],
    id: "rincon",
    zoom: 14,
  },
  {
    nombre: "Plottier",
    loc: [-38.9475497, -68.2376048],
    id: "plottier",
    zoom: 15,
  },
  {
    nombre: "Centenario",
    loc: [-38.830157, -68.1741028],
    id: "centenario",
    zoom: 13,
  },
  {
    nombre: "Villa la Angostura",
    loc: [-40.7632679, -71.6504163],
    id: "villa",
    zoom: 15,
  },
  {
    nombre: "Junin de los Andes",
    loc: [-39.9466055, -71.1087068],
    id: "junin",
    zoom: 13,
  },
  {
    nombre: "San martin de los andes",
    loc: [-40.1390821, -71.3346403],
    id: "sanmartin",
    zoom: 13,
  },
  {
    nombre: "Pehuenia",
    loc: [-38.890998, -71.1938877],
    zoom: 14,
    id: "pehuenia",
  },
  {
    nombre: "Alumine",
    loc: [-39.2363186, -70.9376694],
    id: "alumine",
    zoom: 14,
  },
  {
    nombre: "Las lajas",
    loc: [-38.5302419, -70.389171],
    id: "laslajas",
    zoom: 14,
  },
  {
    nombre: "Neuquen Capital",
    loc: [-38.9410802, -68.1854411],
    id: "neuquen",
    zoom: 12,
  },
];
let tiposDeEspacios = [
  ...new Set(verdeData.features.map((e) => e.properties.tipo)),
];
let base = "gris";
let mapaBase = L.tileLayer(gris, {
  attribution:
    '&copy; <a href="https://ign-argentina.github.io/argenmap-web/">Argenmap</a> ',
}).addTo(map);
const colors = {
  selecionado: [
    "#8dd3c7",
    "#ffffb3",
    "#bebada",
    "#fb8072",
    "#059669",
    "#006d2c",
  ],
  tipos: ["#8dd3c7", "#ffffb3", "#bebada", "#fb8072", "#059669", "#006d2c"],
  arbolado: ["#edf8e9", "#c7e9c0", "#a1d99b", "#74c476", "#31a354", "#006d2c"],
  absorcion: ["#d0d1e6", "#a6bddb", "#74a9cf", "#3690c0", "#0570b0", "#034e7b"],
  superficie: [
    "#ffffd4",
    "#fee391",
    "#fec44f",
    "#fe9929",
    "#d95f0e",
    "#993404",
  ],
};
let activas = {
  infVerde: false,
  infAzul: false,
  areasNat: false,
  radiosCober: false,
  manchaUrb: false,
};

// END DEFINICIONES

// EVENT HANDLERS

const toggleCapasVerdes = () => {
  if (capasEspaciosVerdes.classList.contains("hidden")) {
    capasEspaciosVerdes.classList.add("grid");
    capasEspaciosVerdes.classList.remove("hidden");
  } else {
    capasEspaciosVerdes.classList.add("hidden");
    capasEspaciosVerdes.classList.remove("grid");
  }
};

const handleCerrarModalDetalle = () => {
  ModalDetalle.classList.add("hidden");
};

const handleSeleccionarMapaBase = (e) => {
  let selecionado = e.target;

  mapaNegro.classList.remove("border-2");
  mapaGris.classList.remove("border-2");
  mapaSatelite.classList.remove("border-2");
  selecionado.classList.add("border-2");
  /*  argenmap.remove(); */
  mapaBase.remove();
  switch (e.target.id) {
    case "negro":
      base = "negro";
      mapaBase = L.tileLayer(negro, {
        attribution:
          '&copy; <a href="https://ign-argentina.github.io/argenmap-web/">Argenmap</a> ',
      }).addTo(map);
      break;
    case "gris":
      base = "gris";
      mapaBase = L.tileLayer(gris, {
        attribution:
          '&copy; <a href="https://ign-argentina.github.io/argenmap-web/">Argenmap</a> ',
      }).addTo(map);
      break;
    case "satelite":
      base = "satelite";
      mapaBase = L.tileLayer.bing(BING_KEY).addTo(map);
      break;

    default:
      break;
  }
};

const handleClickLocalidades = (e) => {
  let targetId = e.target.id;
  let target = localidades.find((e) => e.id === targetId);
  map.flyTo(target.loc, target.zoom);
  cambiarATabDetalle();
  cargarDetalle(target.nombre);
  cerrarSidebar();
  setTimeout(() => {
    abrirSidebar();
  }, 500);
};

const cambiarATabDetalle = () => {
  let tabActual = document.querySelector("li.active");
  let tabTarget = document.getElementById("detalle-tab");
  let paneActual = document.getElementById("ciudades");
  let paneTarget = document.getElementById("detalle");

  tabActual.classList.remove("active");
  tabTarget.classList.add("active");

  paneActual.classList.remove("active");
  paneTarget.classList.add("active");
};

const cargarDetalle = (targetId) => {
  let detalleTitulo = document.getElementById("detalle-titulo");

  detalleTitulo.innerText = targetId;
};
const abrirSidebar = () => {
  let targetSidebar = document.getElementById("sidebar");
  let paneTarget = document.getElementById("detalle");
  paneTarget.classList.add("active");

  targetSidebar.classList.remove("collapsed");
};
const cerrarSidebar = () => {
  let targetSidebar = document.getElementById("sidebar");
  let tabTarget = document.querySelector("li.active");
  tabTarget.classList.remove("active");
  targetSidebar.classList.add("collapsed");
};
const cambiarCapaEspaciosVerdes = (e) => {
  let target = e.target;
  /* cerrarSidebar(); */

  let abs = document.querySelectorAll("#absorcion");
  let arb = document.querySelectorAll("#arbolado");
  let sup = document.querySelectorAll("#superficie");
  let tip = document.querySelectorAll("#tipo");

  abs.forEach((e) => {
    e.classList.remove("ring-2");
  });
  arb.forEach((e) => {
    e.classList.remove("ring-2");
  });
  sup.forEach((e) => {
    e.classList.remove("ring-2");
  });
  tip.forEach((e) => {
    e.classList.remove("ring-2");
  });

  switch (target.id) {
    case "arbolado":
      let targetEle = document.querySelector(
        "div#arbolado.w-full.cursor-pointer.p-1.rounded.ring-green-600"
      );
      targetEle.classList.add("ring-2");
      break;
    case "absorcion":
      let targetEle2 = document.querySelector(
        "div#absorcion.w-full.cursor-pointer.p-1.rounded.ring-blue-400"
      );
      targetEle2.classList.add("ring-2");
      break;
    case "superficie":
      let targetEle3 = document.querySelector(
        "div#superficie.w-full.cursor-pointer.p-1.rounded.ring-orange-400"
      );
      targetEle3.classList.add("ring-2");
      break;
    case "tipo":
      let targetEle4 = document.querySelector(
        "div#tipo.w-full.cursor-pointer.p-1.rounded.ring-emerald-600"
      );
      targetEle4.classList.add("ring-2");
      break;

    default:
      break;
  }
  console.log(target.id);
  leyenda.remove();
  switch (target.id) {
    case "absorcion":
      capaSelecionada = "abs";
      agregarIndice(capaSelecionada);

      infVerdeLayers.setStyle(style);

      colors.selecionado = colors.absorcion;
      break;

    case "arbolado":
      capaSelecionada = "arb";
      agregarIndice(capaSelecionada);

      infVerdeLayers.setStyle(style);

      colors.selecionado = colors.arbolado;

      break;

    case "superficie":
      capaSelecionada = "sup";
      agregarIndice(capaSelecionada);

      infVerdeLayers.setStyle(style);

      colors.selecionado = colors.superficie;

      break;
    case "tipo":
      capaSelecionada = "tipos";
      agregarIndice(capaSelecionada);
      infVerdeLayers.setStyle(style);

      colors.selecionado = colors.tipos;

      break;

    default:
      break;
  }
};
const cambiarCapaGeneral = (e) => {
  let target = e.target.id;

  switch (target) {
    case "infra-verde":
      if (activas.infVerde) {
        infVerdeLayers.remove();
        leyenda.remove();
        activas.infVerde = false;
        e.path[2].classList.add("bg-green-600");
        e.path[2].classList.remove("bg-green-900");
        if (map.hasLayer(radiosInfVerde)) {
          radiosInfVerde.remove();
        }
        return;
      } else {
        agregarIndice(capaSelecionada);
        e.path[2].classList.remove("bg-green-600");
        e.path[2].classList.add("bg-green-900");
        infVerdeLayers.addTo(map);
        activas.infVerde = true;
      }

      break;

    case "infra-azul":
      if (!activas.infVerde) leyenda.remove();
      if (activas.infAzul) {
        infAzulLayers.remove();
        activas.infAzul = false;
        e.path[2].classList.add("bg-green-600");
        e.path[2].classList.remove("bg-green-900");
        if (map.hasLayer(radiosInfVerde)) {
          radiosInfVerde.remove();
        }
        return;
      } else {
        e.path[2].classList.remove("bg-green-600");
        e.path[2].classList.add("bg-green-900");
        infAzulLayers.addTo(map);
        activas.infAzul = true;
      }

      break;
    case "mancha-urbana":
      if (!activas.infVerde) leyenda.remove();
      if (activas.manchaUrb) {
        e.path[2].classList.add("bg-green-600");
        e.path[2].classList.remove("bg-green-900");
        manchaUrbNqnLayers.remove();
        activas.manchaUrb = false;
        return;
      } else {
        e.path[2].classList.remove("bg-green-600");
        e.path[2].classList.add("bg-green-900");
        manchaUrbNqnLayers.addTo(map);
        activas.manchaUrb = true;
      }

      break;
    case "radios-cobertura":
      if (!activas.infVerde) {
        e.path[2].classList.add("bg-green-600");
        e.path[2].classList.remove("bg-green-900");
        leyenda.remove();
      }
      if (activas.radiosCober) {
        radiosCoberturaVerdeNqnLayers.remove();
        activas.radiosCober = false;
        return;
      } else {
        e.path[2].classList.remove("bg-green-600");
        e.path[2].classList.add("bg-green-900");
        radiosCoberturaVerdeNqnLayers.addTo(map);
        activas.radiosCober = true;
      }

      break;

    case "areas-nat":
      if (!activas.infVerde) leyenda.remove();

      if (activas.areasNat) {
        e.path[2].classList.add("bg-green-600");
        e.path[2].classList.remove("bg-green-900");
        areasNatLayers.remove();
        activas.areasNat = false;
        if (map.hasLayer(radiosInfVerde)) {
          radiosInfVerde.remove();
        }

        return;
      } else {
        areasNatLayers.addTo(map);
        activas.areasNat = true;
        e.path[2].classList.remove("bg-green-600");
        e.path[2].classList.add("bg-green-900");
      }

      break;

    default:
      break;
  }
};

// END EVENT HANDLERS

// EVENT LISTENERS
btnCerrarModalDetalle.addEventListener("click", handleCerrarModalDetalle);
infraVerdeBtn.addEventListener("click", toggleCapasVerdes);
mapaNegro.addEventListener("click", handleSeleccionarMapaBase);
mapaGris.addEventListener("click", handleSeleccionarMapaBase);
mapaSatelite.addEventListener("click", handleSeleccionarMapaBase);
absorcionTag.addEventListener("click", cambiarCapaEspaciosVerdes);
arboladoTag.addEventListener("click", cambiarCapaEspaciosVerdes);
superficieTag.addEventListener("click", cambiarCapaEspaciosVerdes);
tiposTag.addEventListener("click", cambiarCapaEspaciosVerdes);
infraVerdeBtn.addEventListener("click", cambiarCapaGeneral);
infraAzulBtn.addEventListener("click", cambiarCapaGeneral);
areasNatBtn.addEventListener("click", cambiarCapaGeneral);
manchaUrbanaBtn.addEventListener("click", cambiarCapaGeneral);
radiosCoberturaVerdeNqnBtn.addEventListener("click", cambiarCapaGeneral);

//END EVENT LISTENERS

/* const handleCerrarModal = () => {
  modalAdvertencia.classList.add("hidden");
};
modalAdvertencia.addEventListener("click", handleCerrarModal);
#07BEB8
 */

const agregarRadios = () => {
  radiosInfVerde = L.geoJSON(radiosCombinados, {
    style: {
      weight: 2,
      opacity: 1,

      color: "#B7990D",
      dashArray: "6",
      fillOpacity: 0.45,
    },
    filter: filtrarRadios,
  })
    .bindTooltip(
      (layer) => {
        console.log(layer.feature.properties.layer);
        switch (layer.feature.properties.layer) {
          case "buffer_300m_plazas_posgar":
            return "Radio de cobertura de 300m";

          case "buffer_500m_plazas_posgar":
            return "Radio de cobertura de 500m";

          default:
            return "Radio de cobertura de 900m";
        }
      },
      {
        sticky: false,
        opacity: 1,
        offset: L.point(50, 14),
      }
    )
    .addTo(map);
  map.fitBounds(radiosInfVerde.getBounds());
};
const agregarRadiosNotVerde = () => {
  radiosInfVerde = L.geoJSON(radiosCombinados, {
    style: {
      weight: 2,
      opacity: 1,

      color: "#B7990D",
      dashArray: "6",
      fillOpacity: 0.45,
    },
    filter: filtrarRadios,
  })
    .bindTooltip(
      () => {
        return "Radio de cobertura de 900m";
      },
      {
        sticky: false,
        opacity: 1,
        offset: L.point(50, 14),
      }
    )
    .addTo(map);
  map.fitBounds(radiosInfVerde.getBounds());
};

const agregarLocalidadesAlista = () => {
  let listaLi = localidades.map(
    (e) =>
      `<li class='bg-green-700 text-white text-center rounded localidad cursor-pointer h-8 flex items-center justify-center font-bold hover:scale-105 duration-300 hover:shadow-lg hover:shadow-green-600' id=${e.id}>${e.nombre}</li>`
  );
  let concatenado = [];
  for (let i = 0; i < listaLi.length; i++) {
    concatenado += listaLi[i];
  }

  listaLocalidades.innerHTML = concatenado;
  let botones = document.getElementsByClassName("localidad");
  let listaBotones = [].slice.call(botones);
  listaBotones.forEach((e) => {
    e.addEventListener("click", handleClickLocalidades);
  });
};

agregarLocalidadesAlista();

const agregarIndice = (tipo) => {
  let otrosIndices = document.querySelectorAll(
    "div.info.legend.leaflet-control"
  );
  if (otrosIndices.length === 0) {
    let grados;

    if (tipo === "sup") {
      grados = [0, 1000, 8000, 30000];
      leyenda.onAdd = function (map) {
        let div = L.DomUtil.create("div", "info legend"),
          grades = grados,
          labels = [];

        let listaIndices = "";

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
          listaIndices +=
            '<i style="background:' +
            getColor(grades[i] + 1, "sup") +
            ";" +
            'margin-right: 5px;"></i> ' +
            grades[i] +
            (grades[i + 1]
              ? " - " + grades[i + 1] + " m" + "<sup>2</sup>"
              : "+" + " m" + "<sup>2</sup>") +
            "<br>";
        }

        div.innerHTML =
          `<h2 class='text-orange-400 font-bold my-2'>Superficie</h2>` +
          listaIndices;

        return div;
      };
      leyenda.addTo(map);
    } else if (tipo === "arb") {
      grados = [1, 2, 3, 4];
      leyenda.onAdd = function (map) {
        let div = L.DomUtil.create("div", "info legend"),
          grades = grados,
          labels = [];

        let listaIndices = "";

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
          listaIndices +=
            '<i style="background:' +
            getColor(grades[i] + 1, "arb") +
            ";" +
            'margin-right: 5px;"></i> ' +
            calcularPorcentajes(grades[i]) +
            "<br>";
        }

        div.innerHTML =
          `<h2 class='text-green-700 font-bold my-2'>Arbolado</h2>` +
          listaIndices;

        return div;
      };
      leyenda.addTo(map);
    } else if (tipo === "tipos") {
      grados = tiposDeEspacios;

      leyenda.onAdd = function (map) {
        var div = L.DomUtil.create("div", "info legend"),
          grades = grados,
          labels = [];

        let listaGrados = "";

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
          listaGrados +=
            '<i style="background:' +
            getColor(grades[i], "tipos") +
            ";" +
            'margin-right: 5px;"></i> ' +
            (tiposDeEspacios[i] === "X"
              ? "Plazoleta Pequeña"
              : tiposDeEspacios[i]) +
            "<br>";
        }
        div.innerHTML =
          `<h2 class= 'text-emerald-600 font-bold my-2'>Tipos de Espacios</h2>` +
          listaGrados;

        return div;
      };

      leyenda.addTo(map);
    } else if (tipo === "abs") {
      let grados = [1, 2, 3, 4];
      leyenda.onAdd = function (map) {
        let div = L.DomUtil.create("div", "info legend"),
          grades = grados,
          labels = [];

        let listaIndices = "";

        // loop through our density intervals and generate a label with a colored square for each interval
        for (var i = 0; i < grades.length; i++) {
          listaIndices +=
            '<i style="background:' +
            getColor(grades[i] + 1, "abs") +
            ";" +
            'margin-right: 5px;"></i> ' +
            calcularPorcentajes(grades[i]) +
            "<br>";
        }
        div.innerHTML =
          `<h2 class='text-blue-500 font-bold my-2'>Absorcion</h2>` +
          listaIndices;

        return div;
      };
      leyenda.addTo(map);
    }
  } else {
    otrosIndices.forEach((e) => e.remove());
    agregarIndice(tipo);
  }
};

function getColor(d, tipo) {
  switch (tipo) {
    case "sup":
      colors.selecionado = colors.superficie;

      return d > 30000
        ? `${colors.selecionado[3]}`
        : d > 8000
        ? `${colors.selecionado[2]}`
        : d > 1000
        ? `${colors.selecionado[1]}`
        : `${colors.selecionado[0]}`;
      break;
    case "arb":
      colors.selecionado = colors.arbolado;

      return d > 5
        ? `${colors.selecionado[5]}`
        : d > 4
        ? `${colors.selecionado[4]}`
        : d > 3
        ? `${colors.selecionado[3]}`
        : d > 2
        ? `${colors.selecionado[2]}`
        : d > 1
        ? `${colors.selecionado[1]}`
        : `${colors.selecionado[0]}`;
      break;
    case "abs":
      colors.selecionado = colors.absorcion;

      return d > 5
        ? `${colors.selecionado[5]}`
        : d > 4
        ? `${colors.selecionado[4]}`
        : d > 3
        ? `${colors.selecionado[3]}`
        : d > 2
        ? `${colors.selecionado[2]}`
        : d > 1
        ? `${colors.selecionado[1]}`
        : `${colors.selecionado[0]}`;
      break;
    case "tipos":
      colors.selecionado = colors.tipos;
      return d === "Plaza"
        ? `${colors.selecionado[5]}`
        : d === "Plazoleta"
        ? `${colors.selecionado[4]}`
        : d === "Corredor"
        ? `${colors.selecionado[3]}`
        : d === "X"
        ? `${colors.selecionado[2]}`
        : d === "Parque"
        ? `${colors.selecionado[1]}`
        : `${colors.selecionado[0]}`;
      break;

    default:
      break;
  }
}
function onHoverNotEspaciosVerdes(e) {
  let layer = e.target;

  info.update(layer.feature.properties, false);
}

function highlightFeature(e) {
  var layer = e.target;

  info.update(layer.feature.properties, true);

  layer.setStyle({
    weight: 5,
    color: "#666",
    dashArray: "",
    fillOpacity: 0.7,
  });

  layer.bringToFront();
}

function resetHighlight(e) {
  infVerdeLayers.resetStyle(e.target);
  info.update();
}
function onEachFeature(feature, layer) {
  layer.on({
    mouseover: highlightFeature,
    mouseout: resetHighlight,
    click: zoomToFeature,
  });
}
function onEachFeatureNotInfVerde(feature, layer) {
  layer.on({
    mouseover: onHoverNotEspaciosVerdes,
    click: (e) => {
      zoomToFeatureNotVerde(e);
    },
  });
}

function style(features) {
  if (capaSelecionada === "sup")
    return {
      weight: 2,
      opacity: 1,
      color: getColor(features.properties.supm2, "sup"),
      dashArray: "3",
      fillOpacity: 1,
    };
  else if (capaSelecionada === "abs")
    return {
      weight: 2,
      opacity: 1,
      color: getColor(features.properties.suel_absor, "abs"),
      dashArray: "3",
      fillOpacity: 1,
    };
  else if (capaSelecionada === "tipos")
    return {
      weight: 2,
      opacity: 1,
      color: getColor(features.properties.tipo, "tipos"),
      dashArray: "3",
      fillOpacity: 1,
    };
  else
    return {
      weight: 2,
      opacity: 1,
      color: getColor(features.properties.arbolado, "arb"),
      dashArray: "3",
      fillOpacity: 1,
    };
}

function zoomToFeature(e) {
  if (radiosInfVerde !== "" && map.hasLayer(radiosInfVerde)) {
    radiosInfVerde.remove();
  }

  idCapaSeleccionada = e.target.feature.properties.id;

  agregarRadios();
}
function zoomToFeatureNotVerde(e) {
  if (radiosInfVerde !== "" && map.hasLayer(radiosInfVerde)) {
    radiosInfVerde.remove();
  }

  idCapaSeleccionada = e.target.feature.properties.id;

  agregarRadiosNotVerde();
}

function calcularPorcentajes(valor, tipo) {
  if (tipo === "tipos") {
    switch (+valor) {
      case 1:
        return "Plaza";
        break;
      case 2:
        return "Plazoleta";
        break;
      case 3:
        return "Corredor";
        break;
      case 4:
        return "Plazoleta Pequeña";
        break;
      case 5:
        return "Parque";
        break;
    }
  } else {
    switch (+valor) {
      case 1:
        return "0 a 25%";
        break;
      case 2:
        return "25 a 50%";
        break;
      case 3:
        return "50 a 75%";
        break;
      case 4:
        return "75 a 100%";
        break;
    }
  }
}

info.onAdd = function (map) {
  this._div = L.DomUtil.create("div", "info"); // create a div with a class "info"
  this.update();
  return this._div;
};

info.update = function (props, espaciosVerdes) {
  if (espaciosVerdes) {
    this._div.innerHTML =
      `<h4>${
        props
          ? props.tipo === "X"
            ? "Plazoleta pequeña"
            : props.tipo
          : "Datos de la capa"
      }</h4>` +
      (props
        ? `<i class="fa-solid fa-droplet"></i></i> Absorcion: <br/> ${calcularPorcentajes(
            props.suel_absor
          )} en relacion a m<sup>2</sup>` +
          "<br />" +
          `<i class="fa-solid fa-tree"></i> Arbolado: <br/> ${calcularPorcentajes(
            props.arbolado
          )} en relacion a m<sup>2</sup>` +
          "<br />" +
          `<i class="fa-solid fa-ruler-combined"></i> Superficie: <br/> ${props.supm2.toFixed(
            2
          )} m<sup>2</sup>`
        : "Seleccione una capa");
  } else {
    this._div.innerHTML =
      `<h4>${props ? props.name : "Datos de la capa"}</h4>` +
      "Aca va la info de la capa.";
  }
};

info.addTo(map);

// INDICE DE RANGOS
const leyenda = L.control({ position: "bottomright" });

leyenda.onAdd = function (map) {
  let grados;
  if (capaSelecionada === "tipos") {
    grados = tiposDeEspacios;
  } else {
    grados = [1, 2, 3, 4, 5];
  }

  var div = L.DomUtil.create("div", "info legend"),
    grades = grados,
    labels = [];

  let listaGrados = "";

  // loop through our density intervals and generate a label with a colored square for each interval
  for (var i = 0; i < grades.length; i++) {
    listaGrados +=
      '<i style="background:' +
      getColor(grades[i], "tipos") +
      ";" +
      'margin-right: 5px;"></i> ' +
      (tiposDeEspacios[i] === "X" ? "Plazoleta Pequeña" : tiposDeEspacios[i]) +
      "<br>";
  }
  div.innerHTML =
    `<h2 class= 'text-[#1b9e77] font-bold my-2'>Tipos de Espacios</h2>` +
    listaGrados;

  return div;
};
let infVerdeLayers = L.geoJSON(verdeData, {
  style: style,
  onEachFeature: onEachFeature,
});

leyenda.addTo(map);

/* 
const circle = L.circleMarker([-38.941, -67.115], {
  dashArray: "15,45",
  dashSpeed: -60,

  radius: radius,
  interactive: false,
}).addTo(map); */

// ELEMENTOS DE UI //

// create an array of objects with the id, trigger element (eg. button), and the content element
const tabElements = [
  {
    id: "general",
    triggerEl: document.querySelector("#detalle-general-tab"),
    targetEl: document.querySelector("#detalle-general"),
  },
  {
    id: "arbolado",
    triggerEl: document.querySelector("#detalle-arbolado-tab"),
    targetEl: document.querySelector("#detalle-arbolado"),
  },
  {
    id: "mobiliario",
    triggerEl: document.querySelector("#detalle-mobiliario-tab"),
    targetEl: document.querySelector("#detalle-mobiliario"),
  },
  {
    id: "absorcion",
    triggerEl: document.querySelector("#detalle-absorcion-tab"),
    targetEl: document.querySelector("#detalle-absorcion"),
  },
];

// options with default values
const options = {
  defaultTabId: "general",
  activeClasses:
    "text-green-600 hover:text-green-600 dark:text-green-600 dark:hover:text-green-600 border-green-600 dark:border-green-500",
  inactiveClasses:
    "text-gray-500 hover:text-gray-600 dark:text-gray-400 border-gray-100 hover:border-gray-300 dark:border-gray-700 dark:hover:text-gray-300",
  onShow: () => {
    /* ModalDetalle.classList.remove("hidden"); */
  },
};

const tabs = new Tabs(tabElements, options);

//    Graficos    //

// MOBILIARIO //
let valoresMobBasico = [];
let valoresMobSup = [];
let valoresSinMob = [];

datosNeuquen.map((dato) => {
  if (
    dato.tipo === "Corredor" ||
    dato.tipo === "Plaza" ||
    dato.tipo === "Parque" ||
    dato.tipo === "Plazoleta"
  )
    valoresMobBasico.push(dato.mobiliarioBasico);
  valoresMobSup.push(dato.mobiliarioSuperior);
  valoresSinMob.push(dato.mobiliarioNoPosee);
});

let sumatoriaMobBasico = valoresMobBasico.reduce(
  (acc, current) => acc + current,
  0
);
let sumatoriaMobSup = valoresMobSup.reduce((acc, current) => acc + current, 0);
let sumatoriaSinMob = valoresSinMob.reduce((acc, current) => acc + current, 0);

console.log(datosNeuquen);

Chart.register(ChartDataLabels);

const ctxChartMobiliario = document.getElementById("graficoMobiliario");

const chartMobiliario = new Chart(ctxChartMobiliario, {
  type: "doughnut",
  plugins: [ChartDataLabels],
  data: {
    labels: ["No posee", "Basico", "Superior"],
    datasets: [
      {
        label: "Cantidad",
        data: [sumatoriaSinMob, sumatoriaMobBasico, sumatoriaMobSup],
        borderWidth: 1,
        backgroundColor: ["#FF8811", "#9DD9D2", "#392F5A"],
      },
    ],
  },

  options: {
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: ["#392F5A", "#FF8811", "#9DD9D2"],
        font: { size: "14rem" },
      },
    },
    scales: {
      y: {
        display: false,
      },
    },
  },
});
// END MOBILIARIO //

// GRAFICO ABSORCION //

const ctxChartAbsorcion = document.getElementById("graficoAbsorcion");

const chartAbsorcion = new Chart(ctxChartAbsorcion, {
  type: "doughnut",
  plugins: [ChartDataLabels],
  data: {
    labels: [
      "Absorcion de 0 a 25%",
      "Absorcion de 25 a 50%",
      "Absorcion de 50 a 75%",
      "Absorcion de 75 a 100%",
    ],
    datasets: [
      {
        label: "Cantidad",
        data: [
          datosNeuquen[5].sueloAbsorbente0A25,
          datosNeuquen[5].sueloAbsorbente25A50,
          datosNeuquen[5].sueloAbsorbente50A75,
          datosNeuquen[5].sueloAbsorbente75a100,
        ],
        borderWidth: 1,
        backgroundColor: ["#FF8811", "#9DD9D2", "#392F5A", "#0072BB"],
      },
    ],
  },

  options: {
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: ["#392F5A", "#0072BB", "#9DD9D2", "#FF8811"],
        font: { size: "14rem" },
      },
    },
    scales: {
      y: {
        display: false,
      },
    },
  },
});

// END GRAFICO ABSORCION //
// GRAFICO ARBOLADO //

const ctxChartArbolado = document.getElementById("graficoArbolado");

const chartArbolado = new Chart(ctxChartArbolado, {
  type: "doughnut",
  plugins: [ChartDataLabels],
  data: {
    labels: [
      "Arbolado de 0 a 25%",
      "Arbolado de 25 a 50%",
      "Arbolado de 50 a 75%",
      "Arbolado de 75 a 100%",
    ],
    datasets: [
      {
        label: "Cantidad",
        data: [
          datosNeuquen[5].arbolado0A25,
          datosNeuquen[5].arbolado25A50,
          datosNeuquen[5].arbolado50A75,
          datosNeuquen[5].arbolado75A100,
        ],
        borderWidth: 1,
        backgroundColor: ["#FF8811", "#9DD9D2", "#392F5A", "#0072BB"],
      },
    ],
  },

  options: {
    plugins: {
      datalabels: {
        formatter: (value, ctx) => {
          let sum = 0;
          let dataArr = ctx.chart.data.datasets[0].data;
          dataArr.map((data) => {
            sum += data;
          });
          let percentage = ((value * 100) / sum).toFixed(2) + "%";
          return percentage;
        },
        color: ["#392F5A", "#0072BB", "#9DD9D2", "#FF8811"],
        font: { size: "14rem" },
      },
    },
    scales: {
      y: {
        display: false,
      },
    },
  },
});

// END GRAFICO ARBOLADO //

// GRAFICO  PORCENTAJE ESPACIOS VERDES //

// END GRAFICO  PORCENTAJE ESPACIOS VERDES //

// END Graficos //

//END ELEMENTOS DE UI //
