import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;
const { USERS, DEPTOS, EMPRESAS, ADMINS } = api;

export default async function deleteEmpresa(e) {
  if (
    !e.target.matches("#td-empresa-delete") &&
    !e.target.matches("#td-empresa-delete *")
  )
    return;

  let confirmar = false;

  confirmar = confirm(
    "Si elimina la empresa, tambien se eliminarán los departamamentos y usuarios que pertenencen a ella. \n ¿Desea continuar?"
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
    `${USERS}deleteUsuariosEmpresa.php`,
    options
  );

  if (resUsers.err) {
    alert(`Error al eliminar usuarios`);
    $load.style.display = "none";
    return;
  }
  let resDeptos = await helpHttp().post(
    `${DEPTOS}deleteDeptosEmpresa.php`,
    options
  );

  if (resDeptos.err) {
    alert(`Error al eliminar departamentos`);
    $load.style.display = "none";
    return;
  }

  let res = await helpHttp().post(`${EMPRESAS}deleteEmpresa.php`, options);

  if (!res.err) {
    alert(`Empresa eliminada`);
    location.replace(`${ADMINS}indexadmin.html`);
  } else {
    $load.style.display = "none";
    alert("ocurrio un error al eliminar la empresa");
  }
}
