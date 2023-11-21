const d = document;

export default function removeTask(e) {
  if (!e.target.matches(".task-delete") && !e.target.matches(".task-delete *"))
    return;

  if (d.getElementById("task-container").children.length > 1) {
    let idTask = e.target.getAttribute("data-task-id") || null;

    if (idTask) {
      if (!sessionStorage.getItem("list-task-delete"))
        sessionStorage.setItem("list-task-delete", JSON.stringify([]));

      idTask = parseInt(idTask);
      let arr = JSON.parse(sessionStorage.getItem("list-task-delete"));
      arr = [...arr, idTask];
      sessionStorage.setItem("list-task-delete", JSON.stringify(arr));
      console.log(arr);
      console.log(sessionStorage.getItem("list-task-delete"));
    }

    let numtask = e.target.getAttribute("data-task");

    let $childrens = d.getElementById("task-container").children;

    let $child;
    for (let i = 0; i < $childrens.length; i++) {
      if (parseInt(i) + 1 === parseInt(numtask)) {
        $child = $childrens[i];
      }
    }

    d.getElementById("task-container").removeChild($child);
    let count = sessionStorage.getItem("countTask");
    count--;
    sessionStorage.setItem("countTask", count);
  } else {
    alert("Minimo debe existir 1 Entregable");
  }
}
