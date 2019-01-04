$(document).ready(function () {

    mostrarMensaje();
});


function mostrarMensaje()
{
    if ($("#hdfMensaje").val())
    {
        var mensaje = $("#hdfMensaje").val();

        if (mensaje == "Se creo el usuario correctamente")
        {
            swal("Registro Correcto!", mensaje, "success");


            swal({
                title: "¡Registro Correcto!",
                text: mensaje,
                type: "success",
                showCancelButton: false,
                confirmButtonColor: "#38C4E1",
                confirmButtonText: "Aceptar!",
                closeOnConfirm: false
                },
                function ()
                {
                    var vUrl = $("#hdfMensaje").data("url");
                    $(window).attr("location", vUrl);
                });
        }
    }

}