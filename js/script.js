// Fake Databases de usuarios y mascotas. 

const usuarios = [{
    nombre: 'Azul',
    mail: 'azul@mail.com',
    pass: 'user123'
},
{
    nombre: 'Betiana',
    mail: 'beti@mail.com',
    pass: 'tite25'
},
{
    nombre: 'Carlos',
    mail: 'carlos@mail.com',
    pass: 'sanlore2002'
}];

const mascotas = [{
    nombre: "Oddie",
    especie: "perro",
    edad: 1,
    peso: 3,
    img: './img/oddie.jpg'
}, {
    nombre: "Garfield",
    especie: "gato",
    edad: 3,
    peso: 8,
    img: './img/garfield.webp'
}, {
    nombre: "Orson",
    especie: "chancho",
    edad: 2,
    peso: 40,
    img: './img/orson.webp'
}, {
    nombre: "Roy",
    especie: "gallo",
    edad: 2,
    peso: 2,
    img: './img/roy.webp'
}];

// Elementos del DOM que voy a necesitar. 

const mailLogin = document.getElementById("emailLogin"),
    passLogin = document.getElementById("passwordLogin"),
    recordar = document.getElementById("recordarme"),
    btnLogin = document.getElementById("login"),
    modalEl = document.getElementById("modalLogin"),
    modal = new bootstrap.Modal(modalEl),
    contTarjetas = document.getElementById("tarjetas"),
    toggles = document.querySelectorAll(".toggles");

// Funcion para guardar en storage

function guardarDatos (usuarioDB, storage) {

    const usuario = {
        "name": usuarioDB.nombre,
        "user": usuarioDB.mail,
        "pass": usuarioDB.pass
    };

    storage.setItem("usuario", JSON.stringify(usuario));
}

// Funcion para recuparar usuario del STORAGE

function recuperarUsuario(storage){
    let usuarioEnStorage = JSON.parse(storage.getItem("usuario"));
    return usuarioEnStorage;
};

// Funcion de bienvenida. 

function saludar(usuario){
    nombreUsuario.innerHTML = `Bienvenido/a, <span>${usuario.name}</span>`
};

function mostrarInformacion(array){
    contTarjetas.innerHTML = ""; // nos aseguramos que la caja este vacia, en blanco.

    array.forEach(element => {
        let html = `<div class="card cardMascota" id="tarjeta${element.nombre}">
        <h3 class="card-header" id="nombreMascota">Nombre: ${element.nombre}</h3>
        <img src="${element.img}" alt="${element.nombre}" class="card-img-bottom" id="fotoMascota">
        <div class="card-body">
            <p class="card-text" id="especieMascota">Especie: ${element.especie}</p>
            <p class="card-text" id="edadMascota">Edad: ${element.edad} años</p>
            <p class="card-text" id="pesoMascota">Peso: ${element.peso} kilos</p>
        </div>
    </div>`
    // una vez creado el HTML, falta cargar todo a la caja que vaciamos en un principio
    contTarjetas.innerHTML += html;

    });
};

// Funcion para intercambiar la visualizacion
// elementos con la clase toggles

function presentarInfo(array, clase){
    array.forEach(element => {
        element.classList.toggle(clase)
    });
};

// Funcion de validacion

function validarUsuario(usersDB,user,pass){
    let encontrado = usersDB.find((userDB) => userDB.mail == user);
    // por default, si existe, vamos a tener un encontrado que es un objeto,pero sino, se hace lo siguiente:
    if(typeof encontrado === "undefined"){
        return false;
    }else{
        if(encontrado.pass != pass){
            return false;
        }else{
            return encontrado;
        };
    };
};
// esta es una forma de validacion de datos que empieza en base a lo negativo, si no se encuentra nada se retorna falso, si encontro algo pero la contraseña no coincide, tambien retorna falso, recien cuando retorno algo y la contraseña coincido, retorna el usuario encontrado. 
// estas validaciones se encuentran bastante en back-end.

// Ahora agregamos el evento al boton de login

btnLogin.addEventListener("click",(e)=>{
    e.preventDefault(); // esto para que no se cierre ni se recarge la pagina, el boton no se comporte por defecto.
    if(!mailLogin.value||!passLogin.value){
        alert("Todos los campos son requeridos");
    }else{
        let data = validarUsuario(usuarios, mailLogin.value, passLogin.value)
        if(!data){
            alert("Usuario y/o contraseña erróneos")
        }else{
            if(recordar.checked){
                guardarDatos(data, localStorage);
                saludar(recuperarUsuario(localStorage));
            }else{
                guardarDatos(data, sessionStorage);
                saludar(recuperarUsuario(sessionStorage));
            }
            // Recien ahora cierro el cuadro de Login
            modal.hide();
            // Muestro info para usuarios logueados
            mostrarInformacion(mascotas);
            presentarInfo(toggles, "d-none");
        };
    }

    
});

// Boton logout

btnLogout.addEventListener("click", () => {
    borrarDatos();
    presentarInfo(toggles, "d-none");
});

// Funcion esta logueado

function estaLogueado(usuario){

    if(usuario){
        saludar(usuario);
        mostrarInformacion(mascotas)
        presentarInfo(toggles, "d-none");
    };
};

estaLogueado(recuperarUsuario(localStorage))