var tbPacientes = document.getElementById('tbPacientes');
var tbParientes = document.getElementById('tbParientes');
var tbAsistentes = document.getElementById('tbAsistentes');
var Titulo = document.getElementById('TituloConfig');
var tblPacientes = document.getElementById('MarcoPacientes');
var tblParientes = document.getElementById('MarcoParientes');
var tblAsistentes = document.getElementById('MarcoAsistentes');

var InfoPersona = document.getElementById('InfoPersona');
var InfoTelefono = document.getElementById('InfoTelefono');
var InfoExpediente = document.getElementById('InfoExpediente');
var InfoArticulo = document.getElementById('InfoArticulo');
var InfoAsistente = document.getElementById('InfoAsistente');
var InfoPariente = document.getElementById('InfoVisitante');

var Indice = 0;

//INDICE = 1 -> RESIDENTE
//INDICE = 2 -> PARIENTE
//INDICE = 3 -> ASISTENTE

function AgregarResidente(num) {
    Indice = num;
    CambiarTitulo("Residentes / Lista de residentes / Agregar residente");
    AgregarPersona();
}

function AgregarPariente(num) {
    Indice = num;
    CambiarTitulo("Residentes / Lista de parientes / Agregar pariente");
    AgregarPersona();
}

function AgregarAsistente(num) {
    Indice = num;
    CambiarTitulo("Residentes / Lista de asistentes / Agregar asistente");
    AgregarPersona();
}

function FinalizarRegistro() {
    if (Indice != 0) {
        switch (Indice) {
            case 1:
                clickPacientes()
                break;
            case 2:
                clickParientes()
                break;
            case 3:
                clickAsistentes()
                break;
            default:
                clickPacientes();
                break;
        }
    }
    else {
        clickPacientes();
    }
}

function AgregarPersona() {
    OcultarTodo();
    InfoPersona.style.display = "block";
}

function GuardarPersona() {
    if (Indice != 0) {
        switch (Indice) {
            case 1:
                //LOGICA PARA GUARDAR RESIDENTE
                AgregarTelefono();
                break;
            case 2:
                //LOGICA PARA GUARDAR PARIENTE
                AgregarTelefono();
                break;
            case 3:
                //LOGICA PARA GUARDAR ASISTENTE
                AgregarTelefono();
                break;
            default:
                break;
        }
    }
    else {
        //AGREGAR ALERTA CUANDO NO SE DEFINIO NUM
    }
}

function AgregarTelefono() {
    OcultarTodo();
    InfoTelefono.style.display = "block";
}

function GuardarTelefono() {
    if (Indice != 0) {
        switch (Indice) {
            case 1:
                //LOGICA PARA GUARDAR RESIDENTE
                break;
            case 2:
                //LOGICA PARA GUARDAR PARIENTE
                break;
            case 3:
                //LOGICA PARA GUARDAR ASISTENTE
                break;
            default:
                break;
        }
    }
    else {
        //AGREGAR ALERTA CUANDO NO SE DEFINIO NUM
    }
}

function ContinuarTelefono() {
    if (Indice != 0) {
        switch (Indice) {
            case 1:
                //LOGICA PARA GUARDAR RESIDENTE
                AgregarResidenteExpediente()
                break;
            case 2:
                //LOGICA PARA GUARDAR PARIENTE
                clickParientes();
                break;
            case 3:
                //LOGICA PARA GUARDAR ASISTENTE                
                AgregarNuevoAsistente()
                break;
            default:
                break;
        }
    }
    else {
        //AGREGAR ALERTA CUANDO NO SE DEFINIO NUM
    }
}

function AgregarResidenteExpediente() {
    OcultarTodo();
    InfoExpediente.style.display = "block";
}

function GuardarResidenteExpediente() {
    OcultarTodo();
    InfoArticulo.style.display = "block";
}

function GuardarArticulo() {

}

function ContinuarArticulo() {
    AgregarNuevoPariente();
}

function IrPariente() {
    clickParientes();
}

function TerminarRegistroResidente() {
    clickPacientes();
}

function BuscarPariente() {

}

function AgregarNuevoAsistente() {
    OcultarTodo();
    InfoAsistente.style.display = "block";
}

function GuardarAsistente() {
    clickAsistentes();
}

function AgregarNuevoPariente() {
    OcultarTodo();
    InfoPariente.style.display = "block";
}

function OcultarTodo() {
    tblPacientes.style.display = "none";
    tblParientes.style.display = "none";
    tblAsistentes.style.display = "none";

    InfoPersona.style.display = "none";
    InfoTelefono.style.display = "none";
    InfoExpediente.style.display = "none";
    InfoArticulo.style.display = "none";
    InfoAsistente.style.display = "none";
    InfoVisitante.style.display = "none";
}

function clickPacientes() {
    QuitarClase();
    tbPacientes.className = "active";
    CambiarTitulo("Residentes / Lista de residentes");
    OcultarTodo()
    tblPacientes.style.display = "block";
}

function clickParientes() {
    QuitarClase();
    tbParientes.className = "active";
    CambiarTitulo("Residentes / Lista de parientes");
    OcultarTodo()
    tblParientes.style.display = "block";
}

function clickAsistentes() {
    QuitarClase();
    tbAsistentes.className = "active";
    CambiarTitulo("Residentes / Lista de asistentes");
    OcultarTodo()
    tblAsistentes.style.display = "block";
}

function QuitarClase() {
    tbPacientes.className = "";
    tbParientes.className = "";
    tbAsistentes.className = "";
}

function CambiarTitulo(Texto) {
    Titulo.innerHTML = Texto
}