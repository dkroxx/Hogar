var Combox = "";
var Tablax = "";
var CurrentTable;

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

                $('#Cargando').modal('hide');

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
                                    case "cmbResidente":
                                        ObjCombox = cmbResi;
                                        break;
                                    case "cmbParentesco":
                                        ObjCombox = cmbAsig;
                                        break;
                                    case "cmbPariente":
                                        ObjCombox = cmbPari;
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
                            if (Query.includes("select idRelacion from AsistenteResidente")) {
                                MostrarModal(`Se agrego el registro correctamente.`);
                                setTimeout(function () { location.reload(); }, 1000);      
                            }
                            else {
                                if (Query.includes("select idRelacion from VisitanteResidente where Visitante_idVisitante")) {
                                    MostrarModal(`Se agrego la relación correctamente.`);
                                    setTimeout(function () { location.reload(); }, 1000);                                    
                                }
                                if (Query.includes("TipoArticulo")) {
                                    MostrarModal(`Se agrego el registro: '${txtDescripcion.value}' correctamente.`);
                                    txtDescripcion.value = "";
                                    blockCampos(false, "AgregarNuevoRegistro");
                                    setTimeout(function () { location.reload(); }, 1000);  
                                }
                                if (Query.includes("TipoRol")) {
                                    MostrarModal(`Se agrego el registro: '${txtNmRol.value}' correctamente.`);
                                    LimpiarRoles();
                                    blockCampos(false, "AgregarNuevoRol");
                                    FinalizarRegistroRol();
                                    setTimeout(function () { location.reload(); }, 1000);  
                                }
                                if (Query.includes("SELECT NOMBRE FROM TipoAsistente")) {
                                    MostrarModal(`Se agrego el registro: '${txtDescripcion.value}' correctamente.`);
                                    setTimeout(function () { location.reload(); }, 1000);  
                                }
                                if (Query.includes("SELECT NOMBRE FROM TipoParentesco WHERE NOMBRE LIKE")) {
                                    MostrarModal(`Se agrego el registro: '${txtDescripcion.value}' correctamente.`);
                                    setTimeout(function () { location.reload(); }, 1000);  
                                }
                                if (Query.includes("SELECT NOMBRE FROM TipoTelefono WHERE NOMBRE LIKE")) {
                                    MostrarModal(`Se agrego el registro: '${txtDescripcion.value}' correctamente.`);
                                    setTimeout(function () { location.reload(); }, 1000);  
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
                                    setTimeout(function () { location.reload(); }, 1000);  
                                }
                                if (Query.includes(" |INSERT INTO Asistente(Ingreso, Entrada, Salida, Estado")) {
                                    MostrarModal(`Se registro el asistente correctamente.`);
                                    blockCampos(false, "GuardarAsistente");
                                    LimpiarAsistente();
                                    FinalizarRegistro();
                                    setTimeout(function () { location.reload(); }, 1000);
                                }
                                if (Query.includes("INSERT INTO Residente(Nacimiento, Ingreso")) {
                                    MostrarModal(`Se registro el expediente correctamente.`);
                                    blockCampos(false, "GuardarResidenteExpediente");
                                    LimpiarResidente();
                                    OcultarTodo();
                                    InfoArticulo.style.display = "block";
                                    CargarCombox("TipoArticulo");
                                }
                                if (Query.includes("Articulos")) {
                                    MostrarModal(`Se registro el articulo correctamente.`);
                                    blockCampos(false, "GuardarArticulo")
                                    LimpiarArticulo();
                                }
                                if (Query.includes("select idVisita from Bitacora where idResidente")) {
                                    MostrarModal(`Se agendo la visita correctamente.`);
                                    setTimeout(function () { location.reload(); }, 1000);  
                                }
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
                            blockCampos(false);
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

function RequestCombox(Query, Combox) {
    try {
        var jdata = '{Query: "' + Query + '"}';

        $.ajax({
            type: "POST",
            url: '/Home/LlenarCombos',
            data: jdata,
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: function (response) {
                var Respuesta = JSON.parse(response);

                $('#Cargando').modal('hide');

                if (Respuesta.ErrorCode == "00") {
                    var ObjCombox = document.getElementById(Combox);

                    ObjCombox.innerHTML = "";
                    ObjCombox.innerHTML = "<option value=\"0\">Seleccione</option>";

                    if (Combox != null) {
                        for (var i = 0; i < Respuesta.ComboxOptions.length; i++) {
                            ObjCombox.innerHTML += Respuesta.ComboxOptions[i];
                        }
                    } else {
                        MostrarModal("Ha ocurrido un problema de bajo nivel al cargar el menú desplegable.");
                    }

                    if (Respuesta.ComboxOptions.length == 0) {
                        ObjCombox.innerHTML = "";
                        ObjCombox.innerHTML = "<option value=\"0\">Sin registros</option>";
                    }
                }
                else {
                    MostrarModal(Respuesta.Error);
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
        MostrarModal(e.Message)
    }
}

function MostrarModal(Mensaje) {
    document.getElementById('MensajeModal').innerHTML = Mensaje;
    $('#MensajeAlerta').modal();
}

$('#MensajeAlerta').on('shown.bs.modal', function () {
    $('#myInput').trigger('focus')
});

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

    var Tabla = document.getElementById(Tablax);

    if (Tabla.rows.length > 1) {
        CurrentTable.destroy();

        for (var i = Tabla.rows.length - 1; i > 0; i--) {
            Tabla.deleteRow(i);
        }
    }

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
        case "TablaRes":
            Consulta = "select r.idResidente, p.Cedula,concat(p.Nombre, ' ', p.Apellido1, ' ', p.Apellido2) as Nombre from Residente r inner join Persona p on r.Persona_idPersona = p.idPersona where r.Estado = true";
            break;
        case "TablaAsis":
            Consulta = "select a.idAsistente, concat(p.Nombre, ' ', p.Apellido1, ' ', p.Apellido2) as Nombre, tp.Nombre from Asistente a inner join Persona p on p.idPersona = a.Persona_idPersona inner join TipoAsistente tp on tp.idTipoAsistente = a.TipoAsistente_idTipoAsistente where a.Estado = true";
            break;
        case "TablaVisitas":
            Consulta = "select b.idVisita, concat(day(b.Fecha), '-', month(b.Fecha), '-', year(b.Fecha)) as Fecha, b.Hora, concat(p.Nombre, ' ', p.Apellido1, ' ', p.Apellido2) as Residente, concat(pr.Nombre, ' ', pr.Apellido1, ' ', pr.Apellido2) as Visitante from Bitacora b inner join Residente r on b.idResidente =  r.idResidente INNER JOIN Persona p on r.Persona_idPersona = p.idPersona inner join Visitante v on b.idVisitante =  v.idVisitante INNER JOIN Persona pr on v.Persona_idPersona = pr.idPersona where b.Estado = true";
            break;
        default:
            break;
    }

    Request(Consulta, "LlenarTabla");
}

function LlenarTablaGeneral(tipo) {
    MostrarModalCargando();
    Tablax = "tblGeneral";

    var Tabla = document.getElementById("tblGeneral");

    if (Tabla.rows.length > 1) {
        CurrentTable.destroy();

        for (var i = Tabla.rows.length - 1; i > 0 ; i--) {
            Tabla.deleteRow(i);
        }
    }

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

var idioma =
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
    CurrentTable = $('#' + tabla).DataTable({
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

function MostrarModalCargando() {    
    $('#Cargando').modal(
        {
            backdrop: 'static',
            keyboard: false
        }        
    );
}

function RecargarPagina() {
    location.reload();
}