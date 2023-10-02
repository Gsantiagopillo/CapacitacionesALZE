import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { CURSOS, ADMINS, DOMAIN } = api;

export default async function listadoCursos() {
  if (!location.pathname.includes("listadoCursos.html")) return;

  sessionStorage.removeItem("idCursoGO"); //Elimina el id de curso a ver o editar

  const type_user =
    localStorage.getItem("type_user") || sessionStorage.getItem("type_user");

  let json = await helpHttp().post(`${CURSOS}getCursos.php`);

  if (json.length === 0) {
    const $h5 = d.createElement("h5");
    $h5.textContent = "NO HAY CURSOS DADOS DE ALTA";
    $h5.style.textAlign = "center";
    d.querySelector(".table").insertAdjacentElement("afterend", $h5);
    return;
  }
  const $fragmento = d.createDocumentFragment();

  json.forEach((el) => {
    const $tr = d.createElement("tr"),
      $td1 = d.createElement("td"),
      $td2 = d.createElement("td"),
      $td3 = d.createElement("td"),
      $td4 = d.createElement("td"),
      $td5 = d.createElement("td"),
      $logo = d.createElement("img");

    $td1.appendChild($logo);
    $logo.setAttribute("src", `${DOMAIN}assets/cursos/${el["img_curso"]}`);
    $logo.setAttribute("data-id", el.id);
    $logo.classList.add("td-img");
    $td1.setAttribute("data-id", el.id);
    $td1.id = "td-curso";
    $td2.textContent = el.nombre;
    $td2.setAttribute("data-id", el.id);
    $td2.id = "td-curso";
    $td3.innerHTML = `<img src="${DOMAIN}assets/pencil-square.svg" class="img-auto" alt="archive-fill"  data-id="${el.id}">`;
    $td3.setAttribute("data-id", el.id);
    $td3.id = "td-curso-edit";
    $td4.innerHTML = `<img src="${DOMAIN}assets/archive-fill.svg" class="img-auto" alt="archive-fill" data-id-delete="${el.id}">`;
    $td4.setAttribute("data-id-delete", el.id);
    $td4.id = "td-curso-delete";
    $td5.innerHTML = `<img src="${DOMAIN}assets/clipboard2-plus.svg" class="img-auto" alt="archive-fill" data-id-register="${el.id}">`;
    $td5.setAttribute("data-id-register", el.id);
    $td5.id = "td-curso-register";

    $tr.appendChild($td1);
    $tr.appendChild($td2);

    if (type_user === "1") {
      $tr.appendChild($td3);
      $tr.appendChild($td4);
      $tr.appendChild($td5);
    } else {
      d.getElementById("cursos-edit").style.display = "none";
      d.getElementById("cursos-delete").style.display = "none";
      d.getElementById("cursos-register").style.display = "none";
    }

    $tr.classList.add("cursor-pointer");
    $tr.id = "tr-curso";
    $tr.setAttribute("data-id", el.id);

    $fragmento.appendChild($tr);
  });

  d.getElementById("tbody").appendChild($fragmento);
}

export function goToCurso(e) {
  if (!e.target.matches("#td-curso") && !e.target.matches("#td-curso *"))
    return;
  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idCursoGO", id);
  location.replace(`${ADMINS}listadoTemas.html`);
}
