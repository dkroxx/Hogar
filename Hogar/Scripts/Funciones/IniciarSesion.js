//OCULTAR OPCIONES DEL HEADER
document.getElementById('Opciones').style.display = "none";

function Validar() {
    let Usuario = document.getElementById('Usuario').value;
    let Contrasena = document.getElementById('Contrasena').value;

    if (Usuario.length != 0 && Contrasena.length != 0) {    
        blockCampos(true);
        document.getElementById('btnIngresar').style.display = "none";
        document.getElementById('loading').style.display = "block";        
        var Consulta = `SELECT U.idUsuarios, U.Usuario, P.Nombre, P.Apellido1, T.Pacientes, T.Visitas, T.Configuraciones, T.Asistentes FROM Usuario U INNER JOIN TipoRol T ON T.idTipoRol = U.TipoRol_idTipoRol INNER JOIN Persona P ON P.idPersona = U.Persona_idPersona WHERE U.Usuario = '${Usuario}' AND U.Contrasena = '${Contrasena}' AND U.Estado = true GROUP BY U.idUsuarios, U.Usuario, P.Nombre, P.Apellido1, T.Pacientes, T.Visitas, T.Configuraciones`;        
        Request(Consulta, "ValidarUsuario");
    }
    else {
        MostrarModal("Debes ingresar credenciales válidas.");
    }
}

function blockCampos(Estado) {
    var txtUser = document.getElementById('Usuario');
    var txtPass = document.getElementById('Contrasena');

    txtUser.disabled = Estado;
    txtPass.disabled = Estado;
}

