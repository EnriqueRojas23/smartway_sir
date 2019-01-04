var incidencia = $('#inc_int_id').val();
var oListaTable;

$(document).ready(function () {

    oListaTable =
        $('.dataTables-Medidas').DataTable({
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        "processing": true, 
        "serverSide": true,
        "ajax": {
            "url": $('#tblMedidas').data("url") + "?incidencia=" + incidencia,
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
                { "title": "Medida Correctiva", "data": "med_str_descripcion", "name": "med_str_descripcion", "autoWidth": true },
                { "title": "Observación", "data": "incm_str_observacion", "name": "incm_str_observacion", "autoWidth": true }

        ],
        buttons: [
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'Medidas Correctivas' },
            { extend: 'pdf', title: 'Medidas Correctivas' },
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
                       oListaTable.draw();
                   });


    $(function () {
        $('#frmMedidasCorrectivas').submit(function (event) {
            event.preventDefault();

            var medida = $('#med_int_id').val();

            if (medida == "")
            {
                swal({ title: "¡Error!", text: "¡Seleccionar medida!", type: "error", confirmButtonText: "Aceptar" });  
            }
            else
            {
                swal({
                    title: "Registro de Medida",
                    text: "¿Está seguro de registrar la medida correctiva?",
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
                    //$('#frmMedidasCorrectivas').submit();
                    $('#frmMedidasCorrectivas').unbind('submit').submit()
                });
            }
        });

    });
   
    mostrarMensajeResultado();

});

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