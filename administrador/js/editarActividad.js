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
    let idTask = $tasks[i].querySelector("[data-task-id]") || null;
    if (idTask) idTask = idTask.getAttribute("data-task-id");

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
      let isAdd = addTask(nameAct, descAct, archivoAct[0], idActividad);

      if (!isAdd) {
        alert(`Ocurrio un error al registrar el entregable: ${nameAct}`);
        location.reload();
        break;
      }
    }
  }

  const $asksContainer = d.getElementById("asks-container");
  const $asks = $asksContainer.children;

  for (let i = 0; i < $asks.length; i++) {
    let idAsk = $asks[i].querySelector("[data-ask-id]") || null;
    let nameAsk = $asks[i].querySelector("#name-ask").value;
    let ans1 = $asks[i].querySelector("#answer-1").value;
    let ans2 = $asks[i].querySelector("#answer-2").value;
    let ans3 = $asks[i].querySelector("#answer-3").value;
    let ansC = $asks[i].querySelector("#answer-correct").value;
    if (idAsk) {
      idAsk = idAsk.getAttribute("data-ask-id");
      let isUpdate = updateAsk(idAsk, nameAsk, ans1, ans2, ans3, ansC);
      if (!isUpdate) {
        alert(`Ocurrio un error al actualizar la pregunta: ${idAsk}`);
        location.reload();
        break;
      }
    } else {
      let isAdd = addAsk(nameAsk, ans1, ans2, ans3, ansC, idActividad);

      if (!isAdd) {
        alert(`Ocurrio un error al registrar la pregunta: ${nameAsk}`);
        location.reload();
        break;
      }
    }
  }

  const $form = d.getElementById("form-edit-activity"),
    nombre = $form.nombre.value,
    desc = $form.description.value;

  const formData = new FormData();

  formData.append("id", idActividad);
  formData.append("nombre", nombre);
  formData.append("descripcion", desc);

  if ($form["video"].files.length > 0) {
    const logo = $form["video"].files[0];
    formData.append("logo", logo);
  }

  let options = {
    method: "POST",
    headers: {
      "enc-type": "multipart/form-data",
    },
    body: formData,
  };

  let res = await helpHttp().post(`${ACTIVIDADES}editActividad.php`, options);
  // console.log(res);

  if (!res.err) {
    if (res["update"] === false) {
      alert(res.statusText);
      $load.style.display = "none";
      return;
    }
    alert(`Actividad: ${res.nombre} actualizada`);
    location.reload();
  } else {
    alert("ocurrio un error al actualizar la actividad");
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

  // console.log(res);

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

  // console.log(res);
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

  // console.log(res);

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

  // console.log(res);
  return res.err === false ? true : false;
}

async function addTask(nameAct, descAct, archivoAct, idActividad) {
  const formData = new FormData();
  formData.append("idActividad", idActividad);
  formData.append("nombre", nameAct);
  formData.append("desc", descAct);
  formData.append("file", archivoAct);

  let options = {
    method: "POST",
    body: formData,
  };

  const res = await helpHttp().post(
    `${ACTIVIDADES}createEntregable.php`,
    options
  );

  // console.log(res);

  return res.err === false ? true : false;
}

async function addAsk(nameAsk, ans1, ans2, ans3, ansC, idActividad) {
  const formData = new FormData();
  formData.append("idActividad", idActividad);
  formData.append("pregunta", nameAsk);
  formData.append("ans1", ans1);
  formData.append("ans2", ans2);
  formData.append("ans3", ans3);
  formData.append("anscorrect", ansC);

  let options = {
    method: "POST",
    body: formData,
  };

  const res = await helpHttp().post(
    `${ACTIVIDADES}createFormulario.php`,
    options
  );

  // console.log(res);
  return res.err === false ? true : false;
}
