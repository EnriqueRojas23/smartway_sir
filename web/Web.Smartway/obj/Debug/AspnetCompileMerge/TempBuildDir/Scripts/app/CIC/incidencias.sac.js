var incidencia = $('#inc_int_id').val();
var oListaTable;

$(document).ready(function () {


    $('#data_1 .input-group.date').datepicker({
        todayBtn: "linked",
        keyboardNavigation: false,
        forceParse: false,
        calendarWeeks: true,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });


    oListaTable =
        $('.dataTables-Comunicacion').DataTable({
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        "processing": true, 
        "serverSide": true,
        "ajax": {
            "url": $('#tblComunicacion').data("url") + "?incidencia=" + incidencia,
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
                { "title": "Medio", "data": "mc_str_descripcion", "name": "mc_str_descripcion", "autoWidth": true },
                { "title": "Proceso", "data": "proc_str_descripcion", "name": "proc_str_descripcion", "autoWidth": true },
                { "title": "Motivo", "data": "mcon_str_descripcion", "name": "mcon_str_descripcion", "autoWidth": true },
                { "title": "Fecha - Hora", "data": "sac_dat_fecha", "name": "sac_dat_fecha", "autoWidth": true },
                { "title": "Tipo de Contacto", "data": "tcon_str_descripcion", "name": "tcon_str_descripcion", "autoWidth": true },
                { "title": "Observación", "data": "sac_str_observacion", "name": "sac_str_observacion", "autoWidth": true }
        ],
        buttons: [
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'Comunicación con cliente' },
            { extend: 'pdf', title: 'Comunicación con cliente' },
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
        $('#frmSAC').submit(function (event)
        {
            event.preventDefault();
        swal({
            title: "Registro de Comunicación",
            text: "¿Está seguro de registrar la comunicación?",
            type: "info",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: '#DD6B55',
            confirmButtonText: 'Registrar',
            closeOnConfirm: false,
            showLoaderOnConfirm: true,
            closeOnCancel: true,
        },
        function ()
        {
            showLoading();
            $('#frmSAC').unbind('submit').submit()
            //$('#frmSAC').submit();
        }
        );
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