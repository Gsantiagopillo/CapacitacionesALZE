import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { EMPRESAS, ADMINS, DOMAIN } = api;

export default async function listadoEmpresas() {
  if (!location.pathname.includes("listadoEmpresas.html")) return;

  sessionStorage.removeItem("idEmpresaGO"); //Elimina el id de usuario a ver o editar

  const type_user =
    localStorage.getItem("type_user") || sessionStorage.getItem("type_user");

  let json = await helpHttp().post(`${EMPRESAS}getEmpresas.php`);

  if (json.length === 0) {
    const $h5 = d.createElement("h5");
    $h5.textContent = "NO HAY EMPRESAS DADAS DE ALTA";
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
      $logo = d.createElement("img");

    $logo.setAttribute("src", `${DOMAIN}assets/empresas/${el.logo}`);
    $logo.setAttribute("data-id", el.id);
    $logo.classList.add("td-img");
    $td1.appendChild($logo);
    $td1.setAttribute("data-id", el.id);
    $td1.id = "td-empresa";
    $td2.textContent = el.nombre;
    $td2.setAttribute("data-id", el.id);
    $td2.id = "td-empresa";
    $td3.innerHTML = `<img src="${DOMAIN}assets/pencil-square.svg" class="img-auto" alt="archive-fill"  data-id="${el.id}">`;
    $td3.setAttribute("data-id", el.id);
    $td3.id = "td-empresa-edit";
    $td4.innerHTML = `<img src="${DOMAIN}assets/archive-fill.svg" class="img-auto" alt="archive-fill" data-id-delete="${el.id}">`;
    $td4.setAttribute("data-id-delete", el.id);
    $td4.id = "td-empresa-delete";

    $tr.appendChild($td1);
    $tr.appendChild($td2);

    if (type_user === "1") {
      $tr.appendChild($td3);
      $tr.appendChild($td4);
    } else {
      d.getElementById("empresas-edit").style.display = "none";
      d.getElementById("empresas-delete").style.display = "none";
    }

    $tr.classList.add("cursor-pointer");
    $tr.id = "tr-empresa";
    $tr.setAttribute("data-id", el.id);

    $fragmento.appendChild($tr);
  });

  d.getElementById("tbody").appendChild($fragmento);
}

export function goToEmpresa(e) {
  if (!e.target.matches("#td-empresa") && !e.target.matches("#td-empresa *"))
    return;
  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idEmpresaGO", id);
  location.replace(`${ADMINS}listadoDepartamentos.html`);
}
