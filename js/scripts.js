// --- formulario2.html ---
function registrarUsuario() {
  const id = document.querySelector('[name="id"]').value;
  const nombre = document.querySelector('[name="nombre"]').value;
  const apellido = document.querySelector('[name="apellido"]').value;
  const correo = document.querySelector('[name="correo"]').value;
  const clave = document.querySelector('[name="clave"]').value;

  if (!id || !nombre || !apellido || !correo || !clave) {
    alert("Por favor, complete todos los campos.");
    return;
  }

  const usuario = { id, nombre, apellido, correo, clave };
  localStorage.setItem(correo, JSON.stringify(usuario));

  alert("Registro exitoso. Ahora puedes iniciar sesión.");
  window.location.href = "formulario.html";
}

// --- formulario.html ---
function iniciarSesion() {
  const correo = document.getElementById("correo").value;
  const clave = document.getElementById("clave").value;
  const datos = localStorage.getItem(correo);

  if (!datos) {
    alert("Usuario no registrado.");
    return;
  }

  const usuario = JSON.parse(datos);
  if (usuario.clave !== clave) {
    alert("Contraseña incorrecta.");
    return;
  }

  localStorage.setItem("usuarioActivo", JSON.stringify(usuario));
  alert("Inicio de sesión exitoso.");
  window.location.href = "index.html";
}

// --- index.html ---
const precios = {
  "Grand Theft Auto V": 90000,
  "Red Dead Redemption 2": 239900,
  "Mortal Kombat 1": 158000,
  "EA SPORTS FC 25": 279000,
  "HELLDIVERS 2": 149000,
  "The Last of Us Parte 1": 219000,
  "The Last of Us Parte 2": 219000,
  "Schedule I": 47500,
  "Warhammer 40,000: Space Marine 2": 189500,
  "Doom the dark ages": 279500,
  "Split Fiction": 199999,
  "Dead Island 2": 167999,
  "Forza Horizon 5": 214900,
};

let carrito = JSON.parse(localStorage.getItem("carrito")) || [];

function agregarAlCarrito(nombre) {
  if (!usuarioActivo) {
    alert("Debes iniciar sesión para agregar productos al carrito.");
    return;
  }
  const precio = precios[nombre] || 0;
  carrito.push({ nombre, precio });
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function mostrarCarrito() {
  const lista = document.getElementById("lista-carrito");
  const contador = document.getElementById("contador-carrito");
  const totalElem = document.getElementById("total-carrito");
  const btnVaciar = document.getElementById("btn-vaciar-carrito");
  const btnPagar = document.getElementById("btn-pagar");

  lista.innerHTML = "";
  let total = 0;

  if (carrito.length === 0) {
    lista.innerHTML = "<li>Tu carrito está vacío</li>";
    totalElem.textContent = "";
    btnVaciar.style.display = "none";
    btnPagar.style.display = "none";
  } else {
    carrito.forEach((item, index) => {
      const li = document.createElement("li");
      li.textContent = `${item.nombre} - $${item.precio.toLocaleString("es-CO")}`;

      const btn = document.createElement("button");
      btn.textContent = "Eliminar";
      btn.className = "btn-eliminar";
      btn.onclick = () => eliminarDelCarrito(index);

      li.appendChild(btn);
      lista.appendChild(li);
      total += item.precio;
    });

    totalElem.textContent = `Total: $${total.toLocaleString("es-CO")}`;
    btnVaciar.style.display = "inline-block";
    btnPagar.style.display = "inline-block";
  }

  contador.textContent = carrito.length;
}

function eliminarDelCarrito(index) {
  carrito.splice(index, 1);
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

function vaciarCarrito() {
  carrito = [];
  localStorage.setItem("carrito", JSON.stringify(carrito));
  mostrarCarrito();
}

window.onload = mostrarCarrito;

document.getElementById("toggle-carrito").addEventListener("click", () => {
  const contenedor = document.getElementById("carrito-container");
  contenedor.style.display = contenedor.style.display === "none" ? "block" : "none";
});

const usuarioActivo = JSON.parse(localStorage.getItem("usuarioActivo"));
const bienvenida = document.getElementById("bienvenida-usuario");
const menuOpciones = document.getElementById("menu-usuario-opciones");
const btnLogin = document.getElementById("btn-login");
const btnRegistro = document.getElementById("btn-registro");
const btnLogout = document.getElementById("btn-logout");

if (usuarioActivo) {
  bienvenida.textContent = `Hola, ${usuarioActivo.nombre}`;
  if (btnLogin) btnLogin.style.display = "none";
  if (btnRegistro) btnRegistro.style.display = "none";
}

if (bienvenida) {
  bienvenida.addEventListener("click", () => {
    menuOpciones.style.display = menuOpciones.style.display === "none" ? "block" : "none";
  });
}

if (btnLogout) {
  btnLogout.addEventListener("click", () => {
    localStorage.removeItem("usuarioActivo");
    window.location.reload();
  });
}
