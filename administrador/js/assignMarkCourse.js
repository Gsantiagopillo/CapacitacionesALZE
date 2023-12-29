import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";
import assignCourse from "./assignCourse.js";

const d = document;

const { CURSOS } = api;

export default async function assignMarkCourse(e) {
  if (!location.pathname.includes("/AsignarCurso.html")) return;
  console.log(e);

  if (e.target.matches("input[type='checkbox']")) return;

  await assignCourse();

  const select = sessionStorage.getItem("assignChange");

  const Courses = d.querySelectorAll("[data-course-id]");

  if (e.target.matches("#empresa")) {
    if (select === "EMPRESA") {
      markEmpresa(e, Courses);
    }
    d.querySelector(".load").style.display = "none";
  }

  if (e.target.matches("#departamento")) {
    if (select === "DEPTO") {
      const empresaId = d.getElementById("empresa").value;
      markDepto(e, Courses);
      markEmpresa(empresaId, Courses, true);
    }
    d.querySelector(".load").style.display = "none";
  }
  if (e.target.matches("#usuario")) {
    if (select === "USER") {
      const empresaId = d.getElementById("empresa").value;
      const deptoId = d.getElementById("departamento").value;
      markUser(e, Courses);
      markDepto(deptoId, Courses, true);
      markEmpresa(empresaId, Courses, true);
    }
    d.querySelector(".load").style.display = "none";
  }
}

async function markEmpresa(e, Courses, band = null) {
  d.querySelector(".load").style.display = "flex";
  const formData = new FormData();

  e.target ? formData.append("id", e.target.value) : formData.append("id", e);
  let options = {
    method: "POST",
    body: formData,
  };
  let courseEmpresa = await helpHttp().post(
    `${CURSOS}getCursosEmpresa.php`,
    options
  );

  courseEmpresa.forEach((el) => {
    for (let i = 0; i < Courses.length; i++) {
      let dataId = Courses[i].getAttribute("data-course-id");
      if (el["id_curso"] === dataId) {
        Courses[i].setAttribute("checked", "checked");
        if (band) Courses[i].disabled = true;
      }
    }
  });
}

async function markDepto(e, Courses, band = null) {
  d.querySelector(".load").style.display = "flex";
  const formData = new FormData();

  e.target ? formData.append("id", e.target.value) : formData.append("id", e);
  let options = {
    method: "POST",
    body: formData,
  };
  let courseDepto = await helpHttp().post(
    `${CURSOS}getCursosDepto.php`,
    options
  );

  courseDepto.forEach((el) => {
    for (let i = 0; i < Courses.length; i++) {
      let dataId = Courses[i].getAttribute("data-course-id");
      if (el["id_curso"] === dataId) {
        Courses[i].setAttribute("checked", "checked");
        if (band) Courses[i].disabled = true;
      }
    }
  });
}

async function markUser(e, Courses, band = null) {
  d.querySelector(".load").style.display = "flex";
  const formData = new FormData();

  e.target ? formData.append("id", e.target.value) : formData.append("id", e);
  console.log("id", e.target.value);
  let options = {
    method: "POST",
    body: formData,
  };
  let courseUser = await helpHttp().post(`${CURSOS}getCursosUser.php`, options);

  courseUser.forEach((el) => {
    for (let i = 0; i < Courses.length; i++) {
      let dataId = Courses[i].getAttribute("data-course-id");
      if (el["id_curso"] === dataId) {
        Courses[i].setAttribute("checked", "checked");
        if (band) Courses[i].disabled = true;
      }
    }
  });
}
