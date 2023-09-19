import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { EMPRESAS, DEPTOS, ADMINS, DOMAIN } = api;

export default async function listadoDepartamentos() {
  if (!location.pathname.includes("listadoDepartamentos.html")) return;

  // sessionStorage.removeItem("idEmpresaGO"); //Elimina el id de usuario a ver o editar

  const idEmpresa = sessionStorage.getItem("idEmpresaGO") || "0";
  const type_user =
    localStorage.getItem("type_user") || sessionStorage.getItem("type_user");

  let empresas = await helpHttp().post(`${EMPRESAS}getEmpresas.php`);
  let departamentos = await helpHttp().post(`${DEPTOS}getDepartamentos.php`);

  if (empresas.length === 0) {
    alert("Ocurrio un error, vuleva a intentarlo");
    return;
  }

  if (departamentos.length === 0) {
    const $h5 = d.createElement("h5");
    $h5.textContent = "NO HAY DEPARTAMENTOS DADOS DE ALTA";
    $h5.style.textAlign = "center";
    d.querySelector(".table").insertAdjacentElement("afterend", $h5);
    return;
  }
  const $fragmento = d.createDocumentFragment();

  departamentos.forEach((el) => {
    const $tr = d.createElement("tr"),
      $td1 = d.createElement("td"),
      $td2 = d.createElement("td"),
      $td3 = d.createElement("td"),
      $td4 = d.createElement("td");

    let empresaNombre = null;

    empresas.forEach((empresa) => {
      if (empresa.id === el["id_empresa"] && el["id_empresa"] === idEmpresa) {
        empresaNombre = empresa.nombre;

        $td1.textContent = el.nombre;
        $td1.setAttribute("data-id", el.id);
        $td1.id = "td-depto";

        $td2.textContent = empresaNombre;
        $td2.setAttribute("data-id", el.id);
        $td2.id = "td-depto";

        $td3.innerHTML = `<img src="${DOMAIN}assets/pencil-square.svg" class="img-auto" alt="archive-fill"  data-id="${el.id}">`;
        $td3.setAttribute("data-id", el.id);
        $td3.id = "td-depto-edit";
        $td4.innerHTML = `<img src="${DOMAIN}assets/archive-fill.svg" class="img-auto" alt="archive-fill" data-id-delete="${el.id}">`;
        $td4.setAttribute("data-id-delete", el.id);
        $td4.id = "td-depto-delete";

        $tr.appendChild($td1);
        $tr.appendChild($td2);

        if (type_user === "1") {
          $tr.appendChild($td3);
          $tr.appendChild($td4);
        } else {
          d.getElementById("deptos-edit").style.display = "none";
          d.getElementById("deptos-delete").style.display = "none";
        }

        $tr.classList.add("cursor-pointer");
        $tr.id = "tr-deptos";
        $tr.setAttribute("data-id", el.id);

        $fragmento.appendChild($tr);
      }
    });
  });

  d.getElementById("tbody").appendChild($fragmento);
}

export function departamentoToEdit(e) {
  if (
    !e.target.matches("#td-depto-edit") &&
    !e.target.matches("#td-depto-edit *")
  )
    return;
  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idDeptoGO", id);
  location.replace(`${ADMINS}editarDepartamento.html`);
}
