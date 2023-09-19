import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { ADMINS, DEPTOS } = api;

export default async function editarDepartamento(e) {
  if (!e.target.matches("#form-edit-depto")) return;

  const $load = d.querySelector(".load");
  $load.style.display = "flex";

  const $form = d.getElementById("form-edit-depto"),
    nombre = $form.nombre.value,
    id = $form["id-depto"];

  const formData = new FormData();

  formData.append("nombre", nombre);
  formData.append("id", id);

  let options = {
    method: "POST",
    body: formData,
  };

  let res = await helpHttp().post(`${DEPTOS}updateDepartamento.php`, options);

  console.log(res);

  if (!res.err) {
    if (res["insert"] === false) {
      alert(res.statusText);
      $load.style.display = "none";
      return;
    }
    alert(`Departamento: ${res.nombre} creado`);
    location.replace(`${ADMINS}indexadmin.html`);
  } else {
    $load.style.display = "none";
    alert("ocurrio un error al crear el departamento");
  }
}
