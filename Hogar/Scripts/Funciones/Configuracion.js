var TablaConfig = document.getElementById('Principal');
var EdicionGeneral = document.getElementById('EdicionGeneral');
var EdicionUsuario = document.getElementById('EdicionUsuario');
var EdicionRoles = document.getElementById('EdicionRoles');
var BtnAtras = document.getElementById('btnAtras');
var Titulo = document.getElementById('TituloConfig');
var BtnAgregar = document.getElementById('btnCrear');
var TablaUsuario = document.getElementById('TablaUsuarios');
var InfoPersona = document.getElementById('InfoPersona');
var InfoTelefono = document.getElementById('InfoTelefono');
var InfoUsuario = document.getElementById('InfoUsuario');
var BtnCrearRol = document.getElementById('btnCrearRol');
var FormRoles = document.getElementById('formRol');
var TablaRoles = document.getElementById('tblRol');

//CAMPOS DEL REGISTRO GENERAL
var txtDescripcion = document.getElementById('DescripcionGeneral');
var chkEstado = document.getElementById('EstadoGeneral');
var IndiceGeneral = 0;

function AgregarNuevoRegistro() {
    //VALIDAR TXT AQUI

}

//CAMPOS DE REGISTRO DE ROLES
var txtNmRol = document.getElementById('NomRol');
var cmbResidente = document.getElementById('PerResidente');
var cmbAsistente = document.getElementById('PerAsistente');
var cmbVisitas = document.getElementById('PerVisitas');
var cmbConfiguracion = document.getElementById('PerConfiguraciones');
var chkEstadoRol = document.getElementById('EstadoRol');

function AgregarNuevoRol() {
    //VALIDAR TXT AQUI

    FinalizarRegistroRol()
}

//CAMPOS DE REGISTRO DE INFORMACION PERSONAL
var txtCedula = document.getElementById('Cedula');
var txtNombre = document.getElementById('Nombre');
var txtApellido1 = document.getElementById('Apellido1');
var txtApellido2 = document.getElementById('Apellido2');
var chkEstadoPersona = document.getElementById('EstadoPersona');

function AgregarNuevaPersona() {
    //VALIDAR TXT AQUI

    AgregarTelefono();
}

//CAMPOS DE REGISTRO DE TELEFONO
var txtNumTelefono = document.getElementById('NumeroTel');
var cmbTipoTel = document.getElementById('TipoTelefono');
var chkEstadoTelefono = document.getElementById('EstadoTelefono');

function AgregarNuevoTelefono() {
    //VALIDAR TXT AQUI
}

//CAMPOS DE REGISTRO DE USUARIO
var txtUsuario = document.getElementById('Usuario');
var txtContra1 = document.getElementById('Contrasena');
var txtContra2 = document.getElementById('ContrasenaRepita');
var cmbTipoRol = document.getElementById('Rol');
var chkEstadoUsuario = document.getElementById('EstadoUsuario');

function AgregarNuevoUsuario() {
    //VALIDAR TXT AQUI

    GuardarUsuario()
}

function AgregarPersona() {
    BtnAtras.style.display = "none";
    BtnAgregar.style.display = "none";
    TablaUsuario.style.display = "none";
    InfoPersona.style.display = "block";
    var txtTitulo = Titulo.innerHTML;
    Titulo.innerHTML = `${txtTitulo} / Agregar usuario`;
}

function AgregarUsuario() {
    InfoTelefono.style.display = "none";
    InfoUsuario.style.display = "block";
}

function AgregarTelefono() {
    InfoPersona.style.display = "none";
    InfoTelefono.style.display = "block";
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

function GuardarUsuario() {
    FinalizarRegistroUsuario();
}

function MostrarConfigUsuario() {
    OcultarTablaConfig("Usuarios");
    EdicionUsuario.style.display = "block";
    BtnAtras.style.display = "block";
    BtnAgregar.style.display = "block";
}

function MostrarConfigRol() {
    OcultarTablaConfig("Catálogo Roles");    
    EdicionRoles.style.display = "block";
    BtnAtras.style.display = "block";
    BtnCrearRol.style.display = "block";
}

function AgregarRol() {
    OcultarTablaConfig("Agregar Rol");
    EdicionRoles.style.display = "block";
    TablaRoles.style.display = "none";   
    BtnAtras.style.display = "none";
    FormRoles.style.display = "block";
    BtnCrearRol.style.display = "none";
}

function FinalizarRegistroRol() {
    Titulo.innerHTML = "Configuración del sistema / Catálogo Roles";
    FormRoles.style.display = "none";
    TablaRoles.style.display = "block";
    BtnAtras.style.display = "block";
    BtnCrearRol.style.display = "block";
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

function MostrarConfigParentesco() {
    OcultarTablaConfig("Catálogo Parentesco");
    EdicionGeneral.style.display = "block";
    BtnAtras.style.display = "block";
}

function MostrarConfigAsistente() {
    OcultarTablaConfig("Catálogo Asistente");
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
    BtnCrearRol.style.display = "none";
    EdicionGeneral.style.display = "none";
    EdicionUsuario.style.display = "none";
    EdicionRoles.style.display = "none"
    Titulo.innerHTML = "Configuración del sistema";
}