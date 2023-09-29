import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { USERS, DEPTOS, ADMINS } = api;

export default async function deleteDepartamento(e) {
  if (
    !e.target.matches("#td-depto-delete") &&
    !e.target.matches("#td-depto-delete *")
  )
    return;

  let confirmar = false;

  confirmar = confirm(
    "Si elimina el departemento, tambien se eliminarán los usuarios que pertenencen a el. \n ¿Desea continuar?"
  );

  if (!confirmar) return;

  const $load = d.querySelector(".load");
  $load.style.display = "flex";

  let id = e.target.getAttribute("data-id-delete");

  const formData = new FormData();

  formData.append("id", id);

  let options = {
    method: "POST",
    body: formData,
  };

  let resUsers = await helpHttp().post(
    `${USERS}deleteUsuariosDepto.php`,
    options
  );

  if (resUsers.err) {
    alert(`Error al eliminar usuarios`);
    return;
  }

  let res = await helpHttp().post(`${DEPTOS}deleteDepartamento.php`, options);

  if (!res.err) {
    alert(`Departamento eliminado`);
    location.replace(`${ADMINS}indexadmin.html`);
  } else {
    $load.style.display = "none";
    alert("ocurrio un error al eliminar el departamento");
  }
}
