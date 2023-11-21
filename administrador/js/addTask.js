import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { TEMAS } = api;

export default async function addTask(e = null) {
  if (e === null) {
    if (
      !location.pathname.includes("registrarActividad.html") &&
      !location.pathname.includes("editarActividad.html")
    )
      return;

    const formData = new FormData();
    formData.append("idTema", sessionStorage.getItem("idTemaGO"));

    let options = {
      method: "POST",
      body: formData,
    };

    let res = await helpHttp().post(`${TEMAS}getTema.php`, options);
    // console.log(res);

    if (res === null) {
      alert("Ocurrio un error, vuleva a intentarlo");
      return;
    }

    d.getElementById("name-tema").textContent = res.nombre;

    sessionStorage.setItem("countTask", 1);
    insertTask(1);
  } else {
    if (!e.target.matches("#add-task") && !e.target.matches("#add-task *"))
      return;

    let countTask = sessionStorage.getItem("countTask") || 0;

    countTask++;
    sessionStorage.setItem("countTask", countTask);

    insertTask(countTask);
  }
}

async function insertTask(count) {
  const $template = d.getElementById("template-form-task").content;
  const $taskcontainer = d.getElementById("task-container");

  $template.getElementById("num-task").textContent = count;

  let $clone = d.importNode($template, true);
  $clone.querySelector(".task-delete").setAttribute("data-task", count);
  $clone.querySelector(".task-delete i").setAttribute("data-task", count);
  if (count <= 1) $clone.querySelector(".task-delete").classList.add("d-none");
  $taskcontainer.appendChild($clone);
}
