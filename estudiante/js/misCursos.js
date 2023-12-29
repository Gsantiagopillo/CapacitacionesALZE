import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { CURSOS, STUDENTS, DOMAIN } = api;

export default async function misCursos() {
  if (!location.pathname.includes("misCursos.html")) return;

  sessionStorage.removeItem("idCursoGO"); //Elimina el id de curso a ver

  // const type_user =
  //   localStorage.getItem("type_user") || sessionStorage.getItem("type_user");

  const formData = new FormData();

  formData.append("id", sessionStorage.getItem("user"));
  let options = {
    method: "POST",
    body: formData,
  };

  let json = await helpHttp().post(`${CURSOS}getMisCursos.php`, options);

  console.log(json);

  let result = json.filter((item, index) => {
    return json.indexOf(item["id_curso"]) === index;
  });
  console.log(result);

  if (json.length === 0) {
    const $h5 = d.createElement("h5");
    $h5.textContent = "NO HAY CURSOS DADOS DE ALTA";
    $h5.style.textAlign = "center";
    d.querySelector(".table").insertAdjacentElement("afterend", $h5);
    return;
  }

  const $fragmento = d.createDocumentFragment();

  for (let i = 0; i < json.length; i++) {
    const formData2 = new FormData();

    formData2.append("id", json[i]["id_curso"]);

    let options = {
      method: "POST",
      body: formData2,
    };

    let curso = await helpHttp().post(`${CURSOS}getCurso.php`, options);
    console.log(curso);

    const $tr = d.createElement("tr"),
      $td1 = d.createElement("td"),
      $td2 = d.createElement("td"),
      $logo = d.createElement("img");

    $td1.appendChild($logo);
    $logo.setAttribute("src", `${DOMAIN}assets/cursos/${curso["img_curso"]}`);
    $logo.setAttribute("data-id", curso.id);
    $logo.classList.add("td-img");
    $td1.setAttribute("data-id", curso.id);
    $td1.id = "td-curso-student";
    $td2.textContent = curso.nombre;
    $td2.setAttribute("data-id", curso.id);
    $td2.id = "td-curso-student";

    $tr.appendChild($td1);
    $tr.appendChild($td2);

    $tr.classList.add("cursor-pointer");
    $tr.id = "tr-curso";
    $tr.setAttribute("data-id", curso.id);

    $fragmento.appendChild($tr);
  }

  d.getElementById("tbody").appendChild($fragmento);
}

export function goToCursoStudent(e) {
  if (
    !e.target.matches("#td-curso-student") &&
    !e.target.matches("#td-curso-student *")
  )
    return;
  let id = e.target.getAttribute("data-id");
  sessionStorage.setItem("idCursoGOStu", id);
  location.replace(`${STUDENTS}misTemas.html`);
}
