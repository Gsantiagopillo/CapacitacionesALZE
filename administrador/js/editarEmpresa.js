import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { EMPRESAS, DOMAIN, ADMINS, DEPTOS } = api;

export default async function editarEmpresa(e) {
  if (!e.target.matches("#form-edit-empresa")) return;

  const $load = d.querySelector(".load");
  $load.style.display = "flex";

  const $form = d.getElementById("form-edit-empresa"),
    id = $form["id-empresa"].value,
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
    body: formData,
  };

  let res = await helpHttp().post(`${EMPRESAS}editEmpresa.php`, options);

  if (!res.err) {
    if (res["update"] === false) {
      alert(res.statusText);
      $load.style.display = "none";
      return;
    }
    alert(`Empresa: ${res.nombre} actualizada`);
    location.replace(`${ADMINS}indexadmin.html`);
  } else {
    alert("ocurrio un error al actualizar la empresa");
    $load.style.display = "none";
  }
}

export function empresaToEdit(e) {
  if (
    !e.target.matches("#td-empresa-edit") &&
    !e.target.matches("#td-empresa-edit *")
  )
    return;

  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idEmpresaGO", id);
  location.replace(`${DOMAIN}administrador/editarEmpresa.html`);
}
