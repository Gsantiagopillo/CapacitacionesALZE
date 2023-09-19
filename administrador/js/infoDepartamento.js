import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { ADMINS, DEPTOS, EMPRESAS } = api;

export default async function infoDepartamento() {
  if (
    !location.pathname.includes("/editarDepartamento.html") ||
    !sessionStorage.getItem("idDeptoGO")
  )
    return;

  const departamento = sessionStorage.getItem("idDeptoGO");

  const formData = new FormData();
  formData.append("id", departamento);
  let options = {
    method: "POST",
    body: formData,
  };

  let res = await helpHttp().post(`${DEPTOS}getDepartamento.php`, options);

  if (res === null) {
    alert("Ocurrio un error, vuleva a intentarlo");
    return;
  }
  formData.delete("id");

  formData.append("id", res["id_empresa"]);

  options = {
    method: "POST",
    body: formData,
  };

  let empresa = await helpHttp().post(`${EMPRESAS}getEmpresa.php`, options);

  if (empresa === null) {
    alert("Ocurrio un error, vuleva a intentarlo");
    return;
  }

  const $form = d.getElementById("form-edit-depto");

  if ($form["id-depto"]) $form["id-depto"].value = res["id"];

  $form["nombre"].value = res.nombre;
  $form["empresa"].value = empresa.nombre;
  $form["empresa"].style.color = "black";
}
