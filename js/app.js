// Variables
//Carga de productos manual
//Const productos = [
//      {id:1, nombre: "Xbox One Series X", marca: "Microsoft", img: "img/xbox.jpg", precio: 12000, descripcion:"Consola de videojuegos de alto rendimiento, soporta juegos digitales y físicos"},
//      {id:2, nombre: "Play Station 5", marca: "Sony", img: "img/play.jpg", precio: 13000, descripcion:"Consola de videojuegos de alto rendimiento, soporta juegos digitales y físicos"},
//      {id:3, nombre: "Astro A40", marca: "Astro Gaming", img: "img/astro.jpeg", precio: 5000, descripcion:"Headset Profesional con Dolby Atmos"},
//      {id:4, nombre: "Mouse", marca: "Logitech",img: "img/mouse.jpg", precio: 2000, descripcion:"Ratón para videojuegos de alta sensibilidad y precisión"},
//      {id:5, nombre: "Teclado mecánico", marca: "Hyper X", img: "img/hyper.jpg", precio: 7000, descripcion:"Teclado mecánico para videojuegos con iluminación"},
//      {id:6, nombre: "Monitor 24 Pulgadas", marca: "Asus", img: "img/asus.jpg", precio: 14000, descripcion:"Monitor de alta resolución y respuesta FPS"},
//      {id:7, nombre: "Mando Elite Xbox", marca: "Microsoft", img: "img/elite.jpg", precio: 6000, descripcion:"Mando competitivo de la mejor calidad"},
//      {id:8, nombre: "Tarjeta Gráfica", marca: "Nvidia", img: "img/nvidia.jpg", precio: 12000, descripcion:"Tarjeta Gráfica para alto rendimiento"},
//    ];

let productos = [];

const cargarProductos = async () => {
  try {
    const response = await fetch("https://apimocha.com/gamespot/posts");
    const data = await response.json();
    productos = data;
    productos.forEach((item) => {
      const productCard = document.createElement("div");
      productCard.className = "five columns";
      productCard.innerHTML = `
              <div class="card">
                <div class="info-card">
                  <h4>${item.nombre}</h4>
                  <img class='img' src="${item.img}">
                  <p>${item.marca}</p>
                  <p class="precio">$${item.precio}</p>
                  <p>${item.descripcion} </p>
                  <a class="u-full-width button-primary button input agregar-carrito" data-id="${item.id}">Agregar Al Carrito</a>
                </div>
              </div> 
          `;
      listaProducts.appendChild(productCard);
      actualizarCarritoHTML();
    });
  } catch (error) {
    console.error(error);
  }
};

const carrito = document.querySelector("#carrito");
const listaProducts = document.querySelector("#lista-productos");
const contenedorCarrito = document.querySelector("#lista-carrito tbody");
const vaciarCarritoBtn = document.querySelector("#vaciar-carrito");
const realizarCompra = document.querySelector("#boton-compra");

let articulosCarrito = obtenerCarritoLocalStorage();
let total = 0;

function cargarEventListeners() {
  listaProducts.addEventListener("click", agregarProducto);
  vaciarCarritoBtn.addEventListener("click", vaciarCarrito);
  realizarCompra.addEventListener("click", evaluarCarrito);
  const botonesEliminar = document.querySelectorAll(".borrar-producto");
  botonesEliminar.forEach((boton) => {
    boton.addEventListener("click", eliminarProducto);
  });
}

function agregarProducto(e) {
  e.preventDefault();
  if (e.target.classList.contains("agregar-carrito")) {
    const productoSeleccionado = e.target.parentElement.parentElement;
    obtenerDatosProducto(productoSeleccionado);
  }
}

function obtenerDatosProducto(producto) {
  const productoAgregado = {
    id: parseInt(
      producto.querySelector(".agregar-carrito").getAttribute("data-id")
    ),
    nombre: producto.querySelector("h4").textContent,
    precio: parseInt(
      producto.querySelector(".precio").textContent.substring(1)
    ), // Eliminar el símbolo de dólar ($)
  };
  agregarAlCarrito(productoAgregado);
}

function agregarAlCarrito(producto) {
  const existe = articulosCarrito.some((item) => item.id === producto.id);
  if (existe) {
    const productos = articulosCarrito.map((item) => {
      if (item.id === producto.id) {
        item.cantidad++;
      }
      return item;
    });
    articulosCarrito = [...productos];
  } else {
    producto.cantidad = 1;
    articulosCarrito = [...articulosCarrito, producto];
  }
  console.log(articulosCarrito);
  actualizarCarritoHTML();
}

function actualizarCarritoHTML() {
  limpiarCarrito();
  total = 0;
  articulosCarrito.forEach((producto) => {
    const { id, nombre, precio, cantidad } = producto;
    const row = document.createElement("tr");
    const subtotal = parseInt(precio) * parseInt(cantidad);
    total += subtotal;
    row.innerHTML = `
       <td>
       <img src="${obtenerImagenProducto(
         id
       )}" alt="${nombre}" class="producto-imagen">
         <div class="btn-group">
           <button class="btn btn-decrementar" onclick="disminuirCantidad(${id})">-</button>
           <button class="btn btn-incrementar" onclick="aumentarCantidad(${id})">+</button>
           <button class="btn btn-danger" onclick="eliminarProducto(${id})">Eliminar Producto</button>
         </div>
       </td>
       <td>${nombre}</td>
       <td>$${precio}</td>
       <td>${cantidad}</td>
     `;
    document.querySelector("#lista-carrito tbody").appendChild(row);
  });
  const totalCarrito = document.querySelector(".total-carrito");
  totalCarrito.innerHTML = `Total: $${total}`;
  guardarCarritoLocalStorage();
}

function aumentarCantidad(id) {
  articulosCarrito = articulosCarrito.map((producto) => {
    if (producto.id === id) {
      producto.cantidad++;
    }
    return producto;
  });
  actualizarCarritoHTML();
}

function disminuirCantidad(id) {
  articulosCarrito = articulosCarrito.map((producto) => {
    if (producto.id === id && producto.cantidad > 1) {
      producto.cantidad--;
    }
    return producto;
  });
  actualizarCarritoHTML();
}

function eliminarProducto(id) {
  articulosCarrito = articulosCarrito.filter((item) => item.id !== id);
  actualizarCarritoHTML();
}

function obtenerImagenProducto(id) {
  const producto = productos.find((item) => item.id === parseInt(id));
  return producto.img;
}

function limpiarCarrito() {
  const totalCarrito = document.querySelector(".total-carrito");
  totalCarrito.innerHTML = `Total: $0`;
  const listaCarrito = document.querySelector("#lista-carrito tbody");
  while (listaCarrito.firstChild) {
    listaCarrito.removeChild(listaCarrito.firstChild);
  }
}

function vaciarCarrito() {
  articulosCarrito = [];
  actualizarCarritoHTML();
}

function obtenerCarritoLocalStorage() {
  const carritoJSON = localStorage.getItem("carrito");
  return carritoJSON ? JSON.parse(carritoJSON) : [];
}

function guardarCarritoLocalStorage() {
  localStorage.setItem("carrito", JSON.stringify(articulosCarrito));
}

function evaluarCarrito() {
  if (articulosCarrito.length === 0) {
    alert(
      "Tu carrito está vacío. Agrega productos antes de realizar la compra."
    );
  } else {
    location.href = "form.html";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  cargarProductos();
  cargarEventListeners();
});
