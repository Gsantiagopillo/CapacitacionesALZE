import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { ACTIVIDADES, ADMINS } = api;

let idTema;

export default async function registrarActividad(e) {
  if (
    !e.target.matches("#add-activity") &&
    !e.target.matches("#add-activity *")
  )
    return;
  location.replace(`${ADMINS}registrarActividad.html`);
}

export async function uploadActividad(e) {
  if (!e.target.matches("#form-create-activity")) return;

  idTema = sessionStorage.getItem("idTemaGO");

  const $formCreate = d.getElementById("form-create-activity");
  const nombreActividad = d.getElementById("nombre").value,
    videoAct = $formCreate["video"].files[0],
    descripcionAct = d.getElementById("description").value;

  d.querySelector(".load").style.display = "flex";

  const formData = new FormData();
  formData.append("idTema", idTema);
  formData.append("actividad", nombreActividad);
  formData.append("descAct", descripcionAct);
  formData.append("videoAct", videoAct);

  let options = {
    method: "POST",
    body: formData,
    headers: { "enc-type": "multipart/form-data" },
  };

  let res = await helpHttp().post(`${ACTIVIDADES}createActividad.php`, options);
  console.log(res);

  if (res.err === true) {
    alert(res.statusText);
    $load.style.display = "none";
    return;
  }

  let id_actividad = res.actividad;

  let $childrens = d.getElementById("task-container").children;
  let bandEnt = false;

  for (let i = 0; i < $childrens.length; i++) {
    let $child;
    $child = $childrens[i];

    const formData2 = new FormData();
    formData2.append("idActividad", id_actividad);
    formData2.append("nombre", $child.querySelector("#name-task").value);
    formData2.append("desc", $child.querySelector("#desc-task").value);
    formData2.append("file", $child.querySelector("#file-task").files[0]);

    let options = {
      method: "POST",
      body: formData2,
      headers: { "enc-type": "multipart/form-data" },
    };

    let res = await helpHttp().post(
      `${ACTIVIDADES}createEntregable.php`,
      options
    );
    console.log(res);

    if (res.err === true) {
      bandEnt = true;
      alert(
        `${res.statusText}, en: ${$child.querySelector("#name-task").value}`
      );
      $load.style.display = "none";
      break;
    }
  }

  if (bandEnt) return;

  let $childrensAsks = d.getElementById("asks-container").children;
  let bandForm = false;

  for (let i = 0; i < $childrensAsks.length; i++) {
    let $childAsk;

    $childAsk = $childrensAsks[i];

    const formData3 = new FormData();
    formData3.append("idActividad", id_actividad);
    formData3.append("pregunta", $childAsk.querySelector("#name-ask").value);
    formData3.append("ans1", $childAsk.querySelector("#answer-1").value);
    formData3.append("ans2", $childAsk.querySelector("#answer-2").value);
    formData3.append("ans3", $childAsk.querySelector("#answer-3").value);
    formData3.append(
      "anscorrect",
      $childAsk.querySelector("#answer-correct").value
    );

    console.log("idActividad", id_actividad);
    console.log("pregunta", $childAsk.querySelector("#name-ask").value);
    console.log("ans1", $childAsk.querySelector("#answer-1").value);
    console.log("ans2", $childAsk.querySelector("#answer-2").value);
    console.log("ans3", $childAsk.querySelector("#answer-3").value);
    console.log("anscorrect", $childAsk.querySelector("#answer-correct").value);

    let options = {
      method: "POST",
      body: formData3,
    };

    let res = await helpHttp().post(
      `${ACTIVIDADES}createFormulario.php`,
      options
    );
    console.log(res);

    if (res.err === true) {
      bandForm = true;
      alert(
        `${res.statusText}, en: ${$childAsk.querySelector("#name-ask").value}`
      );
      $load.style.display = "none";
      break;
    }
  }
  if (bandEnt) return;

  d.querySelector(".load").style.display = "none";
  alert(`Actividad Creada: ${res.nombre}`);
  location.reload();
}
