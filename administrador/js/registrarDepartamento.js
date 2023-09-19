import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { EMPRESAS, DOMAIN, ADMINS, DEPTOS } = api;

export default async function registrarDepartamento(e) {
  if (!e.target.matches("#form-create-depto")) return;

  const $load = d.querySelector(".load");
  $load.style.display = "flex";

  const $form = d.getElementById("form-create-depto"),
    nombre = $form.nombre.value,
    empresa = $form["empresa"].value;

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
    location.replace(`${ADMINS}indexadmin.html`);
  } else {
    $load.style.display = "none";
    alert("ocurrio un error al crear el departamento");
  }
}
