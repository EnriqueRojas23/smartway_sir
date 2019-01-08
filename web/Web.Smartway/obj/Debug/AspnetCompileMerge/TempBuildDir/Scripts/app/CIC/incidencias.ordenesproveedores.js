var oDocumentosTable;
var oDetalleOGPTable;
var btnModalGenerarOGP = "#btnModalGenerarOGP";

$(document).ready(function () {

    $(btnModalGenerarOGP).click(function (event) { btnModalGenerarOGP_onclick(this, event); });

    $('#data_1 .input-daterange').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });

    $('#data_2 .input-daterange').datepicker({
        keyboardNavigation: false,
        forceParse: false,
        autoclose: true,
        format: 'dd/mm/yyyy'
    });


    $("#btnBuscar").button()
                   .click(function (e) {
                       oDocumentosTable.draw();
                   });

    CargaListaOTP();
});

function CargaListaOTP()
{
    oDocumentosTable =
       $('.dataTables-tblOProveedores').DataTable({
           responsive: true,
           dom: '<"html5buttons"B>lTfgitp',
           "processing": true,
           "serverSide": true,
           "ajax": {
               "url": $('#tblOProveedores').data("url"),
               "data": function ( d ) {
                   d.otp            = $('#otp_str_numero').val();
                   d.FechaInicioOTP = $('#FechaInicioOTP').val();
                   d.FechaFinOTP    = $('#FechaFinOTP').val();
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   { "key": true, "title": "Id", "data": "otp_int_id", "name": "otp_int_id", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "N° Orden", "data": "otp_str_numero", "name": "otp_str_numero", "autoWidth": true, "class": "text-center",
                       "mRender":
                                function (data, type, full) {
                                    var estado = data;
                                    return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                }
                   },
                   { "title": "Tipo ", "data": "tprv_str_descripcion", "name": "tprv_str_descripcion", "autoWidth": true },
                   { "title": "Proveedor", "data": "prv_str_descripcion", "name": "prv_str_descripcion", "autoWidth": true },
                   { "title": "Fecha Creación", "data": "otp_dat_fechregistro", "name": "otp_dat_fechregistro", "autoWidth": true, "class": "text-center" },
                   { "title": "Estado", "data": "estado", "name": "estado", "autoWidth": true, "class": "text-center" },
                   { "title": "N° Guia Salida", "data": "guia", "name": "guia", "autoWidth": true, "class": "text-center" },
                   { "title": "Fecha Guia", "data": "fecha_guia", "name": "fecha_guia", "autoWidth": true, "class": "text-center" },
                   { "title": "Acciones", "class": "text-center", "data": "otp_int_id", "mRender": function (data, type, full) { var id = data; return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Ver Detalle OTP' class='btn-primary btn btn-xs btn-outline ' onclick='VerDetalleOTP(" + id + ");return false;' href='#' > <i class='fa fa-search'></i></button><button type='button' data-toggle='tooltip' data-placement='top' title='Eliminar OTP'  class='btn-danger btn btn-xs btn-outline' onclick='EliminarOTP(" + id + ")' > <i class='fa fa-trash'></i></button></div>" } },
           ],
           buttons: [
               { extend: 'copy' },
               { extend: 'csv' },
               { extend: 'excel', title: 'Ordenes de traslado' },
               { extend: 'pdf', title: 'Ordenes de traslado' },
               {
                   extend: 'print',
                   customize: function (win) {
                       $(win.document.body).addClass('white-bg');
                       $(win.document.body).css('font-size', '9px');

                       $(win.document.body).find('table')
                               .addClass('compact')
                               .css('font-size', 'inherit');
                   }
               }
           ]

       });
}

function EliminarOTP(id)
{
    var url = $('#tblOProveedores').data("urldel");

    swal({
        title: "¿Está seguro de eliminar la Orden de traslado?",
        text: "¡No podrá recuperar el orden!",
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
                        data: { "id": id },
                        success: function (data)
                        {
                            if (data.res == true)
                            {
                                swal("¡Eliminado!", "La orden de traslado fue eliminada de forma correcta.", "success");
                                oDocumentosTable.draw();
                            }
                            else {
                                swal({ title: "¡Error!", text: "Ocurrió un error al eliminar la orden de traslado!", type: "error", confirmButtonText: "Aceptar" });
                            }

                        },
                        error: function (request, status, error) {
                            swal({ title: "¡Error!", text: "Ocurrió un error al eliminar la orden de traslado!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    });
                }
            });
}

function VerDetalleOTP(id)
{
    var url = $('#tblOProveedores').data("urldtl") + "?id=" + id;
    $.get(url, function (data) {
        $("#modalcontentIncidenciasL").html(data);
        $("#modalcontainerIncidenciasL").modal("show");
        CargaInicialDetalleOTP();
    });
}

function btnModalGenerarOGP_onclick(obj, event) {

    var url = $(obj).data("url");
    $.get(url, function (data) {
        $("#modalcontentIncidenciasL").html(data);
        $("#modalcontainerIncidenciasL").modal("show");
        CargaInicialDetalleOTP();
    });
}

function CargaInicialDetalleOTP()
{

    $("#tprv_int_id").change(function ()
    {
        var tipo = $("#tprv_int_id").val();

        if (tipo == "") {
            swal({ title: "¡Error!", text: "¡Seleccionar el tipo de proveedor!", type: "error", confirmButtonText: "Aceptar" });
        }
        else {

            $.ajax(
               {
                   type: "POST",
                   async: true,
                   url: $("#tprv_int_id").data("url").trim(),
                   data: { "tipoProveedor": tipo },
                   success: function (data) {
                       var $select = $('#prv_int_id');
                       $select.empty();
                       $("#prv_int_id").append('<option value="0">--Proveedor--</option>');
                       $.each(data, function (i, state) {
                           $('<option>', {
                               value: state.Value
                           }).html(state.Text).appendTo($select);
                       });
                   },
                   error: function (request, status, error) {
                       swal({ title: "¡Error!", text: "¡Ha ocurrido un error, intentelo mas tarde!", type: "error", confirmButtonText: "Aceptar" });
                   }
               });
        }
    })

    oDetalleOGPTable =
       $('.dataTables-tblDetalleOGP').DataTable({
           responsive: true,
           "searching": false,
           "processing": true,
           "serverSide": true,
           "iDisplayLength": 10,
           "scrollCollapse": true,
           "paging": true,
           "info":   false,
           "ajax": {
               "url": $('#tblDetalleOGP').data("url"),
               "data": function (d) {
                   d.tienda = $('#ddlFTienda').val();
                   d.documento = $('#txtFDocumento').val();
                   d.otp = $('#otp_int_id').val();
               },
               "type": "POST",
               "datatype": "json"
           },
           'columnDefs': [
             {
                 'targets': 0,
                 'checkboxes': { 'selectRow': true }
             }],
           "columns": [
                   { "key": true, "data": "dci_int_id", "autoWidth": "true" },
                   { "title": "Id", "data": "dci_int_id", "name": "dci_int_id", "sWidth": "4%", "class": "text-center" },
                   { "title": "Tienda", "data": "dci_str_tienda", "name": "dci_str_tienda", "sWidth": "5%", },
                   {
                       "title": "Documento", "data": "documento_interno", "name": "documento_interno", "sWidth": "14%", "class": "text-center",
                       "mRender":
                                   function (data, type, full)
                                   {
                                       var estado = data;
                                       return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                   }

                   },
                   { "title": "Código", "data": "pro_str_codigo", "name": "pro_str_codigo", "autoWidth": "true" },
                   { "title": "Descripción", "data": "pro_str_descripcion", "name": "pro_str_descripcion", "sWidth": "30%", },
                   { "title": "Serie/Imei", "data": "pro_str_serieimei", "name": "pro_str_serieimei", "autoWidth": "true" },
                   { "title": "Cantidad", "data": "pro_int_cantidad", "name": "pro_int_cantidad", "sWidth": "5%", },
                   { "title": "Fecha Triaje", "data": "dci_dat_fechrecepciontriaje", "name": "dci_dat_fechrecepciontriaje", "sWidth": "10%", }
           ],
           'select': { 'style': 'multi' },
           'order': [[1, 'asc']],
       });

}


function EliminarDetalle(id)
{
    swal({
        title: "Eliminar Orden",
        text: "¿Esta seguro de eliminar la orden?",
        type: "warning",
        showCancelButton: true,
        cancelButtonText: "Cancelar",
        confirmButtonColor: '#DD6B55',
        confirmButtonText: 'Eliminar',
        closeOnConfirm: true,
        closeOnCancel: true
    },
    function () {
        var url = $('#tblDetalleOGP').data("urldel") + "?id=" + id;
        $.ajax(
                {
                    type: "POST",
                    async: true,
                    url: url,
                    success: function (data)
                    {
                        if (data.res == true)
                        {
                            oDetalleOGPTable.draw();
                        }
                        else {
                            swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar la orden!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    },
                    error: function (request, status, error) {
                        swal({ title: "¡Error!", text: "¡Ocurrió un error al eliminar la orden!", type: "error", confirmButtonText: "Aceptar" });
                    }
                });
    });
}


function btnGenerarOTP_onclick()
{
    var proveedor = $("#prv_int_id").val();
    var tipo_proveedor = $("#tprv_int_id").val();

    if (proveedor == 0 || tipo_proveedor == 0 || proveedor == undefined)
    {
        swal({ title: "¡Error!", text: "¡Seleccionar tipo de proveedor y proveedor!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
    }
    else
    {
        var rows_selected = oDetalleOGPTable.column(0).checkboxes.selected();

        if (rows_selected.length == 0)
        {
            swal({ title: "¡Error!", text: "¡Seleccionar por lo menos un documento!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
        }
        else if (rows_selected.length > 1)
        {
            swal({ title: "¡Error!", text: "¡Solo puede selecccionar un documento!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
        }
        else
        {
            $.each(rows_selected, function (index, rowId) {
                $('#FrmGenerarOTP').append(
                    $('<input>')
                       .attr('type', 'hidden')
                       .attr('name', 'Documentos[]')
                       .val(rowId)
                );
            });
            swal({
                title: "Generar Orden de Traslado",
                text: "¿Esta seguro de generar la Orden de traslado al proveedor seleccionado?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Generar',
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function () {
                var dataModelo = $("#FrmGenerarOTP").serialize();
                var url = $('#btnGenerarOGP').data("url")
                $.ajax(
                        {
                            type: "POST",
                            async: true,
                            url: url,
                            data: dataModelo,
                            success: function (data) {
                                if (data.res == true) {
                                    var str2 = "Se generó la Orden de traslado ";
                                    var str4 = data.orden.toString();
                                    var str3 = " de forma correcta.";
                                    var mensaje = str2.concat(str4, str3);
                                    swal("Correcto", mensaje, "success");
                                    $("#modalcontainerIncidenciasL").modal("hide");
                                    oDocumentosTable.draw();
                                }
                                else {
                                    swal({ title: "¡Error!", text: "¡Ocurrió un error al generar la Orden de traslado!", type: "error", confirmButtonText: "Aceptar" });
                                }
                            },
                            error: function (request, status, error) {
                                swal({ title: "¡Error!", text: "¡Ocurrió un error al generar la Orden de traslado!", type: "error", confirmButtonText: "Aceptar" });
                            }
                        });
            });
        }
    }
}


function BuscarDocumento()
{
    oDetalleOGPTable.draw();
}