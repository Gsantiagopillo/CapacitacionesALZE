import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { USERS, ADMINS } = api;

export default async function RegitrarEstudiante(e) {
  if (!e.target.matches("#form-create-student")) return;

  const $load = d.querySelector(".load");
  $load.style.display = "flex";

  const $form = d.getElementById("form-create-student"),
    idEmpresa = $form.empresa.value,
    idDepartamento = $form.departamento.value,
    nombre = $form.nombre.value,
    apellidoPaterno = $form["apellido-paterno"].value,
    apellidoMaterno = $form["apellido-materno"].value,
    puesto = $form.puesto.value,
    telefono = $form.telefono.value,
    correo = $form.correo.value,
    passw = $form.passw.value;

  if (
    idEmpresa === "" ||
    idEmpresa === "0" ||
    idDepartamento === "0" ||
    idDepartamento === ""
  ) {
    alert("debes seleccionar y llenar todos los campos");
    $load.style.display = "none";
    return;
  }

  const formData = new FormData();

  formData.append("empresa", idEmpresa);
  formData.append("departamento", idDepartamento);
  formData.append("nombre", nombre);
  formData.append("apellidoPaterno", apellidoPaterno);
  formData.append("apellidoMaterno", apellidoMaterno);
  formData.append("puesto", puesto);
  formData.append("telefono", telefono);
  formData.append("correo", correo);
  formData.append("passw", passw);
  formData.append("tipo", 4);

  let options = {
    method: "POST",
    body: formData,
  };

  let res = await helpHttp().post(`${USERS}createUsuario.php`, options);

  console.log(res);

  if (!res.err) {
    if (res["insert"] === false) {
      alert("correo ya existente");
      $load.style.display = "none";
      return;
    }
    alert(`Estudiante: ${res.nombre} creado`);
    location.replace(`${ADMINS}indexadmin.html`);
  } else {
    $load.style.display = "none";
    alert("ocurrio un error al crear al estudiante");
  }
}
