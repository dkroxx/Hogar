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

$(document).ready(function () {
    LlenarTabla("TablaAsistente");
});

//CAMPOS DE REGISTRO DE INFORMACION PERSONAL
var txtCedula = document.getElementById('Cedula');
var txtNombre = document.getElementById('Nombre');
var txtApellido1 = document.getElementById('Apellido1');
var txtApellido2 = document.getElementById('Apellido2');
var chkEstadoPersona = document.getElementById('EstadoPersona');

function blockCampos(state, method) {
    switch (method) {
        case "AgregarNuevaPersona":
            txtCedula.disabled = state;
            txtNombre.disabled = state;
            txtApellido1.disabled = state;
            txtApellido2.disabled = state;
            chkEstadoPersona.disabled = state;
            break;
        case "AgregarNuevaTelefono":
            txtNumTelefono.disabled = state;
            cmbTipoTel.disabled = state;
            break;
        case "GuardarAsistente":
            cmbAsistente.disabled = state;
            fechIngreso.disabled = state;
            fechEntrada.disabled = state;
            fechSalidad.disabled = state;
            break;
        default:
            break;
    }
}

function AgregarNuevaPersona() {
    if ((txtCedula.value.length > 8 && txtCedula.value.length < 15) && txtNombre.value.length > 0 && txtApellido1.value.length > 0 && txtApellido2.value.length > 0) {
        blockCampos(true, "AgregarNuevaPersona");
        var Consulta = `SELECT idPersona FROM Persona WHERE Cedula LIKE '${txtCedula.value}' | INSERT INTO Persona(Cedula, Nombre, Apellido1, Apellido2, Estado) VALUES('${txtCedula.value}', '${txtNombre.value}', '${txtApellido1.value}', '${txtApellido2.value}', true)`;
        Request(Consulta, "InsertBasico");
    } else {
        MostrarModal("Debes completar todos los campos del formulario.");
    }
}

function LimpiarPersona() {
    txtCedula.value = "";
    txtNombre.value = "";
    txtApellido1.value = "";
    txtApellido2.value = "";
    chkEstadoPersona.disabled = true;
    chkEstadoPersona.checked = true;
}

//CAMPOS DE REGISTRO DE TELEFONO
var txtNumTelefono = document.getElementById('NumeroTel');
var cmbTipoTel = document.getElementById('TipoTelefono');
var chkEstadoTelefono = document.getElementById('EstadoTelefono');

function AgregarNuevoTelefono() {
    var NumTelefono = txtNumTelefono.value;
    var TipoTelefono = $("#TipoTelefono").val();

    if (NumTelefono.length == 8 && TipoTelefono != 0) {
        blockCampos(true, "AgregarNuevaTelefono");
        var Consulta = `SELECT idNumTelefono FROM NumTelefono WHERE Telefono = '${NumTelefono}'|INSERT INTO NumTelefono (Telefono, Estado, Persona_idPersona, TipoTelefono_idTipoTelefono) VALUES ('${NumTelefono}', TRUE, {0}, ${TipoTelefono})`;
        Request(Consulta, "InsertBasico");
    }
    else {
        MostrarModal("Debe de ingresar un número válido (########) y seleccionar un tipo de teléfono.");
    }
}

function LimpiarTelefono() {
    txtNumTelefono.value = "";
    cmbTipoTel.selectedIndex = 0;
}

//CAMPOS DE FORMULARIO REGISTRO ASISTENTE
var cmbAsistente = document.getElementById('TipoAsistente');
var fechIngreso = document.getElementById('FechIngreso');
var fechEntrada = document.getElementById('FechEntrada');
var fechSalidad = document.getElementById('FechSalida');
var EstadoAsistente = document.getElementById('FechSalida');

function GuardarAsistente() {
    var TipoAsistente = $("#TipoAsistente").val();
    var Entrada = fechEntrada.value;
    var Salida = fechSalidad.value;

    if (TipoAsistente != 0) {
        blockCampos(true, "GuardarAsistente");
        var Consulta = ` |INSERT INTO Asistente(Ingreso, Entrada, Salida, Estado, Persona_idPersona, TipoAsistente_idTipoAsistente) VALUES(SYSDATE(), '${Entrada}', '${Salida}', TRUE, {0}, ${TipoAsistente})`;
        Request(Consulta, "InsertBasico")
    }    
}

function LimpiarAsistente() {
    cmbAsistente.value = "";
    fechEntrada.value = "08:00";
    fechSalidad.value = "17:00";
}

function ProcesosAsignar() {
    AccionAsignacion.style.display = "block";
}

function AgregarPersona() {
    OcultarTodo();
    InfoPersona.style.display = "block";
    CambiarTitulo("Asistentes / Lista de asistentes / Agregar asistente");
}

function AgregarTelefono() {
    OcultarTodo();
    InfoTelefono.style.display = "block";
    CargarCombox("TipoTelefono");
}

function ContinuarTelefono() {
    OcultarTodo();
    InfoAsistente.style.display = "block"
    CargarCombox("TipoAsistente");
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