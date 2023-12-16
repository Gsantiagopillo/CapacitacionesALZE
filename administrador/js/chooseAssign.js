import assignChange from "./assignChange.js";

const d = document;

export default function chooseAssign(e) {
  if (
    !e.target.matches(".choose-assign-child") &&
    !e.target.matches(".choose-assign-child *")
  )
    return;

  const $assigns = d.querySelectorAll(".choose-assign-child");

  $assigns.forEach((el) => {
    el.classList.remove("selected");
  });

  e.target.classList.add("selected");
  assignChange(e.target.textContent);
}
