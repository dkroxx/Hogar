var Combox = "";
var Tablax = "";

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
                        case "LlenarTabla":
                            for (var i = 0; i < Respuesta.ComboxOptions.length; i++) {                                
                                $("#" + Tablax).append(Respuesta.ComboxOptions[i]);
                            }
                            CargarDatatable(Tablax);
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

function LlenarTabla(tabla) {
    Tablax = tabla;
    var Consulta = "";
    switch (tabla) {
        case "TablaPaciente":
            Consulta = "SELECT r.idResidente, p.Cedula, p.Nombre, p.Apellido1, p.Apellido2, r.Nacimiento, r.Ingreso FROM Residente r INNER JOIN Persona p on r.Persona_idPersona = p.idPersona";
            break;
        case "TablaParientes":
            Consulta = "select v.IdVisitante, p.Cedula, p.Nombre, p.Apellido1, p.Apellido2, t.Telefono from Visitante v INNER JOIN Persona p on v.Persona_idPersona = p.idPersona INNER JOIN NumTelefono t on p.idPersona = t.Persona_idPersona where v.Estado = true and t.Estado = true";
            break;
        case "TablaAsistente":
            Consulta = "select a.idAsistente, p.Cedula, p.Nombre, p.Apellido1, p.Apellido2, ta.Nombre, a.Entrada, a.Salida from Asistente a INNER JOIN Persona p on a.Persona_idPersona = p.idPersona INNER JOIN TipoAsistente ta on ta.idTipoAsistente = a.TipoAsistente_idTipoAsistente where a.Estado = true";
            break;
        case "tblMostrarUsuarios":
            Consulta = "select u.idUsuarios,  p.Cedula, p.Nombre, p.Apellido1, p.Apellido2, u.Usuario, r.Nombre from Usuario u INNER JOIN Persona p on u.Persona_idPersona = p.idPersona INNER JOIN TipoRol r on u.TipoRol_idTipoRol = r.idTipoRol where u.Estado = true";
            break;
        case "tblRoles":
            Consulta = "select idTipoRol, Nombre, Pacientes, Asistentes, Visitas, Configuraciones from TipoRol where Estado = true";
            break;
        default:
            break;
    }

    Request(Consulta, "LlenarTabla");
}

function LlenarTablaGeneral(tipo) {
    Tablax = "tblGeneral";
    var Consulta = "";
    switch (tipo) {
        case "TipoArticulo":
            Consulta = "select idTipoArticulo, Nombre from TipoArticulo where Estado = true;";
            break;
        case "TipoAsistente":
            Consulta = "select idTipoAsistente, Nombre from TipoAsistente where Estado = true;";
            break;
        case "TipoParentesco":
            Consulta = "select idTipoParentesco, Nombre from TipoParentesco where Estado = true;";
            break;
        case "TipoTelefono":
            Consulta = "select idTipoTelefono, Nombre from TipoTelefono where Estado = true;";
            break;
        default:
            break;
    }
    Request(Consulta, "LlenarTabla");
}

let idioma =
{
    "sProcessing": "Procesando...",
    "sLengthMenu": "Mostrar _MENU_ registros",
    "sZeroRecords": "No se encontraron resultados",
    "sEmptyTable": "NingÃºn dato disponible en esta tabla",
    "sInfo": "Mostrando registros del _START_ al _END_ de un total de _TOTAL_ registros",
    "sInfoEmpty": "Mostrando registros del 0 al 0 de un total de 0 registros",
    "sInfoFiltered": "(filtrado de un total de _MAX_ registros)",
    "sInfoPostFix": "",
    "sSearch": "Buscar:",
    "sUrl": "",
    "sInfoThousands": ",",
    "sLoadingRecords": "Cargando...",
    "oPaginate": {
        "sFirst": "Primero",
        "sLast": "Ultimo",
        "sNext": "Siguiente",
        "sPrevious": "Anterior"
    },
    "oAria": {
        "sSortAscending": ": Activar para ordenar la columna de manera ascendente",
        "sSortDescending": ": Activar para ordenar la columna de manera descendente"
    },
    "buttons": {
        "copyTitle": 'Informacion copiada',
        "copyKeys": 'Use your keyboard or menu to select the copy command',
        "copySuccess": {
            "_": '%d filas copiadas al portapapeles',
            "1": '1 fila copiada al portapapeles'
        },

        "pageLength": {
            "_": "Mostrar %d filas",
            "-1": "Mostrar Todo"
        }
    }
};

function CargarDatatable(tabla) {
    $('#' + tabla).DataTable({
        dom: 'Bfrtip',
        buttons: [
            'excelHtml5',
            'pdfHtml5'
        ],
        "paging": true,
        "lengthChange": true,
        "searching": true,
        "ordering": true,
        "info": true,
        "autoWidth": true,
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "Mostrar Todo"]],
        "language": idioma
    });
}