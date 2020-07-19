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