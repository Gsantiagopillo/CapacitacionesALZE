import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { ADMINS, DOMAIN, TEMAS, ACTIVIDADES } = api;

export default async function editarActividad(e) {
  if (!e.target.matches("#form-edit-activity")) return;

  const $load = d.querySelector(".load");
  $load.style.display = "flex";

  const idActividad = sessionStorage.getItem("idActividadGO");

  let tasksRemove =
    JSON.parse(sessionStorage.getItem("list-task-delete")) || [];
  let asksRemove = JSON.parse(sessionStorage.getItem("list-ask-delete")) || [];

  for (let i = 0; i < tasksRemove.length; i++) {
    deleteTask(tasksRemove[i]);
  }
  for (let i = 0; i < asksRemove.length; i++) {
    deleteAsk(asksRemove[i]);
  }

  return;

  const $form = d.getElementById("form-edit-activity"),
    id = $form["id-tema"].value,
    nombre = $form.nombre.value;

  const formData = new FormData();

  formData.append("id", id);
  formData.append("nombre", nombre);

  if ($form.logo.files.length > 0) {
    const logo = $form["logo"].files[0];
    formData.append("logo", logo);
  }

  let options = {
    method: "POST",
    headers: {
      "enc-type": "multipart/form-data",
    },
    body: formData,
  };

  let res = await helpHttp().post(`${TEMAS}editTema.php`, options);
  console.log(res);

  if (!res.err) {
    if (res["update"] === false) {
      alert(res.statusText);
      $load.style.display = "none";
      return;
    }
    alert(`Tema: ${res.nombre} actualizado`);
    location.replace(`${ADMINS}indexadmin.html`);
  } else {
    alert("ocurrio un error al actualizar el tema");
    $load.style.display = "none";
  }
}

export function ActividadToEdit(e) {
  if (
    !e.target.matches("#td-activity-edit") &&
    !e.target.matches("#td-activity-edit *")
  )
    return;

  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idActividadGO", id);
  location.replace(`${ADMINS}editarActividad.html`);
}

async function deleteTask(id) {
  const formData = new FormData();
  formData.append("id", id);

  let options = {
    method: "POST",
    body: formData,
  };

  const res = await helpHttp().post(
    `${ACTIVIDADES}deleteEntregable.php`,
    options
  );

  console.log(res);
}

async function deleteAsk(id) {
  const formData = new FormData();
  formData.append("id", id);

  let options = {
    method: "POST",
    body: formData,
  };

  const res = await helpHttp().post(`${ACTIVIDADES}deleteAsk.php`, options);

  console.log(res);
}
