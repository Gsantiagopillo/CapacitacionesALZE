import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { USERS, ADMINS } = api;

export default async function deleteUsuario(e) {
  if (
    !e.target.matches("#td-user-delete") &&
    !e.target.matches("#td-user-delete *")
  )
    return;

  const $load = d.querySelector(".load");
  $load.style.display = "flex";

  let id = e.target.getAttribute("data-id-delete");

  const formData = new FormData();

  formData.append("id", id);

  let options = {
    method: "POST",
    body: formData,
  };

  let res = await helpHttp().post(`${USERS}deleteUsuario.php`, options);

  if (!res.err) {
    alert(`Usuario eliminado`);
    location.replace(`${ADMINS}indexadmin.html`);
  } else {
    $load.style.display = "none";
    alert("ocurrio un error al eliminar el usuario");
  }
}
