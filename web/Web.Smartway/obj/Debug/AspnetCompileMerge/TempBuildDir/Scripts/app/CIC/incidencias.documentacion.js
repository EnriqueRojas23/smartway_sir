var incidencia = $('#inc_int_id').val();
var oDocumentosTable;

$(document).ready(function () {


    $("#proc_int_id").change(function ()
    {
        var proceso = $("#proc_int_id").val();

        if (proceso == "")
        {
            swal({ title: "¡Error!", text: "¡Seleccionar proceso!", type: "error", confirmButtonText: "Aceptar" });
        }
        else {

            $.ajax(
               {
                   type: "POST",
                   async: true,
                   url: $("#tarch_int_id").data("url").trim(),
                   data: { "proceso": proceso },
                   success: function (data) {
                       var $select = $('#tarch_int_id');
                       $select.empty();
                       $("#tarch_int_id").append('<option value="">[Seleccionar tipo de archivo]</option>');
                       $.each(data, function (i, state) {
                           $('<option>', {
                               value: state.Value
                           }).html(state.Text).appendTo($select);
                       });
                   },
                   error: function (request, status, error) {
                       swal({ title: "¡Error!", text: "Ha ocurrido un error, intentelo mas tarde.", type: "error", confirmButtonText: "Aceptar" });
                   }
               });
        }
    })

    oDocumentosTable =
        $('.dataTables-Documentacion').DataTable({
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": $('#tblDocumentos').data("url") + "?incidencia=" + incidencia,
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
                { "key": true, "title": "ID", "data": "inarc_int_id", "name": "inarc_int_id", "autoWidth": true, "class": "text-center" },
                { "title": "Proceso", "data": "proc_str_descripcion", "name": "proc_str_descripcion", "autoWidth": true },
                { "title": "Tipo Documento", "data": "tarch_str_descripcion", "name": "tarch_str_descripcion", "autoWidth": true },
                { "title": "Descripción", "data": "inarc_str_descripcion", "name": "inarc_str_descripcion", "autoWidth": true },
                { "title": "Archivo", "data": "inarc_str_nombre", "name": "inarc_str_nombre", "autoWidth": true },
                { "title": "Acciones", "class": "text-center", "data": "inarc_int_id", "mRender": function (data, type, full) { var id = data; return "<div class='btn-group'><button type='button' class='btn-primary btn btn-xs btn-outline' onclick='downloadFile(" + id + ");return false;' href='#' > Descargar  <i class='fa fa-download'></i></button><button type='button'  class='btn-danger btn btn-xs btn-outline' onclick='EliminarArchivo(" + id + ")' > Eliminar <i class='fa fa-trash'></i></button></div>" } },
                
        ],
        buttons: [
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'Documentos' },
            { extend: 'pdf', title: 'Documentos' },
            {
                extend: 'print',
                customize: function (win) {
                    $(win.document.body).addClass('white-bg');
                    $(win.document.body).css('font-size', '10px');

                    $(win.document.body).find('table')
                            .addClass('compact')
                            .css('font-size', 'inherit');
                }
            }
        ]

    });

    $("#btnActualizar").button()
                   .click(function (e) {
                       oDocumentosTable.draw();
                   });


    $(function () {
        $('#frmDocumentacion').submit(function (event) {
            event.preventDefault();

            var proceso = $("#proc_in_id").val();
            var tipoArchivo = $("#tarch_int_id").val();
            var archivo = $("#archivo").val();

            if (proceso == "" || tipoArchivo == "" || archivo == "")
            {

                swal({ title: "¡Error!", text: "¡Seleccionar proceso, tipo  y archivo a registrar!", type: "error", confirmButtonText: "Aceptar" });
            }
            else {

                swal({
                    title: "Registro de Documento",
                    text: "¿Está seguro de subir el archivo?",
                    type: "warning",
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Subir',
                    closeOnConfirm: false,
                    closeOnCancel: true
                },
                function () {
                    showLoading();
                    //$('#frmDocumentacion').submit();
                    $('#frmDocumentacion').unbind('submit').submit()
                });
            }

        });

    });
   
    mostrarMensajeResultado();
});

function EliminarArchivo(archivo)
{
    var url = $('#tblDocumentos').data("urldel");

    swal({
                title: "¿Está seguro de eliminar el archivo?",
                text: "No podra recuperar el archivo.",
                type: "warning",
                showCancelButton: true,
                confirmButtonClass: "btn-danger",
                confirmButtonText: "Si, borrar!",
                cancelButtonText: "Cancelar!",
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function (isConfirm)
            {
            if (isConfirm)
            {
                $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    data: { "archivo": archivo },
                    success: function (data) 
                    {
                        if (data == true)
                        {
                            swal("¡Eliminado!", "El archivo ha sido eliminado.", "success");
                            oDocumentosTable.draw();
                        }
                        else {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar el archivo!", type: "error", confirmButtonText: "Aceptar" });
                        }

                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar el archivo!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
            }
        });
}

function downloadFile( archivo)
{
    var url = $('#tblDocumentos').data("urldwn") + "?archivo=" + archivo;
    window.location = url;
}

function mostrarMensajeResultado()
{
    if ($("#hdfMensaje").val())
    {
        var mensaje = $("#hdfMensaje").val();
        swal("¡Registro Correcto!", mensaje, "success");
    }
}

function showLoading() {
    $.blockUI({
        message: '<div class="sk-spinner sk-spinner-circle"> <div class="sk-circle1 sk-circle"></div> <div class="sk-circle2 sk-circle"></div> <div class="sk-circle3 sk-circle"></div> <div class="sk-circle4 sk-circle"></div>  <div class="sk-circle5 sk-circle"></div> <div class="sk-circle6 sk-circle"></div>  <div class="sk-circle7 sk-circle"></div> <div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div> <div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
        theme: false,
        baseZ: 100000
    });
}