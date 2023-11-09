import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { EMPRESAS, DOMAIN, ADMINS, DEPTOS } = api;

let idEmpresa;

export default function registrarDepartamento(e) {
  if (!e.target.matches("#add-depto") && !e.target.matches("#add-depto *"))
    return;

  const $btnAdd = d.getElementById("add-depto"),
    $btnCreate = d.getElementById("create-depto"),
    $sectionCreate = d.querySelector(".section-add-deptos");

  $btnAdd.classList.toggle("d-none");
  $btnCreate.classList.toggle("d-none");

  idEmpresa = sessionStorage.getItem("idEmpresaGO") || 0;

  const $template = d.getElementById("template-form-depto").content;
  const $formCreate = d.querySelector(".form-create-item");

  let $clone = d.importNode($template, true);
  $formCreate.appendChild($clone);

  $sectionCreate.classList.add("flex-column");
  $sectionCreate.classList.remove("justify-content-end");
}

export async function uploadDepartamento(e) {
  if (!e.target.matches("#create-depto")) return;

  const $load = d.querySelector(".load");
  $load.style.display = "flex";

  const $form = d.querySelector(".form-create-item"),
    nombre = $form.depto.value,
    empresa = idEmpresa;

  if (empresa === "0") {
    alert("Debes llenar todos los campos");
    $load.style.display = "none";
    return;
  }

  const formData = new FormData();

  formData.append("nombre", nombre);
  formData.append("empresa", empresa);

  let options = {
    method: "POST",
    body: formData,
  };

  let res = await helpHttp().post(`${DEPTOS}createDepartamento.php`, options);

  console.log(res);

  if (!res.err) {
    if (res["insert"] === false) {
      alert(res.statusText);
      $load.style.display = "none";
      return;
    }
    alert(`Departamento: ${res.nombre} creado`);
    // location.replace(`${ADMINS}indexadmin.html`);
    location.reload();
  } else {
    $load.style.display = "none";
    alert("ocurrio un error al crear el departamento");
  }
}
