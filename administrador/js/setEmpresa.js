import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { DOMAIN, EMPRESAS, USUARIOS } = api;

export default async function setEmpresa() {
  if (
    location.pathname.includes("/registrarUsuario.html") ||
    location.pathname.includes("/editarUsuario.html") ||
    location.pathname.includes("/registrarEstudiante.html") ||
    location.pathname.includes("/registrarDepartamento.html")
  ) {
    let json = await helpHttp().post(`${EMPRESAS}getEmpresas.php`);

    const $form =
      d.getElementById("form-create-user") ||
      d.getElementById("form-edit-user") ||
      d.getElementById("form-create-student") ||
      d.getElementById("form-create-depto");
    const $select = $form.empresa;
    const $fragmento = document.createDocumentFragment();

    json.forEach((el) => {
      const $opcion = d.createElement("option");
      $opcion.textContent = el.nombre;
      $opcion.value = el.id;
      $fragmento.appendChild($opcion);
    });

    $select.appendChild($fragmento);
    // console.log($select);
    let elems = document.querySelectorAll("select");
    let instances = M.FormSelect.init(elems);
  }

  if (location.pathname.includes("reportes/listado")) {
    fetch(`${EMPRESAS}getEmpresas.php`)
      .then((res) => (res.ok ? res.json() : Promise.reject(res)))
      .then((json) => {
        // console.log(json);
        const $select = d.getElementById("filtro-empresa");
        const $fragmento = document.createDocumentFragment();

        json.forEach((el) => {
          const $opcion = d.createElement("option");
          $opcion.textContent = el.nombre;
          $opcion.value = el.id;
          $fragmento.appendChild($opcion);
        });

        $select.appendChild($fragmento);
        // console.log($select);
        let elems = document.querySelectorAll("select");
        let instances = M.FormSelect.init(elems);
      });
  }
}
