import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { USERS } = api;

export default async function setUsuario(e, id = null) {
  if (!location.pathname.includes("/AsignarCurso.html")) return;

  let evento = e !== null ? e.target : null;

  if (evento === null && id === null) return;

  if (evento !== null) {
    if (!evento.matches("#departamento") && !evento.matches("#empresa")) return;
  }

  const $form = d.getElementById("form-assign-course");
  const $select = $form.usuario;

  while ($select.options.length > 1) {
    $select.removeChild($select.lastChild);
  }

  $select.options[0].selected = true;

  if (evento.matches("#empresa")) return;

  let usuarios = await helpHttp().post(`${USERS}getUsuarios.php`);

  const idDepto = id || e.target.value;

  usuarios = usuarios.filter((user) => user["id_departamento"] === idDepto);

  const $fragmento = document.createDocumentFragment();

  usuarios.forEach((el) => {
    const $opcion = d.createElement("option");
    $opcion.textContent = `${el.nombre} ${el["apellido_paterno"]} ${el["apellido_materno"]}`;
    $opcion.value = el.id;
    $fragmento.appendChild($opcion);
  });

  $select.appendChild($fragmento);
  // console.log($select);
  let elems = document.querySelectorAll("select");
  let instances = M.FormSelect.init(elems);
}
