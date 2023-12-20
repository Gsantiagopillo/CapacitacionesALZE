import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { CURSOS } = api;

export default async function assignCourseSubmit(e) {
  if (!e.target.matches("#form-assign-course")) return;

  const selected = sessionStorage.getItem("assignChange");
  const $form = d.getElementById("form-assign-course");
  const $selectEmp = d.getElementById("empresa");
  const $selectDepto = d.getElementById("departamento");
  const $selectUser = d.getElementById("usuario");

  let idToAssign = null;
  let assignTo = "";

  if (selected === "EMPRESA") {
    if ($selectEmp.value === "0") {
      alert("Selecciona una empresa a la cual asignar los cursos");
      return;
    }
    idToAssign = parseInt($selectEmp.value);
    assignTo = "EMPRESA";
  }

  if (selected === "DEPTO") {
    if ($selectDepto.value === "0") {
      alert("Selecciona un departamento al cual asignar los cursos");
      return;
    }
    idToAssign = parseInt($selectDepto.value);
    assignTo = "DEPTO";
  }

  if (selected === "USER") {
    if ($selectUser.value === "0") {
      alert("Selecciona un usuario al cual asignar los cursos");
      return;
    }
    idToAssign = parseInt($selectUser.value);
    assignTo = "USER";
  }

  /* */

  let courses = getCoursesChecked();

  console.log(courses);

  const formData = new FormData();

  formData.append("id", idToAssign);
  formData.append("assignTo", assignTo);
  formData.append("courses", JSON.stringify(courses));

  console.log(idToAssign, assignTo, courses);
  let options = {
    method: "POST",
    body: formData,
  };

  // let json = await helpHttp().post(`${CURSOS}assignCursos.php`, options);
  let res = await fetch(`${CURSOS}assignCurso.php`, options);
  let json = await res.json();

  console.log(json);
}

function getCoursesChecked() {
  const $courses = d.querySelectorAll("input[type='checkbox']");
  let courses = [];

  $courses.forEach((el) => {
    if (el.checked) courses.push(parseInt(el.getAttribute("data-course-id")));
  });

  return courses;
}
