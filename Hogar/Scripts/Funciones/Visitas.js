var btnCrear = document.getElementById('btnCrear');
var btrAtras = document.getElementById('btnAtras')
var TblVisitas = document.getElementById('Visitas');
var AgregarVisita = document.getElementById('InfoVisita');
var Titulo = document.getElementById('TituloConfig');

var IdResidente = 0;

$(document).ready(function () {    
    MostrarModalCargando();
    LlenarTabla("TablaVisitas");
    CompletarCombox("cmbResidente");   
});

function CompletarCombox(Descripcion) {
    var consul = "";
    switch (Descripcion) {
        case "cmbResidente":
            consul = "select r.idResidente, concat(p.Nombre, ' ', p.Apellido1, ' ', p.Apellido2) as Nombre from Residente r inner join Persona p on p.idPersona = r.Persona_idPersona where r.Estado = true";
            RequestCombox(consul, "cmbResidente");
            break;
        case "cmbVisitante":
            consul = `select vr.Visitante_idVisitante, concat(p.Nombre, ' ', p.Apellido1, ' ', p.Apellido2) as Nombre from VisitanteResidente vr inner join Visitante v on vr.Visitante_idVisitante = v.idVisitante inner join Persona p on p.idPersona = v.Persona_idPersona and vr.Visitante_idVisitante = v.idVisitante where vr.Estado = true and vr.Residente_idResidente = ${IdResidente}`;
            RequestCombox(consul, "cmbVisitante");
            break;
        default:
            break;
    }
}

function CrearVisita() {
    var cmbVisitante = document.getElementById('cmbVisitante').value;
    var cmbResidente = document.getElementById('cmbResidente').value;
    var txtFecha = document.getElementById('Fecha').value;
    var txtHora = document.getElementById('Hora').value

    if (cmbVisitante > 0 && cmbResidente > 0) {
        MostrarModalCargando();
        var Consulta = `select idVisita from Bitacora where idResidente = ${cmbResidente} and idVisitante = ${cmbVisitante} and Fecha like '${txtFecha}';|insert into Bitacora(Fecha, Hora, idResidente, idVisitante, Estado) values ('${txtFecha}', '${txtHora}', ${cmbResidente}, ${cmbVisitante}, true);`;
        Request(Consulta, "InsertBasico");
    } else {

    }
}

function CargarParientes() {
    MostrarModalCargando();
    IdResidente = document.getElementById('cmbResidente').value;
    CompletarCombox("cmbVisitante");
}

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