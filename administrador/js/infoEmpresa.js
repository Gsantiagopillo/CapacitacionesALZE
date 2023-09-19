import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { EMPRESAS, DOMAIN, ADMINS } = api;

export default async function infoEmpresa() {
  if (
    !location.pathname.includes("/editarEmpresa.html") ||
    !sessionStorage.getItem("idEmpresaGO")
  )
    return;

  const empresa = sessionStorage.getItem("idEmpresaGO");

  const formData = new FormData();
  formData.append("id", empresa);
  let options = {
    method: "POST",
    body: formData,
  };

  let res = await helpHttp().post(`${EMPRESAS}getEmpresa.php`, options);

  console.log(res);

  if (res === null) {
    alert("Ocurrio un error, vuleva a intentarlo");
    return;
  }

  const $form = d.getElementById("form-edit-empresa");

  if ($form["id-empresa"]) $form["id-empresa"].value = res["id"];

  $form["nombre"].value = res.nombre;
  $form["logo-actual"].setAttribute(
    "src",
    `${DOMAIN}assets/empresas/${res.logo}`
  );
}
