var tbPacientes = document.getElementById('tbPacientes');
var tbParientes = document.getElementById('tbParientes');
var tbAsistentes = document.getElementById('tbAsistentes');
var Titulo = document.getElementById('TituloConfig');
var tblPacientes = document.getElementById('MarcoPacientes');
var tblParientes = document.getElementById('MarcoParientes');
var tblAsistentes = document.getElementById('MarcoAsistentes');

function clickPacientes() {
    QuitarClase();
    tbPacientes.className = "active";
    CambiarTitulo("Residentes / Lista de residentes");
    OcultarTablas();
    tblPacientes.style.display = "block";
}

function clickParientes() {
    QuitarClase();
    tbParientes.className = "active";
    CambiarTitulo("Residentes / Lista de parientes");
    OcultarTablas();
    tblParientes.style.display = "block";
}

function clickAsistentes() {
    QuitarClase();
    tbAsistentes.className = "active";
    CambiarTitulo("Residentes / Lista de asistentes");
    OcultarTablas();
    tblAsistentes.style.display = "block";
}

function QuitarClase() {
    tbPacientes.className = "";
    tbParientes.className = "";
    tbAsistentes.className = "";
}

function OcultarTablas() {
    tblPacientes.style.display = "none";
    tblParientes.style.display = "none";
    tblAsistentes.style.display = "none";
}

function CambiarTitulo(Texto) {
    Titulo.innerHTML = Texto
}