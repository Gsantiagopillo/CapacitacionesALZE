const d = document;

export default function headerAdminMark() {
  if (location.pathname.includes("indexadmin")) {
    d.getElementById("admin-item-menu").classList.add("selected");
  }
}
