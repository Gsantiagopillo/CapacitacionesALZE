import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { ADMINS, CURSOS } = api;

export default async function registrarCurso(e) {
  if (!e.target.matches("#form-create-curso")) return;

  const $load = d.querySelector(".load");
  $load.style.display = "flex";

  const $form = d.getElementById("form-create-curso"),
    nombre = $form.nombre.value,
    logo = $form["logo"].files[0];

  const formData = new FormData();

  formData.append("nombre", nombre);
  formData.append("logo", logo);

  let options = {
    method: "POST",
    body: formData,
  };

  let res = await helpHttp().post(`${CURSOS}createCurso.php`, options);

  console.log(res);

  if (!res.err) {
    if (res["insert"] === false) {
      alert(res.statusText);
      $load.style.display = "none";
      return;
    }
    alert(`Curso: ${res.nombre} creado`);
    location.replace(`${ADMINS}indexadmin.html`);
  } else {
    alert("ocurrio un error al crear el curso");
    $load.style.display = "none";
  }
}
