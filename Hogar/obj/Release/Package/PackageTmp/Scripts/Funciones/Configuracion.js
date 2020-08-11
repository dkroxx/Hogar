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
var btnNuevoRegistro = document.getElementById('btnNuevoRegistro');


//CAMPOS DEL REGISTRO GENERAL
var txtDescripcion = document.getElementById('DescripcionGeneral');
var chkEstado = document.getElementById('EstadoGeneral');
var IndiceGeneral = 0;

// 1 = Articulos
// 2 = Telefonos
// 3 = Parentesco
// 4 = Asistentes

function AgregarNuevoRegistro() {
    if (txtDescripcion.value.length > 1) {
        MostrarModalCargando();
        blockCampos(true, "AgregarNuevoRegistro");

        var Consulta = "";

        switch (IndiceGeneral) {
            case 1:
                Consulta = `SELECT NOMBRE FROM TipoArticulo WHERE NOMBRE LIKE '${txtDescripcion.value}'|INSERT INTO TipoArticulo(Nombre, Estado) VALUES ('${txtDescripcion.value}', true)`;
                break;
            case 2:
                Consulta = `SELECT NOMBRE FROM TipoTelefono WHERE NOMBRE LIKE '${txtDescripcion.value}'|INSERT INTO TipoTelefono(Nombre, Estado) VALUES ('${txtDescripcion.value}', true)`;
                break;
            case 3:
                Consulta = `SELECT NOMBRE FROM TipoParentesco WHERE NOMBRE LIKE '${txtDescripcion.value}'|INSERT INTO TipoParentesco(Nombre, Estado) VALUES ('${txtDescripcion.value}', true)`;
                break;
            case 4:
                Consulta = `SELECT NOMBRE FROM TipoAsistente WHERE NOMBRE LIKE '${txtDescripcion.value}'|INSERT INTO TipoAsistente(Nombre, Estado) VALUES ('${txtDescripcion.value}', true)`;
                break;
            default:
                break;
        }

        if (Consulta != "") {
            Request(Consulta, "InsertBasico");
        } else {
            MostrarModal("Ha ocurrido un problema de bajo nivel en: AgregarNuevoRegistro()");
        }
    } else {
        MostrarModal("Debes ingresar una descripción válida.");
    }
}

function blockCampos(state, method) {
    switch (method) {
        case "AgregarNuevoRegistro":
            btnNuevoRegistro.disabled = state;
            txtDescripcion.disabled = state;
            chkEstado.disabled = state;
            break;
        case "AgregarNuevoRol":
            txtNmRol.disabled = state;
            cmbResidente.disabled = state;
            cmbAsistente.disabled = state;
            cmbVisitas.disabled = state;
            cmbConfiguracion.disabled = state;
            chkEstadoRol.disabled = state;
            break;
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
        case "AgregarNuevoUsuario":
            txtUsuario.disabled = state;
            txtContra1.disabled = state;
            txtContra2.disabled = state;
            cmbTipoRol.disabled = state;
            break;
        default:
            break;
    }
}

//CAMPOS DE REGISTRO DE ROLES
var txtNmRol = document.getElementById('NomRol');
var cmbResidente = document.getElementById('PerResidente');
var cmbAsistente = document.getElementById('PerAsistente');
var cmbVisitas = document.getElementById('PerVisitas');
var cmbConfiguracion = document.getElementById('PerConfiguraciones');
var chkEstadoRol = document.getElementById('EstadoRol');

