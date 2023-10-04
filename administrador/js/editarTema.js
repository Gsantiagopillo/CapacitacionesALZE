import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { ADMINS, DOMAIN, TEMAS } = api;

export default async function editarTema(e) {
  if (!e.target.matches("#form-edit-tema")) return;

  const $load = d.querySelector(".load");
  $load.style.display = "flex";

  const $form = d.getElementById("form-edit-tema"),
    id = $form["id-tema"].value,
    nombre = $form.nombre.value;

  const formData = new FormData();

  formData.append("id", id);
  formData.append("nombre", nombre);

  if ($form.logo.files.length > 0) {
    const logo = $form["logo"].files[0];
    formData.append("logo", logo);
  }

  let options = {
    method: "POST",
    headers: {
      "enc-type": "multipart/form-data",
    },
    body: formData,
  };

  let res = await helpHttp().post(`${TEMAS}editTema.php`, options);
  console.log(res);

  if (!res.err) {
    if (res["update"] === false) {
      alert(res.statusText);
      $load.style.display = "none";
      return;
    }
    alert(`Tema: ${res.nombre} actualizado`);
    location.replace(`${ADMINS}indexadmin.html`);
  } else {
    alert("ocurrio un error al actualizar el tema");
    $load.style.display = "none";
  }
}

export function temaToEdit(e) {
  if (
    !e.target.matches("#td-tema-edit") &&
    !e.target.matches("#td-tema-edit *")
  )
    return;

  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idTemaGO", id);
  location.replace(`${ADMINS}/editarTema.html`);
}
