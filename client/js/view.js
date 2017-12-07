/**
 *
 * @return {DOM_Element}
 *
 * skeleton:
 * 1: create or find existing 'app' dom element
 * 2: append an input that accepts contacts
 * 3: append an output that displays contacts
 * 4: append an input that accepts an email
 * 5: append
 */
function renderView() {
  let $app;
  if (document.getElementById("app")) {
    $app = document.getElementById("app");
    while ($app.firstChild) {
      $app.removeChild($app.firstChild);
    }
  } else {
    $app = document.createElement("div");
    $app.setAttribute("id", "app");
  }
  return $app;
}

window.onload = function() {
  document.body.appendChild(renderView());
};
