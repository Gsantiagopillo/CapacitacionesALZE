import addAsk from "../administrador/js/addAsk.js";
import addTask from "../administrador/js/addTask.js";
import assignChange from "../administrador/js/assignChange.js";
import assignCourse from "../administrador/js/assignCourse.js";
import assignCourseSubmit from "../administrador/js/assignCourseSubmit.js";
import assignMarkCourse from "../administrador/js/assignMarkCourse.js";
import chooseAssign from "../administrador/js/chooseAssign.js";
import deleteDepartamento from "../administrador/js/deleteDepartamento.js";
import deleteEmpresa from "../administrador/js/deleteEmpresa.js";
import deleteUsuario from "../administrador/js/deleteUsuario.js";
import editarActividad, {
  ActividadToEdit,
} from "../administrador/js/editarActividad.js";
import editarCurso, { cursoToEdit } from "../administrador/js/editarCurso.js";
import editarDepartamento from "../administrador/js/editarDepartamento.js";
import editarEmpresa, {
  empresaToEdit,
} from "../administrador/js/editarEmpresa.js";
import editarTema, { temaToEdit } from "../administrador/js/editarTema.js";
import editarUsuario, {
  usuarioToEdit,
} from "../administrador/js/editarUsuario.js";
import headerAdmin from "../administrador/js/headerAdmin.js";
import headerAdminMark from "../administrador/js/headeradminMark.js";
import infoActividad from "../administrador/js/infoActividad.js";
import infoCurso from "../administrador/js/infoCurso.js";
import infoDepartamento from "../administrador/js/infoDepartamento.js";
import infoEmpresa from "../administrador/js/infoEmpresa.js";
import infoTema from "../administrador/js/infoTema.js";
import infoUsuario from "../administrador/js/infoUsuario.js";
import listadoActividades from "../administrador/js/listadoActividades.js";
import listadoCursos, { goToCurso } from "../administrador/js/listadoCursos.js";
import listadoDepartamentos, {
  departamentoToEdit,
} from "../administrador/js/listadoDepartamentos.js";
import listadoEmpresas, {
  goToEmpresa,
} from "../administrador/js/listadoEmpresas.js";
import listadoTemas, { goToTema } from "../administrador/js/listadoTemas.js";
import listadoUsuarios from "../administrador/js/listadoUsuarios.js";
import registrarActividad, {
  uploadActividad,
} from "../administrador/js/registrarActividad.js";
import registrarCurso from "../administrador/js/registrarCurso.js";
import registrarDepartamento, {
  uploadDepartamento,
} from "../administrador/js/registrarDepartamento.js";
import registrarEmpresa from "../administrador/js/registrarEmpresa.js";
import RegitrarEstudiante from "../administrador/js/registrarEstudiante.js";
import registrarTema, {
  uploadTema,
} from "../administrador/js/registrarTema.js";
import RegitrarUsuario from "../administrador/js/registrarUsuario.js";
import removeAsk from "../administrador/js/removeAsk.js";
import removeTask from "../administrador/js/removeTask.js";
import setDepartamento from "../administrador/js/setDepartamento.js";
import setEmpresa from "../administrador/js/setEmpresa.js";
import setUsuario from "../administrador/js/setUsuario.js";
import login from "./login.js";
import { pushHtml } from "./pushHtml.js";
import viewPassw from "./viewPassw.js";

const d = document;

d.addEventListener("submit", (e) => {
  e.preventDefault();
  login(e);
  registrarEmpresa(e);
  registrarDepartamento(e);
  RegitrarEstudiante(e);
  RegitrarUsuario(e);
  registrarCurso(e);
  editarEmpresa(e);
  editarDepartamento(e);
  editarUsuario(e);
  editarCurso(e);
  editarTema(e);
  uploadActividad(e);
  editarActividad(e);
  assignCourseSubmit(e);
});

d.addEventListener("click", (e) => {
  viewPassw(e);
  headerAdmin(e);
  empresaToEdit(e);
  goToEmpresa(e);
  goToCurso(e);
  departamentoToEdit(e);
  usuarioToEdit(e);
  deleteUsuario(e);
  deleteEmpresa(e);
  registrarDepartamento(e);
  uploadDepartamento(e);
  deleteDepartamento(e);
  registrarTema(e);
  uploadTema(e);
  cursoToEdit(e);
  temaToEdit(e);
  goToTema(e);
  addTask(e);
  removeTask(e);
  addAsk(e);
  removeAsk(e);
  registrarActividad(e);
  ActividadToEdit(e);
  chooseAssign(e);
});

d.addEventListener("change", (e) => {
  setDepartamento(e);
  setUsuario(e);
  assignMarkCourse(e);
});

d.addEventListener("DOMContentLoaded", async (e) => {
  await pushHtml();
  headerAdminMark();
  setEmpresa();
  listadoEmpresas();
  listadoUsuarios();
  listadoDepartamentos();
  infoDepartamento();
  listadoCursos();
  listadoTemas();
  infoEmpresa();
  infoUsuario();
  infoCurso();
  infoTema();
  listadoActividades();
  addTask();
  addAsk();
  infoActividad();
  assignChange();
});
