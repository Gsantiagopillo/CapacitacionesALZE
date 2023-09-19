import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { EMPRESAS, DOMAIN, ADMINS, DEPTOS } = api;

export default async function registrarEmpresa(e) {
  if (!e.target.matches("#form-create-empresa")) return;

  const $load = d.querySelector(".load");
  $load.style.display = "flex";

  const $form = d.getElementById("form-create-empresa"),
    nombre = $form.nombre.value,
    logo = $form["logo"].files[0];

  const formData = new FormData();

  formData.append("nombre", nombre);
  formData.append("logo", logo);

  let options = {
    method: "POST",
    body: formData,
  };

  let res = await helpHttp().post(`${EMPRESAS}createEmpresa.php`, options);

  console.log(res);

  if (!res.err) {
    if (res["insert"] === false) {
      alert(res.statusText);
      $load.style.display = "none";
      return;
    }
    alert(`Empresa: ${res.nombre} creada`);
    location.replace(`${ADMINS}indexadmin.html`);
  } else {
    alert("ocurrio un error al crear la empresa");
    $load.style.display = "none";
  }
}
