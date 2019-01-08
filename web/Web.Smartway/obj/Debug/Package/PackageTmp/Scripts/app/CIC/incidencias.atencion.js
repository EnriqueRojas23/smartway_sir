var btnRealizarEvaluacion = "#btnRealizarEvaluacion";
var btnGuardarEvaluacion = "#btnGuardarEvaluacion";


$(document).ready(function () {

    $(btnRealizarEvaluacion).click(function (event) { btnRealizarEvaluacion_onclick(this, event); });
    $(btnGuardarEvaluacion).click(function (event)  { btnGuardarEvaluacion_onclick(this, event); });
});

function btnRealizarEvaluacion_onclick(obj, event) {

    var url = $(obj).data("url");
    var dataModelo = $('form').serialize();


    $.ajax(
            {
                type: "POST",
                async: true,
                url:   url,
                data: dataModelo,
                success: function (data)
                {
                    if (data == true)
                    {
                        swal({ title: "¡Error!", text: "¡No se puede realizar la evaluación, ya que existe una propuesta activa!", type: "error", confirmButtonText: "Aceptar" });
                    }
                    else
                    {
                        RealizarEvaluacion_Callback(data);
                    }
                },
                error: function (request, status, error)
                {
                    swal({ title: "¡Error!", text: "¡Ocurrió un error al realizar la evaluación!", type: "error", confirmButtonText: "Aceptar" });
                }
            });
}

function btnGuardarEvaluacion_onclick(obj, event)
{


    var url = $(obj).data("url");
    swal({
        title: "Registro de Evalución",
        text: "¿Está seguro que desea registrar la evalución?",
        type: "warning",
        showCancelButton: true,
        confirmButtonClass: "btn-danger",
        confirmButtonText: "Si, registrar",
        cancelButtonText: "Cancelar",
        closeOnConfirm: false,
        closeOnCancel: true
    },
     function (isConfirm)
     {
         if (isConfirm)
         {
             var dataModelo = $("form").serialize();
             $.ajax(
             {
                 type: "POST",
                 async: true,
                 url: url,
                 data: dataModelo,
                 success: function (data)
                 {
                     if (data.res == true)
                     {
                         swal({ title: "¡Evaluación Registrada!", text: data.mensaje, type: "success", confirmButtonText: "Aceptar" });
                     }
                     else
                     {
                         swal({ title: "¡Error!", text: data.mensaje, type: "error", confirmButtonText: "Aceptar" });
                     }
                 },
                 error: function (request, status, error)
                 {
                     swal({ title: "¡Error!", text: "¡Ocurrió un error al guardar la evaluación!", type: "error", confirmButtonText: "Aceptar" });
                 }
             });
         }
     });
}

function RealizarEvaluacion_Callback(data)
{
    $("#modalcontentIncidenciasP").html(data);
    $("#modalcontainerIncidenciasP").modal("show");

    $("#GenerarNCRTienda").val(false);
    $("#SolicitarNcrATC").val(false);
    $("#propuesta").val("");
    $("#TiendaNCR").val("");

    $('.i-checks').iCheck({
        checkboxClass: 'icheckbox_square-green',
        radioClass: 'iradio_square-green',
    });

    $("#propuesta").change(function ()
    {
        var atc = $("#atc").val();
        var propuesta = $("#propuesta").val();

        if (atc == "True" && (propuesta == 2 || propuesta == 3))
        {
            $("#GenerarNCRTienda").val(true);
            $("#dvTienda").css("display", "");
           
        }
        else
        {
            $("#dvTienda").css("display", "none");
            $("#GenerarNCRTienda").val(false);
        }
    })

    $("#SolicitarNcrATC").change(function ()
    {
        if ($('#SolicitarNcrATC').is(':checked'))
        {
            $("#propuesta").val("");
            $("#propuestaATC").val("");
            document.getElementById('propuesta').disabled = true;
            document.getElementById('propuestaATC').disabled = false;
        }
        else
        {
            $("#propuesta").val("");
            $("#propuestaATC").val("");
            document.getElementById('propuesta').disabled = false;
            document.getElementById('propuestaATC').disabled = true;
        }
    })


    $('.ladda-button').ladda('bind', { timeout: 5000000 });
}

