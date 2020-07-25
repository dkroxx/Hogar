var tbPacientes = document.getElementById('tbPacientes');
var tbParientes = document.getElementById('tbParientes');
var tbAsistentes = document.getElementById('tbAsistentes');
var Titulo = document.getElementById('TituloConfig');
var tblPacientes = document.getElementById('MarcoPacientes');
var tblParientes = document.getElementById('MarcoParientes');

var InfoPersona = document.getElementById('InfoPersona');
var InfoTelefono = document.getElementById('InfoTelefono');
var InfoExpediente = document.getElementById('InfoExpediente');
var InfoArticulo = document.getElementById('InfoArticulo');
var InfoAsistente = document.getElementById('InfoAsistente');
var InfoPariente = document.getElementById('InfoVisitante');

//CAMPOS DE REGISTRO DE INFORMACION PERSONAL
var txtCedula = document.getElementById('Cedula');
var txtNombre = document.getElementById('Nombre');
var txtApellido1 = document.getElementById('Apellido1');
var txtApellido2 = document.getElementById('Apellido2');
var chkEstadoPersona = document.getElementById('EstadoPersona');

var Indice = 0;

//INDICE = 1 -> RESIDENTE
//INDICE = 2 -> PARIENTE
//INDICE = 3 -> ASISTENTE

function AgregarNuevaPersona() {
    //VALIDAR TXT AQUI

    if (Indice != 0) {
        switch (Indice) {
            case 1:
                //LOGICA PARA GUARDAR RESIDENTE

                break;
            case 2:
                //LOGICA PARA GUARDAR PARIENTE

                break;
            default:
                break;
        }
    }
    else {
        //AGREGAR ALERTA CUANDO NO SE DEFINIO NUM
    }

    AgregarTelefono();
}

//CAMPOS DE REGISTRO DE TELEFONO
var txtNumTelefono = document.getElementById('NumeroTel');
var cmbTipoTel = document.getElementById('TipoTelefono');
var chkEstadoTelefono = document.getElementById('EstadoTelefono');

function GuardarTelefono() {
    //VALIDAR TXT AQUI

    if (Indice != 0) {
        switch (Indice) {
            case 1:
                //LOGICA PARA GUARDAR RESIDENTE
                break;
            case 2:
                //LOGICA PARA GUARDAR PARIENTE
                break;
            default:
                break;
        }
    }
    else {
        //AGREGAR ALERTA CUANDO NO SE DEFINIO NUM
    }
}

//CAMPOS DE REGISTRO DE EXPEDIENTES
var txtFechaNac = document.getElementById('FechNac');
var txtFechIng = document.getElementById('FechIng');
var chkEstadoExp = document.getElementById('EstadoExp');

function GuardarResidenteExpediente() {
    //VALIDAR TXT AQUI

    OcultarTodo();
    InfoArticulo.style.display = "block";
}

//CAMPOS DE REGISTRO DE ARTICULOS
var txtDescripcion = document.getElementById('ArtDescripcion');
var cmdTipoArticulo = document.getElementById('TipoArticulo');
var chkEstadoArticulo = document.getElementById('EstadoArticulo');

function GuardarArticulo() {
    //VALIDAR TXT AQUI

}

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

function FinalizarRegistro() {
    if (Indice != 0) {
        switch (Indice) {
            case 1:
                clickPacientes();
                break;
            case 2:
                clickParientes();
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

function AgregarTelefono() {
    OcultarTodo();
    InfoTelefono.style.display = "block";
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

function AgregarNuevoPariente() {
    OcultarTodo();
    InfoPariente.style.display = "block";
}

function OcultarTodo() {
    tblPacientes.style.display = "none";
    tblParientes.style.display = "none";
    InfoPersona.style.display = "none";
    InfoTelefono.style.display = "none";
    InfoExpediente.style.display = "none";
    InfoArticulo.style.display = "none";
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

function QuitarClase() {
    tbPacientes.className = "";
    tbParientes.className = "";
}

function CambiarTitulo(Texto) {
    Titulo.innerHTML = Texto
}