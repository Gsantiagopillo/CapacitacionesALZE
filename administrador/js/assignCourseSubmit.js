import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { CURSOS } = api;

export default async function assignCourseSubmit(e) {
  if (!e.target.matches("#form-assign-course")) return;

  return;

  const selected = sessionStorage.getItem("assignChange");
  const $form = d.getElementById("form-assign-course");
  const $selectEmp = d.getElementById("empresa");
  const $selectDepto = d.getElementById("departamento");
  const $selectUser = d.getElementById("usuario");

  if (selected === "EMPRESA") {
    if ($selectEmp.value === "") {
      alert("Selecciona una empresa a la cual asignar los cursos");
      return;
    }
  }

  if (selected === "DEPTO") {
    if ($selectEmp.value === "") {
      alert("Selecciona una empresa a la cual asignar los cursos");
      return;
    }
  }

  if (selected === "USER") {
    if ($selectEmp.value === "") {
      alert("Selecciona una empresa a la cual asignar los cursos");
      return;
    }
  }
}