function AgregarNuevoRol() {
    if (txtNmRol.value.length > 0) {
        MostrarModalCargando();
        blockCampos(true, "AgregarNuevoRol");
        var Residente = cmbResidente.selectedIndex;
        var Visitas = cmbVisitas.selectedIndex;
        var Configuraciones = cmbConfiguracion.selectedIndex;
        var Asistentes = cmbAsistente.selectedIndex;

        var Consulta = `SELECT Nombre FROM TipoRol WHERE Nombre LIKE '${txtNmRol.value}'|INSERT INTO TipoRol(Nombre, Estado, Pacientes, Visitas, Configuraciones, Asistentes) VALUES ('${txtNmRol.value}', true, '${Residente}', '${Visitas}', '${Configuraciones}', '${Asistentes}');`;
        Request(Consulta, "InsertBasico");
    } else {
        MostrarModal("Debes ingresar una descripción válida.");
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
        MostrarModalCargando();
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
        MostrarModalCargando();
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

//CAMPOS DE REGISTRO DE USUARIO
var txtUsuario = document.getElementById('Usuario');
var txtContra1 = document.getElementById('Contrasena');
var txtContra2 = document.getElementById('ContrasenaRepita');
var cmbTipoRol = document.getElementById('Rol');
var chkEstadoUsuario = document.getElementById('EstadoUsuario');

function AgregarNuevoUsuario() {
    var Usuario = txtUsuario.value;
    var Contra1 = txtContra1.value;
    var Contra2 = txtContra2.value;
    var TipoRol = $("#Rol").val();

    if (Usuario.length > 0 && TipoRol != 0) {

        if (Contra1.length > 5 && Contra2.length > 5) {

            if (Contra1 == Contra2) {
                MostrarModalCargando();
                blockCampos(true, "AgregarNuevoUsuario");
                var Consulta = `SELECT idUsuarios FROM Usuario WHERE Usuario = '${Usuario}'|INSERT INTO Usuario (Usuario, Contrasena, Estado, Persona_idPersona, TipoRol_idTipoRol) VALUES('${Usuario}', '${Contra1}', TRUE, {0}, '${TipoRol}')`;
                Request(Consulta, "InsertBasico");

            } else {
                MostrarModal("Las contraseñas no concuerdan.");
            }

        } else {
            MostrarModal("La contraseña debe de tener al menos 6 caracteres.");
        }

    } else {
        MostrarModal("Debes de ingresar un nombre de usuario válido y seleccionar un rol.");
    }
}

function LimpiarUsuario() {
    txtUsuario.value = "";
    txtContra1.value = "";
    txtContra2.value = "";
    cmbTipoRol.selectedIndex = 0;
}

function AgregarPersona() {
    LimpiarPersona();
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
    CargarCombox("TipoRol");
}

function AgregarTelefono() {
    InfoPersona.style.display = "none";
    InfoTelefono.style.display = "block";
    CargarCombox("TipoTelefono");
}

function FinalizarRegistroUsuario() {
    InfoPersona.style.display = "none";
    InfoTelefono.style.display = "none";
    InfoUsuario.style.display = "none";
    BtnAtras.style.display = "block";
    BtnAgregar.style.display = "block";
    BtnCrearRol.style.display = "none";
    TablaUsuario.style.display = "block";
    Titulo.innerHTML = "Configuración del sistema / Usuarios";
}

function MostrarConfigUsuario() {
    OcultarTablaConfig("Usuarios");
    if (document.getElementById('tblMostrarUsuarios').rows.length == 1) {
        MostrarModalCargando();
        LlenarTabla("tblMostrarUsuarios");
    }    
    EdicionUsuario.style.display = "block";
    BtnAtras.style.display = "block";
    BtnAgregar.style.display = "block";
}

function MostrarConfigRol() {
    OcultarTablaConfig("Catálogo Roles");    
    EdicionRoles.style.display = "block";
    BtnAtras.style.display = "block";
    BtnCrearRol.style.display = "block";
    if (document.getElementById('tblRoles').rows.length == 1) {
        MostrarModalCargando();
        LlenarTabla("tblRoles");
    }  
}

function AgregarRol() {
    LimpiarRoles();
    OcultarTablaConfig("Agregar Rol");
    EdicionRoles.style.display = "block";
    TablaRoles.style.display = "none";   
    BtnAtras.style.display = "none";
    FormRoles.style.display = "block";
    BtnCrearRol.style.display = "none";
}

function LimpiarRoles() {
    txtNmRol.value = "";
    cmbResidente.selectedIndex = 0;
    cmbVisitas.selectedIndex = 0;
    cmbConfiguracion.selectedIndex = 0;
    cmbAsistente.selectedIndex = 0;
}

function FinalizarRegistroRol() {
    Titulo.innerHTML = "Configuración del sistema / Catálogo Roles";
    FormRoles.style.display = "none";
    TablaRoles.style.display = "block";
    BtnAtras.style.display = "block";
    BtnCrearRol.style.display = "block";
}

function MostrarConfigArticulo() {
    IndiceGeneral = 1;
    txtDescripcion.value = "";
    OcultarTablaConfig("Catálogo Articulo");
    EdicionGeneral.style.display = "block";
    BtnAtras.style.display = "block";
    LlenarTablaGeneral("TipoArticulo");
}

function MostrarConfigTelefono() {
    IndiceGeneral = 2;
    txtDescripcion.value = "";
    OcultarTablaConfig("Catálogo Teléfono");
    EdicionGeneral.style.display = "block";
    BtnAtras.style.display = "block";
    LlenarTablaGeneral("TipoTelefono");
}

function MostrarConfigParentesco() {
    IndiceGeneral = 3;
    txtDescripcion.value = "";
    OcultarTablaConfig("Catálogo Parentesco");
    EdicionGeneral.style.display = "block";
    BtnAtras.style.display = "block";
    LlenarTablaGeneral("TipoParentesco");
}

function MostrarConfigAsistente() {
    IndiceGeneral = 4;
    txtDescripcion.value = "";
    OcultarTablaConfig("Catálogo Asistente");
    EdicionGeneral.style.display = "block";
    BtnAtras.style.display = "block";
    LlenarTablaGeneral("TipoAsistente");
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