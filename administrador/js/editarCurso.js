import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { ADMINS, DOMAIN, CURSOS } = api;

export default async function editarCurso(e) {
  if (!e.target.matches("#form-edit-curso")) return;

  const $load = d.querySelector(".load");
  $load.style.display = "flex";

  const $form = d.getElementById("form-edit-curso"),
    id = $form["id-curso"].value,
    nombre = $form.nombre.value;

  const formData = new FormData();

  formData.append("id", id);
  formData.append("nombre", nombre);

  if ($form.logo.files.length > 0) {
    const logo = $form["logo"].files[0];
    formData.append("logo", logo);
    console.log("entre");
  }

  let options = {
    method: "POST",
    headers: {
      "enc-type": "multipart/form-data",
    },
    body: formData,
  };

  let res = await helpHttp().post(`${CURSOS}editCurso.php`, options);
  console.log(res);

  if (!res.err) {
    if (res["update"] === false) {
      alert(res.statusText);
      $load.style.display = "none";
      return;
    }
    alert(`Curso: ${res.nombre} actualizado`);
    location.replace(`${ADMINS}indexadmin.html`);
  } else {
    alert("ocurrio un error al actualizar el curso");
    $load.style.display = "none";
  }
}

export function cursoToEdit(e) {
  if (
    !e.target.matches("#td-curso-edit") &&
    !e.target.matches("#td-curso-edit *")
  )
    return;

  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idCursoGO", id);
  location.replace(`${DOMAIN}administrador/editarCurso.html`);
}
