const d = document;
export async function pushHtml() {
  const includes = d.querySelectorAll("[data-include]");

  for (let i = 0; i < includes.length; i++) {
    await includeHTML(includes[i], includes[i].getAttribute("data-include"));
  }
}

async function includeHTML(el, url) {
  try {
    let options = {
      method: "GET",
      headers: { "content-type": "text/html; charset=utf-8" },
    };
    let res = await fetch(url, options);
    let cont = await res.text();

    el.outerHTML = cont;
  } catch (err) {
    console.log(err);
    el.outerHTML = "ocurrio un error al cargar";
  }
}
