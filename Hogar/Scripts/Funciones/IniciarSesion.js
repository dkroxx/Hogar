//OCULTAR OPCIONES DEL HEADER
document.getElementById('Opciones').style.display = "none";

function Validar() {
    let Usuario = document.getElementById('Usuario').value;
    let Contrasena = document.getElementById('Contrasena').value;

    if (Usuario.length != 0 && Contrasena.length != 0) {
        var Consulta = `SELECT USUARIO, ROL FROM TEMP_USUARIO WHERE USUARIO = '${Usuario}' AND CONTRASENA = '${Contrasena}' AND ACTIVO = true`;        
        Request(Consulta, "InicioSesion");
    }
    else {
        MostrarModal("Debes ingresar unas credenciales válidas.");
    }
}

