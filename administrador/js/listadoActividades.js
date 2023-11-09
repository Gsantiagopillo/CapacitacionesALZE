import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { TEMAS, ACTIVIDADES, ADMINS, DOMAIN } = api;

export default async function listadoActividades() {
  if (!location.pathname.includes("listadoActividades.html")) return;

  // sessionStorage.removeItem("idEmpresaGO"); //Elimina el id de usuario a ver o editar

  const idTema = sessionStorage.getItem("idTemaGO") || "0";
  const type_user =
    localStorage.getItem("type_user") || sessionStorage.getItem("type_user");

  const formData = new FormData();

  formData.append("idTema", idTema);

  let options = {
    method: "POST",
    body: formData,
  };

  let tema = await helpHttp().post(`${TEMAS}getTema.php`, options);
  let activities = await helpHttp().post(
    `${ACTIVIDADES}getActividades.php`,
    options
  );

  if (Object.keys(tema).length === 0 || tema.err) {
    alert("Ocurrio un error, vuleva a intentarlo");
    return;
  }

  if (activities.length === 0 || activities.err) {
    const $h5 = d.createElement("h5");
    $h5.textContent = "NO HAY ACTIVIDADES DADAS DE ALTA";
    $h5.style.textAlign = "center";
    d.querySelector("table.table").insertAdjacentElement("afterend", $h5);
    return;
  }
  const $fragmento = d.createDocumentFragment();

  let temaNombre = tema.nombre;

  const $h4 = d.querySelector("h4");

  console.log($h4);

  $h4.textContent = `${$h4.textContent}: ${temaNombre}`;

  activities.forEach((el) => {
    const $tr = d.createElement("tr"),
      $td1 = d.createElement("td"),
      $td2 = d.createElement("td"),
      $td3 = d.createElement("td");

    if (el["id_tema"] === idTema) {
      $td1.textContent = el.nombre;
      $td1.setAttribute("data-id", el.id);
      $td1.id = "td-tema";

      $td2.innerHTML = `<img src="${DOMAIN}assets/pencil-square.svg" class="img-auto" alt="archive-fill"  data-id="${el.id}">`;
      $td2.setAttribute("data-id", el.id);
      $td2.id = "td-activity-edit";
      $td3.innerHTML = `<img src="${DOMAIN}assets/archive-fill.svg" class="img-auto" alt="archive-fill" data-id-delete="${el.id}">`;
      $td3.setAttribute("data-id-delete", el.id);
      $td3.id = "td-activity-delete";

      $tr.appendChild($td1);

      if (type_user === "1") {
        $tr.appendChild($td2);
        $tr.appendChild($td3);
      } else {
        d.getElementById("activities-edit").style.display = "none";
        d.getElementById("activities-delete").style.display = "none";
      }

      $tr.classList.add("cursor-pointer");
      $tr.id = "tr-activities";
      $tr.setAttribute("data-id", el.id);

      $fragmento.appendChild($tr);
    }
  });

  d.getElementById("tbody").appendChild($fragmento);
}

export function activityToEdit(e) {
  if (
    !e.target.matches("#td-activity-edit") &&
    !e.target.matches("#td-activity-edit *")
  )
    return;
  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idActivityGO", id);
  location.replace(`${ADMINS}editarActividad.html`);
}
