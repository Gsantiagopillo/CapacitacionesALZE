import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { TEMAS, DOMAIN } = api;

export default async function infoTema() {
  if (
    !location.pathname.includes("/editarTema.html") ||
    !sessionStorage.getItem("idTemaGO")
  )
    return;

  const tema = sessionStorage.getItem("idTemaGO");

  const formData = new FormData();
  formData.append("idTema", tema);
  let options = {
    method: "POST",
    body: formData,
  };

  let res = await helpHttp().post(`${TEMAS}getTema.php`, options);

  console.log(res);

  if (res === null) {
    alert("Ocurrio un error, vuleva a intentarlo");
    return;
  }

  const $form = d.getElementById("form-edit-tema");

  if ($form["id-tema"]) $form["id-tema"].value = res["id"];

  $form["nombre"].value = res.nombre;
  $form["logo-actual"].setAttribute(
    "src",
    `${DOMAIN}assets/temas/${res["img_tema"]}`
  );
}
