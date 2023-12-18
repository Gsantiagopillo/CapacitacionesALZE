import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { CURSOS } = api;

export default async function assignMarkCourse(e) {
  if (!location.pathname.includes("/AsignarCurso.html")) return;

  const select = sessionStorage.getItem("assignChange");

  const Courses = d.querySelectorAll("[data-course-id]");

  if (e.target.matches("#empresa")) {
    if (select === "EMPRESA") {
      d.querySelector(".load").style.display = "flex";
      const formData = new FormData();

      formData.append("id", e.target.value);
      let options = {
        method: "POST",
        body: formData,
      };
      let courseEmpresa = await helpHttp().post(
        `${CURSOS}getCursosEmpresa.php`,
        options
      );

      console.log(courseEmpresa);

      courseEmpresa.forEach((el) => {
        for (let i = 0; i < Courses.length; i++) {
          let dataId = Courses[i].getAttribute("[data-course-id]");
          if (el["id_curso"] === dataId)
            Courses[i].setAttribute("checked", "checked");
        }
      });
    }
    d.querySelector(".load").style.display = "none";
  }

  if (e.target.matches("#departamento")) {
    if (select === "DEPTO") {
      d.querySelector(".load").style.display = "flex";
      const formData = new FormData();

      formData.append("id", e.target.value);
      let options = {
        method: "POST",
        body: formData,
      };
      let courseDepto = await helpHttp().post(
        `${CURSOS}getCursosDepto.php`,
        options
      );

      console.log(courseDepto);

      courseDepto.forEach((el) => {
        for (let i = 0; i < Courses.length; i++) {
          let dataId = Courses[i].getAttribute("[data-course-id]");
          if (el["id_curso"] === dataId)
            Courses[i].setAttribute("checked", "checked");
        }
      });
    }
    d.querySelector(".load").style.display = "none";
  }
  if (e.target.matches("#usuario")) {
    if (select === "USER") {
      d.querySelector(".load").style.display = "flex";
      const formData = new FormData();

      formData.append("id", e.target.value);
      console.log("id", e.target.value);
      let options = {
        method: "POST",
        body: formData,
      };
      let courseUser = await helpHttp().post(
        `${CURSOS}getCursosUser.php`,
        options
      );

      console.log(courseUser);

      courseUser.forEach((el) => {
        for (let i = 0; i < Courses.length; i++) {
          let dataId = Courses[i].getAttribute("[data-course-id]");
          if (el["id_curso"] === dataId)
            Courses[i].setAttribute("checked", "checked");
        }
      });
    }
    d.querySelector(".load").style.display = "none";
  }
}
