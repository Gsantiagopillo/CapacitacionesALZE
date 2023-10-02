import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { CURSOS, TEMAS, ADMINS, DOMAIN } = api;

export default async function listadoTemas() {
  if (!location.pathname.includes("listadoTemas.html")) return;

  // sessionStorage.removeItem("idEmpresaGO"); //Elimina el id de usuario a ver o editar

  const idCurso = sessionStorage.getItem("idCursoGO") || "0";
  const type_user =
    localStorage.getItem("type_user") || sessionStorage.getItem("type_user");

  const formData = new FormData();

  formData.append("id", idCurso);

  let options = {
    method: "POST",
    body: formData,
  };

  let curso = await helpHttp().post(`${CURSOS}getCurso.php`, options);
  let temas = await helpHttp().post(`${TEMAS}getTemas.php`);

  if (Object.keys(curso).length === 0 || curso.err) {
    alert("Ocurrio un error, vuleva a intentarlo");
    return;
  }

  if (temas.length === 0 || temas.err) {
    const $h5 = d.createElement("h5");
    $h5.textContent = "NO HAY TEMAS DADOS DE ALTA";
    $h5.style.textAlign = "center";
    d.querySelector("table.table").insertAdjacentElement("afterend", $h5);
    return;
  }
  const $fragmento = d.createDocumentFragment();

  let cursoNombre = curso.nombre;

  const $h4 = d.querySelector("h4");

  console.log($h4);

  $h4.textContent = `${$h4.textContent}: ${cursoNombre}`;

  temas.forEach((el) => {
    const $tr = d.createElement("tr"),
      $td1 = d.createElement("td"),
      $td2 = d.createElement("td"),
      $td3 = d.createElement("td"),
      $td4 = d.createElement("td"),
      $logo = d.createElement("img");

    if (el["id_curso"] === idCurso) {
      $logo.setAttribute("src", `${DOMAIN}assets/temas/${el["img_tema"]}`);
      $logo.setAttribute("data-id", el.id);
      $logo.classList.add("td-img");
      $td1.appendChild($logo);
      $td1.setAttribute("data-id", el.id);
      $td1.id = "td-tema";

      $td2.textContent = el.nombre;
      $td2.setAttribute("data-id", el.id);
      $td2.id = "td-tema";

      $td3.innerHTML = `<img src="${DOMAIN}assets/pencil-square.svg" class="img-auto" alt="archive-fill"  data-id="${el.id}">`;
      $td3.setAttribute("data-id", el.id);
      $td3.id = "td-tema-edit";
      $td4.innerHTML = `<img src="${DOMAIN}assets/archive-fill.svg" class="img-auto" alt="archive-fill" data-id-delete="${el.id}">`;
      $td4.setAttribute("data-id-delete", el.id);
      $td4.id = "td-tema -delete";

      $tr.appendChild($td1);
      $tr.appendChild($td2);

      if (type_user === "1") {
        $tr.appendChild($td3);
        $tr.appendChild($td4);
      } else {
        d.getElementById("temas-edit").style.display = "none";
        d.getElementById("temas-delete").style.display = "none";
      }

      $tr.classList.add("cursor-pointer");
      $tr.id = "tr-temas";
      $tr.setAttribute("data-id", el.id);

      $fragmento.appendChild($tr);
    }
  });

  d.getElementById("tbody").appendChild($fragmento);
}

export function temaToEdit(e) {
  if (
    !e.target.matches("#td-tema-edit") &&
    !e.target.matches("#td-tema-edit *")
  )
    return;
  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idTemaGO", id);
  location.replace(`${ADMINS}editarTema.html`);
}

d.addEventListener("click", (e) => {
  if (!e.target.matches("#add-tema") && !e.target.matches("#add-tema *"))
    return;
});
