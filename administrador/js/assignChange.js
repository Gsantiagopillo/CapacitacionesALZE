const d = document;

export default async function assignChange(select = null) {
  if (!location.pathname.includes("/administrador/AsignarCurso.html")) return;

  if (!select) {
    const $selectEmp = d.getElementById("choose-assign-empresa");
    const $assignEmp = d.querySelector(".choose-assign-child.assign-empresa");

    $assignEmp.classList.add("selected");
    $selectEmp.classList.remove("d-none");
  } else {
    if (select === "EMPRESA") {
      const $selectDepto = d.getElementById("choose-assign-depto");
      const $selectUser = d.getElementById("choose-assign-user");

      $selectDepto.classList.add("d-none");
      $selectUser.classList.add("d-none");
    }
    if (select === "DEPTO") {
      const $selectDepto = d.getElementById("choose-assign-depto");
      const $selectUser = d.getElementById("choose-assign-user");

      $selectDepto.classList.remove("d-none");
      $selectUser.classList.add("d-none");
    }
    if (select === "USUARIO") {
      const $selectDepto = d.getElementById("choose-assign-depto");
      const $selectUser = d.getElementById("choose-assign-user");

      $selectDepto.classList.remove("d-none");
      $selectUser.classList.remove("d-none");
    }
  }
}
