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

var Indice = 0;

//INDICE = 1 -> RESIDENTE
//INDICE = 2 -> PARIENTE

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
        case "GuardarResidenteExpediente":
            txtFechaNac.disabled = state;
            txtFechaIng.disabled = state;
            break;
        case "GuardarArticulo":
            txtDescripcion.disabled = state;
            cmdTipoArticulo.disabled = state;
            txtCantidad.disabled = state;
            break;
        default:
            break;
    }
}

//CAMPOS DE REGISTRO DE INFORMACION PERSONAL
var txtCedula = document.getElementById('Cedula');
var txtNombre = document.getElementById('Nombre');
var txtApellido1 = document.getElementById('Apellido1');
var txtApellido2 = document.getElementById('Apellido2');
var chkEstadoPersona = document.getElementById('EstadoPersona');

function AgregarNuevaPersona() {
    if ((txtCedula.value.length > 8 && txtCedula.value.length < 15) && txtNombre.value.length > 0 && txtApellido1.value.length > 0 && txtApellido2.value.length > 0) {
        blockCampos(true, "AgregarNuevaPersona");
        var Consulta = "";

        if (Indice == 1) {
            var Consulta = `SELECT idPersona FROM Persona WHERE Cedula LIKE '${txtCedula.value}' | INSERT INTO Persona(Cedula, Nombre, Apellido1, Apellido2, Estado) VALUES('${txtCedula.value}', '${txtNombre.value}', '${txtApellido1.value}', '${txtApellido2.value}', true)`;
        }
        else if (Indice == 2) {
            var Consulta = `SELECT idPersona FROM Persona WHERE Cedula LIKE '${txtCedula.value}' | INSERT INTO Persona(Cedula, Nombre, Apellido1, Apellido2, Estado) VALUES('${txtCedula.value}', '${txtNombre.value}', '${txtApellido1.value}', '${txtApellido2.value}', true)|INSERT INTO Visitante(Estado, Persona_idPersona) VALUES (TRUE, {0});`;
        }
        
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

//CAMPOS DE REGISTRO DE EXPEDIENTES
var txtFechaNac = document.getElementById('FechaNac');
var txtFechaIng = document.getElementById('FechaIng');
var chkEstadoExp = document.getElementById('EstadoExp');

function GuardarResidenteExpediente() {
    blockCampos(true, "GuardarResidenteExpediente");
    var Consulta = `INSERT INTO Residente(Nacimiento, Ingreso, Estado, Persona_idPersona) VALUES('${txtFechaNac.value}', '${txtFechaIng.value}', TRUE, {0});|SELECT idResidente From Residente WHERE Persona_idPersona = {0};|INSERT INTO ExpedienteGeneral(Realizado, Pacientes_idPacientes, Usuarios_idUsuarios) VALUES(sysdate(), {0}, {1});|SELECT idExpGen From ExpedienteGeneral WHERE Pacientes_idPacientes = {0};`;
    Request(Consulta, "InsertBasico");
}

function LimpiarResidente() {
    txtFechaNac.value = '2000-01-01';
    txtFechaIng.value = '2000-01-01';
}

//CAMPOS DE REGISTRO DE ARTICULOS
var txtDescripcion = document.getElementById('ArtDescripcion');
var cmdTipoArticulo = document.getElementById('TipoArticulo');
var txtCantidad = document.getElementById('Cantidad');
var chkEstadoArticulo = document.getElementById('EstadoArticulo');

function GuardarArticulo() {
    var Descrip = txtDescripcion.value;
    var Cant = txtCantidad.value;
    var TipoArt = $("#TipoArticulo").val();

    if (Descrip.length > 1 && TipoArt != 0 && Cant != 0) {
        blockCampos(true, "GuardarArticulo");
        var Consulta = ` |INSERT INTO Articulos(Descripcion, Cantidad, Estado, TipoArticulo_idTipoArticulo, ExpedienteGeneral_idExpGen) VALUES('${Descrip}', ${Cant}, TRUE, ${TipoArt}, {0});`
        Request(Consulta, "InsertBasico")
    }
    else {
        MostrarModal("Debes ingresar una descripción válida y seleccionar un tipo. Ademas la cantidad no puede ser 0.");
    }
}

function LimpiarArticulo() {
    txtDescripcion.value = "";
    cmdTipoArticulo.selectedIndex = 0;
    txtCantidad.value = "";
}

function AgregarResidente(num) {
    Indice = num;
    CambiarTitulo("Residentes / Lista de residentes / Agregar residente");
    AgregarPersona();
}

function AgregarPariente(num) {
    Indice = num;
    CambiarTitulo("Residentes / Lista de parientes / Agregar pariente");
    console.log(Indice);
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
    CargarCombox("TipoTelefono");
}

function ContinuarTelefono() {
    if (Indice != 0) {
        switch (Indice) {
            case 1:
                //LOGICA PARA GUARDAR RESIDENTE
                AgregarResidenteExpediente();
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