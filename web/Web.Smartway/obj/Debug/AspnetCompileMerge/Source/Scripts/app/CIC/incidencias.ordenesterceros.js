var oDocumentosTable;
var oDetalleOSTTable;
var btnModalGenerarOST = "#btnModalGenerarOST";

$(document).ready(function () {

    $(btnModalGenerarOST).click(function (event) { btnModalGenerarOST_onclick(this, event); });

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

    CargaListaOST();
});

function CargaListaOST()
{
    oDocumentosTable =
       $('.dataTables-tblOTerceros').DataTable({
           responsive: true,
           dom: '<"html5buttons"B>lTfgitp',
           "processing": true,
           "serverSide": true,
           "ajax": {
               "url": $('#tblOTerceros').data("url"),
               "data": function ( d ) {
                   d.ost            = $('#ost_str_numero').val();
                   d.FechaInicioOST = $('#FechaInicioOST').val();
                   d.FechaFinOST    = $('#FechaFinOST').val();
               },
               "type": "POST",
               "datatype": "json"
           },
           "columns": [
                   { "key": true, "title": "Id", "data": "ost_int_id", "name": "ost_int_id", "autoWidth": true, "class": "text-center" },
                   {
                       "title": "N° Orden Servicio", "data": "ost_str_numero", "name": "ost_str_numero", "autoWidth": true, "class": "text-center",
                       "mRender":
                                function (data, type, full) {
                                    var estado = data;
                                    return "<span class='label label-primary'>" + " " + data + " " + "</span>";
                                }
                   },
                   { "title": "Tercero", "data": "ter_str_nombre", "name": "ter_str_nombre", "autoWidth": true},
                   { "title": "Fecha Creación", "data": "ost_dat_fechregistro", "name": "ost_dat_fechregistro", "autoWidth": true, "class": "text-center" },
                   { "title": "Estado", "data": "estado", "name": "estado", "autoWidth": true, "class": "text-center" },
                   { "title": "N° Guia Salida", "data": "guia", "name": "guia", "autoWidth": true, "class": "text-center" },
                   { "title": "Fecha Guia", "data": "fecha_guia", "name": "fecha_guia", "autoWidth": true, "class": "text-center" },
                   { "title": "Acciones", "class": "text-center", "data": "ost_int_id", "mRender": function (data, type, full) { var id = data; return "<div class='btn-group'><button type='button' data-toggle='tooltip' data-placement='top' title='Ver Detalle OST' class='btn-primary btn btn-xs btn-outline ' onclick='VerDetalleOST(" + id + ");return false;' href='#' > <i class='fa fa-search'></i></button><button type='button' data-toggle='tooltip' data-placement='top' title='Eliminar OST'  class='btn-danger btn btn-xs btn-outline' onclick='EliminarOST(" + id + ")' > <i class='fa fa-trash'></i></button></div>" } },
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

function EliminarOST(id)
{
    var url = $('#tblOTerceros').data("urldel");

    swal({
        title: "¿Está seguro de eliminar la Orden de servicio?",
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
                                swal("¡Eliminado!", "La orden de servicio fue eliminada de forma correcta.", "success");
                                oDocumentosTable.draw();
                            }
                            else {
                                swal({ title: "¡Error!", text: "Ocurrió un error al eliminar la orden de servicio!", type: "error", confirmButtonText: "Aceptar" });
                            }

                        },
                        error: function (request, status, error) {
                            swal({ title: "¡Error!", text: "Ocurrió un error al eliminar la orden de servicio!", type: "error", confirmButtonText: "Aceptar" });
                        }
                    });
                }
            });
}

function VerDetalleOST(id)
{
    var url = $('#tblOTerceros').data("urldtl") + "?id=" + id;
    $.get(url, function (data) {
        $("#modalcontentIncidenciasL").html(data);
        $("#modalcontainerIncidenciasL").modal("show");
        CargaInicialDetalleOST();
    });
}

function btnModalGenerarOST_onclick(obj, event) {

    var url = $(obj).data("url");
    $.get(url, function (data) {
        $("#modalcontentIncidenciasL").html(data);
        $("#modalcontainerIncidenciasL").modal("show");
        CargaInicialDetalleOST();
    });
}

function CargaInicialDetalleOST()
{
    oDetalleOSTTable =
       $('.dataTables-tblDetalleOST').DataTable({
           responsive: true,
           "searching": false,
           "processing": true,
           "serverSide": true,
           "iDisplayLength": 5,
           "scrollCollapse": true,
           "paging": true,
           "info":   false,
           "ajax": {
               "url": $('#tblDetalleOST').data("url"),
               "data": function (d) {
                   d.tienda = $('#ddlFTienda').val();
                   d.documento = $('#txtFDocumento').val();
                   d.ost = $('#ost_int_id').val();
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


function btnGenerarOST_onclick()
{
    var tercero = $("#ter_int_id").val();

    if (tercero == 0)
    {
        swal({ title: "¡Error!", text: "¡Seleccionar tercero!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
    }
    else
    {
        var rows_selected = oDetalleOSTTable.column(0).checkboxes.selected();

        if (rows_selected.length == 0)
        {
            swal({ title: "¡Error!", text: "¡Seleccionar por lo menos un documento!", type: "error", cancelButtonText: "Aceptar", closeOnCancel: true });
        }
        else
        {
            $.each(rows_selected, function (index, rowId) {
                $('#FrmGenerarOST').append(
                    $('<input>')
                       .attr('type', 'hidden')
                       .attr('name', 'Documentos[]')
                       .val(rowId)
                );
            });

            swal({
                title: "Generar Orden de Servicio",
                text: "¿Esta seguro de generar la Orden de servicio al tercero seleccionado?",
                type: "warning",
                showCancelButton: true,
                cancelButtonText: "Cancelar",
                confirmButtonColor: '#DD6B55',
                confirmButtonText: 'Generar',
                closeOnConfirm: false,
                closeOnCancel: true
            },
            function ()
            {
                var dataModelo = $("#FrmGenerarOST").serialize();
                var url = $('#btnGenerarOST').data("url")
                $.ajax(
                        {
                            type: "POST",
                            async: true,
                            url: url,
                            data: dataModelo,
                            success: function (data) {
                                if (data.res == true) {
                                    var str2 = "Se generó la Orden de servicio ";
                                    var str4 = data.orden.toString();
                                    var str3 = " de forma correcta.";
                                    var mensaje = str2.concat(str4, str3);
                                    swal("Correcto", mensaje, "success");
                                    $("#modalcontainerIncidenciasL").modal("hide");
                                    oDocumentosTable.draw();
                                }
                                else {
                                    swal({ title: "¡Error!", text: "¡Ocurrió un error al generar la Orden de servicio!", type: "error", confirmButtonText: "Aceptar" });
                                }
                            },
                            error: function (request, status, error) {
                                swal({ title: "¡Error!", text: "¡Ocurrió un error al generar la Orden de servicio!", type: "error", confirmButtonText: "Aceptar" });
                            }
                        });
            });
        }
    }
}


function BuscarDocumento()
{
    oDetalleOSTTable.draw();
}