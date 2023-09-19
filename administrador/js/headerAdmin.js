const d = document;

export default function headerAdmin(e) {
  if (
    e.target.matches("#button-menu-admin") ||
    e.target.matches("#button-menu-admin *")
  ) {
    d.getElementById("menu-admin").classList.toggle("active");
    d.querySelector("[data-submenu-user]").classList.remove("display-flex");
  }
  if (
    e.target.matches("[data-nav-user]") ||
    e.target.matches("[data-nav-user] *")
  ) {
    d.getElementById("menu-admin").classList.remove("active");
    d.querySelector("[data-submenu-user]").classList.toggle("display-flex");
  }
  if (e.target.matches("[data-nav-item]")) {
    const subMenu = e.target.getAttribute("data-nav-item");
    const $subMenu = d.querySelector(`[data-submenu='${subMenu}']`);
    $subMenu.classList.toggle("active");
  }
}
