var TablaConfig = document.getElementById('Principal');
var EdicionGeneral = document.getElementById('EdicionGeneral');
var EdicionUsuario = document.getElementById('EdicionUsuario');
var BtnAtras = document.getElementById('btnAtras');
var Titulo = document.getElementById('TituloConfig');
var BtnAgregar = document.getElementById('btnCrear');
var TablaUsuario = document.getElementById('TablaUsuarios');
var InfoPersona = document.getElementById('InfoPersona');
var InfoTelefono = document.getElementById('InfoTelefono');
var InfoUsuario = document.getElementById('InfoUsuario');

function AgregarPersona() {
    BtnAtras.style.display = "none";
    BtnAgregar.style.display = "none";
    TablaUsuario.style.display = "none";
    InfoPersona.style.display = "block";
    var txtTitulo = Titulo.innerHTML;
    Titulo.innerHTML = `${txtTitulo} / Agregar usuario`;
}

function AgregarTelefono() {
    InfoPersona.style.display = "none";
    InfoTelefono.style.display = "block";
}

function AgregarUsuario() {
    InfoTelefono.style.display = "none";
    InfoUsuario.style.display = "block";
}

function FinalizarRegistroUsuario() {
    InfoPersona.style.display = "none";
    InfoTelefono.style.display = "none";
    InfoUsuario.style.display = "none";
    BtnAtras.style.display = "block";
    BtnAgregar.style.display = "block";
    TablaUsuario.style.display = "block";
    Titulo.innerHTML = "Configuración del sistema / Usuarios";
}

function MostrarConfigUsuario() {
    OcultarTablaConfig("Usuarios");
    EdicionUsuario.style.display = "block";
    BtnAtras.style.display = "block";
    BtnAgregar.style.display = "block";
}

function MostrarConfigRol() {
    OcultarTablaConfig("Catálogo Rol");
    EdicionGeneral.style.display = "block";
    BtnAtras.style.display = "block";
}

function MostrarConfigArticulo() {
    OcultarTablaConfig("Catálogo Articulo");
    EdicionGeneral.style.display = "block";
    BtnAtras.style.display = "block";
}

function MostrarConfigTelefono() {
    OcultarTablaConfig("Catálogo Teléfono");
    EdicionGeneral.style.display = "block";
    BtnAtras.style.display = "block";
}

function OcultarTablaConfig(Config) {
    TablaConfig.style.display = "none";    
    var txtTitulo = Titulo.innerHTML;
    Titulo.innerHTML = `${txtTitulo} / ${Config}`;
}

function OcultarFormularios() {
    TablaConfig.style.display = "block";
    BtnAtras.style.display = "none";
    BtnAgregar.style.display = "none";
    EdicionGeneral.style.display = "none";
    EdicionUsuario.style.display = "none";
    Titulo.innerHTML = "Configuración del sistema";
}