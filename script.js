const fecha = document.querySelector("#fecha");
const lista = document.getElementById("lista");
const input = document.getElementById("input");
const bottomEnter = document.getElementById("enter");
const check = "fa-check-circle";
const uncheck = "fa-circle";
const lineThrough = "line-through";
let id;
let LIST;

const FECHA = new Date();
fecha.innerHTML = FECHA.toLocaleDateString("es-MX", {
  weekday: "long",
  month: "short",
  day: "numeric",
  year: "numeric",
});

function agregarTarea(tarea, id, realizado, eliminado) {
  if (eliminado) {
    return;
  }

  const REALIZADO = realizado ? check : uncheck;
  const LINE = realizado ? lineThrough : "";

  const element = `
        <li>
          <i data="realizado" id="${id}" class="far ${REALIZADO}"></i>
          <p class="text ${LINE}">${tarea}</p>
          <i data="eliminado" id="${id}" class="fas fa-trash de"></i>
        </li>
  `;
  lista.insertAdjacentHTML("beforeend", element);
}

function tareaRealizada(element) {
  console.log(element);
  element.classList.toggle(check);
  element.classList.toggle(uncheck);
  element.parentNode.querySelector(".text").classList.toggle(lineThrough);
  LIST[element.id].realizado = LIST[element.id].realizado ? false : true;
}

function tareaEliminada(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);
  LIST[element.id].eliminado = true;
}

bottomEnter.addEventListener("click", () => {
  const tarea = input.value.trim();
  if (tarea) {
    agregarTarea(tarea, id, false, false);
    LIST.push({
      nombre: tarea,
      id: id,
      realizado: false,
      eliminado: false,
    });
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
  input.value = "";
  id++;
});

document.addEventListener("keyup", function (e) {
  if (e.key == "Enter") {
    const tarea = input.value.trim();
    if (tarea) {
      agregarTarea(tarea, id, false, false);
      LIST.push({
        nombre: tarea,
        id: id,
        realizado: false,
        eliminado: false,
      });
    }
    localStorage.setItem("TODO", JSON.stringify(LIST));
    input.value = "";
    id++;
  }
});

lista.addEventListener("click", function (event) {
  const element = event.target;
  const elementData = element.attributes.data.value;

  if (elementData === "realizado") {
    tareaRealizada(element);
  } else if (elementData === "eliminado") {
    tareaEliminada(element);
  }
  localStorage.setItem("TODO", JSON.stringify(LIST));
});

let data = localStorage.getItem("TODO");
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length;
  cargarLista(LIST);
} else {
  LIST = [];
  id = 0;
}

function cargarLista(DATA) {
  DATA.forEach(function (i) {
    agregarTarea(i.nombre, i.id, i.realizado, i.eliminado);
  });
}
