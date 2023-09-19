import editarEmpresa, {
  empresaToEdit,
} from "../administrador/js/editarEmpresa.js";
import headerAdmin from "../administrador/js/headerAdmin.js";
import headerAdminMark from "../administrador/js/headeradminMark.js";
import infoDepartamento from "../administrador/js/infoDepartamento.js";
import infoEmpresa from "../administrador/js/infoEmpresa.js";
import listadoDepartamentos, {
  departamentoToEdit,
} from "../administrador/js/listadoDepartamentos.js";
import listadoEmpresas, {
  goToEmpresa,
} from "../administrador/js/listadoEmpresas.js";
import listadoUsuarios from "../administrador/js/listadoUsuarios.js";
import registrarDepartamento from "../administrador/js/registrarDepartamento.js";
import registrarEmpresa from "../administrador/js/registrarEmpresa.js";
import RegitrarEstudiante from "../administrador/js/registrarEstudiante.js";
import RegitrarUsuario from "../administrador/js/registrarUsuario.js";
import setDepartamento from "../administrador/js/setDepartamento.js";
import setEmpresa from "../administrador/js/setEmpresa.js";
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
  editarEmpresa(e);
});

d.addEventListener("click", (e) => {
  viewPassw(e);
  headerAdmin(e);
  empresaToEdit(e);
  goToEmpresa(e);
  departamentoToEdit(e);
});

d.addEventListener("change", (e) => {
  setDepartamento(e);
});

d.addEventListener("DOMContentLoaded", async (e) => {
  await pushHtml();
  headerAdminMark();
  setEmpresa();
  listadoEmpresas();
  listadoUsuarios();
  listadoDepartamentos();
  infoDepartamento();
  infoEmpresa();
});
