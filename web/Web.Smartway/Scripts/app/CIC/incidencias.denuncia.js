var denuncia = $('#den_int_id').val();
var oListaTable;

$(document).ready(function () {


    $('#data_5 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    oListaTable =
        $('.dataTables-tblRecepcionDenuncias').DataTable({
        responsive: true,
        "processing": true,
        "serverSide": true,
        "searching":false,
        "ajax": {
            "url": $('#tblRecepcionDenuncias').data("url") + "?denuncia=" + denuncia,
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
                { "title": "Id", "data": "reden_int_id", "name": "reden_int_id", "autoWidth": true },
                { "title": "Area", "data": "are_str_nombre", "name": "are_str_nombre", "autoWidth": true },
                { "title": "Medio", "data": "mc_str_descripcion", "name": "mc_str_descripcion", "autoWidth": true },
                { "title": "Fecha Recepción", "data": "reden_dat_fechrecepcion", "name": "reden_dat_fechrecepcion", "autoWidth": true },
                { "title": "Hora  Recepción", "data": "reden_str_horarecepcion", "name": "reden_str_horarecepcion", "autoWidth": true },
                { "title": "Acciones", "class": "text-center", "data": "reden_int_id", "mRender": function (data, type, full) { var id = data; return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Eliminar'  class='btn-danger btn btn-xs btn-outline' onclick='EliminarRecepcion(" + id + ")' > <i class='fa fa-trash'></i></button></div>" } },
        ]
    });

    $(function () {
        $('#frmDenuncias').submit(function (event)
        {
            event.preventDefault();

            swal({
                title: "Recepción de Denuncia",
                text: "¿Está seguro de registrar la recepción?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Registrar',
                closeOnConfirm: false,
                closeOnCancel: true
            },
                function () {
                    showLoading();
                    //$('#frmDenuncias').submit();
                    $('#frmDenuncias').unbind('submit').submit()
                });
        });

    });

    mostrarMensajeResultado();

});

function EliminarRecepcion(id) {
    var url = $('#tblRecepcionDenuncias').data("urldel");

    swal({
        title: "¿Está seguro de eliminar la recepción?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, eliminar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
            function (isConfirm) {
                if (isConfirm) {
                    $.ajax(
                    {
                        type: "POST",
                        async: true,
                        url: url,
                        data: { "recepcion": id },
                        success: function (data) {
                            if (data.res == true)
                            {
                                swal("¡Eliminado!", "La recepción fue eliminada de forma correcta.", "success");
                                oListaTable.draw();
                            }
                            else {
                                swal({ title: "¡Error!", text: "Ocurrió un error al eliminar la recepción!", type: "error", confirmButtonText: "Aceptar" });
                            }

                        },
                        error: function (request, status, error) {
                            swal({ title: "¡Error!", text: "Ocurrió un error al eliminar la recepción!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    });
                }
            });
}

function mostrarMensajeResultado() {
    if ($("#hdfMensaje").val()) {
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
