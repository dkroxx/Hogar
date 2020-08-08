var Combox = "";

function Request(Query, Metodo) {
    try {
        var jdata = '{Query: "' + Query + '"}';

        $.ajax({
            type: "POST",
            url: `/Home/${Metodo}`,
            data: jdata,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var Respuesta = JSON.parse(response);

                if (Respuesta.ErrorCode == "00") {
                    switch (Metodo) {
                        case "ValidarUsuario":
                            window.location.href = "/Home/Inicio";
                            break;
                        case "CerrarSesion":
                            window.location.href = "/Home/IniciarSesion";
                            break;
                        case "LlenarCombos":
                            if (Combox != "") {
                                var ObjCombox = null;

                                switch (Combox) {
                                    case "TipoRol":
                                        ObjCombox = cmbTipoRol;
                                        break;
                                    case "TipoParentesco":
                                        ObjCombox = "";
                                        break;
                                    case "TipoArticulo":
                                        ObjCombox = cmdTipoArticulo;
                                        break;
                                    case "TipoTelefono":
                                        ObjCombox = cmbTipoTel;
                                        break;
                                    case "TipoAsistente":
                                        ObjCombox = cmbAsistente;
                                        break;
                                    default:
                                        break;
                                }

                                ObjCombox.innerHTML = "";
                                ObjCombox.innerHTML = "<option value=\"0\">Seleccione</option>";

                                if (Combox != null) {
                                    for (var i = 0; i < Respuesta.ComboxOptions.length; i++) {
                                        ObjCombox.innerHTML += Respuesta.ComboxOptions[i];
                                    }
                                } else {
                                    MostrarModal("Ha ocurrido un problema de bajo nivel al cargar el menú desplegable.");
                                } 
                            } else {
                                MostrarModal("Ha ocurrido un problema de bajo nivel al cargar el menú desplegable. ");
                            }                           
                            break;
                        case "InsertBasico":
                            if (Query.includes("TipoArticulo")) {
                                MostrarModal(`Se agrego el registro: '${txtDescripcion.value}' correctamente.`);
                                txtDescripcion.value = "";
                                blockCampos(false, "AgregarNuevoRegistro");                                
                            }
                            if (Query.includes("TipoRol")) {
                                MostrarModal(`Se agrego el registro: '${txtNmRol.value}' correctamente.`);
                                LimpiarRoles();
                                blockCampos(false, "AgregarNuevoRol");                                
                                FinalizarRegistroRol();
                            }
                            if (Query.includes("Persona") && Query.includes("Cedula")) {
                                MostrarModal(`Se registro a: '${txtNombre.value} ${txtApellido1.value}' correctamente. Continúe con los datos de contacto.`);
                                blockCampos(false, "AgregarNuevaPersona");
                                LimpiarPersona();
                                AgregarTelefono();
                            }
                            if (Query.includes("NumTelefono")) {
                                MostrarModal(`Se registro el numero: '${txtNumTelefono.value}' correctamente. Puede agregar otro teléfono o continuar con el proceso de registro.`);
                                blockCampos(false, "AgregarNuevaTelefono");
                                LimpiarTelefono();
                            }
                            if (Query.includes("SELECT idUsuarios FROM Usuario")) {
                                MostrarModal(`Se registro el usuario: '${txtUsuario.value}' correctamente.`);
                                blockCampos(false, "AgregarNuevoUsuario");
                                LimpiarUsuario();
                                FinalizarRegistroUsuario();
                            }
                            if (Query.includes("Asistente")) {
                                MostrarModal(`Se registro el asistente correctamente.`);
                                blockCampos(false, "GuardarAsistente");
                                LimpiarAsistente();
                                FinalizarRegistro();
                            }
                            if (Query.includes("Residente")) {
                                MostrarModal(`Se registro el expediente correctamente.`);
                                blockCampos(false, "GuardarResidenteExpediente");
                                LimpiarResidente();
                                OcultarTodo();
                                InfoArticulo.style.display = "block";
                                CargarCombox("TipoArticulo");
                            }
                            if (Query.includes("Articulos")) {
                                MostrarModal(`Se registro: '${txtDescripcion.value}' correctamente.`);
                                blockCampos(false, "GuardarArticulo")
                                LimpiarArticulo();
                            }
                            break;
                        default:
                            break;
                    }
                }
                else {
                    MostrarModal(Respuesta.Error);
                    switch (Metodo) {
                        case "ValidarUsuario":
                            document.getElementById('btnIngresar').style.display = "block";
                            document.getElementById('loading').style.display = "none";
                            break;
                        case "InsertBasico":                            
                            if (Query.includes("TipoArticulo")) {
                                blockCampos(false, "AgregarNuevoRegistro");
                            }
                            if (Query.includes("TipoRol")) {
                                blockCampos(false, "AgregarNuevoRol");
                            }

                           //FALTA AGREGAR QUE VALIDE ESTO

                            break;
                        default:
                            break;
                    }
                }

            },
            failure: function (response) {
                console.log("Falló: " + response);
            },
            error: function (response) {
                console.log("Error: " + response);
            }
        });
    } catch (e) {

    }
}

function MostrarModal(Mensaje) {
    document.getElementById('MensajeModal').innerHTML = Mensaje;
    $('#MensajeAlerta').modal();
}

$('#MensajeAlerta').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
})

function CargarCombox(idCombo) {
    Combox = idCombo;
    var Consulta = "";
    switch (idCombo) {
        case "TipoRol":
            Consulta = "SELECT idTipoRol, Nombre FROM TipoRol WHERE Estado = true";
            break;
        case "TipoParentesco":
            Consulta = "SELECT idTipoParentesco, Nombre FROM TipoParentesco WHERE Estado = true";
            break;
        case "TipoArticulo":
            Consulta = "SELECT idTipoArticulo, Nombre FROM TipoArticulo WHERE Estado = true";
            break;
        case "TipoTelefono":
            Consulta = "SELECT idTipoTelefono, Nombre FROM TipoTelefono WHERE Estado = true";
            break;
        case "TipoAsistente":
            Consulta = "SELECT idTipoAsistente, Nombre FROM TipoAsistente WHERE Estado = true";
            break;
        default:
            break;
    }
    Request(Consulta, "LlenarCombos");
}