document.addEventListener("DOMContentLoaded", function () {
  const formularioCompra = document.querySelector("#formulario-compra");
  formularioCompra.addEventListener("submit", procesarCompra);
});

function procesarCompra(e) {
  e.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const correo = document.querySelector("#correo").value;
  alert(
    `¡Gracias por tu compra, ${nombre} ${apellido}! Te enviaremos un correo a ${correo} con los detalles de tu compra.`
  );

  document.querySelector("#formulario-compra").reset();
  localStorage.clear();
  window.location.href = "index.html";
}
