//OCULTAR OPCIONES DEL HEADER
document.getElementById('Opciones').style.display = "none";

function Validar() {
    let Usuario = document.getElementById('Usuario').value;
    let Contrasena = document.getElementById('Contrasena').value;

    if (Usuario.length != 0 && Contrasena.length != 0) {    
        var Consulta = `SELECT U.Usuario, P.Nombre, P.Apellido1, T.Pacientes, T.Visitas, T.Configuraciones FROM Usuarios U INNER JOIN TipoRol T ON T.idTipoRol = U.TipoRol_idTipoRol INNER JOIN Persona P ON P.idPersona = U.Persona_idPersona WHERE U.Usuario = '${Usuario}' AND U.Contrasena = '${Contrasena}' AND U.Estado = true GROUP BY U.Usuario, P.Nombre, P.Apellido1, T.Pacientes, T.Visitas, T.Configuraciones`;        
        Request(Consulta, "ValidarUsuario");
    }
    else {
        MostrarModal("Debes ingresar unas credenciales válidas.");
    }
}

