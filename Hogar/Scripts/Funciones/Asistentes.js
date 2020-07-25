var MarcoAsistente = document.getElementById('MarcoAsistentes');
var MarcoAsignar = document.getElementById('MarcoAsignar');
var Titulo = document.getElementById('TituloConfig');
var InfoPersona = document.getElementById('InfoPersona');
var InfoTelefono = document.getElementById('InfoTelefono');
var InfoAsistente = document.getElementById('InfoAsistente');
var Nombre = document.getElementById('Id');
var tbAsistente = document.getElementById('tbAsistente');
var tbAsignar = document.getElementById('tbAsignar');
var AccionAsignacion = document.getElementById('AccionAsignacion');

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


//CAMPOS DE FORMULARIO REGISTRO ASISTENTE
var cmbAsistente = document.getElementById('TipoAsistente');
var fechIngreso = document.getElementById('FechIngreso');
var fechEntrada = document.getElementById('FechEntrada');
var fechSalidad = document.getElementById('FechSalida');
var EstadoAsistente = document.getElementById('FechSalida');

function GuardarAsistente() {
    //VALIDAR TXT AQUI

    FinalizarRegistro();
    CambiarTitulo("Asistentes / Lista de asistentes");
}

function ProcesosAsignar() {
    AccionAsignacion.style.display = "block";
}

function AgregarPersona() {
    OcultarTodo();
    InfoPersona.style.display = "block";
    CambiarTitulo("Asistentes / Lista de asistentes / Agregar asistente");
}

function RegistrarPersona() {
    OcultarTodo();
    InfoTelefono.style.display = "block";
}

function RegistrarTelefono() {

}

function ContinuarTelefono() {
    OcultarTodo();
    InfoAsistente.style.display = "block"
}

function FinalizarRegistro() {
    OcultarTodo();
    clickAsistente();
    CambiarTitulo("Asistentes / Lista de asistentes");
}

function OcultarTodo() {
    MarcoAsistente.style.display = "none";
    MarcoAsignar.style.display = "none";
    InfoPersona.style.display = "none";
    InfoTelefono.style.display = "none";
    InfoAsistente.style.display = "none";
}

function clickAsistente() {
    QuitarClase();
    tbAsistente.className = "active";
    CambiarTitulo("Asistentes / Lista de asistentes");
    OcultarTodo()
    MarcoAsistente.style.display = "block";
}

function clickAsignarAsistente() {
    QuitarClase();
    tbAsignar.className = "active";
    CambiarTitulo("Asistentes / Asignar asistentes");
    OcultarTodo()
    MarcoAsignar.style.display = "block";
}

function QuitarClase() {
    tbAsistente.className = "";
    tbAsignar.className = "";
}

function CambiarTitulo(Texto) {
    Titulo.innerHTML = Texto
}