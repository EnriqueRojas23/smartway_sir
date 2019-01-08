

function btnSubirArchivo_onclick(obj, event) {

    var url = $(obj).data("url");
    var archivo = $("#files").val();

    if (archivo == "") {
        $("#errores").val("");
        swal({ title: "¡Error!", text: "¡Seleccionar Archivo Excel!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
    }
    else {
        swal({
            title: "¿Está seguro de cargar el archivo excel?",
            text: "Se realizara la validaciòn del archivo.",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Si, cargar",
            cancelButtonText: "Cancelar",
            closeOnConfirm: false,
            closeOnCancel: true
        },
        function (isConfirm) {
            if (isConfirm) {

                var dataModelo = $("#FrmSubirExcel").serialize();
                var formData = new FormData(document.getElementById("FrmSubirExcel"));
                formData.append("dato", "valor");

                $.ajax(
                {
                    url: url,
                    type: "POST",
                    dataType: "html",
                    data: formData,
                    cache: false,
                    contentType: false,
                    processData: false,
                    success: function (data) {
                        if (data == "0") {
                            swal("¡Correcto!", "Se cargó el archivo de forma correcta, no se encontraron errores.", "success");
                            $("#errores").val(data);
                            oListaTable.draw();
                            $("#files").val("");
                        }
                        else if (parseInt(data) > 0) {
                            swal("¡Correcto!", "Se cargó el archivo de forma correcta, pero se encontraron errores.", "success");
                            $("#errores").val(data);
                            oListaTable.draw();
                            $("#files").val("");
                        }
                        else if (data == "-3") {
                            swal("¡Error!", "El archivo no tiene el formato correcto o esta vacío.", "error");
                            $("#errores").val("");
                            $("#files").val("");
                        }
                        else if (data == "-1") {
                            swal("¡Error!", "La extensión del archivo es incorrecta, solo puede cargar archivos .xls y .xlsx.", "error");
                            $("#errores").val("");
                            $("#files").val("");
                        }
                        else if (data == "-2") {
                            swal("¡Error!", "El tamaño del archivo sobrepasa el permitido (máximo 3 MB).", "error");
                            $("#errores").val("");
                            $("#files").val("");
                        }
                        else {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al cargar el archivo!", type: "error", confirmButtonText: "Aceptar" });
                            $("#errores").val("1");
                            $("#files").val("");
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "Ocurrió un error al cargar el archivo!", type: "error", confirmButtonText: "Aceptar" });
                        $("#errores").val("");
                        $("#files").val("");
                    }
                });
            }
        });
    }

}