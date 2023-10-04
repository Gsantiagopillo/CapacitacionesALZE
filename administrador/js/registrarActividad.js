import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { ACTIVIDADES } = api;

let idCurso;

export default async function registrarTema(e) {
  if (!e.target.matches("#add-tema") && !e.target.matches("#add-tema *"))
    return;

  const $btnAdd = d.getElementById("add-tema"),
    $btnCreate = d.getElementById("create-tema"),
    $sectionCreate = d.querySelector(".section-add-temas");

  $btnAdd.classList.toggle("d-none");
  $btnCreate.classList.toggle("d-none");

  idCurso = sessionStorage.getItem("idCursoGO") || 0;

  const $template = d.getElementById("template-form-tema").content;
  const $formCreate = d.querySelector(".form-create-item");

  let $clone = d.importNode($template, true);
  $formCreate.appendChild($clone);

  $sectionCreate.classList.add("flex-column");
  $sectionCreate.classList.remove("justify-content-end");
}

export async function uploadTema(e) {
  if (!e.target.matches("#create-tema") && !e.target.matches("#create-tema *"))
    return;

  const $formCreate = d.querySelector(".form-create-item");
  const nombreTema = d.getElementById("tema").value,
    logo = $formCreate["logo"].files[0];

  if (nombreTema === "" || $formCreate["logo"].files.length === 0) {
    alert("debes llenar todos los campos");
    return;
  }
  d.querySelector(".load").style.display = "flex";

  const formData = new FormData();
  formData.append("idCurso", idCurso);
  formData.append("tema", nombreTema);
  formData.append("img", logo);

  let options = {
    method: "POST",
    body: formData,
  };

  let res = await helpHttp().post(`${TEMAS}createTema.php`, options);
  console.log(res);

  if (res.err) {
    alert("ocurrio un error");
    return;
  }

  if (res["insert"] === false) {
    alert(res.statusText);
    $load.style.display = "none";
    return;
  }
  d.querySelector(".load").style.display = "none";
  alert(`Modelo creado: ${res.nombre}`);
  location.reload();
}
