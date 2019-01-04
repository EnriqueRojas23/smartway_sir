var incidencia    = $('#inc_int_id').val();
var ordenServicio = $('#dci_int_id').val();

var oListaTable;

$(document).ready(function () {

    oListaTable =
        $('.dataTables-RegistroTecnico').DataTable({
        responsive: true,
        dom: '<"html5buttons"B>lTfgitp',
        "processing": true, 
        "serverSide": true,
        "ajax": {
            "url": $('#tblRegistroTecnico').data("url") + "?incidencia=" + incidencia + "&DocumentoInterno=" + ordenServicio,
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
                { "title": "ID", "data": "dtec_int_id", "name": "dtec_int_id", "autoWidth": true },
                { "title": "Técnico", "data": "tec_str_nombre", "name": "tec_str_nombre", "autoWidth": true },
                { "title": "Avería Detectada", "data": "ave_str_descripcion", "name": "ave_str_descripcion", "autoWidth": true },
                { "title": "Detalle de Avería", "data": "dtec_str_detaveria", "name": "dtec_str_detaveria", "autoWidth": true },
                { "title": "Trabajo Realizado", "data": "trb_str_descripcion", "name": "trb_str_descripcion", "autoWidth": true },
                { "title": "Detalle del Trabajo", "data": "dtec_str_dettrabajo", "name": "dtec_str_dettrabajo", "autoWidth": true },
                { "title": "Destino Final", "data": "destc_str_descripcion", "name": "destc_str_descripcion", "autoWidth": true },
                { "title": "Transporte", "data": "tp_str_descripcion", "name": "tp_str_descripcion", "autoWidth": true },
                { "title": "Fecha", "data": "dtec_dat_fechcreacion", "name": "dtec_dat_fechcreacion", "autoWidth": true}

        ],
        buttons: [
            { extend: 'copy' },
            { extend: 'csv' },
            { extend: 'excel', title: 'Registro Técnico' },
            { extend: 'pdf', title: 'Registro Técnico' },
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
        $('#frmDatosTecnicos').submit(function (event)
        {
            event.preventDefault();
            var DestinoFinal    = $("#destc_int_id").val();
            var DestinoFinalSTC = $("#DestinoSTCCentral").val();

            if (DestinoFinal == DestinoFinalSTC)
            {
                var tipoTransporte = $("#tp_int_id").val();

                if (tipoTransporte == 0)
                {
                    swal({ title: "Error", text: "Ingresar el tipo de Transporte.", type: "error" });
                }
                else
                {
                    swal({ title: "Información", text: "La orden de servicio sera guiada al almacén central de Servicio Técnico.", type: "info", closeOnConfirm: false },
                    function ()
                    {

                        $("#STCCentral").val(true);

                        swal({
                            title: "Registro de Datos Técnicos",
                            text: "¿Está seguro de realizar el registro?",
                            type: "info",
                            showCancelButton: true,
                            cancelButtonText: "Cancelar",
                            confirmButtonColor: '#DD6B55',
                            confirmButtonText: 'Registrar',
                            closeOnConfirm: false,
                            showLoaderOnConfirm: true,
                            closeOnCancel: true,
                        },
                       function () {

                           showLoading();
                           $('#frmDatosTecnicos').unbind('submit').submit()
                           //$('#frmDatosTecnicos').submit();
                       });
                    });
                }
            }
            else
            {
                $("#STCCentral").val(false);

                swal({
                    title: "Registro de Datos Técnicos",
                    text: "¿Está seguro de realizar el registro?",
                    type: "info",
                    showCancelButton: true,
                    cancelButtonText: "Cancelar",
                    confirmButtonColor: '#DD6B55',
                    confirmButtonText: 'Registrar',
                    closeOnConfirm: false,
                    showLoaderOnConfirm: true,
                    closeOnCancel: true,
                            },
                   function () {

                       showLoading();
                       //$('#frmDatosTecnicos').submit();
                       $('#frmDatosTecnicos').unbind('submit').submit()
                   });
            }
        });

    });
   

    $("#destc_int_id").change(function ()
    {
        var destino = $("#destc_int_id").val();
        var DestinoFinalSTC = $("#DestinoSTCCentral").val();

        if (destino == DestinoFinalSTC)
        {
            $("#dvTTransporte").css("display", "");
           
        }
        else
        {
            $("#dvTTransporte").css("display", "none");
        }
    })


    mostrarMensajeResultado();
});

function mostrarMensajeResultado()
{
    if ($("#hdfMensaje").val())
    {
        if ($("#hdfTipoMensaje").val())
        {
            var tipo = $("#hdfTipoMensaje").val()

            if (tipo == "error")
            {
                var mensaje = $("#hdfMensaje").val();
                swal("¡Error!", mensaje, "error");
            }
            else
            {
                var mensaje = $("#hdfMensaje").val();
                swal("¡Registro Correcto!", mensaje, "success");
            }
        }
        else
        {
            var mensaje = $("#hdfMensaje").val();
            swal("¡Registro Correcto!", mensaje, "success");
        }
    }
}

function showLoading()
{
    $.blockUI({
        message: '<div class="sk-spinner sk-spinner-circle"> <div class="sk-circle1 sk-circle"></div> <div class="sk-circle2 sk-circle"></div> <div class="sk-circle3 sk-circle"></div> <div class="sk-circle4 sk-circle"></div>  <div class="sk-circle5 sk-circle"></div> <div class="sk-circle6 sk-circle"></div>  <div class="sk-circle7 sk-circle"></div> <div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div> <div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
        theme: false,
        baseZ: 100000
    });
}