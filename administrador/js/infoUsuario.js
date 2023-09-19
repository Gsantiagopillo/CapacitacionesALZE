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

  const usuario = sessionStorage.getItem("usuarioToEdit");

  const empresa = sessionStorage.getItem("idEmpresaGO");

  const formData = new FormData();
  formData.append("id", empresa);
  let options = {
    method: "POST",
    body: formData,
  };

  let res = await helpHttp().post(`${EMPRESAS}getEmpresa.php`, options);

  console.log(res);
}
