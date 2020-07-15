var btnCrear = document.getElementById('btnCrear');
var btrAtras = document.getElementById('btnAtras')
var TblVisitas = document.getElementById('Visitas');
var AgregarVisita = document.getElementById('InfoVisita');
var Titulo = document.getElementById('TituloConfig');

function AgendarVisita() {
    TblVisitas.style.display = "none";
    btnCrear.style.display = "none";
    AgregarVisita.style.display = "block";
    btnAtras.style.display = "block";
    OcultarTablaConfig("Agendar visita")
}

function Finalizar() {
    TblVisitas.style.display = "block";
    btnCrear.style.display = "block";
    AgregarVisita.style.display = "none";
    btnAtras.style.display = "none";
    Titulo = "Visitas"
}

function RegistrarVisita() {
    Finalizar();
}

function OcultarTablaConfig(Config) {    
    var txtTitulo = Titulo.innerHTML;
    Titulo.innerHTML = `${txtTitulo} / ${Config}`;
}
