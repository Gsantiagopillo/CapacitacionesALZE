import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { DOMAIN, ACTIVIDADES } = api;

export default async function infoActividad() {
  if (
    !location.pathname.includes("/editarActividad.html") ||
    !sessionStorage.getItem("idActividadGO")
  )
    return;

  sessionStorage.removeItem("list-task-delete"); // remueve el item que guarda la lista de entregables a eliminar
  sessionStorage.removeItem("list-ask-delete"); // remueve el item que guarda la lista de preguntas a eliminar

  const idActividad = sessionStorage.getItem("idActividadGO");

  const formData = new FormData();
  formData.append("id", idActividad);
  let options = {
    method: "POST",
    body: formData,
  };

  const activity = await helpHttp().post(
    `${ACTIVIDADES}getActividad.php`,
    options
  );

  if (Object.keys(activity).length === 0 || activity.err) {
    alert("Ocurrio un error, vuleva a intentarlo");
    return;
  }

  const $form = d.getElementById("form-edit-activity");
  const videoCurrent = d.getElementById("act-video-current");

  $form["nombre"].value = activity.nombre;
  videoCurrent.href = `${DOMAIN}assets/actividades/${activity["video"]}`;
  videoCurrent.textContent = `${activity["video"]}`;
  $form["description"].value = activity["descripcion"];

  const tasks = await helpHttp().post(
    `${ACTIVIDADES}getEntregables.php`,
    options
  );

  if (tasks.length === 0 || tasks.err) {
    alert("Ocurrio un error, vuleva a intentarlo");
    return;
  }

  console.log(tasks);
  const $taskcontainer = d.getElementById("task-container");
  let $template = d.getElementById("template-form-task").content;

  $taskcontainer.innerHTML = "";

  sessionStorage.setItem("countTask", tasks.length);

  for (let i = 0; i < tasks.length; i++) {
    $template.getElementById("num-task").textContent = i + 1;

    let $clone = d.importNode($template, true);
    $clone.getElementById("name-task").value = tasks[i]["nombre"];
    $clone.getElementById("desc-task").value = tasks[i]["descripcion"];
    $clone.getElementById("task-file-current").textContent =
      tasks[i]["archivo"];
    $clone
      .getElementById("task-file-current")
      .setAttribute(
        "href",
        `${DOMAIN}assets/entregables/actividad/${tasks[i]["archivo"]}`
      );
    $clone.querySelector(".task-delete").setAttribute("data-task", i + 1);
    $clone.querySelector(".task-delete i").setAttribute("data-task", i + 1);
    $clone
      .querySelector(".task-delete")
      .setAttribute("data-task-id", tasks[i].id);
    $clone
      .querySelector(".task-delete i")
      .setAttribute("data-task-id", tasks[i].id);
    if (i + 1 <= 1)
      $clone.querySelector(".task-delete").classList.add("d-none");
    $taskcontainer.appendChild($clone);
  }

  const asks = await helpHttp().post(
    `${ACTIVIDADES}getFormulario.php`,
    options
  );

  if (tasks.length === 0 || tasks.err) {
    alert("Ocurrio un error, vuleva a intentarlo");
    return;
  }

  console.log(asks);

  const $askcontainer = d.getElementById("asks-container");
  $template = d.getElementById("template-form-ask").content;

  $askcontainer.innerHTML = "";

  sessionStorage.setItem("countAsk", asks.length);
  for (let i = 0; i < asks.length; i++) {
    $template.getElementById("num-ask").textContent = i + 1;

    let $clone = d.importNode($template, true);
    $clone.getElementById("name-ask").value = asks[i]["pregunta"];
    $clone.getElementById("answer-1").value = asks[i]["resp1"];
    $clone.getElementById("answer-2").value = asks[i]["resp2"];
    $clone.getElementById("answer-3").value = asks[i]["resp3"];
    $clone.getElementById("answer-3").value = asks[i]["resp3"];
    $clone.getElementById("answer-correct").value = asks[i]["respcorr"];

    $clone.querySelector(".ask-delete").setAttribute("data-ask", i + 1);
    $clone.querySelector(".ask-delete i").setAttribute("data-ask", i + 1);
    $clone.querySelector(".ask-delete").setAttribute("data-ask-id", asks[i].id);
    $clone
      .querySelector(".ask-delete i")
      .setAttribute("data-ask-id", asks[i].id);
    if (i + 1 <= 1) $clone.querySelector(".ask-delete").classList.add("d-none");
    $askcontainer.appendChild($clone);
  }
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems);
}
