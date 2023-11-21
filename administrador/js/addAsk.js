import api from "../../helpers/app.js";
import { helpHttp } from "../../helpers/helpHttp.js";

const d = document;

const { TEMAS } = api;

export default async function addAsk(e = null) {
  if (e === null) {
    if (
      !location.pathname.includes("registrarActividad.html") &&
      !location.pathname.includes("editarActividad.html")
    )
      return;

    // formData.append("id", sessionStorage.getItem("idTemaGO"));

    sessionStorage.setItem("countAsk", 1);
    insertAsk(1);
  } else {
    if (!e.target.matches("#add-ask") && !e.target.matches("#add-ask *"))
      return;

    let countAsk = sessionStorage.getItem("countAsk") || 0;

    countAsk++;
    sessionStorage.setItem("countAsk", countAsk);

    insertAsk(countAsk);
  }
}

async function insertAsk(count) {
  const $template = d.getElementById("template-form-ask").content;
  const $askcontainer = d.getElementById("asks-container");

  $template.getElementById("num-ask").textContent = count;

  let $clone = d.importNode($template, true);
  $clone.querySelector(".ask-delete").setAttribute("data-ask", count);
  $clone.querySelector(".ask-delete i").setAttribute("data-ask", count);
  if (count <= 1) $clone.querySelector(".ask-delete").classList.add("d-none");
  $askcontainer.appendChild($clone);
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems);
}
