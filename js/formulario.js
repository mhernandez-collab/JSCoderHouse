document.addEventListener("DOMContentLoaded", function () {
  const formularioCompra = document.querySelector("#formulario-compra");
  formularioCompra.addEventListener("submit", procesarCompra);
});

function procesarCompra(e) {
  e.preventDefault();
  const nombre = document.querySelector("#nombre").value;
  const apellido = document.querySelector("#apellido").value;
  const correo = document.querySelector("#correo").value;
  let timerInterval;

  Swal.fire({
    icon: "success",
    title: "Compra Realizada con Éxito!",
    html: `<span class="swal2-html-container-custom">Gracias por tu compra, ${nombre} ${apellido}!</span><br>Te enviaremos un correo a <span>${correo}</span> con los detalles de tu compra.<br>Redireccionando en <b id="timer"></b>...`,
    showConfirmButton: false,
    timer: 6000,
    timerProgressBar: true,
    didOpen: () => {
      Swal.showLoading();
      const b = document.getElementById("timer");
      timerInterval = setInterval(() => {
        b.textContent = (Swal.getTimerLeft() / 1000).toFixed(0);
      }, 1000);
    },
    willClose: () => {
      clearInterval(timerInterval);
    },
    background: "#000",
    customClass: {
      title: "swal2-title-custom",
      htmlContainer: "swal2-html-container-custom",
    },
  });

  setTimeout(() => {
    document.querySelector("#formulario-compra").reset();
    localStorage.clear();
    window.location.href = "index.html";
  }, 6000);
}
