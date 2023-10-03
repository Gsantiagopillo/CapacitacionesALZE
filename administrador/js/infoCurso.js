import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { CURSOS, DOMAIN } = api;

export default async function infoCurso() {
  if (
    !location.pathname.includes("/editarCurso.html") ||
    !sessionStorage.getItem("idCursoGO")
  )
    return;

  const curso = sessionStorage.getItem("idCursoGO");

  const formData = new FormData();
  formData.append("id", curso);
  let options = {
    method: "POST",
    body: formData,
  };

  let res = await helpHttp().post(`${CURSOS}getCurso.php`, options);

  console.log(res);

  if (res === null) {
    alert("Ocurrio un error, vuleva a intentarlo");
    return;
  }

  const $form = d.getElementById("form-edit-curso");

  if ($form["id-curso"]) $form["id-curso"].value = res["id"];

  $form["nombre"].value = res.nombre;
  $form["logo-actual"].setAttribute(
    "src",
    `${DOMAIN}assets/cursos/${res["img_curso"]}`
  );
}