function EvaluarPropuesta()
{
        var propuesta = $("#propuesta").val();
        var propuestaATC = $("#propuestaATC").val();

        if ($('#SolicitarNcrATC').is(':checked') && (propuestaATC == 0 || propuestaATC == ""))
        {
            swal({ title: "¡Error!", text: "¡Seleccionar la solicitud que desea enviar a ATC!", type: "error", confirmButtonText: "Aceptar" });
        }
        else if ($('#SolicitarNcrATC').is(':checked') == false && (propuesta == 0 || propuesta == ""))
        {
            swal({ title: "¡Error!", text: "¡Seleccionar una propuesta!", type: "error", confirmButtonText: "Aceptar" });
        }
        else
        {
            if ($('#SolicitarNcrATC').is(':checked'))
            {
                $("#propuesta").val(propuestaATC);
                propuesta = propuestaATC;
                $("#SolicitarNcrATC").val(true);
            }

            $.ajax(
                    {
                        type: "POST",
                        async: true,
                        url: $("#btnAceptarPropuesta").data("url").trim(),
                        data: { "propuesta": propuesta },
                        success: function (data) {
                            if (data.res == true) {
                                $("#GeneraDocumentoInterno").val(true);

                                if (data.GeneraDocInterno == true) {
                                    var NCRTienda = $("#GenerarNCRTienda").val();
                                    var TiendaNCR = $("#TiendaNCR").val();

                                    if (NCRTienda == "true" && (TiendaNCR == 0 || TiendaNCR == "")) {
                                        swal({ title: "¡Error!", text: "¡Seleccionar la tienda donde se registrara la solicitud de Nota de Crédito!", type: "error", confirmButtonText: "Aceptar" });
                                    }
                                    else {
                                        swal({ title: "Información", text: "La propuesta seleccionada  generará una " + data.DescTipoDocumento + ".", type: "info", closeOnConfirm: false },
                                        function () {
                                            swal({
                                                title: "Registrar Propuesta",
                                                text: "¿Está seguro de registrar la propuesta?",
                                                type: "warning",
                                                showCancelButton: true,
                                                cancelButtonText: "Cancelar",
                                                confirmButtonColor: '#DD6B55',
                                                confirmButtonText: 'Registrar',
                                                closeOnConfirm: false,
                                                closeOnCancel: true
                                            },
                                           function () {
                                               $("#GeneraDocumentoInterno").val(true);
                                               $("#TipoDocumentoInterno").val(data.idTipoDoc);
                                               showLoading();
                                               $('#frmPropuestaEvaluacion').submit();
                                           });
                                        });
                                    }
                                }
                                else {
                                    $("#GeneraDocumentoInterno").val(false);

                                    swal({
                                        title: "Registrar Propuesta",
                                        text: "¿Está seguro de registrar la propuesta?",
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
                                        $('#frmPropuestaEvaluacion').submit();
                                    });
                                }
                            }
                            else {
                                swal({ title: "¡Error!", text: "¡Ocurrió un error al registrar la propuesta!", type: "error", confirmButtonText: "Aceptar" });
                            }

                        },
                        error: function (request, status, error) {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al registrar la propuesta!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    });
        }

}



function Antecedentes(incidencia)
{
    var url = $('#lknAntecedentes').data("url") ;

    $.ajax(
            {
                type: "POST",
                async: true,
                url: url,
                success: function (data)
                {
                    Antecedentes_Callback(data);
                },
                error: function (request, status, error) {
                    swal({ title: "¡Error!", text: "¡Ocurrió un error al buscar los antedecentes!", type: "error", confirmButtonText: "Aceptar" });
                }
            });

}

function Antecedentes_Callback(data)
{
    $("#modalcontentIncidenciasL").html(data);
    $("#modalcontainerIncidenciasL").modal("show");
    cargarTablasAntecedente();
}

function cargarTablasAntecedente()
{
    var incidencia = $("#inc_int_id").val();
        
    $('.dataTables-AntDocumentos').DataTable({
         responsive: true,
         "searching": true,
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": $('#tblAntDocCompra').data("url") + "?incidencia=" + incidencia + "&tipo=" + "Documento",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
                { "title": "Id", "data": "inc_int_id", "name": "inc_int_id", "autoWidth": true },
                { "title": "Documento Compra", "data": "tdoc_str_numero", "name": "tdoc_str_numero", "autoWidth": true },
                { "title": "Tipo Incidencia", "data": "ti_str_descripcion", "name": "ti_str_descripcion", "autoWidth": true },
                { "title": "N° Incidencia", "data": "inc_str_numero", "name": "inc_str_numero", "autoWidth": true, "mRender": function (data, type, full) { var id = full.inc_int_id; return "<a href='javascript:RecuperarIncidencia(" + id +");'>" + data + "</a>" } },
                { "title": "fecha", "data": "inc_dat_fecharegistro", "name": "inc_dat_fecharegistro", "autoWidth": true },
                { "title": "Producto", "data": "pro_str_codigo", "name": "pro_str_codigo", "autoWidth": true },
                { "title": "Motivo", "data": "mrc_str_descripcion", "name": "mrc_str_descripcion" },
                { "visible": false , "data": "dci_int_id", "name": "dci_int_id" },
                { "title": "ODS", "data": "ods_str_numero", "name": "mrc_str_descripcion" }
        ],
    });

    $('.dataTables-AntProductos').DataTable({
        responsive: true,
        "searching": true,
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": $('#tblAntProductos').data("url") + "?incidencia=" + incidencia + "&tipo=" + "Producto",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
                { "title": "Id", "data": "inc_int_id", "name": "inc_int_id", "autoWidth": true },
                { "title": "Documento Compra", "data": "tdoc_str_numero", "name": "tdoc_str_numero", "autoWidth": true },
                { "title": "Tipo Incidencia", "data": "ti_str_descripcion", "name": "ti_str_descripcion", "autoWidth": true },
                { "title": "N° Incidencia", "data": "inc_str_numero", "name": "inc_str_numero", "autoWidth": true, "mRender": function (data, type, full) { var id = full.inc_int_id; return "<a href='javascript:RecuperarIncidencia(" + id + ");'>" + data + "</a>" } },
                { "title": "fecha", "data": "inc_dat_fecharegistro", "name": "inc_dat_fecharegistro", "autoWidth": true },
                { "title": "fecha", "data": "inc_dat_fecharegistro", "name": "inc_dat_fecharegistro", "autoWidth": true },
                { "title": "Producto", "data": "pro_str_codigo", "name": "pro_str_codigo", "autoWidth": true },
                { "title": "Motivo", "data": "mrc_str_descripcion", "name": "mrc_str_descripcion" },
                { "visible": false, "data": "dci_int_id", "name": "dci_int_id" },
                { "title": "ODS", "data": "ods_str_numero", "name": "mrc_str_descripcion" }
        ]
    });

    $('.dataTables-AntCliente').DataTable({
        responsive: true,
        "searching": true,
        "processing": true,
        "serverSide": true,
        "ajax": {
            "url": $('#tblAntCliente').data("url") + "?incidencia=" + incidencia + "&tipo=" + "Cliente",
            "type": "POST",
            "datatype": "json"
        },
        "columns": [
                { "title": "Id", "data": "inc_int_id", "name": "inc_int_id", "autoWidth": true },
                { "title": "Documento Compra", "data": "tdoc_str_numero", "name": "tdoc_str_numero", "autoWidth": true },
                { "title": "Tipo Incidencia", "data": "ti_str_descripcion", "name": "ti_str_descripcion", "autoWidth": true },
                { "title": "N° Incidencia", "data": "inc_str_numero", "name": "inc_str_numero", "autoWidth": true, "mRender": function (data, type, full) { var id = full.inc_int_id; return "<a href='javascript:RecuperarIncidencia(" + id + ");'>" + data + "</a>" } },
                { "title": "fecha", "data": "inc_dat_fecharegistro", "name": "inc_dat_fecharegistro", "autoWidth": true },
                { "title": "fecha", "data": "inc_dat_fecharegistro", "name": "inc_dat_fecharegistro", "autoWidth": true },
                { "title": "Producto", "data": "pro_str_codigo", "name": "pro_str_codigo", "autoWidth": true },
                { "title": "Motivo", "data": "mrc_str_descripcion", "name": "mrc_str_descripcion" },
                { "visible": false, "data": "dci_int_id", "name": "dci_int_id" },
                { "title": "ODS", "data": "ods_str_numero", "name": "mrc_str_descripcion" }
        ]
    });

}

function RecuperarIncidencia(incidencia) {

    var url = $('#tblAntDocCompra').data("inc") + "?inc_int_id=" + incidencia;
    showLoading();
    $(window).attr("location", url);
}

function showLoading() {
    $.blockUI({
        message: '<div class="sk-spinner sk-spinner-circle"> <div class="sk-circle1 sk-circle"></div> <div class="sk-circle2 sk-circle"></div> <div class="sk-circle3 sk-circle"></div> <div class="sk-circle4 sk-circle"></div>  <div class="sk-circle5 sk-circle"></div> <div class="sk-circle6 sk-circle"></div>  <div class="sk-circle7 sk-circle"></div> <div class="sk-circle8 sk-circle"></div><div class="sk-circle9 sk-circle"></div> <div class="sk-circle10 sk-circle"></div><div class="sk-circle11 sk-circle"></div><div class="sk-circle12 sk-circle"></div></div>',
        theme: false,
        baseZ: 100000
    });
}