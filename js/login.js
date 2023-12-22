import api from "../helpers/app.js";

const d = document;

export default function login(e) {
  if (!e.target.matches(".login-form")) return;

  d.querySelector(".login-incorrect").style.display = "none";
  //console.log(e.target);
  const correo = d.getElementById("email").value,
    passw = d.getElementById("passw").value,
    sessionActive = d.getElementById("session").checked;

  const { ADMINS, STUDENTS, LOGIN, KEY_SESSION } = api;
  // console.log(`${LOGIN}login.php`);

  const formData = new FormData();

  formData.append("email", correo);
  formData.append("passw", passw);
  formData.append("sessionActive", sessionActive);

  let options = {
    method: "POST",
    body: formData,
  };

  fetch(`${LOGIN}login.php`, options)
    .then((res) => (res.ok ? res.json() : Promise.reject(res)))
    .then((json) => {
      console.log(json);
      if (!json.err) {
        let nombreUser = `${json.nombre} ${json["apellido_paterno"]} ${json["apellido_materno"]}`;
        if (json.sessionActive === "true") {
          localStorage.setItem("user", json.id);
          localStorage.setItem("userName", nombreUser);
          localStorage.setItem("type_user", json["id_rol"]);
          localStorage.setItem("session", json.idSession);
          localStorage.setItem("k_session", KEY_SESSION);
        } else {
          sessionStorage.setItem("user", json.id);
          sessionStorage.setItem("userName", nombreUser);
          sessionStorage.setItem("type_user", json["id_rol"]);
          sessionStorage.setItem("session", json.idSession);
          sessionStorage.setItem("k_session", KEY_SESSION);
        }

        if (json["id_rol"] !== "4") {
          console.log("case admins");
          location.replace(`${ADMINS}indexadmin.html`);
        } else {
          console.log("case students");
          location.replace(`${STUDENTS}indexstudent.html`);
        }
      } else {
        if (json.causa === "1")
          d.querySelector(".login-incorrect").textContent =
            "contraseña incorrecta";
        if (json.causa === "2")
          d.querySelector(".login-incorrect").textContent = "Usuario no existe";

        d.querySelector(".login-incorrect").style.display = "block";

        setTimeout(() => {
          d.querySelector(".login-incorrect").style.display = "none";
        }, 2500);
      }
    })
    .catch((err) => {
      console.log(err);
      let message = err.statusText || "ocurrio un error";
      console.log(` error ${err.status} : ${message}`);
      d.querySelector(
        ".login-incorrect"
      ).textContent = ` ocurrio un error de conexión`;
      d.querySelector(".login-incorrect").style.display = "block";
    });
}
