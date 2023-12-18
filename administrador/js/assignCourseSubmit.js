import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { CURSOS } = api;

export default async function assignCourseSubmit(e) {
  if (!e.target.matches("#form-assign-course")) return;
}
