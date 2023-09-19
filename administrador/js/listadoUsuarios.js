import app from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { EMPRESAS, USERS, DEPTOS, ROLES, DOMAIN } = app;

export default async function listadoUsuarios() {
  if (!location.pathname.includes("/administrador/listadoUsuarios.html"))
    return;

  sessionStorage.removeItem("idUserGO"); //Elimina el id de usuario a ver o editar

  const type_user =
    localStorage.getItem("type_user") || sessionStorage.getItem("type_user");

  let json = await helpHttp().post(`${USERS}getUsuarios.php`);

  // console.log(json);

  if (json.length === 0) {
    const $h5 = d.createElement("h5");
    $h5.textContent = "NO HAY USUARIOS DADOS DE ALTA";
    $h5.style.textAlign = "center";
    d.querySelector(".table").insertAdjacentElement("afterend", $h5);
    return;
  }

  let roles = await helpHttp().post(`${ROLES}getRoles.php`);
  let empresas = await helpHttp().post(`${EMPRESAS}getEmpresas.php`);
  let departamentos = await helpHttp().post(`${DEPTOS}getDepartamentos.php`);

  const $fragmento = d.createDocumentFragment();

  json.forEach((el) => {
    let rolNombre = "";
    for (let j = 0; j < roles.length; j++) {
      if (el["id_rol"] === roles[j]["id"]) rolNombre = roles[j]["nombre"];
    }

    let empresaNombre = "";
    for (let j = 0; j < empresas.length; j++) {
      if (el["id_empresa"] === empresas[j]["id"])
        empresaNombre = empresas[j]["nombre"];
    }

    let deptoNombre = "";
    for (let j = 0; j < departamentos.length; j++) {
      if (el["id_departamento"] === departamentos[j]["id"])
        deptoNombre = departamentos[j]["nombre"];
    }

    const $tr = d.createElement("tr"),
      $td1 = d.createElement("td"),
      $td2 = d.createElement("td"),
      $td3 = d.createElement("td"),
      $td4 = d.createElement("td"),
      $td5 = d.createElement("td"),
      $td6 = d.createElement("td"),
      $td7 = d.createElement("td"),
      $td8 = d.createElement("td");

    $td1.textContent = el.nombre;
    $td1.setAttribute("data-id", el.id);
    $td1.id = "td-user";
    $td2.textContent = el["apellido_paterno"];
    $td2.setAttribute("data-id", el.id);
    $td2.id = "td-user";
    $td3.textContent = el["apellido_materno"];
    $td3.setAttribute("data-id", el.id);
    $td3.id = "td-user";
    $td4.textContent = rolNombre;
    $td4.setAttribute("data-id", el.id);
    $td4.id = "td-user";
    $td5.textContent = empresaNombre;
    $td5.setAttribute("data-id", el.id);
    $td5.id = "td-user";
    $td6.textContent = deptoNombre;
    $td6.setAttribute("data-id-docs", el.id);
    $td6.id = "td-user";
    $td7.innerHTML = `<img src="${DOMAIN}assets/pencil-square.svg" class="img-auto" alt="archive-fill" data-id-edit="${el.id}">`;
    $td7.setAttribute("data-id-edit", el.id);
    $td7.id = "td-user-edit";
    $td8.innerHTML = `<img src="${DOMAIN}assets/archive-fill.svg" class="img-auto" alt="archive-fill" data-id-delete="${el.id}">`;
    $td8.setAttribute("data-id-delete", el.id);
    $td8.id = "td-user-delete";

    $tr.appendChild($td1);
    $tr.appendChild($td2);
    $tr.appendChild($td3);
    $tr.appendChild($td4);
    $tr.appendChild($td5);
    $tr.appendChild($td6);

    if (type_user === "1") {
      $tr.appendChild($td7);
      $tr.appendChild($td8);
    } else {
      d.getElementById("usuarios-delete").style.display = "none";
      d.getElementById("usuarios-edit").style.display = "none";
    }

    $tr.classList.add("cursor-pointer");
    $tr.id = "tr-user";
    $tr.setAttribute("data-id", el.id);

    $fragmento.appendChild($tr);
  });

  d.getElementById("tbody").appendChild($fragmento);
}
