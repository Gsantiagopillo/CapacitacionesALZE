import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { CURSOS } = api;

export default async function assignCourse() {
  if (!location.pathname.includes("/AsignarCurso.html")) return;

  let json = await helpHttp().post(`${CURSOS}getCursos.php`);

  const $container = d.querySelector(".assign-course-container");
  $container.innerHTML = "";

  if (json.length === 0) {
    const $h5 = d.createElement("h5");
    $h5.textContent = "NO HAY CURSOS DADOS DE ALTA";
    $h5.style.textAlign = "center";
    $container.insertAdjacentElement("afterend", $h5);

    d.getElementById("asignar").setAttribute("disabled", true);
    return;
  }

  const $fragmento = d.createDocumentFragment();
  const $template = d.getElementById("template-assign-course").content;

  json.forEach((el) => {
    let $clone = d.importNode($template, true);

    const $check = $clone.querySelector("input[type='checkbox']");
    $check.setAttribute("data-course-id", el.id);
    $clone.querySelector("span").textContent = el.nombre;
    $fragmento.appendChild($clone);
  });

  $container.appendChild($fragmento);
}
