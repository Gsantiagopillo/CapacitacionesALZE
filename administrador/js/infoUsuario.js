import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { EMPRESAS, DOMAIN, ADMINS, DEPTOS, USERS } = api;

export default async function infoUsuario() {
  if (
    !location.pathname.includes("/editarUsuario.html") ||
    !sessionStorage.getItem("usuarioToEdit")
  )
    return;

  const usuario = sessionStorage.getItem("usuarioToEdit") || "0";

  const formData = new FormData();
  formData.append("id", usuario);
  let options = {
    method: "POST",
    body: formData,
  };

  let res = await helpHttp().post(`${USERS}getUsuario.php`, options);

  console.log(res);

  if (res === null) {
    alert("Ocurrio un error, vuleva a intentarlo");
    return;
  }

  const $form = d.getElementById("form-edit-user");

  if ($form["id-usuario"]) $form["id-usuario"].value = res["id"];

  $form["nombre"].value = res.nombre;
  $form["apellido-paterno"].value = res["apellido_paterno"];
  $form["apellido-materno"].value = res["apellido_materno"];
}
