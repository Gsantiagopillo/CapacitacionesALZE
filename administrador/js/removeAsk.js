const d = document;

export default function removeAsk(e) {
  if (!e.target.matches(".ask-delete") && !e.target.matches(".ask-delete *"))
    return;

  if (d.getElementById("asks-container").children.length > 1) {
    let idAsk = e.target.getAttribute("data-ask-id") || null;

    if (idAsk) {
      if (!sessionStorage.getItem("list-ask-delete"))
        sessionStorage.setItem("list-ask-delete", JSON.stringify([]));

      idAsk = parseInt(idAsk);
      let arr = JSON.parse(sessionStorage.getItem("list-ask-delete"));
      arr = [...arr, idAsk];
      sessionStorage.setItem("list-ask-delete", JSON.stringify(arr));
      console.log(arr);
      console.log(sessionStorage.getItem("list-ask-delete"));
    }

    let numAsk = e.target.getAttribute("data-ask");

    let $childrens = d.getElementById("asks-container").children;

    let $child;
    for (let i = 0; i < $childrens.length; i++) {
      if (parseInt(i) + 1 === parseInt(numAsk)) {
        $child = $childrens[i];
      }
    }

    d.getElementById("asks-container").removeChild($child);
    let count = sessionStorage.getItem("countAsk");
    count--;
    sessionStorage.setItem("countAsk", count);
  } else {
    alert("Minimo debe existir 1 pregunta");
  }
}
