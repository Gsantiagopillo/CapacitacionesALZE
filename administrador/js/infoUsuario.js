import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";
import setDepartamento from "./setDepartamento.js";
import setEmpresa from "./setEmpresa.js";

const d = document;
const { EMPRESAS, DOMAIN, ADMINS, DEPTOS, USERS } = api;

export default async function infoUsuario() {
  if (
    !location.pathname.includes("/editarUsuario.html") ||
    !sessionStorage.getItem("usuarioToEdit")
  )
    return;
  await setEmpresa("editarUsuario");
  const usuario = sessionStorage.getItem("usuarioToEdit") || "0";

  const formData = new FormData();
  formData.append("id", usuario);
  let options = {
    method: "POST",
    body: formData,
  };

  const res = await helpHttp().post(`${USERS}getUsuario.php`, options);

  console.log(res);

  if (res.length === 0) {
    alert("Ocurrio un error, vuleva a intentarlo");
    return;
  }

  const $form = d.getElementById("form-edit-user");

  if ($form["id-usuario"]) $form["id-usuario"].value = res["id"];

  $form["empresa"].value = res["id_empresa"];

  await setDepartamento(null, res["id_empresa"]);

  $form["departamento"].value = res["id_departamento"];

  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems, options);
  $form["nombre"].value = res.nombre;
  $form["apellido-paterno"].value = res["apellido_paterno"];
  $form["apellido-materno"].value = res["apellido_materno"];
  $form["correo"].value = res["correo"];
  $form["telefono"].value = res["telefono"];
  $form["puesto"].value = res["puesto"];
}
