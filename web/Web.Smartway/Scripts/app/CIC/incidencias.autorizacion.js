var btnEnviarRespuesta = "#btnEnviarRespuesta";

$(document).ready(function () {

    $(btnEnviarRespuesta).click(function (event) { btnEnviarRespuesta_onclick(this, event); });
});

function btnEnviarRespuesta_onclick(obj, event)
{
    var url = $(obj).data("url");
    var estadoPropuesta = $('#prop_int_estado').val();
    var motivoRespuesta = $('#sol_int_motivorespuesta').val();
    var observacionRespuesta = $('#sol_str_obsrespuesta').val();
    var dataModelo = $('form').serialize();

    if (estadoPropuesta == "" || motivoRespuesta == "") {

        swal({ title: "¡Error!", text: "¡Seleccionar estado y motivo de la autorización!", type: "error", confirmButtonText: "Aceptar" });
    }
    else
    {

        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    data: dataModelo,
                    success: function (data)
                    {
                        if (data == true)
                        {
                            swal("¡Correcto!", "Se envió la respuesta de forma correcta.", "success")
                            document.getElementById('btnEnviarRespuesta').disabled = true;
                        }
                        else {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al enviar la respuesta!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al enviar la respuesta!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
    }
}
