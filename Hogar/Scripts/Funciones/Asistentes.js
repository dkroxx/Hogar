var MarcoAsistente = document.getElementById('MarcoAsistentes');
var MarcoAsignar = document.getElementById('MarcoAsignar');
var Titulo = document.getElementById('TituloConfig');
var InfoPersona = document.getElementById('InfoPersona');
var InfoTelefono = document.getElementById('InfoTelefono');
var InfoAsistente = document.getElementById('InfoAsistente');

var tbAsistente = document.getElementById('tbAsistente');
var tbAsignar = document.getElementById('tbAsignar');

var AccionAsignacion = document.getElementById('AccionAsignacion');

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

function GuardarAsistente() {
    FinalizarRegistro();
    CambiarTitulo("Asistentes / Lista de asistentes");
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