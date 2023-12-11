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
    let isDelete = deleteTask(tasksRemove[i]);
    if (!isDelete) {
      alert(`Ocurrio un error al eliminar el entregable: ${tasksRemove[i]}`);
      location.reload();
      break;
    }
  }
  for (let i = 0; i < asksRemove.length; i++) {
    let isDelete = deleteAsk(asksRemove[i]);
    if (!isDelete) {
      alert(`Ocurrio un error al eliminar la pregunta: ${asksRemove[i]}`);
      location.reload();
      break;
    }
  }

  const $taskContainer = d.getElementById("task-container");
  const $tasks = $taskContainer.children;

  for (let i = 0; i < $tasks.length; i++) {
    let idTask = $tasks[i]
      .querySelector("[data-task-id]")
      .getAttribute("data-task-id");

    let nameAct = $tasks[i].querySelector("#name-task").value;
    let descAct = $tasks[i].querySelector("#desc-task").value;
    let archivoAct = $tasks[i].querySelector("#file-task").files;
    if (idTask) {
      let isUpdate;
      if (archivoAct.length > 0)
        isUpdate = updateTask(idTask, nameAct, descAct, archivoAct[0]);
      else isUpdate = updateTask(idTask, nameAct, descAct);
      if (!isUpdate) {
        alert(`Ocurrio un error al actualizar el entregable: ${idTask}`);
        location.reload();
        break;
      }
    } else {
      let isAdd = addtask(nameAct, descAct, archivoAct[0]);

      if (!isAdd) {
        alert(`Ocurrio un error al registrar el entregable: ${nameAct}`);
        location.reload();
        break;
      }
    }
  }

  const $asksContainer = d.getElementById("task-container");
  const $asks = $asksContainer.children;

  for (let i = 0; i < $asks.length; i++) {
    let idAsk = $asks[i]
      .querySelector("[data-ask-id]")
      .getAttribute("data-ask-id");
    if (idAsk) {
      let nameAsk = $asks[i].querySelector("#name-ask");
      let ans1 = $asks[i].querySelector("#answer-1");
      let ans2 = $asks[i].querySelector("#answer-2");
      let ans3 = $asks[i].querySelector("#answer-3");
      let ansC = $asks[i].querySelector("#answer-correct");
      let isUpdate = updateAsk(idAsk, nameAsk, ans1, ans2, ans3, ansC);
      if (!isUpdate) {
        alert(`Ocurrio un error al actualizar la pregunta: ${idAsk}`);
        location.reload();
        break;
      }
    }
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

  return res.err === false ? true : false;
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
  return res.err === false ? true : false;
}

async function updateTask(id, name, desc, archivo = null) {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("name", name);
  formData.append("desc", desc);
  if (video) formData.append("archivo", archivo);

  let options = {
    method: "POST",
    body: formData,
  };

  const res = await helpHttp().post(
    `${ACTIVIDADES}updateEntregable.php`,
    options
  );

  console.log(res);

  return res.err === false ? true : false;
}

async function updateAsk(id, name, ans1, ans2, ans3, ansC) {
  const formData = new FormData();
  formData.append("id", id);
  formData.append("name", name);
  formData.append("ans1", ans1);
  formData.append("ans2", ans2);
  formData.append("ans3", ans3);
  formData.append("ansC", ansC);

  let options = {
    method: "POST",
    body: formData,
  };

  const res = await helpHttp().post(`${ACTIVIDADES}updateAsk.php`, options);

  console.log(res);
  return res.err === false ? true : false;
}
